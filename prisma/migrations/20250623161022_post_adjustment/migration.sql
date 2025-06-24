/*
  Warnings:

  - You are about to drop the column `published` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `post` table. All the data in the column will be lost.
  - Added the required column `subTitle` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "published",
DROP COLUMN "subtitle",
ADD COLUMN     "subTitle" TEXT NOT NULL;
