/*
  Warnings:

  - Added the required column `sac_code` to the `tbl_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_item" ADD COLUMN     "hsn_code" TEXT,
ADD COLUMN     "sac_code" TEXT NOT NULL,
ALTER COLUMN "is_active" SET DEFAULT true;
