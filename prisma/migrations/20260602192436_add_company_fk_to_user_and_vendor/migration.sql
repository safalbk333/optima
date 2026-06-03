-- AlterTable
ALTER TABLE "tbl_user" ADD COLUMN     "fk_chr_company_id" TEXT;

-- AlterTable
ALTER TABLE "tbl_vendor" ADD COLUMN     "fk_chr_company_id" TEXT;

-- CreateTable
CREATE TABLE "tbl_company" (
    "pk_chr_company_id" TEXT NOT NULL,
    "chr_company_name" TEXT NOT NULL,
    "chr_company_code" TEXT NOT NULL,
    "chr_company_email" TEXT NOT NULL,
    "chr_company_phone" TEXT NOT NULL,
    "chr_company_address" TEXT,
    "chr_city" TEXT,
    "chr_state" TEXT,
    "chr_country" TEXT,
    "chr_postal_code" TEXT,
    "chr_website" TEXT,
    "chr_tax_number" TEXT,
    "chr_currency" TEXT NOT NULL DEFAULT 'USD',
    "chr_logo_url" TEXT,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'N',

    CONSTRAINT "tbl_company_pkey" PRIMARY KEY ("pk_chr_company_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_company_chr_company_code_key" ON "tbl_company"("chr_company_code");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_company_chr_company_email_key" ON "tbl_company"("chr_company_email");

-- CreateIndex
CREATE INDEX "tbl_company_chr_company_code_idx" ON "tbl_company"("chr_company_code");

-- CreateIndex
CREATE INDEX "tbl_company_bln_is_active_idx" ON "tbl_company"("bln_is_active");

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_fk_chr_company_id_fkey" FOREIGN KEY ("fk_chr_company_id") REFERENCES "tbl_company"("pk_chr_company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_vendor" ADD CONSTRAINT "tbl_vendor_fk_chr_company_id_fkey" FOREIGN KEY ("fk_chr_company_id") REFERENCES "tbl_company"("pk_chr_company_id") ON DELETE SET NULL ON UPDATE CASCADE;
