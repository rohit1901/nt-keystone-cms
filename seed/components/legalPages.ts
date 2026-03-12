import type { PrismaClient } from "@prisma/client";
import type { Language } from "../../data";
import { readFileSync } from "fs";
import { join } from "path";

type LegalPageContentConfig = {
  slug: string;
  title: string;
  description: string;
  language: Language;
};

// Helper function to read markdown files
function readLegalFile(filename: string): string {
  const filePath = join(process.cwd(), "legal", filename);
  return readFileSync(filePath, "utf-8");
}

const legalPagesData: LegalPageContentConfig[] = [
  // English - Terms/Impressum
  {
    slug: "terms",
    title: "Legal Notice",
    description: readLegalFile("terms.md"),
    language: {
      label: "English",
      value: "en-US",
    },
  },
  // German - Terms/Impressum
  {
    slug: "terms-de",
    title: "Impressum",
    description: readLegalFile("terms-de.md"),
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  // English - Privacy Policy
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: readLegalFile("privacy-policy.md"),
    language: {
      label: "English",
      value: "en-US",
    },
  },
  // German - Privacy Policy
  {
    slug: "privacy-policy-de",
    title: "Datenschutzerklärung",
    description: readLegalFile("privacy-policy-de.md"),
    language: {
      label: "German",
      value: "de-DE",
    },
  },
];

export type SeededLegalPages = Awaited<ReturnType<typeof seed>>;

async function seed(prisma: PrismaClient) {
  // Pre-fetch languages to map value ('en-US') to ID
  const allLanguages = await prisma.language.findMany();
  const languageMap: Record<string, number> = allLanguages.reduce(
    (acc, lang) => {
      acc[lang.value] = lang.id;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Check for existing legal pages
  const existingLegalPages = await prisma.pageContent.findMany({
    where: {
      slug: { in: legalPagesData.map(c => c.slug) },
    },
  });

  const existingSlugs = new Set(existingLegalPages.map(pc => pc.slug));
  const seededLegalPages = [...existingLegalPages];

  // Only create pages that don't already exist
  const pagesToCreate = legalPagesData.filter(config => !existingSlugs.has(config.slug));

  if (pagesToCreate.length > 0) {
    const newPages = await Promise.all(
      pagesToCreate.map(async (config) => {
        const languageId = languageMap[config.language.value];

        if (!languageId) {
          throw new Error(
            `Language not found for value: ${config.language.value}`,
          );
        }

        const pageContent = await prisma.pageContent.create({
          data: {
            slug: config.slug,
            title: config.title,
            description: config.description,
            language: {
              connect: {
                id: languageId,
              },
            },
          },
        });

        console.log(
          `✓ Created legal page for slug "${config.slug}" (id: ${pageContent.id})`,
        );
        return pageContent;
      }),
    );
    seededLegalPages.push(...newPages);
  } else {
    console.log(`✓ All legal pages already exist, skipping creation`);
  }

  console.log(`✓ Total legal pages: ${seededLegalPages.length}`);
  return seededLegalPages;
}

const LegalPages = {
  data: legalPagesData,
  seed,
};

export default LegalPages;
