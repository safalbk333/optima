/*
  Warnings:

  - You are about to drop the column `from_amount` on the `tbl_approval_level` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `tbl_approval_level` table. All the data in the column will be lost.
  - You are about to drop the column `to_amount` on the `tbl_approval_level` table. All the data in the column will be lost.
  - Added the required column `approver_roles` to the `tbl_approval_level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_amount` to the `tbl_approval_level` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_approval_level" DROP COLUMN "from_amount",
DROP COLUMN "order",
DROP COLUMN "to_amount",
ADD COLUMN     "approver_roles" JSONB NOT NULL,
ADD COLUMN     "max_amount" DECIMAL(65,30),
ADD COLUMN     "min_amount" DECIMAL(65,30) NOT NULL;
