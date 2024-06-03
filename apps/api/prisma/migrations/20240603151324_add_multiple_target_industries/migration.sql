/*
  Warnings:

  - The `targetIndustry` column on the `company_onboard` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "company_onboard" DROP COLUMN "targetIndustry",
ADD COLUMN     "targetIndustry" TEXT[];
