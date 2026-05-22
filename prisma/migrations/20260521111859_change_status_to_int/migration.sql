/*
  Warnings:

  - Changed the type of `status` on the `GRN` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Shipment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GRN"
ALTER COLUMN "status" TYPE INTEGER
USING ("status"::INTEGER);

-- AlterTable
ALTER TABLE "Shipment"
ALTER COLUMN "status" TYPE INTEGER
USING ("status"::INTEGER);
