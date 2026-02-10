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
    slug: "impressum",
    title: "Legal Notice",
    description: readLegalFile("impressum-en.md"),
    language: {
      label: "English",
      value: "en-US",
    },
  },
  // German - Terms/Impressum
  {
    slug: "impressum-de",
    title: "Impressum",
    description: readLegalFile("impressum-de.md"),
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  // English - Privacy Policy
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: readLegalFile("datenschutz-en.md"),
    language: {
      label: "English",
      value: "en-US",
    },
  },
  // German - Privacy Policy
  {
    slug: "privacy-policy-de",
    title: "Datenschutzerklärung",
    description: readLegalFile("datenschutz-de.md"),
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

  const seededLegalPages = await Promise.all(
    legalPagesData.map(async (config) => {
      const languageId = languageMap[config.language.value];

      if (!languageId) {
        throw new Error(
          `Language not found for value: ${config.language.value}`,
        );
      }

      return prisma.pageContent.create({
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
    }),
  );

  console.log(`✓ Seeded ${seededLegalPages.length} Legal Page Contents`);
  return seededLegalPages;
}

const LegalPages = {
  data: legalPagesData,
  seed,
};

export default LegalPages;
