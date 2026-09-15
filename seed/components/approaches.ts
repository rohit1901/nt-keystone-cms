import type { PrismaClient } from "../prisma";
import { approachesData } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededApproachSteps = Awaited<ReturnType<typeof seedSteps>>;
export type SeededApproach = Awaited<ReturnType<typeof seed>>;

const seedSteps = async (
  prisma: PrismaClient,
  languages: SeededFooterLanguages,
) => {
  console.log("Seeding approach steps...");

  const languageIdByValue = new Map(
    languages.map((language) => [language.value, language.id]),
  );

  // Flatten all steps from all approaches and resolve their language once.
  const allSteps = approachesData.flatMap((approach) => approach.steps);
  const resolvedSteps = allSteps
    .map((step) => {
      const languageId = languageIdByValue.get(step.language.value);

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
    .filter((step): step is NonNullable<typeof step> => step !== null);

  // Get only existing steps matching known seed keys.
  const existingSteps = await prisma.approachStep.findMany({
    where: {
      OR: resolvedSteps.map(({ stepId, title, languageId }) => ({
        stepId,
        title,
        languageId,
      })),
    },
    select: {
      id: true,
      stepId: true,
      title: true,
      languageId: true,
    },
  });
  const existingStepKeys = new Set(
    existingSteps.map(
      (step) => `${step.stepId}|${step.title}|${step.languageId}`,
    ),
  );
  const stepsToCreate = resolvedSteps.filter(
    ({ key }) => !existingStepKeys.has(key),
  );

  let newStepsCount = 0;
  let seededSteps = [...existingSteps];

  if (stepsToCreate.length > 0) {
    const newSteps = await prisma.approachStep.createManyAndReturn({
      data: stepsToCreate.map(({ key, ...data }) => data),
    });
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

  const languageIdByValue = new Map(
    languages.map((language) => [language.value, language.id]),
  );
  const approachKeys = approachesData.flatMap((approach) => {
    const languageId = languageIdByValue.get(approach.language.value);
    return languageId ? [{ title: approach.title, languageId }] : [];
  });

  // Get only existing approaches matching known seed keys.
  const existingApproaches = await prisma.approach.findMany({
    where: { OR: approachKeys },
    select: { id: true, title: true, languageId: true },
  });

  // Create unique keys based on title + languageId
  const existingApproachKeys = new Set(
    existingApproaches.map((approach) => `${approach.title}|${approach.languageId}`)
  );

  // Filter out approaches that already exist
  const approachesToCreate = approachesData.filter((approachData) => {
    const languageId = languageIdByValue.get(approachData.language.value);
    const key = `${approachData.title}|${languageId}`;
    return !existingApproachKeys.has(key);
  });

  const seededApproaches = [...existingApproaches];

  if (approachesToCreate.length > 0) {
    const newApproaches = await Promise.all(
      approachesToCreate.map(async (approachData) => {
        const languageId = languageIdByValue.get(
          approachData.language.value,
        );

        if (!languageId) {
          console.warn(`! Language not found: ${approachData.language.value}`);
          return null;
        }

        // Find steps that match this approach's language and step IDs.
        const approachStepIds = new Set(
          approachData.steps.map((step) => step.id),
        );
        const matchingSteps = allSteps.filter(
          (step) =>
            step.languageId === languageId &&
            approachStepIds.has(step.stepId),
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
