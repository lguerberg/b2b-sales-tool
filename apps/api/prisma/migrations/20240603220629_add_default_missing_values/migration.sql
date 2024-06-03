/*
  Warnings:

  - Added the required column `calendlyUrl` to the `campaign_email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calendlyUrl` to the `company_onboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "campaign" ALTER COLUMN "emailsSentCount" SET DEFAULT 0,
ALTER COLUMN "emailsOpenedCount" SET DEFAULT 0,
ALTER COLUMN "emailsFailedCount" SET DEFAULT 0,
ALTER COLUMN "emailsClickedCount" SET DEFAULT 0,
ALTER COLUMN "meetingsScheduledCount" SET DEFAULT 0,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "campaign_email" ADD COLUMN     "calendlyUrl" TEXT NOT NULL,
ALTER COLUMN "isClicked" SET DEFAULT false,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "company_onboard" ADD COLUMN     "calendlyUrl" TEXT NOT NULL;
