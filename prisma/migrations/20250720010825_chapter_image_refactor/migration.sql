/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_chapterId_fkey";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "ChapterImage" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "chapterId" TEXT NOT NULL,

    CONSTRAINT "ChapterImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChapterImage" ADD CONSTRAINT "ChapterImage_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
