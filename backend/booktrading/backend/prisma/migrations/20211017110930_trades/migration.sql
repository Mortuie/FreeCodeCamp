/*
  Warnings:

  - Added the required column `fromBookId` to the `Trades` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toBookId` to the `Trades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trades" ADD COLUMN     "fromBookId" INTEGER NOT NULL,
ADD COLUMN     "toBookId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Trades" ADD CONSTRAINT "Trades_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trades" ADD CONSTRAINT "Trades_fromBookId_fkey" FOREIGN KEY ("fromBookId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trades" ADD CONSTRAINT "Trades_toBookId_fkey" FOREIGN KEY ("toBookId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trades" ADD CONSTRAINT "Trades_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
