/*
  Warnings:

  - Made the column `expiresAt` on table `Sessions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Sessions" ALTER COLUMN "expiresAt" SET NOT NULL;
