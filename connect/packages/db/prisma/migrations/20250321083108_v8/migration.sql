-- AlterTable
ALTER TABLE "Editor" ADD COLUMN     "associatedYt" TEXT;

-- AddForeignKey
ALTER TABLE "Editor" ADD CONSTRAINT "Editor_associatedYt_fkey" FOREIGN KEY ("associatedYt") REFERENCES "Youtuber"("id") ON DELETE SET NULL ON UPDATE CASCADE;
