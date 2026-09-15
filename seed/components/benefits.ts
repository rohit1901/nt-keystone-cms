import type { SeededImages } from "./images";
import type { PrismaClient } from "../prisma";
import type { SeededSlugs } from "./slugs";
import type { SeededCTAs } from "./ctas";
import { benefitsSectionsData } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededBenefits = Awaited<ReturnType<typeof seed>>;
export type SeededBenefitSections = Awaited<ReturnType<typeof seedSection>>;

const seed = async (
  prisma: PrismaClient,
  languages: SeededFooterLanguages,
) => {
  const languageIdByValue = new Map(
    languages.map((language) => [language.value, language.id]),
  );
  const allBenefits = benefitsSectionsData.flatMap(
    (section) => section.benefits,
  );
  const resolvedBenefits = allBenefits
    .map((benefit) => {
      const languageId = languageIdByValue.get(benefit.language.value);

      if (!languageId) {
        console.warn(`! Language not found: ${benefit.language.value}`);
        return null;
      }

      return {
        title: benefit.title,
        description: benefit.description,
        icon: benefit.icon,
        languageId,
        key: `${benefit.title}|${languageId}`,
      };
    })
    .filter((benefit): benefit is NonNullable<typeof benefit> => benefit !== null);

  // Get only existing benefits matching known seed keys.
  const existingBenefits = await prisma.benefit.findMany({
    where: {
      OR: resolvedBenefits.map(({ title, languageId }) => ({
        title,
        languageId,
      })),
    },
    select: { id: true, title: true, languageId: true },
  });
  const existingBenefitKeys = new Set(
    existingBenefits.map(
      (benefit) => `${benefit.title}|${benefit.languageId}`,
    ),
  );
  const benefitsToCreate = resolvedBenefits.filter(
    ({ key }) => !existingBenefitKeys.has(key),
  );

  let newBenefitsCount = 0;
  let seededBenefits = [...existingBenefits];

  if (benefitsToCreate.length > 0) {
    const newBenefits = await prisma.benefit.createManyAndReturn({
      data: benefitsToCreate.map(({ key, ...data }) => data),
    });
    newBenefitsCount = newBenefits.length;
    seededBenefits = [...existingBenefits, ...newBenefits];
    console.log(`✓ Created ${newBenefitsCount} new benefit(s)`);
  } else {
    console.log(`✓ All benefits already exist, skipping creation`);
  }

  console.log(`✓ Total benefits in database: ${seededBenefits.length}`);
  return seededBenefits;
};

const seedSection = async (
  prisma: PrismaClient,
  images: SeededImages,
  slugs: SeededSlugs,
  ctas: SeededCTAs,
  languages: SeededFooterLanguages,
) => {
  // First seed all benefits
  const allBenefits = await seed(prisma, languages);

  const languageIdByValue = new Map(
    languages.map((language) => [language.value, language.id]),
  );
  const sectionKeys = benefitsSectionsData.flatMap((section) => {
    const languageId = languageIdByValue.get(section.language.value);
    return languageId ? [{ title: section.title, languageId }] : [];
  });

  // Get only existing benefit sections matching known seed keys.
  const existingSections = await prisma.benefitSection.findMany({
    where: { OR: sectionKeys },
    select: { id: true, title: true, languageId: true },
  });

  // Create unique keys based on title + languageId
  const existingSectionKeys = new Set(
    existingSections.map((section) => `${section.title}|${section.languageId}`)
  );

  // Filter out sections that already exist
  const sectionsToCreate = benefitsSectionsData.filter((sectionData) => {
    const languageId = languageIdByValue.get(sectionData.language.value);
    const key = `${sectionData.title}|${languageId}`;
    return !existingSectionKeys.has(key);
  });

  let newSectionsCount = 0;
  const seededSections = [...existingSections];

  if (sectionsToCreate.length > 0) {
    const newSections = await Promise.all(
      sectionsToCreate.map(async (sectionData) => {
        // Find the language ID
        const languageId = languageIdByValue.get(
          sectionData.language.value,
        );

        if (!languageId) {
          console.warn(`! Language not found: ${sectionData.language.value}`);
          return null;
        }

        // Find benefits that match this section's language and titles.
        const sectionBenefitTitles = new Set(
          sectionData.benefits.map((benefit) => benefit.title),
        );
        const matchingBenefits = allBenefits.filter(
          (benefit) =>
            benefit.languageId === languageId &&
            sectionBenefitTitles.has(benefit.title),
        );

        // Create the benefit section
        const section = await prisma.benefitSection.create({
          data: {
            title: sectionData.title,
            benefits: {
              connect: matchingBenefits.map((benefit) => ({
                id: benefit.id,
              })),
            },
            language: {
              connect: { id: languageId },
            },
          },
        });

        return section;
      })
    );

    const validSections = newSections.filter(
      (section): section is NonNullable<typeof section> => section !== null
    );
    newSectionsCount = validSections.length;
    seededSections.push(...validSections);
    console.log(`✓ Created ${newSectionsCount} new benefit section(s)`);
  } else {
    console.log(`✓ All benefit sections already exist, skipping creation`);
  }

  console.log(`✓ Total benefit sections in database: ${seededSections.length}`);
  return seededSections;
};

const clear = async (prisma: PrismaClient) => {
  console.log('Clearing all benefit sections...');
  const sectionsResult = await prisma.benefitSection.deleteMany({});
  console.log(`✓ Deleted ${sectionsResult.count} benefit section(s)`);

  console.log('Clearing all benefits...');
  const benefitsResult = await prisma.benefit.deleteMany({});
  console.log(`✓ Deleted ${benefitsResult.count} benefit(s)`);
};

const Benefits = {
  data: benefitsSectionsData,
  seed,
  seedSection,
  clear,
};

export default Benefits;
