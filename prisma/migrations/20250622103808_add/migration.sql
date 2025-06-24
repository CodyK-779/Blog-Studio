-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('Cars', 'Foods', 'Games');

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "categories" "Categories";
