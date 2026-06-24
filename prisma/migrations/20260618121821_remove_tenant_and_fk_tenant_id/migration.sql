-- DropForeignKey
ALTER TABLE "tbl_user" DROP CONSTRAINT IF EXISTS "tbl_user_fk_tenant_id_fkey";

-- DropIndex
DROP INDEX IF EXISTS "tbl_user_fk_tenant_id_idx";

-- AlterTable
ALTER TABLE "tbl_user" DROP COLUMN IF EXISTS "fk_tenant_id";

-- DropTable
DROP TABLE IF EXISTS "tbl_tenant_registry";
