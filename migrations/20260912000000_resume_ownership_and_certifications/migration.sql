BEGIN;

-- Move Resume -> ResumeBasicInformation one-to-one ownership onto the child so
-- deleting a Resume can cascade through its aggregate.
ALTER TABLE "ResumeBasicInformation" ADD COLUMN "resume" INTEGER;
UPDATE "ResumeBasicInformation" AS basic
SET "resume" = resume."id"
FROM "Resume" AS resume
WHERE resume."basicInformation" = basic."id";

-- Move ResumeBasicInformation -> ResumeLocation ownership onto ResumeLocation.
-- Existing shared locations are duplicated so each basic-information row owns
-- an independent location before the old relation is removed.
ALTER TABLE "ResumeLocation" ADD COLUMN "basicInformation" INTEGER;
WITH ranked_locations AS (
  SELECT
    basic."id" AS "basicInformationId",
    basic."location" AS "locationId",
    ROW_NUMBER() OVER (
      PARTITION BY basic."location"
      ORDER BY basic."id"
    ) AS position
  FROM "ResumeBasicInformation" AS basic
  WHERE basic."location" IS NOT NULL
)
UPDATE "ResumeLocation" AS location
SET "basicInformation" = ranked."basicInformationId"
FROM ranked_locations AS ranked
WHERE ranked."locationId" = location."id"
  AND ranked.position = 1;

INSERT INTO "ResumeLocation" (
  "address",
  "postalCode",
  "city",
  "countryCode",
  "region",
  "language",
  "basicInformation"
)
SELECT
  location."address",
  location."postalCode",
  location."city",
  location."countryCode",
  location."region",
  location."language",
  ranked."basicInformationId"
FROM (
  SELECT
    basic."id" AS "basicInformationId",
    basic."location" AS "locationId",
    ROW_NUMBER() OVER (
      PARTITION BY basic."location"
      ORDER BY basic."id"
    ) AS position
  FROM "ResumeBasicInformation" AS basic
  WHERE basic."location" IS NOT NULL
) AS ranked
JOIN "ResumeLocation" AS location ON location."id" = ranked."locationId"
WHERE ranked.position > 1;

-- Convert profile many-to-many links into owned one-to-many rows. Existing
-- shared profiles are duplicated to preserve each basic-information relation.
ALTER TABLE "ResumeProfile" ADD COLUMN "basicInformation" INTEGER;
WITH ranked_profiles AS (
  SELECT
    links."A" AS "basicInformationId",
    links."B" AS "profileId",
    ROW_NUMBER() OVER (
      PARTITION BY links."B"
      ORDER BY links."A"
    ) AS position
  FROM "_ResumeBasicInformation_profiles" AS links
)
UPDATE "ResumeProfile" AS profile
SET "basicInformation" = ranked."basicInformationId"
FROM ranked_profiles AS ranked
WHERE ranked."profileId" = profile."id"
  AND ranked.position = 1;

INSERT INTO "ResumeProfile" (
  "network",
  "username",
  "url",
  "language",
  "basicInformation"
)
SELECT
  profile."network",
  profile."username",
  profile."url",
  profile."language",
  ranked."basicInformationId"
FROM (
  SELECT
    links."A" AS "basicInformationId",
    links."B" AS "profileId",
    ROW_NUMBER() OVER (
      PARTITION BY links."B"
      ORDER BY links."A"
    ) AS position
  FROM "_ResumeBasicInformation_profiles" AS links
) AS ranked
JOIN "ResumeProfile" AS profile ON profile."id" = ranked."profileId"
WHERE ranked.position > 1;

-- Replace implicit Resume <-> Certification sharing with holder-specific
-- achievement records. Existing proof links move only to Rohit fixtures;
-- other holders retain the global definition without claiming that proof URL.
CREATE TABLE "ResumeCertification" (
  "id" SERIAL NOT NULL,
  "credentialUrl" TEXT NOT NULL DEFAULT '',
  "certification" INTEGER,
  "resume" INTEGER,
  CONSTRAINT "ResumeCertification_pkey" PRIMARY KEY ("id")
);

INSERT INTO "ResumeCertification" (
  "credentialUrl",
  "certification",
  "resume"
)
SELECT
  CASE
    WHEN resume."title" LIKE 'Rohit Khanduri%'
      THEN certification."link"
    ELSE ''
  END,
  links."A",
  links."B"
FROM "_Resume_certificates" AS links
JOIN "Certification" AS certification ON certification."id" = links."A"
JOIN "Resume" AS resume ON resume."id" = links."B";

UPDATE "Certification"
SET "link" = ''
WHERE "link" IN (
  'https://www.credly.com/badges/6d371de7-680e-4230-9b42-fc593fc4a87e/public_url',
  'https://app.skillsclub.com/credential/28340-f57d08ae92c30e28a0c2850516e8fec9616ac7473feba42e7c4a2e62585c44c0?locale=en&badge=true',
  'https://d1ljophloyhryl.cloudfront.net/assets/certifications/2402-CPSAAL-003-EN.pdf',
  'https://www.apollographql.com/tutorials/certifications/3ad7e4dd-4b29-46f2-8e65-6e5706e0c067',
  'https://www.apollographql.com/tutorials/certifications/d5356f71-0760-4701-ae67-8b56c425c89a',
  'https://d1ljophloyhryl.cloudfront.net/assets/certifications/foundations.git.kraken.2022.10.11.pdf'
);

-- Replace old ownership constraints only after all data has been copied.
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_basicInformation_fkey";
ALTER TABLE "ResumeBasicInformation" DROP CONSTRAINT "ResumeBasicInformation_location_fkey";
ALTER TABLE "ResumeAward" DROP CONSTRAINT "ResumeAward_resume_fkey";
ALTER TABLE "ResumeEducation" DROP CONSTRAINT "ResumeEducation_resume_fkey";
ALTER TABLE "ResumeHighlight" DROP CONSTRAINT "ResumeHighlight_work_fkey";
ALTER TABLE "ResumeInterest" DROP CONSTRAINT "ResumeInterest_resume_fkey";
ALTER TABLE "ResumeLanguage" DROP CONSTRAINT "ResumeLanguage_resume_fkey";
ALTER TABLE "ResumeProject" DROP CONSTRAINT "ResumeProject_resume_fkey";
ALTER TABLE "ResumePublication" DROP CONSTRAINT "ResumePublication_resume_fkey";
ALTER TABLE "ResumeReference" DROP CONSTRAINT "ResumeReference_resume_fkey";
ALTER TABLE "ResumeSkill" DROP CONSTRAINT "ResumeSkill_resume_fkey";
ALTER TABLE "ResumeVolunteer" DROP CONSTRAINT "ResumeVolunteer_resume_fkey";
ALTER TABLE "ResumeWork" DROP CONSTRAINT "ResumeWork_resume_fkey";

DROP INDEX "Resume_basicInformation_key";
DROP INDEX "ResumeBasicInformation_location_idx";
ALTER TABLE "Resume" DROP COLUMN "basicInformation";
ALTER TABLE "ResumeBasicInformation" DROP COLUMN "location";
DROP TABLE "_ResumeBasicInformation_profiles";
DROP TABLE "_Resume_certificates";

CREATE UNIQUE INDEX "ResumeBasicInformation_resume_key"
  ON "ResumeBasicInformation"("resume");
CREATE UNIQUE INDEX "ResumeLocation_basicInformation_key"
  ON "ResumeLocation"("basicInformation");
CREATE INDEX "ResumeProfile_basicInformation_idx"
  ON "ResumeProfile"("basicInformation");
CREATE INDEX "ResumeCertification_certification_idx"
  ON "ResumeCertification"("certification");
CREATE INDEX "ResumeCertification_resume_idx"
  ON "ResumeCertification"("resume");

ALTER TABLE "ResumeLocation"
  ADD CONSTRAINT "ResumeLocation_basicInformation_fkey"
  FOREIGN KEY ("basicInformation") REFERENCES "ResumeBasicInformation"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeProfile"
  ADD CONSTRAINT "ResumeProfile_basicInformation_fkey"
  FOREIGN KEY ("basicInformation") REFERENCES "ResumeBasicInformation"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeBasicInformation"
  ADD CONSTRAINT "ResumeBasicInformation_resume_fkey"
  FOREIGN KEY ("resume") REFERENCES "Resume"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeHighlight"
  ADD CONSTRAINT "ResumeHighlight_work_fkey"
  FOREIGN KEY ("work") REFERENCES "ResumeWork"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeWork"
  ADD CONSTRAINT "ResumeWork_resume_fkey"
  FOREIGN KEY ("resume") REFERENCES "Resume"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeVolunteer"
  ADD CONSTRAINT "ResumeVolunteer_resume_fkey"
  FOREIGN KEY ("resume") REFERENCES "Resume"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeEducation"
  ADD CONSTRAINT "ResumeEducation_resume_fkey"
  FOREIGN KEY ("resume") REFERENCES "Resume"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeAward"
  ADD CONSTRAINT "ResumeAward_resume_fkey"
  FOREIGN KEY ("resume") REFERENCES "Resume"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumePublication"
  ADD CONSTRAINT "ResumePublication_resume_fkey"
  FOREIGN KEY ("resume") REFERENCES "Resume"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeSkill"
  ADD CONSTRAINT "ResumeSkill_resume_fkey"
  FOREIGN KEY ("resume") REFERENCES "Resume"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeLanguage"
  ADD CONSTRAINT "ResumeLanguage_resume_fkey"
  FOREIGN KEY ("resume") REFERENCES "Resume"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeInterest"
  ADD CONSTRAINT "ResumeInterest_resume_fkey"
  FOREIGN KEY ("resume") REFERENCES "Resume"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeReference"
  ADD CONSTRAINT "ResumeReference_resume_fkey"
  FOREIGN KEY ("resume") REFERENCES "Resume"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeProject"
  ADD CONSTRAINT "ResumeProject_resume_fkey"
  FOREIGN KEY ("resume") REFERENCES "Resume"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ResumeCertification"
  ADD CONSTRAINT "ResumeCertification_certification_fkey"
  FOREIGN KEY ("certification") REFERENCES "Certification"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ResumeCertification"
  ADD CONSTRAINT "ResumeCertification_resume_fkey"
  FOREIGN KEY ("resume") REFERENCES "Resume"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT;
