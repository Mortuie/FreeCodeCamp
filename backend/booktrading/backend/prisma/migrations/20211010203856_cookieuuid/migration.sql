/*
  Warnings:

  - You are about to drop the column `sid` on the `Sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cookieUuid]` on the table `Sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Sessions_sid_key";

-- AlterTable
ALTER TABLE "Sessions" DROP COLUMN "sid",
ADD COLUMN     "cookieUuid" TEXT NOT NULL DEFAULT E'asd';

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_cookieUuid_key" ON "Sessions"("cookieUuid");
