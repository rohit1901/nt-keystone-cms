import type { PrismaClient } from "@prisma/client";

export type SeededApproachSteps = Awaited<ReturnType<typeof seedSteps>>;
export type SeededApproach = Awaited<ReturnType<typeof seed>>;

const approachesData = {
  title: "Our Approach: From Vision to Value",
  description:
    "At Nimbus Tech, we follow a structured approach to ensure your project is successful from start to finish. Our process is designed to be flexible, transparent, and focused on delivering real business value.",
  steps: [
    {
      id: 1,
      type: "done",
      title: "Discovery: Listen & Learn",
      description:
        "We start by understanding your goals, challenges, and vision.",
      activityTime: "Step 1",
    },
    {
      id: 2,
      type: "done",
      title: "Planning: Architect for Success",
      description:
        "We design a scalable, future-proof solution tailored to your needs.",
      activityTime: "Step 2",
    },
    {
      id: 3,
      type: "done",
      title: "Development: Build with Quality",
      description:
        "We develop your solution using best practices and modern technologies.",
      activityTime: "Step 3",
    },
    {
      id: 4,
      type: "in progress",
      title: "Deployment: Launch & Deliver",
      description:
        "We deploy your product securely and ensure a smooth go-live.",
      activityTime: "Step 4",
    },
    {
      id: 5,
      type: "open",
      title: "Support: Optimize & Grow",
      description: "We provide ongoing support and continuous improvement.",
      activityTime: "Step 5",
    },
  ],
};

const seedSteps = async (prisma: PrismaClient) => {
  console.log("Seeding approach steps...");

  const steps = await prisma.approachStep.createManyAndReturn({
    data: approachesData.steps.map((step) => ({
      stepId: step.id,
      type: step.type,
      title: step.title,
      description: step.description,
      activityTime: step.activityTime,
    })),
  });

  console.log(`✓ Seeded ${steps.length} approach steps`);

  return steps;
};

const seed = async (
  prisma: PrismaClient,
  seededSteps?: SeededApproachSteps,
) => {
  console.log("Seeding approach section...");

  const steps = seededSteps ?? (await seedSteps(prisma));

  const approach = await prisma.approach.create({
    data: {
      title: approachesData.title,
      description: approachesData.description,
      steps: {
        connect: steps.map((step) => ({ id: step.id })),
      },
    },
  });

  console.log(`✓ Seeded approach section with ${approach.id}`);

  return approach;
};

const Approaches = {
  data: approachesData,
  seedSteps,
  seed,
};

export default Approaches;
