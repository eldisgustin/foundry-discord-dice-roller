-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Actor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "owner" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "abilities" JSONB NOT NULL,
    "proficiencies" JSONB NOT NULL,
    "flags_hasjackofalltrades" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Actor" ("abilities", "alias", "avatar_url", "id", "level", "name", "owner", "proficiencies") SELECT "abilities", "alias", "avatar_url", "id", "level", "name", "owner", "proficiencies" FROM "Actor";
DROP TABLE "Actor";
ALTER TABLE "new_Actor" RENAME TO "Actor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
