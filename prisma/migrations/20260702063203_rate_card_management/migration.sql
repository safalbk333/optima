/*
  Warnings:

  - You are about to drop the column `is_active` on the `tbl_vendor` table. All the data in the column will be lost.
  - Added the required column `status` to the `tbl_vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_vendor" DROP COLUMN "is_active",
ADD COLUMN     "bank" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL;

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

-- CreateTable
CREATE TABLE "tbl_rate_card" (
    "pk_rate_card_id" TEXT NOT NULL,
    "rate_card_code" TEXT NOT NULL,
    "rate_card_name" TEXT NOT NULL,
    "fk_vendor_id" TEXT NOT NULL,
    "valid_from" TIMESTAMP(3) NOT NULL,
    "valid_to" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "remarks" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_rate_card_pkey" PRIMARY KEY ("pk_rate_card_id")
);

-- CreateTable
CREATE TABLE "tbl_rate_card_item" (
    "pk_rate_card_item_id" TEXT NOT NULL,
    "fk_rate_card_id" TEXT NOT NULL,
    "fk_item_id" TEXT NOT NULL,
    "pricing_type" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,

    CONSTRAINT "tbl_rate_card_item_pkey" PRIMARY KEY ("pk_rate_card_item_id")
);

-- CreateTable
CREATE TABLE "tbl_rate_card_fixed_price" (
    "pk_fixed_price_id" TEXT NOT NULL,
    "fk_rate_card_item_id" TEXT NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tbl_rate_card_fixed_price_pkey" PRIMARY KEY ("pk_fixed_price_id")
);

-- CreateTable
CREATE TABLE "tbl_rate_card_tier" (
    "pk_tier_id" TEXT NOT NULL,
    "fk_rate_card_item_id" TEXT NOT NULL,
    "min_qty" INTEGER NOT NULL,
    "max_qty" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tbl_rate_card_tier_pkey" PRIMARY KEY ("pk_tier_id")
);

-- CreateTable
CREATE TABLE "tbl_rate_card_milestone" (
    "pk_milestone_id" TEXT NOT NULL,
    "fk_rate_card_item_id" TEXT NOT NULL,
    "milestone_name" TEXT NOT NULL,
    "milestone_order" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tbl_rate_card_milestone_pkey" PRIMARY KEY ("pk_milestone_id")
);

-- CreateTable
CREATE TABLE "tbl_vendor_item_price" (
    "pk_vendor_item_price_id" TEXT NOT NULL,
    "fk_vendor_id" TEXT NOT NULL,
    "fk_item_id" TEXT NOT NULL,
    "fk_rate_card_id" TEXT NOT NULL,
    "fk_rate_card_item_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "tbl_vendor_item_price_pkey" PRIMARY KEY ("pk_vendor_item_price_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_currency_currency_code_key" ON "tbl_currency"("currency_code");

-- CreateIndex
CREATE INDEX "tbl_currency_currency_code_idx" ON "tbl_currency"("currency_code");

-- CreateIndex
CREATE INDEX "tbl_currency_is_active_idx" ON "tbl_currency"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_rate_card_rate_card_code_key" ON "tbl_rate_card"("rate_card_code");

-- CreateIndex
CREATE INDEX "tbl_rate_card_fk_vendor_id_idx" ON "tbl_rate_card"("fk_vendor_id");

-- CreateIndex
CREATE INDEX "tbl_rate_card_status_idx" ON "tbl_rate_card"("status");

-- CreateIndex
CREATE INDEX "tbl_rate_card_valid_from_idx" ON "tbl_rate_card"("valid_from");

-- CreateIndex
CREATE INDEX "tbl_rate_card_valid_to_idx" ON "tbl_rate_card"("valid_to");

-- CreateIndex
CREATE INDEX "tbl_rate_card_item_fk_rate_card_id_idx" ON "tbl_rate_card_item"("fk_rate_card_id");

-- CreateIndex
CREATE INDEX "tbl_rate_card_item_fk_item_id_idx" ON "tbl_rate_card_item"("fk_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_rate_card_item_fk_rate_card_id_fk_item_id_key" ON "tbl_rate_card_item"("fk_rate_card_id", "fk_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_rate_card_fixed_price_fk_rate_card_item_id_key" ON "tbl_rate_card_fixed_price"("fk_rate_card_item_id");

-- CreateIndex
CREATE INDEX "tbl_rate_card_tier_fk_rate_card_item_id_idx" ON "tbl_rate_card_tier"("fk_rate_card_item_id");

-- CreateIndex
CREATE INDEX "tbl_rate_card_milestone_fk_rate_card_item_id_idx" ON "tbl_rate_card_milestone"("fk_rate_card_item_id");

-- CreateIndex
CREATE INDEX "tbl_vendor_item_price_fk_vendor_id_idx" ON "tbl_vendor_item_price"("fk_vendor_id");

-- CreateIndex
CREATE INDEX "tbl_vendor_item_price_fk_item_id_idx" ON "tbl_vendor_item_price"("fk_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_vendor_item_price_fk_vendor_id_fk_item_id_is_active_key" ON "tbl_vendor_item_price"("fk_vendor_id", "fk_item_id", "is_active");

-- AddForeignKey
ALTER TABLE "tbl_rate_card" ADD CONSTRAINT "tbl_rate_card_fk_vendor_id_fkey" FOREIGN KEY ("fk_vendor_id") REFERENCES "tbl_vendor"("pk_vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_rate_card" ADD CONSTRAINT "tbl_rate_card_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_rate_card" ADD CONSTRAINT "tbl_rate_card_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_rate_card_item" ADD CONSTRAINT "tbl_rate_card_item_fk_rate_card_id_fkey" FOREIGN KEY ("fk_rate_card_id") REFERENCES "tbl_rate_card"("pk_rate_card_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_rate_card_item" ADD CONSTRAINT "tbl_rate_card_item_fk_item_id_fkey" FOREIGN KEY ("fk_item_id") REFERENCES "tbl_item"("pk_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_rate_card_item" ADD CONSTRAINT "tbl_rate_card_item_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_rate_card_item" ADD CONSTRAINT "tbl_rate_card_item_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_rate_card_fixed_price" ADD CONSTRAINT "tbl_rate_card_fixed_price_fk_rate_card_item_id_fkey" FOREIGN KEY ("fk_rate_card_item_id") REFERENCES "tbl_rate_card_item"("pk_rate_card_item_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_rate_card_tier" ADD CONSTRAINT "tbl_rate_card_tier_fk_rate_card_item_id_fkey" FOREIGN KEY ("fk_rate_card_item_id") REFERENCES "tbl_rate_card_item"("pk_rate_card_item_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_rate_card_milestone" ADD CONSTRAINT "tbl_rate_card_milestone_fk_rate_card_item_id_fkey" FOREIGN KEY ("fk_rate_card_item_id") REFERENCES "tbl_rate_card_item"("pk_rate_card_item_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_item_price" ADD CONSTRAINT "tbl_vendor_item_price_fk_vendor_id_fkey" FOREIGN KEY ("fk_vendor_id") REFERENCES "tbl_vendor"("pk_vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_item_price" ADD CONSTRAINT "tbl_vendor_item_price_fk_item_id_fkey" FOREIGN KEY ("fk_item_id") REFERENCES "tbl_item"("pk_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_item_price" ADD CONSTRAINT "tbl_vendor_item_price_fk_rate_card_id_fkey" FOREIGN KEY ("fk_rate_card_id") REFERENCES "tbl_rate_card"("pk_rate_card_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_item_price" ADD CONSTRAINT "tbl_vendor_item_price_fk_rate_card_item_id_fkey" FOREIGN KEY ("fk_rate_card_item_id") REFERENCES "tbl_rate_card_item"("pk_rate_card_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;
