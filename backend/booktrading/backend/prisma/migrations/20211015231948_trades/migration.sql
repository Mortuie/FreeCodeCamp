-- CreateEnum
CREATE TYPE "Status" AS ENUM ('INCOMPLETE', 'COMPLETE');

-- CreateTable
CREATE TABLE "Trades" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message" TEXT NOT NULL DEFAULT E'',
    "fromUserId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'INCOMPLETE',

    CONSTRAINT "Trades_pkey" PRIMARY KEY ("id")
);
