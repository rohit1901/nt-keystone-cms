import type { PrismaClient } from "@prisma/client";
import { aboutUsContent } from "../../data/data";

export type SeededValues = Awaited<ReturnType<typeof seedValues>>;
export type SeededAbout = Awaited<ReturnType<typeof seed>>;

const aboutData = aboutUsContent;

const seedValues = async (prisma: PrismaClient) => {
  console.log("Seeding about values...");

  const values = await prisma.value.createManyAndReturn({
    data: aboutData.values.map((value) => ({
      label: value.label,
      description: value.description,
      icon: value.icon,
    })),
  });

  console.log(`✓ Seeded ${values.length} about values`);

  return values;
};

const seed = async (
  prisma: PrismaClient,
  seededValues?: SeededValues,
) => {
  console.log("Seeding about section...");

  const values = seededValues ?? (await seedValues(prisma));

  const about = await prisma.about.create({
    data: {
      heading: aboutData.heading,
      intro: aboutData.intro,
      valuesTitle: aboutData.valuesTitle,
      values: {
        connect: values.map((value) => ({ id: value.id })),
      },
      closing: aboutData.closing,
    },
  });

  console.log(`✓ Seeded about section with ${about.id}`);

  return about;
};

const About = {
  data: aboutData,
  seedValues,
  seed,
};

export default About;
