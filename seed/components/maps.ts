import type { PrismaClient } from "@prisma/client";

export type SeededMap = Awaited<ReturnType<typeof seed>>;
const mapPageContent = {
  title: "Global Reach, Local Expertise",
  subheading: "Expert Software & Cloud Consulting, Wherever You Are",
  description:
    "Our team operates from Germany, collaborating with enterprises and startups worldwide to architect, build, and optimize custom software and cloud systems.",
};

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
