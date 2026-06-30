/*
  Warnings:

  - The primary key for the `_tbl_goods_receiptTotbl_shipment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_tbl_goods_receiptTotbl_shipment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_tbl_goods_receiptTotbl_shipment" DROP CONSTRAINT "_tbl_goods_receiptTotbl_shipment_AB_pkey";

-- CreateTable
CREATE TABLE "tbl_currency" (
    "pk_currency_id" TEXT NOT NULL,
    "currency_name" TEXT NOT NULL,
    "currency_code" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_currency_pkey" PRIMARY KEY ("pk_currency_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_currency_currency_code_key" ON "tbl_currency"("currency_code");

-- CreateIndex
CREATE INDEX "tbl_currency_currency_code_idx" ON "tbl_currency"("currency_code");

-- CreateIndex
CREATE INDEX "tbl_currency_is_active_idx" ON "tbl_currency"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "_tbl_goods_receiptTotbl_shipment_AB_unique" ON "_tbl_goods_receiptTotbl_shipment"("A", "B");
