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

  const map = await prisma.map.createManyAndReturn({
    data: mapPageContent.map((section) => ({
      title: section.title,
      subheading: section.subheading,
      description: section.description,
      languageId: languages.find(
        (language) => language.value === section.language.value,
      )?.id,
    })),
  });

  console.log(`✓ Seeded map objects: ${map.length}`);

  return map;
};

const Maps = {
  data: mapPageContent,
  seed,
};

export default Maps;
