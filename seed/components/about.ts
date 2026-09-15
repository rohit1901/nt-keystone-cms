import type { Language, PrismaClient } from "../prisma";
import { aboutData } from "../../data";

export type SeededValues = Awaited<ReturnType<typeof seedValues>>;
export type SeededAbout = Awaited<ReturnType<typeof seed>>;

const seedValues = async (
  prisma: PrismaClient,
  languages?: {
    english: Pick<Language, "id" | "value">;
    german: Pick<Language, "id" | "value">;
  },
) => {
  console.log("Seeding about values...");

  const valuesWithLanguage = aboutData.flatMap((section) =>
    section.values.map((value) => ({
      label: value.label,
      description: value.description,
      icon: value.icon,
      languageValue: section.language.value,
    })),
  );

  const [foundEnglish, foundGerman] = await Promise.all([
    languages?.english ??
      prisma.language.findFirstOrThrow({
        where: { value: "en-US" },
        select: { id: true, value: true },
      }),
    languages?.german ??
      prisma.language.findFirstOrThrow({
        where: { value: "de-DE" },
        select: { id: true, value: true },
      }),
  ]);
  const languageIdByValue = new Map([
    [foundEnglish.value, foundEnglish.id],
    [foundGerman.value, foundGerman.id],
  ]);
  const resolvedValues = valuesWithLanguage.map((value) => ({
    ...value,
    languageId: languageIdByValue.get(value.languageValue)!,
  }));

  // Check only for existing values matching known seed keys.
  const existingValues = await prisma.value.findMany({
    where: {
      OR: resolvedValues.map(({ label, languageId }) => ({
        label,
        languageId,
      })),
    },
    select: { id: true, label: true, languageId: true },
  });

  const existingKeys = new Set(
    existingValues.map((v) => `${v.label}-${v.languageId}`),
  );

  // Only create values that don't exist
  const valuesToCreate = resolvedValues.filter(
    (value) => !existingKeys.has(`${value.label}-${value.languageId}`),
  );

  let values = existingValues;
  if (valuesToCreate.length > 0) {
    const seededValues = await prisma.value.createManyAndReturn({
      data: valuesToCreate.map((value) => ({
        label: value.label,
        description: value.description,
        icon: value.icon,
        languageId: value.languageId,
      })),
    });
    values = [...existingValues, ...seededValues];
    console.log(`✓ Created ${seededValues.length} new about values`);
  } else {
    console.log(`✓ All about values already exist, skipping creation`);
  }

  console.log(`✓ Total about values: ${values.length}`);

  return values;
};

const seed = async (prisma: PrismaClient, seededValues?: SeededValues) => {
  console.log("Seeding about section...");

  const [foundEnglish, foundGerman] = await Promise.all([
    prisma.language.findFirstOrThrow({
      where: { value: "en-US" },
      select: { id: true, value: true },
    }),
    prisma.language.findFirstOrThrow({
      where: { value: "de-DE" },
      select: { id: true, value: true },
    }),
  ]);

  const values =
    seededValues ??
    (await seedValues(prisma, { english: foundEnglish, german: foundGerman }));

  // Check for existing about sections
  const existingAboutSections = await prisma.about.findMany({
    where: {
      languageId: { in: [foundEnglish.id, foundGerman.id] },
    },
    select: { id: true, languageId: true },
  });

  const languageIdByValue = new Map([
    [foundEnglish.value, foundEnglish.id],
    [foundGerman.value, foundGerman.id],
  ]);
  const existingSectionByLanguageId = new Map(
    existingAboutSections.map((section) => [section.languageId, section]),
  );
  const valueByKey = new Map(
    values.map((value) => [`${value.languageId}|${value.label}`, value]),
  );

  const aboutSections = await Promise.all(
    aboutData.map(async (data) => {
      const languageId = languageIdByValue.get(data.language.value)!;
      const existingSection = existingSectionByLanguageId.get(languageId);

      if (existingSection) {
        console.log(
          `✓ About section for ${data.language.value} already exists (id: ${existingSection.id}), skipping`,
        );
        return existingSection;
      }

      const sectionValues = data.values.flatMap((value) => {
        const seededValue = valueByKey.get(`${languageId}|${value.label}`);
        return seededValue ? [seededValue] : [];
      });
      const newSection = await prisma.about.create({
        data: {
          heading: data.heading,
          intro: data.intro,
          valuesTitle: data.valuesTitle,
          values: {
            connect: sectionValues.map((value) => ({ id: value.id })),
          },
          closing: data.closing,
          language: { connect: { id: languageId } },
        },
      });
      console.log(
        `✓ Created about section for ${data.language.value} (id: ${newSection.id})`,
      );
      return newSection;
    }),
  );

  console.log(`✓ Total about sections: ${aboutSections.length}`);

  return aboutSections;
};

const clear = async (prisma: PrismaClient) => {
  console.log("Clearing about sections...");
  const aboutResult = await prisma.about.deleteMany({});
  console.log(`Deleted ${aboutResult.count} about section(s).`);

  console.log("Clearing about values...");
  const valuesResult = await prisma.value.deleteMany({});
  console.log(`Deleted ${valuesResult.count} value(s).`);
};

const About = {
  data: aboutData,
  seedValues,
  seed,
  clear,
};

export default About;
