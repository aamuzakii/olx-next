-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('HOURLY', 'FIXED');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('ENTRY', 'INTERMEDIATE', 'EXPERT');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "duration" TEXT,
ADD COLUMN     "experienceLevel" "ExperienceLevel",
ADD COLUMN     "fixedBudget" INTEGER,
ADD COLUMN     "maxRate" INTEGER,
ADD COLUMN     "minRate" INTEGER,
ADD COLUMN     "paymentType" "PaymentType",
ADD COLUMN     "weeklyHours" TEXT;
