/*
  Warnings:

  - You are about to drop the `_ResumeWork_highlights` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Resume_awards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Resume_education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Resume_interests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Resume_projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Resume_publications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Resume_references` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Resume_resumeLanguages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Resume_skills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Resume_volunteer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Resume_work` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[basicInformation]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_ResumeWork_highlights" DROP CONSTRAINT "_ResumeWork_highlights_A_fkey";

-- DropForeignKey
ALTER TABLE "_ResumeWork_highlights" DROP CONSTRAINT "_ResumeWork_highlights_B_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_awards" DROP CONSTRAINT "_Resume_awards_A_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_awards" DROP CONSTRAINT "_Resume_awards_B_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_education" DROP CONSTRAINT "_Resume_education_A_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_education" DROP CONSTRAINT "_Resume_education_B_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_interests" DROP CONSTRAINT "_Resume_interests_A_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_interests" DROP CONSTRAINT "_Resume_interests_B_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_projects" DROP CONSTRAINT "_Resume_projects_A_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_projects" DROP CONSTRAINT "_Resume_projects_B_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_publications" DROP CONSTRAINT "_Resume_publications_A_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_publications" DROP CONSTRAINT "_Resume_publications_B_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_references" DROP CONSTRAINT "_Resume_references_A_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_references" DROP CONSTRAINT "_Resume_references_B_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_resumeLanguages" DROP CONSTRAINT "_Resume_resumeLanguages_A_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_resumeLanguages" DROP CONSTRAINT "_Resume_resumeLanguages_B_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_skills" DROP CONSTRAINT "_Resume_skills_A_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_skills" DROP CONSTRAINT "_Resume_skills_B_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_volunteer" DROP CONSTRAINT "_Resume_volunteer_A_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_volunteer" DROP CONSTRAINT "_Resume_volunteer_B_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_work" DROP CONSTRAINT "_Resume_work_A_fkey";

-- DropForeignKey
ALTER TABLE "_Resume_work" DROP CONSTRAINT "_Resume_work_B_fkey";

-- DropIndex
DROP INDEX "Resume_basicInformation_idx";

-- AlterTable
ALTER TABLE "ResumeAward" ADD COLUMN     "resume" INTEGER;

-- AlterTable
ALTER TABLE "ResumeEducation" ADD COLUMN     "resume" INTEGER;

-- AlterTable
ALTER TABLE "ResumeHighlight" ADD COLUMN     "work" INTEGER;

-- AlterTable
ALTER TABLE "ResumeInterest" ADD COLUMN     "resume" INTEGER;

-- AlterTable
ALTER TABLE "ResumeLanguage" ADD COLUMN     "resume" INTEGER;

-- AlterTable
ALTER TABLE "ResumeProject" ADD COLUMN     "resume" INTEGER;

-- AlterTable
ALTER TABLE "ResumePublication" ADD COLUMN     "resume" INTEGER;

-- AlterTable
ALTER TABLE "ResumeReference" ADD COLUMN     "resume" INTEGER;

-- AlterTable
ALTER TABLE "ResumeSkill" ADD COLUMN     "resume" INTEGER;

-- AlterTable
ALTER TABLE "ResumeVolunteer" ADD COLUMN     "resume" INTEGER;

-- AlterTable
ALTER TABLE "ResumeWork" ADD COLUMN     "resume" INTEGER;

-- DropTable
DROP TABLE "_ResumeWork_highlights";

-- DropTable
DROP TABLE "_Resume_awards";

-- DropTable
DROP TABLE "_Resume_education";

-- DropTable
DROP TABLE "_Resume_interests";

-- DropTable
DROP TABLE "_Resume_projects";

-- DropTable
DROP TABLE "_Resume_publications";

-- DropTable
DROP TABLE "_Resume_references";

-- DropTable
DROP TABLE "_Resume_resumeLanguages";

-- DropTable
DROP TABLE "_Resume_skills";

-- DropTable
DROP TABLE "_Resume_volunteer";

-- DropTable
DROP TABLE "_Resume_work";

-- CreateIndex
CREATE UNIQUE INDEX "Resume_title_key" ON "Resume"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Resume_basicInformation_key" ON "Resume"("basicInformation");

-- CreateIndex
CREATE INDEX "ResumeAward_resume_idx" ON "ResumeAward"("resume");

-- CreateIndex
CREATE INDEX "ResumeEducation_resume_idx" ON "ResumeEducation"("resume");

-- CreateIndex
CREATE INDEX "ResumeHighlight_work_idx" ON "ResumeHighlight"("work");

-- CreateIndex
CREATE INDEX "ResumeInterest_resume_idx" ON "ResumeInterest"("resume");

-- CreateIndex
CREATE INDEX "ResumeLanguage_resume_idx" ON "ResumeLanguage"("resume");

-- CreateIndex
CREATE INDEX "ResumeProject_resume_idx" ON "ResumeProject"("resume");

-- CreateIndex
CREATE INDEX "ResumePublication_resume_idx" ON "ResumePublication"("resume");

-- CreateIndex
CREATE INDEX "ResumeReference_resume_idx" ON "ResumeReference"("resume");

-- CreateIndex
CREATE INDEX "ResumeSkill_resume_idx" ON "ResumeSkill"("resume");

-- CreateIndex
CREATE INDEX "ResumeVolunteer_resume_idx" ON "ResumeVolunteer"("resume");

-- CreateIndex
CREATE INDEX "ResumeWork_resume_idx" ON "ResumeWork"("resume");

-- AddForeignKey
ALTER TABLE "ResumeHighlight" ADD CONSTRAINT "ResumeHighlight_work_fkey" FOREIGN KEY ("work") REFERENCES "ResumeWork"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeWork" ADD CONSTRAINT "ResumeWork_resume_fkey" FOREIGN KEY ("resume") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeVolunteer" ADD CONSTRAINT "ResumeVolunteer_resume_fkey" FOREIGN KEY ("resume") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeEducation" ADD CONSTRAINT "ResumeEducation_resume_fkey" FOREIGN KEY ("resume") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeAward" ADD CONSTRAINT "ResumeAward_resume_fkey" FOREIGN KEY ("resume") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumePublication" ADD CONSTRAINT "ResumePublication_resume_fkey" FOREIGN KEY ("resume") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSkill" ADD CONSTRAINT "ResumeSkill_resume_fkey" FOREIGN KEY ("resume") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeLanguage" ADD CONSTRAINT "ResumeLanguage_resume_fkey" FOREIGN KEY ("resume") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeInterest" ADD CONSTRAINT "ResumeInterest_resume_fkey" FOREIGN KEY ("resume") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeReference" ADD CONSTRAINT "ResumeReference_resume_fkey" FOREIGN KEY ("resume") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeProject" ADD CONSTRAINT "ResumeProject_resume_fkey" FOREIGN KEY ("resume") REFERENCES "Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;
