import type { PrismaClient } from "@prisma/client";
import { ApproachData } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededApproachSteps = Awaited<ReturnType<typeof seedSteps>>;
export type SeededApproach = Awaited<ReturnType<typeof seed>>;

const approachesData: ApproachData[] = [
  {
    title: "Our Approach: From Vision to Value",
    description:
      "At Nimbus Tech, we follow a structured approach to ensure your project is successful from start to finish. Our process is designed to be flexible, transparent, and focused on delivering real business value.",
    language: {
      label: "English",
      value: "en-US",
    },
    steps: [
      {
        id: 1,
        type: "done",
        title: "Discovery: Listen & Learn",
        description:
          "We start by understanding your goals, challenges, and vision.",
        activityTime: "Step 1",
        language: { label: "English", value: "en-US" },
      },
      {
        id: 2,
        type: "done",
        title: "Planning: Architect for Success",
        description:
          "We design a scalable, future-proof solution tailored to your needs.",
        activityTime: "Step 2",
        language: { label: "English", value: "en-US" },
      },
      {
        id: 3,
        type: "done",
        title: "Development: Build with Quality",
        description:
          "We develop your solution using best practices and modern technologies.",
        activityTime: "Step 3",
        language: { label: "English", value: "en-US" },
      },
      {
        id: 4,
        type: "in progress",
        title: "Deployment: Launch & Deliver",
        description:
          "We deploy your product securely and ensure a smooth go-live.",
        activityTime: "Step 4",
        language: { label: "English", value: "en-US" },
      },
      {
        id: 5,
        type: "open",
        title: "Support: Optimize & Grow",
        description: "We provide ongoing support and continuous improvement.",
        activityTime: "Step 5",
        language: { label: "English", value: "en-US" },
      },
    ],
  },
  {
    title: "Unser Ansatz: Von der Vision zum Wert",
    description:
      "Bei Nimbus Tech folgen wir einem strukturierten Ansatz, um den Erfolg Ihres Projekts von Anfang bis Ende sicherzustellen. Unser Prozess ist flexibel, transparent und darauf ausgerichtet, echten geschäftlichen Mehrwert zu liefern.",
    language: {
      label: "German",
      value: "de-DE",
    },
    steps: [
      {
        id: 1,
        type: "done",
        title: "Discovery: Zuhören & Verstehen",
        description:
          "Wir beginnen damit, Ihre Ziele, Herausforderungen und Visionen zu verstehen.",
        activityTime: "Schritt 1",
        language: { label: "German", value: "de-DE" },
      },
      {
        id: 2,
        type: "done",
        title: "Planung: Architektur für den Erfolg",
        description:
          "Wir entwerfen eine skalierbare, zukunftssichere Lösung, die auf Ihre Bedürfnisse zugeschnitten ist.",
        activityTime: "Schritt 2",
        language: { label: "German", value: "de-DE" },
      },
      {
        id: 3,
        type: "done",
        title: "Entwicklung: Bauen mit Qualität",
        description:
          "Wir entwickeln Ihre Lösung unter Verwendung von Best Practices und modernen Technologien.",
        activityTime: "Schritt 3",
        language: { label: "German", value: "de-DE" },
      },
      {
        id: 4,
        type: "in progress",
        title: "Deployment: Start & Lieferung",
        description:
          "Wir stellen Ihr Produkt sicher bereit und sorgen für einen reibungslosen Go-Live.",
        activityTime: "Schritt 4",
        language: { label: "German", value: "de-DE" },
      },
      {
        id: 5,
        type: "open",
        title: "Support: Optimieren & Wachsen",
        description:
          "Wir bieten laufenden Support und kontinuierliche Verbesserung.",
        activityTime: "Schritt 5",
        language: { label: "German", value: "de-DE" },
      },
    ],
  },
];

const seedSteps = async (
  prisma: PrismaClient,
  languages: SeededFooterLanguages,
) => {
  console.log("Seeding approach steps...");

  // Get all existing approach steps to check for duplicates
  const existingSteps = await prisma.approachStep.findMany({
    select: { id: true, stepId: true, title: true, languageId: true, type: true, description: true, activityTime: true },
  });

  // Create unique keys based on stepId + title + languageId
  const existingStepKeys = new Set(
    existingSteps.map((step) => `${step.stepId}|${step.title}|${step.languageId}`)
  );

  // Flatten all steps from all approaches
  const allSteps = approachesData.flatMap((approach) =>
    approach.steps.map((step) => ({
      ...step,
      approachLanguage: approach.language,
    }))
  );

  // Filter out steps that already exist
  const stepsToCreate = allSteps
    .map((step) => {
      const languageId = languages.find(
        (lang) => lang.value === step.language.value,
      )?.id;

      if (!languageId) {
        console.warn(`! Language not found: ${step.language.value}`);
        return null;
      }

      return {
        stepId: step.id,
        type: step.type,
        title: step.title,
        description: step.description,
        activityTime: step.activityTime,
        languageId,
        key: `${step.id}|${step.title}|${languageId}`,
      };
    })
    .filter((step): step is NonNullable<typeof step> => step !== null)
    .filter(({ key }) => !existingStepKeys.has(key));

  let newStepsCount = 0;
  let seededSteps = [...existingSteps];

  if (stepsToCreate.length > 0) {
    const newSteps = await Promise.all(
      stepsToCreate.map(async ({ key, ...data }) => {
        return await prisma.approachStep.create({
          data,
        });
      })
    );
    newStepsCount = newSteps.length;
    seededSteps = [...existingSteps, ...newSteps];
    console.log(`✓ Created ${newStepsCount} new approach step(s)`);
  } else {
    console.log(`✓ All approach steps already exist, skipping creation`);
  }

  console.log(`✓ Total approach steps in database: ${seededSteps.length}`);
  return seededSteps;
};

const seed = async (prisma: PrismaClient, languages: SeededFooterLanguages) => {
  console.log("Seeding approach section...");

  // First seed all steps
  const allSteps = await seedSteps(prisma, languages);

  // Get all existing approaches to check for duplicates
  const existingApproaches = await prisma.approach.findMany({
    select: { id: true, title: true, languageId: true },
  });

  // Create unique keys based on title + languageId
  const existingApproachKeys = new Set(
    existingApproaches.map((approach) => `${approach.title}|${approach.languageId}`)
  );

  // Filter out approaches that already exist
  const approachesToCreate = approachesData.filter((approachData) => {
    const languageId = languages.find(
      (lang) => lang.value === approachData.language.value,
    )?.id;
    const key = `${approachData.title}|${languageId}`;
    return !existingApproachKeys.has(key);
  });

  let newApproachesCount = 0;
  const seededApproaches = [...existingApproaches];

  if (approachesToCreate.length > 0) {
    const newApproaches = await Promise.all(
      approachesToCreate.map(async (approachData) => {
        const languageId = languages.find(
          (lang) => lang.value === approachData.language.value,
        )?.id;

        if (!languageId) {
          console.warn(`! Language not found: ${approachData.language.value}`);
          return null;
        }

        // Find steps that match this approach's language
        const matchingSteps = allSteps.filter((step) =>
          step.languageId === languageId &&
          approachData.steps.some((s) => s.id === step.stepId)
        );

        const approach = await prisma.approach.create({
          data: {
            title: approachData.title,
            description: approachData.description,
            language: {
              connect: { id: languageId },
            },
            steps: {
              connect: matchingSteps.map((step) => ({ id: step.id })),
            },
          },
        });

        console.log(
          `✓ Created approach for ${approachData.language.value} with ID ${approach.id}`,
        );
        return approach;
      })
    );

    const validApproaches = newApproaches.filter(
      (approach): approach is NonNullable<typeof approach> => approach !== null
    );
    newApproachesCount = validApproaches.length;
    seededApproaches.push(...validApproaches);
  } else {
    console.log(`✓ All approaches already exist, skipping creation`);
  }

  console.log(`✓ Total approaches in database: ${seededApproaches.length}`);
  return seededApproaches;
};

const clear = async (prisma: PrismaClient) => {
  console.log('Clearing all approaches...');
  const approachesResult = await prisma.approach.deleteMany({});
  console.log(`✓ Deleted ${approachesResult.count} approach(es)`);

  console.log('Clearing all approach steps...');
  const stepsResult = await prisma.approachStep.deleteMany({});
  console.log(`✓ Deleted ${stepsResult.count} approach step(s)`);
};

const Approaches = {
  data: approachesData,
  seedSteps,
  seed,
  clear,
};

export default Approaches;
