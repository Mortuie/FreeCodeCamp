-- CreateTable
CREATE TABLE "Sessions" (
    "sid" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_sid_key" ON "Sessions"("sid");
