/*
  Warnings:

  - You are about to drop the column `is_active` on the `tbl_vendor` table. All the data in the column will be lost.
  - Added the required column `bank` to the `tbl_vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `tbl_vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "_tbl_goods_receiptTotbl_shipment" ADD CONSTRAINT "_tbl_goods_receiptTotbl_shipment_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_tbl_goods_receiptTotbl_shipment_AB_unique";

-- AlterTable
ALTER TABLE "tbl_vendor" DROP COLUMN "is_active",
ADD COLUMN     "bank" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
