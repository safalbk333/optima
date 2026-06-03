-- AlterTable
ALTER TABLE "tbl_contract" ADD COLUMN     "chr_contract_code" TEXT;

-- CreateTable
CREATE TABLE "tbl_shipment" (
    "pk_chr_shipment_id" TEXT NOT NULL,
    "fk_po_number" TEXT NOT NULL,
    "fk_chr_vendor_id" TEXT NOT NULL,
    "chr_asn_id" TEXT NOT NULL,
    "dt_dispatch_date" TIMESTAMP(3) NOT NULL,
    "dt_delivery_date" TIMESTAMP(3) NOT NULL,
    "chr_logistics_provider" TEXT NOT NULL,
    "fk_chr_tracking_no" TEXT NOT NULL,
    "int_quantity" INTEGER NOT NULL,
    "int_status" INTEGER NOT NULL,
    "chr_notes" TEXT,
    "chr_documents" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_shipment_pkey" PRIMARY KEY ("pk_chr_shipment_id")
);

-- CreateTable
CREATE TABLE "tbl_shipment_tracking" (
    "pk_chr_shipment_tracking_id" TEXT NOT NULL,
    "chr_order_id" TEXT NOT NULL,
    "chr_courier_person_name" TEXT NOT NULL,
    "chr_courier_person_phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_shipment_tracking_pkey" PRIMARY KEY ("pk_chr_shipment_tracking_id")
);

-- CreateTable
CREATE TABLE "_tbl_goods_receiptTotbl_shipment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_shipment_chr_asn_id_key" ON "tbl_shipment"("chr_asn_id");

-- CreateIndex
CREATE UNIQUE INDEX "_tbl_goods_receiptTotbl_shipment_AB_unique" ON "_tbl_goods_receiptTotbl_shipment"("A", "B");

-- CreateIndex
CREATE INDEX "_tbl_goods_receiptTotbl_shipment_B_index" ON "_tbl_goods_receiptTotbl_shipment"("B");

-- AddForeignKey
ALTER TABLE "tbl_shipment" ADD CONSTRAINT "tbl_shipment_fk_chr_vendor_id_fkey" FOREIGN KEY ("fk_chr_vendor_id") REFERENCES "tbl_vendor"("pk_chr_vendor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_shipment" ADD CONSTRAINT "tbl_shipment_fk_chr_tracking_no_fkey" FOREIGN KEY ("fk_chr_tracking_no") REFERENCES "tbl_shipment_tracking"("pk_chr_shipment_tracking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tbl_goods_receiptTotbl_shipment" ADD CONSTRAINT "_tbl_goods_receiptTotbl_shipment_A_fkey" FOREIGN KEY ("A") REFERENCES "tbl_goods_receipt"("pk_chr_goods_receipt_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tbl_goods_receiptTotbl_shipment" ADD CONSTRAINT "_tbl_goods_receiptTotbl_shipment_B_fkey" FOREIGN KEY ("B") REFERENCES "tbl_shipment"("pk_chr_shipment_id") ON DELETE CASCADE ON UPDATE CASCADE;
