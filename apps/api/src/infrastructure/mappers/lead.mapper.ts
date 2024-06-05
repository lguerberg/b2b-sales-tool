import { Company as PrismaCompany, Lead as PrismaLead } from '@prisma/client'

import { Lead, LeadLanguage } from '@/domain/lead'

import { GetLeadDetailsResponse } from '../schemas/lead/get-lead-details.schema'

export const mapPrismaLeadToDomain = (
  prismaLead: PrismaLead,
  extra?: Partial<{
    currentCompany: PrismaCompany
  }>,
) =>
  ({
    id: prismaLead.id,
    firstName: prismaLead.firstName,
    lastName: prismaLead.lastName,
    email: prismaLead.email,
    phone: prismaLead.phone || undefined,
    enrichedSummary: prismaLead.enrichedSummary,
    language: prismaLead.language as LeadLanguage,
    currentPosition: {
      company: {
        name: extra?.currentCompany?.name || '',
        logoUrl: extra?.currentCompany?.logoUrl || undefined,
      },
      seniority: prismaLead.seniority,
      yearsInCurrentPosition: prismaLead.yearsInCurrentPosition,
      jobTitle: prismaLead.jobTitle,
      jobDescription: prismaLead.jobDescription,
      isDecisionMaker: prismaLead.isDecisionMaker,
    },
  }) satisfies Lead

export const mapToLeadDetailsResponse = (lead: Lead) =>
  ({
    id: lead.id,
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    language: lead.language,
    currentPosition: {
      company: {
        name: lead.currentPosition.company?.name || '',
      },
      seniority: lead.currentPosition.seniority,
      yearsInCurrentPosition: lead.currentPosition.yearsInCurrentPosition,
      jobTitle: lead.currentPosition.jobTitle,
      jobDescription: lead.currentPosition.jobDescription,
      isDecisionMaker: lead.currentPosition.isDecisionMaker,
    },
  }) satisfies GetLeadDetailsResponse
