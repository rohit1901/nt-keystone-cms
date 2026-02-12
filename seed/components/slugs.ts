import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Slug } from "../../data";

export type SeededSlugs = Awaited<ReturnType<typeof seed>>;

// --- Slug data ---
export const slugs: Slug[] = [
  "main",
  "certification",
  "cta",
  "hero",
  "navigation",
  "testimonial",
  "footer",
  "resume"
];

const seed = async (prisma: PrismaClient) => {
  // Get all existing types (slugs) to check for duplicates
  const existingTypes = await prisma.type.findMany({
    select: { id: true, label: true },
  });

  const existingLabels = new Set(existingTypes.map(type => type.label));

  // Prepare data for types that don't already exist
  const typesToCreate = slugs.filter(slug => !existingLabels.has(slug));

  let newTypesCount = 0;
  let seededTypes = [...existingTypes];

  if (typesToCreate.length > 0) {
    const newTypes = await prisma.type.createManyAndReturn({
      data: typesToCreate.map(slug => ({ label: slug })),
    });
    newTypesCount = newTypes.length;
    seededTypes = [...existingTypes, ...newTypes];
    console.log(`✓ Created ${newTypesCount} new type(s): ${typesToCreate.join(", ")}`);
  } else {
    console.log(`✓ All types already exist, skipping creation`);
  }

  console.log(`✓ Total types in database: ${seededTypes.length} (${slugs.join(", ")})`);
  return seededTypes;
};

const clear = async (prisma: PrismaClient) => {
  console.log('Clearing all types (slugs)...');
  const result = await prisma.type.deleteMany({});
  console.log(`✓ Deleted ${result.count} type(s)`);
};

const Slugs = {
  data: slugs,
  seed,
  clear,
};

export default Slugs;
