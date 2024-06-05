import { faker } from '@faker-js/faker'
import { CompanySize, Seniority } from '@prisma/client'

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
  name: `${faker.datatype.number({ min: 1, max: 100 })}_${faker.company.name()}`,
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
