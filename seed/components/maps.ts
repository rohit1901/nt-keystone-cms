import type { PrismaClient } from "@prisma/client";
import { MapSection } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededMap = Awaited<ReturnType<typeof seed>>;

const mapPageContent: MapSection[] = [
  {
    title: "Global Reach, Local Expertise",
    subheading: "Expert Software & Cloud Consulting, Wherever You Are",
    description:
      "Our team operates from Germany, collaborating with enterprises and startups worldwide to architect, build, and optimize custom software and cloud systems.",
    language: {
      value: "en-US",
      label: "English",
    },
  },
  {
    title: "Globale Reach, Lokale Expertise",
    subheading: "Experte Software & Cloud Consulting, Woandershin",
    description:
      "Unsere Teamarbeit erfolgt aus Deutschland, wo wir mit Unternehmen und Startups weltweit zusammenarbeiten, um benutzerdefinierte Software und Cloud-Systeme zu architekturieren, zu erstellen und zu optimieren.",
    language: {
      value: "de-DE",
      label: "German",
    },
  },
];

const seed = async (prisma: PrismaClient, languages: SeededFooterLanguages) => {
  console.log("Seeding map content...");

  // Get all existing maps to check for duplicates
  const existingMaps = await prisma.map.findMany({
    select: { id: true, title: true, subheading: true, languageId: true },
  });

  // Create unique keys based on title + languageId
  const existingMapKeys = new Set(
    existingMaps.map((map) => `${map.title}|${map.languageId}`)
  );

  // Filter out maps that already exist
  const mapsToCreate = mapPageContent
    .map((section) => {
      const languageId = languages.find(
        (language) => language.value === section.language.value,
      )?.id;

      if (!languageId) {
        console.warn(`! Language not found: ${section.language.value}`);
        return null;
      }

      return {
        title: section.title,
        subheading: section.subheading,
        description: section.description,
        languageId,
        key: `${section.title}|${languageId}`,
      };
    })
    .filter((map): map is NonNullable<typeof map> => map !== null)
    .filter(({ key }) => !existingMapKeys.has(key));

  let newMapsCount = 0;
  let seededMaps = [...existingMaps];

  if (mapsToCreate.length > 0) {
    const newMaps = await prisma.map.createManyAndReturn({
      data: mapsToCreate.map(({ key, ...data }) => data),
    });
    newMapsCount = newMaps.length;
    seededMaps = [...existingMaps, ...newMaps];
    console.log(`✓ Created ${newMapsCount} new map(s)`);
  } else {
    console.log(`✓ All maps already exist, skipping creation`);
  }

  console.log(`✓ Total maps in database: ${seededMaps.length}`);
  return seededMaps;
};

const clear = async (prisma: PrismaClient) => {
  console.log('Clearing all maps...');
  const result = await prisma.map.deleteMany({});
  console.log(`✓ Deleted ${result.count} map(s)`);
};

const Maps = {
  data: mapPageContent,
  seed,
  clear,
};

export default Maps;
