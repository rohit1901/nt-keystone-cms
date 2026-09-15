import { PrismaClient } from "../prisma";
import { featuresData } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededFeatures = Awaited<ReturnType<typeof seed>>;

const seed = async (prisma: PrismaClient, languages: SeededFooterLanguages) => {
  const languageIdByValue = new Map(
    languages.map((language) => [language.value, language.id]),
  );
  const featureKeys = featuresData.flatMap((feature) => {
    const languageId = languageIdByValue.get(feature.language.value);
    return languageId ? [{ featureId: feature.featureId, languageId }] : [];
  });

  // Get existing seeded features to check for duplicates
  const existingFeatures = await prisma.feature.findMany({
    where: { OR: featureKeys },
    select: { id: true, featureId: true, languageId: true },
  });

  // Create unique keys based on featureId + languageId
  const existingFeatureKeys = new Set(
    existingFeatures.map((feature) => `${feature.featureId}|${feature.languageId}`)
  );

  // Filter out features that already exist
  const featuresToCreate = featuresData
    .map((feature) => {
      const languageId = languageIdByValue.get(feature.language.value);

      if (!languageId) {
        console.warn(`! Language not found: ${feature.language.value}`);
        return null;
      }

      return {
        featureId: feature.featureId,
        title: feature.title,
        description: feature.description,
        longDescription: feature.longDescription,
        visualization: feature.visualization,
        languageId,
        key: `${feature.featureId}|${languageId}`,
      };
    })
    .filter((feature): feature is NonNullable<typeof feature> => feature !== null)
    .filter(({ key }) => !existingFeatureKeys.has(key));

  let newFeaturesCount = 0;
  let seededFeatures = [...existingFeatures];

  if (featuresToCreate.length > 0) {
    const newFeatures = await prisma.feature.createManyAndReturn({
      data: featuresToCreate.map(({ key, ...data }) => data),
    });
    newFeaturesCount = newFeatures.length;
    seededFeatures = [...existingFeatures, ...newFeatures];
    console.log(`✓ Created ${newFeaturesCount} new feature(s)`);
  } else {
    console.log(`✓ All features already exist, skipping creation`);
  }

  console.log(`✓ Total features in database: ${seededFeatures.length}`);
  return seededFeatures;
};

const clear = async (prisma: PrismaClient) => {
  console.log('Clearing all features...');
  const result = await prisma.feature.deleteMany({});
  console.log(`✓ Deleted ${result.count} feature(s)`);
};

const Features = {
  data: featuresData,
  seed,
  clear,
};

export default Features;
