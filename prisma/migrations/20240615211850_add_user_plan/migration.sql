-- CreateEnum
CREATE TYPE "UserPlan" AS ENUM ('FREE', 'PREMIUM', 'ULTIMATE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastname" TEXT,
ADD COLUMN     "plan" "UserPlan" NOT NULL DEFAULT 'FREE';
