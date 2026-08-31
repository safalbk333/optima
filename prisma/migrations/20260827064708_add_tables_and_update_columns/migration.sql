/*
  Warnings:

  - You are about to drop the column `GST_number` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `MSME_status` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `PAN_number` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `bank` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `contact_person` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `fk_city_id` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `fk_country_id` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `office_address` on the `tbl_vendor` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `tbl_vendor` table. All the data in the column will be lost.
  - Added the required column `msme_status` to the `tbl_vendor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tbl_vendor" DROP CONSTRAINT "tbl_vendor_fk_city_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_vendor" DROP CONSTRAINT "tbl_vendor_fk_country_id_fkey";

-- DropIndex
DROP INDEX "tbl_vendor_GST_number_key";

-- DropIndex
DROP INDEX "tbl_vendor_PAN_number_key";

-- DropIndex
DROP INDEX "tbl_vendor_email_key";

-- AlterTable
ALTER TABLE "tbl_vendor" DROP COLUMN "GST_number",
DROP COLUMN "MSME_status",
DROP COLUMN "PAN_number",
DROP COLUMN "bank",
DROP COLUMN "contact_person",
DROP COLUMN "email",
DROP COLUMN "fk_city_id",
DROP COLUMN "fk_country_id",
DROP COLUMN "office_address",
DROP COLUMN "phone",
ADD COLUMN     "msme_status" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "tbl_state" (
    "pk_state_id" TEXT NOT NULL,
    "state_name" TEXT NOT NULL,
    "fk_country_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_state_pkey" PRIMARY KEY ("pk_state_id")
);

-- CreateTable
CREATE TABLE "tbl_vendor_address" (
    "pk_vendor_address_id" TEXT NOT NULL,
    "fk_vendor_id" TEXT NOT NULL,
    "address_type" TEXT NOT NULL,
    "address_line_1" TEXT NOT NULL,
    "address_line_2" TEXT,
    "fk_city_id" TEXT NOT NULL,
    "fk_state_id" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "fk_country_id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_vendor_address_pkey" PRIMARY KEY ("pk_vendor_address_id")
);

-- CreateTable
CREATE TABLE "tbl_vendor_tax_registrations" (
    "pk_vendor_tax_id" TEXT NOT NULL,
    "fk_vendor_id" TEXT NOT NULL,
    "fk_country_id" TEXT NOT NULL,
    "tax_type" TEXT NOT NULL,
    "tax_number" TEXT NOT NULL,
    "registration_name" TEXT NOT NULL,
    "registration_status" TEXT NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_vendor_tax_registrations_pkey" PRIMARY KEY ("pk_vendor_tax_id")
);

-- CreateTable
CREATE TABLE "tbl_vendor_bank_accounts" (
    "pk_vendor_bank_account_id" TEXT NOT NULL,
    "fk_vendor_id" TEXT NOT NULL,
    "beneficiary_name" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "bank_country_id" TEXT NOT NULL,
    "account_number" TEXT NOT NULL,
    "account_type" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "identifier_type" TEXT NOT NULL,
    "identifier_value" TEXT NOT NULL,
    "branch_name" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "remittance_email" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tbl_vendor_bank_accounts_pkey" PRIMARY KEY ("pk_vendor_bank_account_id")
);

-- CreateIndex
CREATE INDEX "tbl_state_fk_country_id_idx" ON "tbl_state"("fk_country_id");

-- AddForeignKey
ALTER TABLE "tbl_state" ADD CONSTRAINT "tbl_state_fk_country_id_fkey" FOREIGN KEY ("fk_country_id") REFERENCES "tbl_country"("pk_country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_state" ADD CONSTRAINT "tbl_state_fk_created_id_fkey" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_state" ADD CONSTRAINT "tbl_state_fk_modified_id_fkey" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_vendor_address" ADD CONSTRAINT "tbl_vendor_address_fk_vendor_id_fkey" FOREIGN KEY ("fk_vendor_id") REFERENCES "tbl_vendor"("pk_vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_address" ADD CONSTRAINT "tbl_vendor_address_fk_city_id_fkey" FOREIGN KEY ("fk_city_id") REFERENCES "tbl_city"("pk_city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_address" ADD CONSTRAINT "tbl_vendor_address_fk_state_id_fkey" FOREIGN KEY ("fk_state_id") REFERENCES "tbl_state"("pk_state_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_address" ADD CONSTRAINT "tbl_vendor_address_fk_country_id_fkey" FOREIGN KEY ("fk_country_id") REFERENCES "tbl_country"("pk_country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_address" ADD CONSTRAINT "fk_vendor_address_created_by" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_address" ADD CONSTRAINT "fk_vendor_address_modified_by" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_tax_registrations" ADD CONSTRAINT "tbl_vendor_tax_registrations_fk_vendor_id_fkey" FOREIGN KEY ("fk_vendor_id") REFERENCES "tbl_vendor"("pk_vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_tax_registrations" ADD CONSTRAINT "tbl_vendor_tax_registrations_fk_country_id_fkey" FOREIGN KEY ("fk_country_id") REFERENCES "tbl_country"("pk_country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_tax_registrations" ADD CONSTRAINT "fk_vendor_tax_created_by" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_tax_registrations" ADD CONSTRAINT "fk_vendor_tax_modified_by" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_bank_accounts" ADD CONSTRAINT "tbl_vendor_bank_accounts_fk_vendor_id_fkey" FOREIGN KEY ("fk_vendor_id") REFERENCES "tbl_vendor"("pk_vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_bank_accounts" ADD CONSTRAINT "tbl_vendor_bank_accounts_bank_country_id_fkey" FOREIGN KEY ("bank_country_id") REFERENCES "tbl_country"("pk_country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_bank_accounts" ADD CONSTRAINT "fk_vendor_bank_created_by" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_bank_accounts" ADD CONSTRAINT "fk_vendor_bank_modified_by" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE SET NULL ON UPDATE CASCADE;
