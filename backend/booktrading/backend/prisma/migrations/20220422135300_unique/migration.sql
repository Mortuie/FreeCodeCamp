/*
  Warnings:

  - A unique constraint covering the columns `[fromBookId,fromUserId,toBookId,toUserId]` on the table `Trades` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Trades_fromBookId_fromUserId_toBookId_toUserId_key" ON "Trades"("fromBookId", "fromUserId", "toBookId", "toUserId");

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
