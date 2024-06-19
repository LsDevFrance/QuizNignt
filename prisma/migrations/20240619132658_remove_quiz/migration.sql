/*
  Warnings:

  - You are about to drop the column `description` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "description",
DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "description",
DROP COLUMN "image";
