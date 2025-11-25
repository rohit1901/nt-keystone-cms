// seed.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { mapSection, navigationSection } from "./data";

const prisma = new PrismaClient();

const seedMap = async () => {
  const type = mapSection.type;
  if (type !== "map") {
    throw new Error("Invalid map section type");
  }
  const sectionRecord = await prisma.mapSection.create({
    data: {
      title: mapSection.content.title,
      description: mapSection.content.description,
      subheading: mapSection.content.subheading,
    },
  });
  console.log(`Section seeded: ${sectionRecord.title}`);
};

const seedNavigationItems = async () => {
  if (navigationSection.type !== "navigation") {
    throw new Error("Invalid navigation section type");
  }
  const items = navigationSection.content.items;
  items.forEach(async (item) => {
    const itemRecord = await prisma.navigationSectionItem.create({
      data: {
        ...item,
      },
    });
    console.log(`Item seeded: ${itemRecord.id}`);
  });
};

const seedNavigationSection = async () => {
  if (navigationSection.type !== "navigation") {
    throw new Error("Invalid navigation section type");
  }
  const createdItems = await prisma.navigationSectionItem.findMany({
    where: {
      label: { in: navigationSection.content.items.map((item) => item.label) },
    },
  });
  const sectionRecord = await prisma.navigationSection.create({
    data: {
      items: {
        connect: createdItems.map((item) => ({ id: item.id })),
      },
    },
  });
  console.log(`Section seeded: ${sectionRecord.id}`);
};

async function main() {
  console.log("Seeding Keystone DB...");

  // Seed Map
  await seedMap();

  // Seed Navigation Items
  await seedNavigationItems();

  // Seed Navigation Section
  await seedNavigationSection();

  console.log("Seeding complete!");
  await prisma.$disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
