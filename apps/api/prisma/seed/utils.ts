import {faker} from '@faker-js/faker'
import { CompanySize, Seniority } from '@prisma/client'

export const createLocation = () => ({
    city: faker.location.city(),
    country: faker.location.countryCode(),
    continent: faker.helpers.arrayElement(['Africa', 'Antarctica', 'Asia', 'Europe', 'North America', 'Oceania', 'South America']),
})

export const createCompany = (hqLocationId: string) => ({
    name: faker.company.name(),
    primaryColor: faker.color.rgb(),
    secondaryColor: faker.color.rgb(),
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
        'Cooperative'
    ]),
    hqLocationId
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
      yearsInCurrentPosition: faker.datatype.number({max: 20}),
      jobTitle: faker.name.jobTitle(),
      jobDescription: faker.name.jobDescriptor(),
      isDecisionMaker: faker.datatype.boolean()
  })