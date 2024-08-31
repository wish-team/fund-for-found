/*
  Warnings:

  - Added the required column `photo` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag_line` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "photo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "tag_line" TEXT NOT NULL;
