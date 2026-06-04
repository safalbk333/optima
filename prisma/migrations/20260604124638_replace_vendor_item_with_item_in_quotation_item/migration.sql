/*
  Warnings:

  - You are about to drop the column `fk_chr_vendor_item_id` on the `tbl_quotation_item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tbl_quotation_item" DROP CONSTRAINT "tbl_quotation_item_fk_chr_vendor_item_id_fkey";

-- DropIndex
DROP INDEX "tbl_quotation_item_fk_chr_vendor_item_id_idx";

-- AlterTable
ALTER TABLE "tbl_quotation_item" DROP COLUMN "fk_chr_vendor_item_id",
ADD COLUMN     "fk_chr_item_id" TEXT;

-- CreateIndex
CREATE INDEX "tbl_quotation_item_fk_chr_item_id_idx" ON "tbl_quotation_item"("fk_chr_item_id");

-- AddForeignKey
ALTER TABLE "tbl_quotation_item" ADD CONSTRAINT "tbl_quotation_item_fk_chr_item_id_fkey" FOREIGN KEY ("fk_chr_item_id") REFERENCES "tbl_item"("pk_chr_item_id") ON DELETE SET NULL ON UPDATE CASCADE;
