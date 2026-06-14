-- CreateTable
CREATE TABLE "Actor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "owner" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "abilities" JSONB NOT NULL,
    "proficiencies" JSONB NOT NULL
);
