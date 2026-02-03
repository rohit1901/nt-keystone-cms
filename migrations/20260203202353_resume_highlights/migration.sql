/*
  Warnings:

  - You are about to drop the column `highlights` on the `ResumeWork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ResumeWork" DROP COLUMN "highlights";

-- CreateTable
CREATE TABLE "ResumeHighlight" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "ResumeHighlight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ResumeWork_highlights" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ResumeWork_highlights_AB_unique" ON "_ResumeWork_highlights"("A", "B");

-- CreateIndex
CREATE INDEX "_ResumeWork_highlights_B_index" ON "_ResumeWork_highlights"("B");

-- AddForeignKey
ALTER TABLE "_ResumeWork_highlights" ADD CONSTRAINT "_ResumeWork_highlights_A_fkey" FOREIGN KEY ("A") REFERENCES "ResumeHighlight"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResumeWork_highlights" ADD CONSTRAINT "_ResumeWork_highlights_B_fkey" FOREIGN KEY ("B") REFERENCES "ResumeWork"("id") ON DELETE CASCADE ON UPDATE CASCADE;
