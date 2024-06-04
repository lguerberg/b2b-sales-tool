import { PrismaClient } from '@prisma/client'
import {faker} from "@faker-js/faker"
import { createCompany, createLead, createLocation } from './utils'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')
    // Seed locations
    const locations = await prisma.location.createManyAndReturn({
      data: faker.helpers.multiple(createLocation, {
        count: 1000
      }),
      select: {
        id: true
      }
    })

    // Seed companies
    const companies = await prisma.company.createManyAndReturn({
      data: faker.helpers.multiple(() => createCompany(faker.helpers.arrayElement(locations).id), {
        count: 10000
      }),
      select: {
        id: true
      }
    })

    // Seed leads
    await prisma.lead.createMany({
      data: faker.helpers.multiple(() => createLead(faker.helpers.arrayElement(companies).id), {
        count: 10000,
      })
    })
}
main()
  .then(async () => {
    console.log('Seed completed')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })