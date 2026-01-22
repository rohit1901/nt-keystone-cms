/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `Language` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "ResumeLocation" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL DEFAULT '',
    "postalCode" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT '',
    "countryCode" TEXT NOT NULL DEFAULT '',
    "region" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "ResumeLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeProfile" (
    "id" SERIAL NOT NULL,
    "network" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "ResumeProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeBasicInformation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "label" TEXT NOT NULL DEFAULT '',
    "image" INTEGER,
    "email" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "summary" TEXT NOT NULL DEFAULT '',
    "location" INTEGER,
    "language" INTEGER,

    CONSTRAINT "ResumeBasicInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeWork" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "position" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "summary" TEXT NOT NULL DEFAULT '',
    "highlights" TEXT,
    "image" INTEGER,
    "language" INTEGER,

    CONSTRAINT "ResumeWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeVolunteer" (
    "id" SERIAL NOT NULL,
    "organization" TEXT NOT NULL DEFAULT '',
    "position" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "summary" TEXT NOT NULL DEFAULT '',
    "highlights" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "ResumeVolunteer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeEducation" (
    "id" SERIAL NOT NULL,
    "institution" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "area" TEXT NOT NULL DEFAULT '',
    "studyType" TEXT NOT NULL DEFAULT '',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "score" TEXT NOT NULL DEFAULT '',
    "courses" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "ResumeEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeAward" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "date" TIMESTAMP(3),
    "awarder" TEXT NOT NULL DEFAULT '',
    "summary" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "ResumeAward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumePublication" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "publisher" TEXT NOT NULL DEFAULT '',
    "releaseDate" TIMESTAMP(3),
    "url" TEXT NOT NULL DEFAULT '',
    "summary" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "ResumePublication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeSkill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "level" TEXT,
    "keywords" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "ResumeSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeLanguage" (
    "id" SERIAL NOT NULL,
    "language" TEXT NOT NULL DEFAULT '',
    "fluency" TEXT,
    "uiLanguage" INTEGER,

    CONSTRAINT "ResumeLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeInterest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "keywords" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "ResumeInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeReference" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "reference" TEXT NOT NULL DEFAULT '',
    "language" INTEGER,

    CONSTRAINT "ResumeReference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeProject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "description" TEXT NOT NULL DEFAULT '',
    "highlights" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "image" INTEGER,
    "language" INTEGER,

    CONSTRAINT "ResumeProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "basicInformation" INTEGER,
    "language" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Resume_certificates" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ResumeBasicInformation_profiles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Resume_work" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Resume_volunteer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Resume_education" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Resume_awards" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Resume_publications" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Resume_skills" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Resume_languages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Resume_interests" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Resume_references" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Resume_projects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "ResumeLocation_language_idx" ON "ResumeLocation"("language");

-- CreateIndex
CREATE INDEX "ResumeProfile_language_idx" ON "ResumeProfile"("language");

-- CreateIndex
CREATE INDEX "ResumeBasicInformation_image_idx" ON "ResumeBasicInformation"("image");

-- CreateIndex
CREATE INDEX "ResumeBasicInformation_location_idx" ON "ResumeBasicInformation"("location");

-- CreateIndex
CREATE INDEX "ResumeBasicInformation_language_idx" ON "ResumeBasicInformation"("language");

-- CreateIndex
CREATE INDEX "ResumeWork_image_idx" ON "ResumeWork"("image");

-- CreateIndex
CREATE INDEX "ResumeWork_language_idx" ON "ResumeWork"("language");

-- CreateIndex
CREATE INDEX "ResumeVolunteer_language_idx" ON "ResumeVolunteer"("language");

-- CreateIndex
CREATE INDEX "ResumeEducation_language_idx" ON "ResumeEducation"("language");

-- CreateIndex
CREATE INDEX "ResumeAward_language_idx" ON "ResumeAward"("language");

-- CreateIndex
CREATE INDEX "ResumePublication_language_idx" ON "ResumePublication"("language");

-- CreateIndex
CREATE INDEX "ResumeSkill_language_idx" ON "ResumeSkill"("language");

-- CreateIndex
CREATE INDEX "ResumeLanguage_uiLanguage_idx" ON "ResumeLanguage"("uiLanguage");

-- CreateIndex
CREATE INDEX "ResumeInterest_language_idx" ON "ResumeInterest"("language");

-- CreateIndex
CREATE INDEX "ResumeReference_language_idx" ON "ResumeReference"("language");

-- CreateIndex
CREATE INDEX "ResumeProject_image_idx" ON "ResumeProject"("image");

-- CreateIndex
CREATE INDEX "ResumeProject_language_idx" ON "ResumeProject"("language");

-- CreateIndex
CREATE INDEX "Resume_basicInformation_idx" ON "Resume"("basicInformation");

-- CreateIndex
CREATE INDEX "Resume_language_idx" ON "Resume"("language");

-- CreateIndex
CREATE UNIQUE INDEX "_Resume_certificates_AB_unique" ON "_Resume_certificates"("A", "B");

-- CreateIndex
CREATE INDEX "_Resume_certificates_B_index" ON "_Resume_certificates"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ResumeBasicInformation_profiles_AB_unique" ON "_ResumeBasicInformation_profiles"("A", "B");

-- CreateIndex
CREATE INDEX "_ResumeBasicInformation_profiles_B_index" ON "_ResumeBasicInformation_profiles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Resume_work_AB_unique" ON "_Resume_work"("A", "B");

-- CreateIndex
CREATE INDEX "_Resume_work_B_index" ON "_Resume_work"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Resume_volunteer_AB_unique" ON "_Resume_volunteer"("A", "B");

-- CreateIndex
CREATE INDEX "_Resume_volunteer_B_index" ON "_Resume_volunteer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Resume_education_AB_unique" ON "_Resume_education"("A", "B");

-- CreateIndex
CREATE INDEX "_Resume_education_B_index" ON "_Resume_education"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Resume_awards_AB_unique" ON "_Resume_awards"("A", "B");

-- CreateIndex
CREATE INDEX "_Resume_awards_B_index" ON "_Resume_awards"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Resume_publications_AB_unique" ON "_Resume_publications"("A", "B");

-- CreateIndex
CREATE INDEX "_Resume_publications_B_index" ON "_Resume_publications"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Resume_skills_AB_unique" ON "_Resume_skills"("A", "B");

-- CreateIndex
CREATE INDEX "_Resume_skills_B_index" ON "_Resume_skills"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Resume_languages_AB_unique" ON "_Resume_languages"("A", "B");

-- CreateIndex
CREATE INDEX "_Resume_languages_B_index" ON "_Resume_languages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Resume_interests_AB_unique" ON "_Resume_interests"("A", "B");

-- CreateIndex
CREATE INDEX "_Resume_interests_B_index" ON "_Resume_interests"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Resume_references_AB_unique" ON "_Resume_references"("A", "B");

-- CreateIndex
CREATE INDEX "_Resume_references_B_index" ON "_Resume_references"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Resume_projects_AB_unique" ON "_Resume_projects"("A", "B");

-- CreateIndex
CREATE INDEX "_Resume_projects_B_index" ON "_Resume_projects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Language_label_key" ON "Language"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Language_value_key" ON "Language"("value");

-- AddForeignKey
ALTER TABLE "ResumeLocation" ADD CONSTRAINT "ResumeLocation_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeProfile" ADD CONSTRAINT "ResumeProfile_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeBasicInformation" ADD CONSTRAINT "ResumeBasicInformation_image_fkey" FOREIGN KEY ("image") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeBasicInformation" ADD CONSTRAINT "ResumeBasicInformation_location_fkey" FOREIGN KEY ("location") REFERENCES "ResumeLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeBasicInformation" ADD CONSTRAINT "ResumeBasicInformation_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeWork" ADD CONSTRAINT "ResumeWork_image_fkey" FOREIGN KEY ("image") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeWork" ADD CONSTRAINT "ResumeWork_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeVolunteer" ADD CONSTRAINT "ResumeVolunteer_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeEducation" ADD CONSTRAINT "ResumeEducation_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeAward" ADD CONSTRAINT "ResumeAward_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumePublication" ADD CONSTRAINT "ResumePublication_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSkill" ADD CONSTRAINT "ResumeSkill_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeLanguage" ADD CONSTRAINT "ResumeLanguage_uiLanguage_fkey" FOREIGN KEY ("uiLanguage") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeInterest" ADD CONSTRAINT "ResumeInterest_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeReference" ADD CONSTRAINT "ResumeReference_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeProject" ADD CONSTRAINT "ResumeProject_image_fkey" FOREIGN KEY ("image") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeProject" ADD CONSTRAINT "ResumeProject_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_basicInformation_fkey" FOREIGN KEY ("basicInformation") REFERENCES "ResumeBasicInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_language_fkey" FOREIGN KEY ("language") REFERENCES "Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_certificates" ADD CONSTRAINT "_Resume_certificates_A_fkey" FOREIGN KEY ("A") REFERENCES "Certification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_certificates" ADD CONSTRAINT "_Resume_certificates_B_fkey" FOREIGN KEY ("B") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResumeBasicInformation_profiles" ADD CONSTRAINT "_ResumeBasicInformation_profiles_A_fkey" FOREIGN KEY ("A") REFERENCES "ResumeBasicInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResumeBasicInformation_profiles" ADD CONSTRAINT "_ResumeBasicInformation_profiles_B_fkey" FOREIGN KEY ("B") REFERENCES "ResumeProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_work" ADD CONSTRAINT "_Resume_work_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_work" ADD CONSTRAINT "_Resume_work_B_fkey" FOREIGN KEY ("B") REFERENCES "ResumeWork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_volunteer" ADD CONSTRAINT "_Resume_volunteer_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_volunteer" ADD CONSTRAINT "_Resume_volunteer_B_fkey" FOREIGN KEY ("B") REFERENCES "ResumeVolunteer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_education" ADD CONSTRAINT "_Resume_education_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_education" ADD CONSTRAINT "_Resume_education_B_fkey" FOREIGN KEY ("B") REFERENCES "ResumeEducation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_awards" ADD CONSTRAINT "_Resume_awards_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_awards" ADD CONSTRAINT "_Resume_awards_B_fkey" FOREIGN KEY ("B") REFERENCES "ResumeAward"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_publications" ADD CONSTRAINT "_Resume_publications_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_publications" ADD CONSTRAINT "_Resume_publications_B_fkey" FOREIGN KEY ("B") REFERENCES "ResumePublication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_skills" ADD CONSTRAINT "_Resume_skills_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_skills" ADD CONSTRAINT "_Resume_skills_B_fkey" FOREIGN KEY ("B") REFERENCES "ResumeSkill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_languages" ADD CONSTRAINT "_Resume_languages_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_languages" ADD CONSTRAINT "_Resume_languages_B_fkey" FOREIGN KEY ("B") REFERENCES "ResumeLanguage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_interests" ADD CONSTRAINT "_Resume_interests_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_interests" ADD CONSTRAINT "_Resume_interests_B_fkey" FOREIGN KEY ("B") REFERENCES "ResumeInterest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_references" ADD CONSTRAINT "_Resume_references_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_references" ADD CONSTRAINT "_Resume_references_B_fkey" FOREIGN KEY ("B") REFERENCES "ResumeReference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_projects" ADD CONSTRAINT "_Resume_projects_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Resume_projects" ADD CONSTRAINT "_Resume_projects_B_fkey" FOREIGN KEY ("B") REFERENCES "ResumeProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
