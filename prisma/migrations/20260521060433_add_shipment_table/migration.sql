-- CreateTable
CREATE TABLE "Shipment" (
    "id" TEXT NOT NULL,
    "po_no" TEXT NOT NULL,
    "vendor_id" TEXT NOT NULL,
    "asn_id" TEXT NOT NULL,
    "dispatch_date" TIMESTAMP(3) NOT NULL,
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "logistics_provider" TEXT NOT NULL,
    "tracking_no" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "documents" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShipmentTracking" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "courier_person_name" TEXT NOT NULL,
    "courier_person_phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShipmentTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GRN" (
    "id" TEXT NOT NULL,
    "po_no" TEXT NOT NULL,
    "receiver" TEXT NOT NULL,
    "asn_id" TEXT NOT NULL,
    "received_date" TIMESTAMP(3) NOT NULL,
    "warehouse_name" TEXT NOT NULL,
    "received_quantity" INTEGER NOT NULL,
    "accepted_quantity" INTEGER NOT NULL,
    "rejected_quantity" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GRN_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_asn_id_key" ON "Shipment"("asn_id");

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_tracking_no_fkey" FOREIGN KEY ("tracking_no") REFERENCES "ShipmentTracking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GRN" ADD CONSTRAINT "GRN_asn_id_fkey" FOREIGN KEY ("asn_id") REFERENCES "Shipment"("asn_id") ON DELETE CASCADE ON UPDATE CASCADE;
