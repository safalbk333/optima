/*
  Warnings:

  - Added the required column `fk_state_id` to the `tbl_city` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_city" ADD COLUMN     "fk_state_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "tbl_city" ADD CONSTRAINT "tbl_city_fk_state_id_fkey" FOREIGN KEY ("fk_state_id") REFERENCES "tbl_state"("pk_state_id") ON DELETE RESTRICT ON UPDATE CASCADE;
