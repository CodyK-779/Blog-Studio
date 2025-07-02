/*
  Warnings:

  - You are about to drop the column `imageHeight` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `imageWidth` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "imageHeight",
DROP COLUMN "imageWidth";
