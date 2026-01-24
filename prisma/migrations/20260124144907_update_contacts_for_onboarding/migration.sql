-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alias" TEXT,
    "whatsappId" TEXT NOT NULL,
    "age" INTEGER,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "onboardingStep" TEXT NOT NULL DEFAULT 'NONE',
    "isMe" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Contact" ("alias", "createdAt", "id", "isMe", "whatsappId") SELECT "alias", "createdAt", "id", "isMe", "whatsappId" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
CREATE UNIQUE INDEX "Contact_alias_key" ON "Contact"("alias");
CREATE UNIQUE INDEX "Contact_whatsappId_key" ON "Contact"("whatsappId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
