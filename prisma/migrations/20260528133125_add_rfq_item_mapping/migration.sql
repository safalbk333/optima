-- AlterTable
ALTER TABLE "tbl_activations" ALTER COLUMN "chr_document_status" SET DEFAULT 'N';

-- AlterTable
ALTER TABLE "tbl_approval_level" ALTER COLUMN "chr_document_status" SET DEFAULT 'N';

-- AlterTable
ALTER TABLE "tbl_category" ALTER COLUMN "chr_document_status" SET DEFAULT 'D';

-- AlterTable
ALTER TABLE "tbl_country" ALTER COLUMN "chr_document_status" SET DEFAULT 'N';

-- AlterTable
ALTER TABLE "tbl_notification_type" ALTER COLUMN "chr_document_status" SET DEFAULT 'N';

-- AlterTable
ALTER TABLE "tbl_priority" ALTER COLUMN "chr_document_status" SET DEFAULT 'N';

-- AlterTable
ALTER TABLE "tbl_request_for_quotation" ALTER COLUMN "chr_document_status" SET DEFAULT 'N';

-- AlterTable
ALTER TABLE "tbl_request_phase" ALTER COLUMN "chr_document_status" SET DEFAULT 'N';

-- AlterTable
ALTER TABLE "tbl_request_status" ALTER COLUMN "chr_document_status" SET DEFAULT 'N';

-- AlterTable
ALTER TABLE "tbl_sla_policy" ALTER COLUMN "chr_document_status" SET DEFAULT 'N';

-- AlterTable
ALTER TABLE "tbl_tenant_registry" ALTER COLUMN "chr_document_status" SET DEFAULT 'N';

-- AlterTable
ALTER TABLE "tbl_user" ALTER COLUMN "chr_document_status" SET DEFAULT 'N';

-- AlterTable
ALTER TABLE "tbl_user_role" ALTER COLUMN "chr_document_status" SET DEFAULT 'N';

-- AlterTable
ALTER TABLE "tbl_user_role_mapping" ALTER COLUMN "chr_document_status" SET DEFAULT 'N';

-- AlterTable
ALTER TABLE "tbl_vendor_items" ALTER COLUMN "chr_document_status" SET DEFAULT 'N';

-- CreateTable
CREATE TABLE "tbl_rfq_item_mapping" (
    "pk_chr_rfq_item_mapping_id" TEXT NOT NULL,
    "fk_chr_rfq_id" TEXT NOT NULL,
    "fk_chr_item_id" TEXT NOT NULL,
    "chr_item_description" TEXT NOT NULL,
    "int_quantity" INTEGER NOT NULL,
    "chr_unit_of_measure" TEXT,
    "flt_estimated_unit_price" DOUBLE PRECISION,
    "flt_total_price" DOUBLE PRECISION,
    "txt_notes" TEXT,
    "tim_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tim_modified" TIMESTAMP(3),
    "fk_chr_created_id" TEXT,
    "fk_chr_modified_id" TEXT,
    "chr_document_status" CHAR(1) NOT NULL DEFAULT 'D',

    CONSTRAINT "tbl_rfq_item_mapping_pkey" PRIMARY KEY ("pk_chr_rfq_item_mapping_id")
);

-- CreateIndex
CREATE INDEX "tbl_rfq_item_mapping_fk_chr_rfq_id_idx" ON "tbl_rfq_item_mapping"("fk_chr_rfq_id");

-- CreateIndex
CREATE INDEX "tbl_rfq_item_mapping_fk_chr_item_id_idx" ON "tbl_rfq_item_mapping"("fk_chr_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_rfq_item_mapping_fk_chr_rfq_id_fk_chr_item_id_key" ON "tbl_rfq_item_mapping"("fk_chr_rfq_id", "fk_chr_item_id");

-- AddForeignKey
ALTER TABLE "tbl_rfq_item_mapping" ADD CONSTRAINT "tbl_rfq_item_mapping_fk_chr_rfq_id_fkey" FOREIGN KEY ("fk_chr_rfq_id") REFERENCES "tbl_request_for_quotation"("pk_chr_rfq_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_rfq_item_mapping" ADD CONSTRAINT "tbl_rfq_item_mapping_fk_chr_item_id_fkey" FOREIGN KEY ("fk_chr_item_id") REFERENCES "tbl_item"("pk_chr_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_rfq_item_mapping" ADD CONSTRAINT "tbl_rfq_item_mapping_fk_chr_created_id_fkey" FOREIGN KEY ("fk_chr_created_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_rfq_item_mapping" ADD CONSTRAINT "tbl_rfq_item_mapping_fk_chr_modified_id_fkey" FOREIGN KEY ("fk_chr_modified_id") REFERENCES "tbl_user"("pk_chr_user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
