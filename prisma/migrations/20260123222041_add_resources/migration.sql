-- CreateTable
CREATE TABLE "Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alias" TEXT NOT NULL,
    "whatsappId" TEXT NOT NULL,
    "isMe" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Camera" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "frigateName" TEXT NOT NULL,
    "description" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_alias_key" ON "Contact"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_whatsappId_key" ON "Contact"("whatsappId");

-- CreateIndex
CREATE UNIQUE INDEX "Camera_name_key" ON "Camera"("name");
