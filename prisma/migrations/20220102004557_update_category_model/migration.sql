-- AlterTable
ALTER TABLE "BookCategory" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wasPicked" BOOLEAN NOT NULL DEFAULT false;
