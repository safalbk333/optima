-- AlterTable
ALTER TABLE "tbl_goods_receipt" ADD COLUMN     "txt_rendered_html" TEXT;

-- AlterTable
ALTER TABLE "tbl_invoice" ADD COLUMN     "txt_rendered_html" TEXT;

-- AlterTable
ALTER TABLE "tbl_purchase_order" ADD COLUMN     "txt_rendered_html" TEXT;

-- AlterTable
ALTER TABLE "tbl_quotation" ADD COLUMN     "txt_rendered_html" TEXT;

-- AlterTable
ALTER TABLE "tbl_quotation_item" ADD COLUMN     "txt_rendered_html" TEXT;

-- AlterTable
ALTER TABLE "tbl_request_for_quotation" ADD COLUMN     "txt_rendered_html" TEXT;

-- CreateTable
CREATE TABLE "tbl_templates" (
    "pk_chr_template_id" TEXT NOT NULL,
    "chr_template_code" TEXT NOT NULL,
    "chr_template_name" TEXT NOT NULL,
    "chr_document_type" TEXT NOT NULL,
    "txt_html_content" TEXT NOT NULL,
    "bln_is_active" BOOLEAN NOT NULL DEFAULT true,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'N',

    CONSTRAINT "tbl_templates_pkey" PRIMARY KEY ("pk_chr_template_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_templates_chr_template_code_key" ON "tbl_templates"("chr_template_code");

-- CreateIndex
CREATE INDEX "tbl_templates_chr_template_code_idx" ON "tbl_templates"("chr_template_code");

-- CreateIndex
CREATE INDEX "tbl_templates_chr_document_type_idx" ON "tbl_templates"("chr_document_type");

-- CreateIndex
CREATE INDEX "tbl_templates_bln_is_active_idx" ON "tbl_templates"("bln_is_active");
