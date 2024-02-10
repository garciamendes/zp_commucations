-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "created" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "modified" DATETIME
);

-- CreateTable
CREATE TABLE "Auth" (
    "email" TEXT NOT NULL,
    "password_hash" TEXT,
    "is_finish_auth" BOOLEAN DEFAULT false,
    "created" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "modified" DATETIME,
    CONSTRAINT "Auth_email_fkey" FOREIGN KEY ("email") REFERENCES "Account" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Auth_email_key" ON "Auth"("email");
