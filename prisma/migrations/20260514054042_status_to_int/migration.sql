/*
  Warnings:

  - Changed the type of `status` on the `Quotation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
-- Delete existing data
DELETE FROM "Quotation";

-- Change column type
ALTER TABLE "Quotation"
DROP COLUMN "status",
ADD COLUMN "status" INTEGER NOT NULL;
