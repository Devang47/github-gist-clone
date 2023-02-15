/*
  Warnings:

  - The primary key for the `Gist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `slug` to the `Gist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Gist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `Gist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userid" TEXT NOT NULL,
    CONSTRAINT "Gist_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Gist" ("body", "id", "title") SELECT "body", "id", "title" FROM "Gist";
DROP TABLE "Gist";
ALTER TABLE "new_Gist" RENAME TO "Gist";
CREATE UNIQUE INDEX "Gist_slug_key" ON "Gist"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
