-- CreateTable
CREATE TABLE "WorldcupComment" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "worldcupId" INTEGER NOT NULL,

    CONSTRAINT "WorldcupComment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorldcupComment" ADD CONSTRAINT "WorldcupComment_worldcupId_fkey" FOREIGN KEY ("worldcupId") REFERENCES "Worldcup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
