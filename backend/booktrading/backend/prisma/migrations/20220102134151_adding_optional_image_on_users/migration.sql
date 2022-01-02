-- AlterTable
ALTER TABLE "Books" ALTER COLUMN "image" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "image" TEXT;
