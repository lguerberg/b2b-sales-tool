import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import Typesense from 'typesense'

import {
  UsersToSeed,
  createCampaignEmail,
  createCompany,
  createGroupWithCampaigns,
  createLead,
  createLocation,
  leadsTypesenseSchema,
} from './utils'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Seed company for demoing
  const demoCompany = await prisma.company.upsert({
    where: {
      name: 'Nuvia',
    },
    update: {},
    create: {
      name: 'Nuvia',
      primaryColor: faker.color.rgb(),
      secondaryColor: faker.color.rgb(),
      size: 'FIVE_HUNDRED_ONE_TO_ONE_THOUSAND',
      industry: 'Software',
      type: 'Private',
      hqLocation: {
        create: {
          city: 'Buenos Aires',
          country: 'AR',
          continent: 'South America',
        },
      },
      onboard: {
        create: {
          conversionRate: 4,
          mediumTicketPrice: 2670,
          salesSpeechContext:
            'You are a the BDR of Nuvia.co, a company that provides a SaaS product for sales teams. Your SaaS includes prospecting, enrichment, outreach, and CRM features (most of the pains that address fintechs)',
          calendlyUrl: 'https://calendly.com/leo-guerberg/sales-demo',
          targetIndustry: ['Fintech', 'Healthcare', 'SaaS', 'Banking'],
        },
      },
    },
    select: {
      id: true,
    },
  })

  // Seed users
  const users = await Promise.all(
    (await UsersToSeed(demoCompany.id)).map(async user =>
      prisma.user.upsert({
        where: {
          email: user.email,
        },
        update: {},
        create: user,
      }),
    ),
  )

  // Seed locations
  const locations = await prisma.location.createManyAndReturn({
    data: faker.helpers.multiple(createLocation, {
      count: 1000,
    }),
    select: {
      id: true,
    },
  })

  // Seed companies
  const companies = await prisma.company.createManyAndReturn({
    data: faker.helpers.multiple(() => createCompany(faker.helpers.arrayElement(locations).id), {
      count: 10000,
    }),
    select: {
      id: true,
    },
  })

  // Seed leads
  const leads = await prisma.lead.createManyAndReturn({
    data: faker.helpers.multiple(() => createLead(faker.helpers.arrayElement(companies).id), {
      count: 10000,
    }),
  })

  // Seed groups with campaigns
  for (let i = 0; i < 1000; i++) {
    const group = await prisma.group.create({
      data: createGroupWithCampaigns(
        1,
        faker.helpers.arrayElement(users).id,
        faker.helpers
          .arrayElements(
            leads,
            faker.number.int({
              min: 3,
              max: 250,
            }),
          )
          .map(lead => lead.id),
      ),
      include: {
        leads: {
          include: {
            lead: true,
          },
        },
        campaings: true,
      },
    })

    await prisma.campaignEmail.createMany({
      data: group.campaings.map(c => group.leads.map(l => createCampaignEmail(c.id, l.lead.id))).flat(),
    })
  }
}
main()
  .then(async () => {
    console.log('Seed completed')
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

async function seedSearchEngine() {
  const client = new Typesense.Client({
    nodes: [
      {
        host: process.env.TYPESENSE_HOST || '',
        port: parseInt(process.env.TYPESENSE_PORT || '8000'),
        protocol: process.env.TYPESENSE_PROTOCOL || 'https',
      },
    ],
    apiKey: process.env.TYPESENSE_API_KEY || '',
    connectionTimeoutSeconds: 2,
  })

  const collections = await client.collections().retrieve()
  const leadsCollection = collections.find(c => c.name === 'leads')
  if (leadsCollection) {
    await client.collections('leads').delete()
  }

  await client.collections().create(leadsTypesenseSchema)

  const leads = await prisma.lead.findMany({
    include: {
      currentCompany: {
        include: {
          hqLocation: true,
        },
      },
    },
  })

  await client
    .collections('leads')
    .documents()
    .import(
      leads.map(lead => ({
        id: lead.id,
        name: `${lead.firstName} ${lead.lastName}`,
        email: lead.email,
        language: lead.language,
        industry: lead.currentCompany.industry,
        hqLocation: `${lead.currentCompany.hqLocation.country}, ${lead.currentCompany.hqLocation.city}`,
        companyType: lead.currentCompany.type,
        companySize: lead.currentCompany.size,
        isDecisionMaker: lead.isDecisionMaker,
        seniority: lead.seniority,
        jobTitle: lead.jobTitle,
      })),
      {
        dirty_values: 'coerce_or_reject',
        action: 'upsert',
        return_doc: true,
      },
    )
}
