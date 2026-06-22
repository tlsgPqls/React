-- CreateTable
CREATE TABLE "Worldcup" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Worldcup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorldcupItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "winCount" INTEGER NOT NULL DEFAULT 0,
    "matchCount" INTEGER NOT NULL DEFAULT 0,
    "worldcupId" INTEGER NOT NULL,

    CONSTRAINT "WorldcupItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorldcupItem" ADD CONSTRAINT "WorldcupItem_worldcupId_fkey" FOREIGN KEY ("worldcupId") REFERENCES "Worldcup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
