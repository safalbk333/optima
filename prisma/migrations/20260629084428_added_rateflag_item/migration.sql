/*
  Warnings:

  - You are about to drop the column `sac_code` on the `tbl_item` table. All the data in the column will be lost.
  - Added the required column `rc_flag` to the `tbl_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "_tbl_goods_receiptTotbl_shipment" ADD CONSTRAINT "_tbl_goods_receiptTotbl_shipment_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_tbl_goods_receiptTotbl_shipment_AB_unique";

-- AlterTable
ALTER TABLE "tbl_item" DROP COLUMN "sac_code",
ADD COLUMN     "rc_flag" BOOLEAN NOT NULL;
