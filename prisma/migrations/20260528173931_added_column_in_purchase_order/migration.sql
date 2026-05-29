/*
  Warnings:

  - Added the required column `fk_chr_quotation_id` to the `tbl_purchase_order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_purchase_order" ADD COLUMN     "fk_chr_quotation_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tbl_purchase_order" ADD CONSTRAINT "tbl_purchase_order_fk_chr_quotation_id_fkey" FOREIGN KEY ("fk_chr_quotation_id") REFERENCES "tbl_quotation"("pk_chr_quotation_id") ON DELETE RESTRICT ON UPDATE CASCADE;
