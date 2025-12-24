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
  stepsData: ApproachData["steps"],
  languages: SeededFooterLanguages,
) => {
  console.log("Seeding approach steps...");

  // We use Promise.all to handle the async language resolution for each step
  const steps = await Promise.all(
    stepsData.map(async (step) => {
      const language = languages.find(
        (lang) => lang.value === step.language.value,
      );

      return prisma.approachStep.create({
        data: {
          stepId: step.id,
          type: step.type,
          title: step.title,
          description: step.description,
          activityTime: step.activityTime,
          language: {
            connect: { id: language?.id },
          },
        },
      });
    }),
  );

  console.log(`✓ Seeded ${steps.length} approach steps`);
  return steps;
};

const seed = async (prisma: PrismaClient, languages: SeededFooterLanguages) => {
  console.log("Seeding approach section...");

  const createdApproaches = [];

  for (const approachData of approachesData) {
    console.log(`Processing approach for: ${approachData.language.value}`);

    // 1. Ensure the Language exists for the main Approach
    const language = languages.find(
      (lang) => lang.value === approachData.language.value,
    );
    if (!language) {
      throw new Error(
        `Language not found for value: ${approachData.language.value}`,
      );
    }

    // 2. Seed Steps (function handles language connection internally per step)
    const steps = await seedSteps(prisma, approachData.steps, languages);

    // 3. Create Approach connected to Language and Steps
    const approach = await prisma.approach.create({
      data: {
        title: approachData.title,
        description: approachData.description,
        language: {
          connect: { id: language.id },
        },
        steps: {
          connect: steps.map((step) => ({ id: step.id })),
        },
      },
    });

    createdApproaches.push(approach);
    console.log(
      `✓ Seeded approach for ${approachData.language.value} with ID ${approach.id}`,
    );
  }

  return createdApproaches;
};

const Approaches = {
  data: approachesData,
  seedSteps,
  seed,
};

export default Approaches;
