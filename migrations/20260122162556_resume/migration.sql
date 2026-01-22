/*
  Warnings:

  - You are about to drop the `_Resume_languages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Resume_languages" DROP CONSTRAINT "_Resume_languages_A_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_languages" DROP CONSTRAINT "_Resume_languages_B_fkey";

-- DropTable
DROP TABLE "_Resume_languages";

-- CreateTable
CREATE TABLE "_Resume_resumeLanguages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Resume_resumeLanguages_AB_unique" ON "_Resume_resumeLanguages"("A", "B");

-- CreateIndex
CREATE INDEX "_Resume_resumeLanguages_B_index" ON "_Resume_resumeLanguages"("B");

-- AddForeignKey
ALTER TABLE "_Resume_resumeLanguages" ADD CONSTRAINT "_Resume_resumeLanguages_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_resumeLanguages" ADD CONSTRAINT "_Resume_resumeLanguages_B_fkey" FOREIGN KEY ("B") REFERENCES "ResumeLanguage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
