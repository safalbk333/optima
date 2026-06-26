/*
  Warnings:

  - You are about to drop the column `fk_tenant_id` on the `tbl_user` table. All the data in the column will be lost.
  - You are about to drop the `tbl_tenant_registry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_user_role_mapping` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hierarchy_level` to the `tbl_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_role_id` to the `tbl_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keycloak_id` to the `tbl_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tbl_user" DROP CONSTRAINT "tbl_user_fk_tenant_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_user_role_mapping" DROP CONSTRAINT "tbl_user_role_mapping_fk_created_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_user_role_mapping" DROP CONSTRAINT "tbl_user_role_mapping_fk_modified_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_user_role_mapping" DROP CONSTRAINT "tbl_user_role_mapping_fk_role_id_fkey";

-- DropForeignKey
ALTER TABLE "tbl_user_role_mapping" DROP CONSTRAINT "tbl_user_role_mapping_fk_user_id_fkey";

-- DropIndex
DROP INDEX "tbl_user_fk_tenant_id_idx";

-- AlterTable
ALTER TABLE "tbl_category" ADD COLUMN     "hierarchy_level" INTEGER NOT NULL,
ADD COLUMN     "parent_category_id" TEXT;

-- AlterTable
ALTER TABLE "tbl_user" DROP COLUMN "fk_tenant_id",
ADD COLUMN     "fk_role_id" TEXT NOT NULL,
ADD COLUMN     "keycloak_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "tbl_tenant_registry";

-- DropTable
DROP TABLE "tbl_user_role_mapping";

-- CreateIndex
CREATE INDEX "tbl_category_parent_category_id_idx" ON "tbl_category"("parent_category_id");

-- CreateIndex
CREATE INDEX "tbl_category_hierarchy_level_idx" ON "tbl_category"("hierarchy_level");

-- AddForeignKey
ALTER TABLE "tbl_user" ADD CONSTRAINT "tbl_user_fk_role_id_fkey" FOREIGN KEY ("fk_role_id") REFERENCES "tbl_user_role"("pk_role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_category" ADD CONSTRAINT "tbl_category_parent_category_id_fkey" FOREIGN KEY ("parent_category_id") REFERENCES "tbl_category"("pk_category_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
