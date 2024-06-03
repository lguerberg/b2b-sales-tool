-- CreateEnum
CREATE TYPE "company_size" AS ENUM ('SELF_EMPLOYED', 'ONE_TO_TEN', 'ELEVEN_TO_FIFTY', 'FIFTY_ONE_TO_TWO_HUNDRED', 'TWO_HUNDRED_ONE_TO_FIVE_HUNDRED', 'FIVE_HUNDRED_ONE_TO_ONE_THOUSAND', 'ONE_THOUSAND_ONE_TO_FIVE_THOUSAND');

-- CreateEnum
CREATE TYPE "campaign_status" AS ENUM ('PENDING', 'CREATING', 'SENDING', 'SENT');

-- CreateEnum
CREATE TYPE "integration_provider" AS ENUM ('SENGRID', 'CALENDLY');

-- CreateEnum
CREATE TYPE "seniority" AS ENUM ('JR', 'SSR', 'SR', 'STAFF', 'MANAGER', 'C_LEVEL');

-- CreateEnum
CREATE TYPE "message_status" AS ENUM ('PENDING', 'SENDING', 'FAILED', 'SUCCESS');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "size" "company_size" NOT NULL,
    "industry" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "hqLocationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_onboard" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "conversionRate" INTEGER NOT NULL,
    "mediumTicketPrice" INTEGER NOT NULL,
    "targetIndustry" TEXT NOT NULL,
    "salesSpeechContext" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_onboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_integration" (
    "id" TEXT NOT NULL,
    "provider" "integration_provider" NOT NULL,
    "key" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_integration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "continent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userCreatedId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "emailsSentCount" INTEGER NOT NULL,
    "emailsOpenedCount" INTEGER NOT NULL,
    "emailsFailedCount" INTEGER NOT NULL,
    "emailsClickedCount" INTEGER NOT NULL,
    "meetingsScheduledCount" INTEGER NOT NULL,
    "status" "campaign_status" NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_email" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "openedAt" TIMESTAMP(3),
    "isClicked" BOOLEAN NOT NULL,
    "status" "message_status" NOT NULL,
    "retriesCount" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "seniority" "seniority" NOT NULL,
    "yearsInCurrentPosition" INTEGER NOT NULL,
    "enrichedSummary" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "isDecisionMaker" BOOLEAN NOT NULL,
    "currentCompanyId" TEXT NOT NULL,
    "pastCompanyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_industry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_industry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "company_onboard_companyId_key" ON "company_onboard"("companyId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_hqLocationId_fkey" FOREIGN KEY ("hqLocationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_onboard" ADD CONSTRAINT "company_onboard_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_integration" ADD CONSTRAINT "company_integration_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_userCreatedId_fkey" FOREIGN KEY ("userCreatedId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign" ADD CONSTRAINT "campaign_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_email" ADD CONSTRAINT "campaign_email_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_email" ADD CONSTRAINT "campaign_email_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead" ADD CONSTRAINT "lead_currentCompanyId_fkey" FOREIGN KEY ("currentCompanyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead" ADD CONSTRAINT "lead_pastCompanyId_fkey" FOREIGN KEY ("pastCompanyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
