-- CreateTable
CREATE TABLE "group_leads" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "group_leads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "group_leads" ADD CONSTRAINT "group_leads_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group_leads" ADD CONSTRAINT "group_leads_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
