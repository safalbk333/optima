/*
  Warnings:

  - Added the required column `industry` to the `tbl_vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration_number` to the `tbl_vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_vendor" ADD COLUMN     "business_description" TEXT,
ADD COLUMN     "industry" TEXT NOT NULL,
ADD COLUMN     "number_of_employees" INTEGER,
ADD COLUMN     "registration_number" TEXT NOT NULL,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "tbl_vendor_document" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fk_created_id" TEXT,
ADD COLUMN     "fk_modified_id" TEXT,
ADD COLUMN     "modified" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "tbl_vendor_contact" (
    "pk_vendor_contact_id" TEXT NOT NULL,
    "fk_vendor_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "designation" TEXT,
    "business_email" TEXT NOT NULL,
    "mobile_number" TEXT NOT NULL,
    "preferred_contact_method" TEXT,
    "department" TEXT,
    "alternate_email" TEXT,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "is_delete" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3),
    "fk_created_id" TEXT,
    "fk_modified_id" TEXT,

    CONSTRAINT "tbl_vendor_contact_pkey" PRIMARY KEY ("pk_vendor_contact_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_vendor_contact_business_email_key" ON "tbl_vendor_contact"("business_email");

-- AddForeignKey
ALTER TABLE "tbl_vendor_contact" ADD CONSTRAINT "fk_vendor_contact_created_by" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_contact" ADD CONSTRAINT "fk_vendor_contact_modified_by" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_contact" ADD CONSTRAINT "tbl_vendor_contact_fk_vendor_id_fkey" FOREIGN KEY ("fk_vendor_id") REFERENCES "tbl_vendor"("pk_vendor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_document" ADD CONSTRAINT "fk_vendor_bank_created_by" FOREIGN KEY ("fk_created_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor_document" ADD CONSTRAINT "fk_vendor_bank_modified_by" FOREIGN KEY ("fk_modified_id") REFERENCES "tbl_user"("pk_user_id") ON DELETE SET NULL ON UPDATE CASCADE;
