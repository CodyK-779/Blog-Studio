/*
  Warnings:

  - The values [RandomShit] on the enum `Categories` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `image` on table `post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Categories_new" AS ENUM ('Cars', 'Foods', 'Games');
ALTER TABLE "post" ALTER COLUMN "categories" TYPE "Categories_new" USING ("categories"::text::"Categories_new");
ALTER TYPE "Categories" RENAME TO "Categories_old";
ALTER TYPE "Categories_new" RENAME TO "Categories";
DROP TYPE "Categories_old";
COMMIT;

-- AlterTable
ALTER TABLE "post" ALTER COLUMN "image" SET NOT NULL;
