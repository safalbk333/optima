/*
  Warnings:

  - A unique constraint covering the columns `[GST_number]` on the table `tbl_vendor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[PAN_number]` on the table `tbl_vendor` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `year_of_establishment` on the `tbl_vendor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `bank` on table `tbl_vendor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tbl_vendor" DROP COLUMN "year_of_establishment",
ADD COLUMN     "year_of_establishment" INTEGER NOT NULL,
ALTER COLUMN "bank" SET NOT NULL,
ALTER COLUMN "bank" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "tbl_vendor_document" (
    "pk_document_id" TEXT NOT NULL,
    "fk_vendor_id" TEXT NOT NULL,
    "document_type" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "original_file_name" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "mime_type" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_vendor_document_pkey" PRIMARY KEY ("pk_document_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_vendor_GST_number_key" ON "tbl_vendor"("GST_number");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_vendor_PAN_number_key" ON "tbl_vendor"("PAN_number");

-- AddForeignKey
ALTER TABLE "tbl_vendor_document" ADD CONSTRAINT "tbl_vendor_document_fk_vendor_id_fkey" FOREIGN KEY ("fk_vendor_id") REFERENCES "tbl_vendor"("pk_vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;
