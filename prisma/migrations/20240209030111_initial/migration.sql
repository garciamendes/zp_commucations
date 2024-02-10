/*
  Warnings:

  - You are about to drop the `Auth` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN "is_finish_auth" BOOLEAN DEFAULT false;
ALTER TABLE "Account" ADD COLUMN "password_hash" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Auth";
PRAGMA foreign_keys=on;
