-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "created" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "modified" DATETIME,
    "password_hash" TEXT,
    "is_finish_auth" BOOLEAN DEFAULT false,
    "selfAccountId" TEXT,
    CONSTRAINT "Account_selfAccountId_fkey" FOREIGN KEY ("selfAccountId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("avatar", "created", "email", "id", "is_finish_auth", "modified", "name", "password_hash") SELECT "avatar", "created", "email", "id", "is_finish_auth", "modified", "name", "password_hash" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
