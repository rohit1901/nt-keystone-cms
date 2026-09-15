import type { SeededImages } from "./images";
import type { PrismaClient } from "../prisma";
import type { SeededSlugs } from "./slugs";
import { ctasData, ctaSectionsData, ctaBackgrounds } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededCTAs = Awaited<ReturnType<typeof seed>>;

async function seed(
  prisma: PrismaClient,
  slugs: SeededSlugs,
  languages: SeededFooterLanguages,
) {
  const typeIdByLabel = new Map(slugs.map((slug) => [slug.label, slug.id]));
  const languageIdByValue = new Map(
    languages.map((language) => [language.value, language.id]),
  );

  const resolvedCtas = ctasData.map((cta) => {
    const typeId = typeIdByLabel.get(cta.type);
    if (!typeId) {
      throw new Error(`Type not found for CTA: ${cta.label}`);
    }
    const languageId = languageIdByValue.get(cta.language.value);

    return {
      data: {
        label: cta.label,
        href: cta.href,
        external: cta.external,
        languageId,
        typeId,
      },
      key: `${cta.label}|${cta.href}|${languageId}|${typeId}`,
    };
  });

  // Get only existing CTAs matching known seed keys.
  const existingCtas = await prisma.cta.findMany({
    where: {
      OR: resolvedCtas.map(({ data }) => ({
        label: data.label,
        href: data.href,
        languageId: data.languageId,
        typeId: data.typeId,
      })),
    },
    select: {
      id: true,
      label: true,
      href: true,
      external: true,
      languageId: true,
      typeId: true,
    },
  });
  const existingCtaKeys = new Set(
    existingCtas.map(
      (cta) =>
        `${cta.label}|${cta.href}|${cta.languageId}|${cta.typeId}`,
    ),
  );
  const ctasToCreate = resolvedCtas.filter(
    ({ key }) => !existingCtaKeys.has(key),
  );

  let newCtasCount = 0;
  let seededCtas = [...existingCtas];

  if (ctasToCreate.length > 0) {
    const newCtas = await prisma.cta.createManyAndReturn({
      data: ctasToCreate.map(({ data }) => data),
    });
    newCtasCount = newCtas.length;
    seededCtas = [...existingCtas, ...newCtas];
    console.log(`✓ Created ${newCtasCount} new CTA(s)`);
  } else {
    console.log(`✓ All CTAs already exist, skipping creation`);
  }

  console.log(`✓ Total CTAs in database: ${seededCtas.length}`);
  return seededCtas;
}

async function seedSection(
  prisma: PrismaClient,
  slugs: SeededSlugs,
  ctas: SeededCTAs,
  backgrounds: SeededImages,
  languages: SeededFooterLanguages,
) {
  const slugByLabel = new Map(slugs.map((slug) => [slug.label, slug]));
  const languageIdByLabel = new Map(
    languages.map((language) => [language.label, language.id]),
  );
  const foundCtaSlug = slugByLabel.get("cta");

  if (!foundCtaSlug) {
    throw new Error("CTA slug not found");
  }

  const backgroundsToConnect = backgrounds.filter(
    (image) => image.typeId === foundCtaSlug.id,
  );
  if (!backgroundsToConnect.length) {
    throw new Error("CTA background images not found");
  }
  const sectionKeys = ctaSectionsData.map((section) => ({
    title: section.title,
    languageId: languageIdByLabel.get(section.language.label),
  }));

  // Get existing CTA sections matching known seed keys.
  const existingSections = await prisma.ctaSection.findMany({
    where: { OR: sectionKeys },
    select: { id: true, title: true, languageId: true },
  });

  const existingSectionKeys = new Set(
    existingSections.map(section => `${section.title}|${section.languageId}`)
  );

  // Map over ctaSectionsData to create multiple sections (en-US, de-DE)
  const sectionsToCreate = ctaSectionsData.filter((sectionData) => {
    const languageId = languageIdByLabel.get(sectionData.language.label);
    const key = `${sectionData.title}|${languageId}`;
    return !existingSectionKeys.has(key);
  });

  const ctasByLanguageId = new Map<number | null, SeededCTAs>();
  for (const cta of ctas) {
    if (cta.typeId !== foundCtaSlug.id) continue;
    const matching = ctasByLanguageId.get(cta.languageId) ?? [];
    matching.push(cta);
    ctasByLanguageId.set(cta.languageId, matching);
  }

  let newSectionsCount = 0;
  const sections = [...existingSections];

  if (sectionsToCreate.length > 0) {
    const newSections = await Promise.all(
      sectionsToCreate.map(async (sectionData) => {
        const languageId = languageIdByLabel.get(
          sectionData.language.label,
        );
        // Filter CTAs by Type AND Language
        const foundCtaCTAs = ctasByLanguageId.get(languageId ?? null) ?? [];

        if (!foundCtaCTAs.length) {
          console.warn(
            `! No CTA records found for language ${sectionData.language.label}`,
          );
        }

        return prisma.ctaSection.create({
          data: {
            title: sectionData.title,
            description: sectionData.description,
            background: {
              connect: backgroundsToConnect.map((b) => ({
                id: b.id,
              })),
            },
            ctas: {
              connect: foundCtaCTAs.map((cta) => ({ id: cta.id })),
            },
            language: {
              connect: {
                id: languageId,
              },
            },
          },
        });
      }),
    );
    newSectionsCount = newSections.length;
    sections.push(...newSections);
    console.log(`✓ Created ${newSectionsCount} new CTA section(s)`);
  } else {
    console.log(`✓ All CTA sections already exist, skipping creation`);
  }

  console.log(`✓ Total CTA sections in database: ${sections.length}`);
  return sections;
}

async function clear(prisma: PrismaClient) {
  console.log('Clearing all CTA sections...');
  const sectionsResult = await prisma.ctaSection.deleteMany({});
  console.log(`✓ Deleted ${sectionsResult.count} CTA section(s)`);

  console.log('Clearing all CTAs...');
  const ctasResult = await prisma.cta.deleteMany({});
  console.log(`✓ Deleted ${ctasResult.count} CTA(s)`);
}

const Ctas = {
  data: ctaSectionsData,
  ctas: ctasData,
  seed,
  seedSection,
  clear,
};

export default Ctas;
