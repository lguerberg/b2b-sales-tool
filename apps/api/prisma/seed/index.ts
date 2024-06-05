import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

import { UsersToSeed, createCompany, createLead, createLocation } from './utils'

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

  // Seed locations
  const locations = await prisma.location.createManyAndReturn({
    data: faker.helpers.multiple(createLocation, {
      count: 1000,
    }),
    select: {
      id: true,
    },
  })

  // Seed users
  await Promise.all(
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
  await prisma.lead.createMany({
    data: faker.helpers.multiple(() => createLead(faker.helpers.arrayElement(companies).id), {
      count: 10000,
    }),
  })
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
