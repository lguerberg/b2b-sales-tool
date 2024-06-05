/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `language` to the `lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lead" ADD COLUMN     "language" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "company_name_key" ON "company"("name");
