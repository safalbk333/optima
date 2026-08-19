/*
  Warnings:

  - Added the required column `request_type` to the `tbl_purchase_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_purchase_request" ADD COLUMN     "request_type" TEXT NOT NULL;
