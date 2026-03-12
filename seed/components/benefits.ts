import Images from "./images";
import type { SeededImages } from "./images";
import type { PrismaClient } from "@prisma/client";
import type { SeededSlugs } from "./slugs";
import Ctas, { SeededCTAs } from "./ctas";
import { BenefitSection } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededBenefits = Awaited<ReturnType<typeof seed>>;
export type SeededBenefitSections = Awaited<ReturnType<typeof seedSection>>;

// --- Data ---
const benefitsSectionsData: BenefitSection[] = [
  {
    title: "Why small, mid-market, and enterprise businesses choose Nimbus Tech",
    language: {
      label: "English",
      value: "en-US",
    },
    benefits: [
      {
        icon: "RiMoneyEuroBoxFill",
        title: "Transparent Costs",
        description:
          "We design your AWS environment with cloud cost optimization in mind so that costs remain predictable and under control – no hidden surprises.",
        language: {
          label: "English",
          value: "en-US",
        },
      },
      {
        icon: "RiAwardFill",
        title: "AWS-Certified Experts",
        description:
          "You work directly with experienced, AWS-certified architects and engineers who design according to the AWS Well-Architected Framework – not a rotating team of juniors.",
        language: {
          label: "English",
          value: "en-US",
        },
      },
      {
        icon: "RiFlashlightFill",
        title: "Fast, Pragmatic Delivery",
        description:
          "We focus on lean, cloud-native solutions that can go live quickly, using serverless computing and managed services where they make sense, so your setup can evolve with your business.",
        language: {
          label: "English",
          value: "en-US",
        },
      },
    ],
  },
  {
    title: "Warum Unternehmen mit Nimbus Tech arbeiten",
    language: {
      label: "German",
      value: "de-DE",
    },
    benefits: [
      {
        icon: "RiMoneyEuroBoxFill",
        title: "Klare Kosten",
        description:
          "Wir gestalten Ihre AWS-Umgebung mit Fokus auf Cloud-Kostenoptimierung, sodass Kosten planbar bleiben und Sie jederzeit den Überblick behalten – ohne böse Überraschungen.",
        language: {
          label: "German",
          value: "de-DE",
        },
      },
      {
        icon: "RiAwardFill",
        title: "Zertifizierte AWS-Experten",
        description:
          "Sie arbeiten direkt mit erfahrenen, AWS-zertifizierten Architekt:innen und Engineer:innen, die nach dem AWS Well-Architected Framework entwerfen – nicht mit ständig wechselnden Junior-Teams.",
        language: {
          label: "German",
          value: "de-DE",
        },
      },
      {
        icon: "RiFlashlightFill",
        title: "Schnelle, praxisnahe Umsetzung",
        description:
          "Wir setzen schlanke, cloud-native Lösungen um, die schnell live gehen – mit Serverless Computing und Managed Services, wo sie sinnvoll sind – und die mit Ihrem Geschäft mitwachsen.",
        language: {
          label: "German",
          value: "de-DE",
        },
      },
    ],
  },
];

const seed = async (
  prisma: PrismaClient,
  languages: SeededFooterLanguages,
) => {
  // Get all existing benefits to check for duplicates
  const existingBenefits = await prisma.benefit.findMany({
    select: { id: true, title: true, description: true, languageId: true, icon: true },
  });

  // Create unique keys based on title + languageId
  const existingBenefitKeys = new Set(
    existingBenefits.map((benefit) => `${benefit.title}|${benefit.languageId}`)
  );

  // Flatten all benefits from all sections
  const allBenefits = benefitsSectionsData.flatMap((section) =>
    section.benefits.map((benefit) => ({
      ...benefit,
      sectionLanguage: section.language,
    }))
  );

  // Filter out benefits that already exist
  const benefitsToCreate = allBenefits
    .map((benefit) => {
      const languageId = languages.find(
        (l) => l.value === benefit.language.value
      )?.id;

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
    .filter((benefit): benefit is NonNullable<typeof benefit> => benefit !== null)
    .filter(({ key }) => !existingBenefitKeys.has(key));

  let newBenefitsCount = 0;
  let seededBenefits = [...existingBenefits];

  if (benefitsToCreate.length > 0) {
    const newBenefits = await Promise.all(
      benefitsToCreate.map(({ key, ...data }) =>
        prisma.benefit.create({
          data,
        })
      )
    );
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

  // Get all existing benefit sections to check for duplicates
  const existingSections = await prisma.benefitSection.findMany({
    select: { id: true, title: true, languageId: true },
  });

  // Create unique keys based on title + languageId
  const existingSectionKeys = new Set(
    existingSections.map((section) => `${section.title}|${section.languageId}`)
  );

  // Filter out sections that already exist
  const sectionsToCreate = benefitsSectionsData.filter((sectionData) => {
    const languageId = languages.find(
      (l) => l.value === sectionData.language.value
    )?.id;
    const key = `${sectionData.title}|${languageId}`;
    return !existingSectionKeys.has(key);
  });

  let newSectionsCount = 0;
  const seededSections = [...existingSections];

  if (sectionsToCreate.length > 0) {
    const newSections = await Promise.all(
      sectionsToCreate.map(async (sectionData) => {
        // Find the language ID
        const languageId = languages.find(
          (l) => l.value === sectionData.language.value
        )?.id;

        if (!languageId) {
          console.warn(`! Language not found: ${sectionData.language.value}`);
          return null;
        }

        // Find benefits that match this section's language
        const matchingBenefits = allBenefits.filter((benefit) =>
          benefit.languageId === languageId &&
          sectionData.benefits.some((b) => b.title === benefit.title)
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
