import type { PrismaClient } from "@prisma/client";
import { mapPageContent } from "../../data";

export type SeededMap = Awaited<ReturnType<typeof seed>>;

const seed = async (prisma: PrismaClient) => {
  console.log("Seeding map content...");

  const map = await prisma.map.create({
    data: {
      title: mapPageContent.title,
      subheading: mapPageContent.subheading,
      description: mapPageContent.description,
    },
  });

  console.log(`✓ Seeded map content with id ${map.id}`);

  return map;
};

const Maps = {
  data: mapPageContent,
  seed,
};

export default Maps;
