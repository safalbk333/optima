-- DropForeignKey
ALTER TABLE "tbl_goods_receipt" DROP CONSTRAINT IF EXISTS "tbl_goods_receipt_fk_chr_request_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_goods_receipt" DROP CONSTRAINT IF EXISTS "tbl_goods_receipt_fk_chr_vendor_id_fkey";

-- DropIndex
DROP INDEX IF EXISTS "tbl_goods_receipt_fk_chr_request_id_idx";

-- DropIndex
DROP INDEX IF EXISTS "tbl_goods_receipt_fk_chr_vendor_id_idx";

-- AlterTable
ALTER TABLE "tbl_goods_receipt" DROP COLUMN IF EXISTS "fk_chr_request_id";
ALTER TABLE "tbl_goods_receipt" DROP COLUMN IF EXISTS "fk_chr_vendor_id";
