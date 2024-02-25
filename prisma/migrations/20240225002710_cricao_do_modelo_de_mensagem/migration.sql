-- CreateTable
CREATE TABLE "Conversations" (
    "id" TEXT NOT NULL,
    "accountOwnerId" TEXT NOT NULL,
    "friendEmail" TEXT NOT NULL,
    "messages" JSONB NOT NULL,

    CONSTRAINT "Conversations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Conversations_friendEmail_key" ON "Conversations"("friendEmail");

-- AddForeignKey
ALTER TABLE "Conversations" ADD CONSTRAINT "Conversations_accountOwnerId_fkey" FOREIGN KEY ("accountOwnerId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
