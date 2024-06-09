import { faker } from '@faker-js/faker'
import { CampaingStatus, CompanySize, MessageStatus, Seniority } from '@prisma/client'

import { hashPassword } from '../../src/infrastructure/utils/password.utils'

export const createLocation = () => ({
  city: faker.location.city(),
  country: faker.location.countryCode(),
  continent: faker.helpers.arrayElement([
    'Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'North America',
    'Oceania',
    'South America',
  ]),
})

export const createCompany = (hqLocationId: string) => ({
  name: `${faker.datatype.number({ min: 1, max: 100000 })}_${faker.company.name()}`,
  primaryColor: faker.color.rgb(),
  secondaryColor: faker.color.rgb(),
  logoUrl: faker.image.business(),
  size: faker.helpers.enumValue(CompanySize),
  industry: faker.commerce.department(),
  type: faker.helpers.arrayElement([
    'Public',
    'Private',
    'Non-profit',
    'Government-owned',
    'Multinational',
    'Startup',
    'Family-owned',
    'Joint venture',
    'Subsidiary',
    'Cooperative',
  ]),
  hqLocationId,
})

export const createLead = (currentCompanyId: string) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  enrichedSummary: faker.lorem.paragraph(),
  currentCompanyId,
  pastCompanyId: currentCompanyId,
  seniority: faker.helpers.enumValue(Seniority),
  yearsInCurrentPosition: faker.datatype.number({ max: 20 }),
  jobTitle: faker.name.jobTitle(),
  jobDescription: faker.name.jobDescriptor(),
  isDecisionMaker: faker.datatype.boolean(),
  language: faker.helpers.arrayElement(['en', 'es', 'fr', 'it']),
})

export const UsersToSeed = async (companyId: string) => [
  {
    email: 'leo.guerberg@gmail.com',
    firstName: 'Leo',
    lastName: 'Guerberg',
    password: await hashPassword('leo.guerberg'),
    avatarUrl: faker.image.avatar(),
    companyId,
  },
  {
    email: 'gabriel.benmergui@gmail.com',
    firstName: 'Gabriel',
    lastName: 'Benmergui',
    password: await hashPassword('gabriel.benmergui'),
    avatarUrl: faker.image.avatar(),
    companyId,
  },
]

export const createGroupWithCampaigns = (campaignsCount: number, userCreatedId: string, leadsIds: string[]) => {
  const emailsSentCount = faker.datatype.number({ min: 1, max: leadsIds.length })
  const emailsFailedCount = leadsIds.length - emailsSentCount
  const emailsOpenedCount = faker.datatype.number({ min: 1, max: emailsSentCount })
  const emailsClickedCount = faker.datatype.number({ min: 1, max: emailsOpenedCount })
  const meetingsScheduledCount = faker.datatype.number({ min: 1, max: emailsClickedCount })

  return {
    name: faker.company.buzzAdjective(),
    description: faker.company.catchPhrase(),
    userCreatedId,
    campaings: {
      createMany: {
        data: Array.from({ length: campaignsCount }).map(() => ({
          name: faker.company.bsAdjective(),
          description: faker.company.bsBuzz(),
          status: CampaingStatus.SENT,
          emailsSentCount,
          emailsFailedCount,
          emailsOpenedCount,
          emailsClickedCount,
          meetingsScheduledCount,
          createdAt: faker.date.between({
            from: new Date('2021-01-01'),
            to: new Date(),
          }),
        })),
      },
    },
    leads: {
      createMany: {
        data: leadsIds.map(leadId => ({ leadId })),
      },
    },
  }
}

export const createCampaignEmail = (campaignId: string, leadId: string) => ({
  leadId,
  campaignId,
  subject: faker.lorem.slug(),
  content: faker.lorem.sentences(2),
  calendlyUrl: faker.internet.url(),
  status: MessageStatus.SUCCESS,
})
