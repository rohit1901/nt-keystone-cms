import "dotenv/config";
import { PrismaClient } from "../prisma";

export type SeededLanguages = Awaited<ReturnType<typeof seed>>;

// --- Language data ---
export const languageData = [
  {
    label: "English",
    value: "en-US",
  },
  {
    label: "German",
    value: "de-DE",
  },
  {
    label: "Hindi",
    value: "en-IN",
  },
];

const seed = async (prisma: PrismaClient) => {
  // Get all existing languages to check for duplicates
  const existingLanguages = await prisma.language.findMany({
    where: { value: { in: languageData.map(({ value }) => value) } },
    select: { id: true, label: true, value: true },
  });

  const existingLanguageValues = new Set(
    existingLanguages.map(({ value }) => value),
  );

  // Prepare data for languages that don't already exist
  const languagesToCreate = languageData.filter(
    ({ value }) => !existingLanguageValues.has(value),
  );

  let newLanguagesCount = 0;
  let seededLanguages = [...existingLanguages];

  if (languagesToCreate.length > 0) {
    const newLanguages = await prisma.language.createManyAndReturn({
      data: languagesToCreate,
    });
    newLanguagesCount = newLanguages.length;
    seededLanguages = [...existingLanguages, ...newLanguages];
    console.log(`✓ Created ${newLanguagesCount} new language(s): ${languagesToCreate.map(l => l.label).join(", ")}`);
  } else {
    console.log(`✓ All languages already exist, skipping creation`);
  }

  console.log(`✓ Total languages in database: ${seededLanguages.length} (${languageData.map(l => l.label).join(", ")})`);
  return seededLanguages;
};

const clear = async (prisma: PrismaClient) => {
  console.log('Clearing all languages...');
  const result = await prisma.language.deleteMany({});
  console.log(`✓ Deleted ${result.count} language(s)`);
};

const Languages = {
  data: languageData,
  seed,
  clear,
};

export default Languages;
