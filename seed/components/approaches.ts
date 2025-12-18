import type { PrismaClient } from "@prisma/client";
import type { OurApproachContent } from "../../data/types";
import { ourApproachContent } from "../../data";

export type SeededApproachSteps = Awaited<ReturnType<typeof seedSteps>>;
export type SeededApproach = Awaited<ReturnType<typeof seed>>;

const approachesData: OurApproachContent = ourApproachContent;

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
