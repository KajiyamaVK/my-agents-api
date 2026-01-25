/*
  Warnings:

  - Added the required column `telegramChatId` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alias" TEXT,
    "whatsappId" TEXT,
    "telegramChatId" TEXT NOT NULL,
    "age" INTEGER,
    "description" TEXT,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "onboardingStep" TEXT NOT NULL DEFAULT 'NONE',
    "isMe" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Contact" ("age", "alias", "createdAt", "id", "isApproved", "isMe", "onboardingStep", "whatsappId") SELECT "age", "alias", "createdAt", "id", "isApproved", "isMe", "onboardingStep", "whatsappId" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
CREATE UNIQUE INDEX "Contact_whatsappId_key" ON "Contact"("whatsappId");
CREATE UNIQUE INDEX "Contact_telegramChatId_key" ON "Contact"("telegramChatId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
