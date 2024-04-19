/*
  Warnings:

  - You are about to drop the column `messages` on the `Conversations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Conversations" DROP COLUMN "messages";

-- CreateTable
CREATE TABLE "Messages" (
    "id" TEXT NOT NULL,
    "conversationsId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Messages_email_idx" ON "Messages"("email");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_conversationsId_fkey" FOREIGN KEY ("conversationsId") REFERENCES "Conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
