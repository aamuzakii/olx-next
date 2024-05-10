/*
  Warnings:

  - You are about to drop the column `Deleted` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `Published` on the `House` table. All the data in the column will be lost.
  - You are about to drop the column `PublishedStr` on the `House` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "House" DROP COLUMN "Deleted",
DROP COLUMN "Published",
DROP COLUMN "PublishedStr",
ADD COLUMN     "deleted" BOOLEAN,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "published" TIMESTAMP(3),
ADD COLUMN     "publishedStr" TEXT;
