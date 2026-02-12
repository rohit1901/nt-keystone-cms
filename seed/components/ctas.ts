import Images from "./images";
import type { SeededImages } from "./images";
import type { PrismaClient } from "@prisma/client";
import type { SeededSlugs } from "./slugs";
import { CTA, CtaSection, ImageConfig, Slug } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededCTAs = Awaited<ReturnType<typeof seed>>;

// --- CTAs Data ---
const backgrounds: ImageConfig[] = [
  {
    src: "/images/farm-footer.webp",
    alt: "Farm with vehicles blurred",
    width: 1000,
    height: 1000,
  },
  {
    src: "/images/farm-footer.webp",
    alt: "Farm with vehicles",
    width: 1000,
    height: 1000,
  },
];
const ctas: CTA[] = [
  // English CTAs
  {
    label: "Book a free consultation",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
    type: "cta",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    label: "Request an AWS assessment",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de", // TODO: add link to calendars
    external: false,
    type: "cta",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    label: "Let’s Talk",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
    type: "certification",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    label: "Free 15-minute consultation",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de", // TODO: Substack for now, change later
    external: false,
    type: "main",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    label: "News",
    href: "https://rohitkhanduri.substack.com", // TODO: Substack for now, change later
    external: true,
    type: "hero",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    label: "Contact Us",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    language: {
      label: "English",
      value: "en-US",
    },
    type: "navigation",
  },
  // German CTAs
  {
    label: "Kostenloses Erstgespräch buchen",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
    type: "cta",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    label: "AWS-Assessment anfragen",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de", // TODO: add link to calendars
    external: false,
    type: "cta",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    label: "Lass uns sprechen",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
    type: "certification",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    label: "Kostenloses Erstgespräch",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de", // TODO: Substack for now, change later
    external: false,
    type: "main",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    label: "Aktuelles",
    href: "https://rohitkhanduri.substack.com", // TODO: Substack for now, change later
    external: true,
    type: "hero",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    label: "Erstgespräch",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    language: {
      label: "German",
      value: "de-DE",
    },
    type: "navigation",
  },
];
// --- Section Data ---
const sectionsData: CtaSection[] = [
  {
    title: "Ready to get started?",
    description:
      "We help you build digital products that your users will love. Let’s talk about your project.",
    language: {
      label: "English",
      value: "en-US",
    },
    ctas: ctas.filter((cta) => cta.language.value === "en-US"),
    backgrounds,
  },
  {
    title: "Bereit loszulegen?",
    description:
      "Wir helfen Ihnen, digitale Produkte zu entwickeln, die Ihre Nutzer lieben werden. Lassen Sie uns über Ihr Projekt sprechen.",
    language: {
      label: "German",
      value: "de-DE",
    },
    ctas: ctas.filter((cta) => cta.language.value === "de-DE"),
    backgrounds,
  },
];

async function seed(
  prisma: PrismaClient,
  slugs: SeededSlugs,
  languages: SeededFooterLanguages,
) {
  // Get all existing CTAs to check for duplicates
  const existingCtas = await prisma.cta.findMany();

  // Create a unique key for each CTA (label + href + languageId + typeId)
  const existingCtaKeys = new Set(
    existingCtas.map(cta => `${cta.label}|${cta.href}|${cta.languageId}|${cta.typeId}`)
  );

  // Prepare data for CTAs that don't already exist
  const ctasToCreate = ctas
    .map((cta) => {
      const typeId = slugs.find((slug) => slug.label === cta.type)?.id;
      if (!typeId) {
        throw new Error(`Type not found for CTA: ${cta.label}`);
      }
      const languageId = languages.find(
        (language) => language.value === cta.language.value,
      )?.id;

      return {
        original: cta,
        data: {
          label: cta.label,
          href: cta.href,
          external: cta.external,
          languageId,
          typeId,
        },
        key: `${cta.label}|${cta.href}|${languageId}|${typeId}`,
      };
    })
    .filter(({ key }) => !existingCtaKeys.has(key));

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
  const foundCtaSlug = slugs.find((slug) => slug.label === "cta");

  if (!foundCtaSlug) {
    throw new Error("CTA slug not found");
  }

  const ctaImageIds = backgrounds
    .filter((image) => image.typeId === foundCtaSlug.id)
    .map(({ id }) => id);

  if (!ctaImageIds.length) {
    throw new Error("CTA background images not found");
  }

  const backgroundsToConnect = backgrounds.filter((background) =>
    ctaImageIds.includes(background.id),
  );

  // Get existing CTA sections to check for duplicates
  const existingSections = await prisma.ctaSection.findMany({
    select: { id: true, title: true, languageId: true },
  });

  const existingSectionKeys = new Set(
    existingSections.map(section => `${section.title}|${section.languageId}`)
  );

  // Map over sectionsData to create multiple sections (en-US, de-DE)
  const sectionsToCreate = sectionsData.filter((sectionData) => {
    const sectionLang = languages.find(
      (lang) => lang.label === sectionData.language.label,
    );
    const key = `${sectionData.title}|${sectionLang?.id}`;
    return !existingSectionKeys.has(key);
  });

  let newSectionsCount = 0;
  const sections = [...existingSections];

  if (sectionsToCreate.length > 0) {
    const newSections = await Promise.all(
      sectionsToCreate.map(async (sectionData) => {
        const sectionLang = languages.find(
          (lang) => lang.label === sectionData.language.label,
        );
        // Filter CTAs by Type AND Language
        const foundCtaCTAs = ctas.filter(
          (cta) =>
            cta.typeId === foundCtaSlug.id && cta.languageId === sectionLang?.id,
        );

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
                id: sectionLang?.id,
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
  data: sectionsData,
  ctas,
  seed,
  seedSection,
  clear,
};

export default Ctas;
