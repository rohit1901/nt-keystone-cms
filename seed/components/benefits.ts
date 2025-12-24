import Images from "./images";
import type { SeededImages } from "./images";
import type { PrismaClient } from "@prisma/client";
import type { SeededSlugs } from "./slugs";
import Ctas, { SeededCTAs } from "./ctas";
import { BenefitSection } from "../../data";

export type SeededBenefits = Awaited<ReturnType<typeof seed>>;

// --- Data ---
const benefitsSectionsData: BenefitSection[] = [
  {
    title: "Your Benefits with Nimbus Tech",
    language: {
      label: "English",
      value: "en-US",
    },
    benefits: [
      {
        icon: "RiAwardFill",
        title: "Certified Experts",
        description: "We are experienced and certified AWS cloud specialists.",
        language: {
          label: "English",
          value: "en-US",
        },
      },
      {
        icon: "RiMoneyEuroBoxFill",
        title: "Full Cost Control",
        description:
          "We ensure transparent and predictable costs for your cloud project.",
        language: {
          label: "English",
          value: "en-US",
        },
      },
      {
        icon: "RiFlashlightFill",
        title: "Fast Implementation",
        description:
          "We implement your individual cloud project efficiently and quickly.",
        language: {
          label: "English",
          value: "en-US",
        },
      },
    ],
  },
  {
    title: "Ihre Vorteile mit Nimbus Tech",
    language: {
      label: "German",
      value: "de-DE",
    },
    benefits: [
      {
        icon: "RiAwardFill",
        title: "Zertifizierte Experten",
        description:
          "Wir sind erfahrene und zertifizierte AWS-Cloud-Spezialisten.",
        language: {
          label: "German",
          value: "de-DE",
        },
      },
      {
        icon: "RiMoneyEuroBoxFill",
        title: "Volle Kostenkontrolle",
        description:
          "Wir sorgen für transparente und planbare Kosten bei Ihrem Cloud-Projekt.",
        language: {
          label: "German",
          value: "de-DE",
        },
      },
      {
        icon: "RiFlashlightFill",
        title: "Schnelle Umsetzung",
        description:
          "Wir setzen Ihr individuelles Cloud-Projekt effizient und schnell um.",
        language: {
          label: "German",
          value: "de-DE",
        },
      },
    ],
  },
];

const getOrCreateLanguage = async (
  prisma: PrismaClient,
  language: { label: string; value: string },
) => {
  const existing = await prisma.language.findFirst({
    where: { value: language.value },
  });
  if (existing) return existing;

  return await prisma.language.create({
    data: {
      label: language.label,
      value: language.value,
    },
  });
};

const seed = async (
  prisma: PrismaClient,
  benefitsList: any[],
  languageId: number,
) => {
  // Use Promise.all to create benefits individually so we can connect the language relation
  // createMany does not support relation connections easily in all adapters
  return await Promise.all(
    benefitsList.map((benefit) =>
      prisma.benefit.create({
        data: {
          title: benefit.title,
          description: benefit.description,
          icon: benefit.icon,
          language: {
            connect: { id: languageId },
          },
        },
      }),
    ),
  );
};

const seedSection = async (
  prisma: PrismaClient,
  images: SeededImages,
  slugs: SeededSlugs,
  ctas: SeededCTAs,
) => {
  const seededSections = [];

  for (const sectionData of benefitsSectionsData) {
    // 1. Ensure Language exists
    const language = await getOrCreateLanguage(prisma, sectionData.language);

    // 2. Seed Benefits for this section (connected to Language)
    const seededBenefits = await seed(
      prisma,
      sectionData.benefits,
      language.id,
    );

    // 3. Seed Section (connected to Benefits and Language)
    const seededBenefitSection = await prisma.benefitSection.create({
      data: {
        title: sectionData.title,
        benefits: {
          connect: seededBenefits.map((benefit) => ({
            id: benefit.id,
          })),
        },
        language: {
          connect: { id: language.id },
        },
      },
    });

    seededSections.push(seededBenefitSection);
    console.log(
      `✓ Seeded Benefit Section (${sectionData.language.value}): ${seededBenefitSection.id}`,
    );
  }

  return seededSections;
};

const Benefits = {
  data: benefitsSectionsData,
  seed,
  seedSection,
};

export default Benefits;
