import type { Language, PrismaClient } from "@prisma/client";
import { AboutSection } from "../../data";

export type SeededValues = Awaited<ReturnType<typeof seedValues>>;
export type SeededAbout = Awaited<ReturnType<typeof seed>>;

const aboutData: readonly AboutSection[] = [
  {
    heading: "About Nimbus Tech",
    intro:
      "Nimbus Tech is an AWS-focused cloud consulting and software engineering company based in Germany. With more than 14 years of experience in software development and architecture, we help small, mid-market, and enterprise businesses in the DACH region design, migrate, and operate reliable systems on AWS – always with clear communication and business value in mind.",
    valuesTitle: "Our Values",
    values: [
      {
        label: "Excellence",
        description:
          "Technical excellence and continuous improvement in every project.",
        icon: "RiAwardFill",
      },
      {
        label: "Transparency",
        description:
          "Open communication and honest advice at every stage of the collaboration.",
        icon: "RiMoneyEuroBoxFill",
      },
      {
        label: "Collaboration",
        description:
          "Building the best solutions together with our clients and partners.",
        icon: "RiFlashlightFill",
      },
      {
        label: "Reliability",
        description:
          "Consistent delivery, measurable outcomes, and long-term support.",
        icon: "RiShieldCheckFill",
      },
      {
        label: "Innovation",
        description:
          "Embracing emerging technologies and bold ideas to create lasting impact.",
        icon: "RiLightbulbFill",
      },
    ],
    closing:
      "At Nimbus Tech, we combine deep AWS expertise with a practical, no-nonsense approach so your cloud projects stay understandable, transparent, and aligned with your business goals.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    heading: "Über Nimbus Tech",
    intro:
      "Nimbus Tech ist ein auf AWS spezialisiertes Cloud-Beratungs- und Software-Engineering-Unternehmen mit Sitz in Deutschland. Mit über 14 Jahren Erfahrung in Entwicklung und Architektur unterstützen wir alle Unternehmen in der DACH-Region dabei, zuverlässige Systeme auf AWS zu planen, zu migrieren und zu betreiben – mit klarer Kommunikation und echtem Geschäftsnutzen.",
    valuesTitle: "Unsere Werte",
    values: [
      {
        label: "Exzellenz",
        description:
          "Technische Exzellenz und kontinuierliche Verbesserung in jedem Projekt.",
        icon: "RiAwardFill",
      },
      {
        label: "Transparenz",
        description:
          "Offene Kommunikation und ehrliche Beratung in jeder Phase der Zusammenarbeit.",
        icon: "RiMoneyEuroBoxFill",
      },
      {
        label: "Zusammenarbeit",
        description:
          "Die besten Lösungen entstehen im engen Schulterschluss mit unseren Kund:innen.",
        icon: "RiFlashlightFill",
      },
      {
        label: "Zuverlässigkeit",
        description:
          "Verlässliche Lieferung, überprüfbare Ergebnisse und langfristige Betreuung.",
        icon: "RiShieldCheckFill",
      },
      {
        label: "Innovation",
        description:
          "Neue Technologien und mutige Ideen gezielt einsetzen, um nachhaltigen Mehrwert zu schaffen.",
        icon: "RiLightbulbFill",
      },
    ],
    closing:
      "Bei Nimbus Tech verbinden wir tiefes AWS-Know-how mit einem pragmatischen Ansatz, damit Ihre Cloud-Projekte verständlich, transparent und eng an Ihren Geschäftszielen ausgerichtet bleiben.",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
];

const seedValues = async (
  prisma: PrismaClient,
  languages?: {
    english: Pick<Language, "id" | "value">;
    german: Pick<Language, "id" | "value">;
  },
) => {
  console.log("Seeding about values...");

  const valuesWithLanguage = aboutData.flatMap((section) =>
    section.values.map((value) => ({
      label: value.label,
      description: value.description,
      icon: value.icon,
      languageValue: section.language.value,
    })),
  );

  const foundEnglish =
    languages?.english ??
    (await prisma.language.findFirstOrThrow({
      where: { value: "en-US" },
    }));
  const foundGerman =
    languages?.german ??
    (await prisma.language.findFirstOrThrow({
      where: { value: "de-DE" },
    }));

  // Check for existing values
  const existingValues = await prisma.value.findMany({
    where: {
      languageId: { in: [foundEnglish.id, foundGerman.id] },
      label: { in: valuesWithLanguage.map((value) => value.label) },
    },
  });

  const existingKeys = new Set(
    existingValues.map((v) => `${v.label}-${v.languageId}`),
  );

  // Only create values that don't exist
  const valuesToCreate = valuesWithLanguage.filter((value) => {
    const languageId =
      value.languageValue === "en-US" ? foundEnglish.id : foundGerman.id;
    const key = `${value.label}-${languageId}`;
    return !existingKeys.has(key);
  });

  let seededValues = [];
  if (valuesToCreate.length > 0) {
    seededValues = await prisma.value.createManyAndReturn({
      data: valuesToCreate.map((value) => ({
        label: value.label,
        description: value.description,
        icon: value.icon,
        languageId:
          value.languageValue === "en-US" ? foundEnglish.id : foundGerman.id,
      })),
    });
    console.log(`✓ Created ${seededValues.length} new about values`);
  } else {
    console.log(`✓ All about values already exist, skipping creation`);
  }

  // Return all values (existing + newly created)
  const values = await prisma.value.findMany({
    where: {
      languageId: { in: [foundEnglish.id, foundGerman.id] },
      label: { in: valuesWithLanguage.map((value) => value.label) },
    },
  });

  console.log(`✓ Total about values: ${values.length}`);

  return values;
};

const seed = async (prisma: PrismaClient, seededValues?: SeededValues) => {
  console.log("Seeding about section...");

  const foundEnglish = await prisma.language.findFirstOrThrow({
    where: { value: "en-US" },
  });
  const foundGerman = await prisma.language.findFirstOrThrow({
    where: { value: "de-DE" },
  });

  const values =
    seededValues ??
    (await seedValues(prisma, { english: foundEnglish, german: foundGerman }));

  // Check for existing about sections
  const existingAboutSections = await prisma.about.findMany({
    where: {
      languageId: { in: [foundEnglish.id, foundGerman.id] },
    },
    include: {
      values: true,
    },
  });

  const existingLanguageIds = new Set(
    existingAboutSections.map((section) => section.languageId),
  );

  const aboutSections = [];

  for (const data of aboutData) {
    const languageId =
      data.language.value === "en-US" ? foundEnglish.id : foundGerman.id;

    const sectionValues = values.filter(
      (value) =>
        value.languageId === languageId &&
        data.values.some((sectionValue) => sectionValue.label === value.label),
    );

    // Check if about section already exists for this language
    const existingSection = existingAboutSections.find(
      (section) => section.languageId === languageId,
    );

    if (existingSection) {
      console.log(
        `✓ About section for ${data.language.value} already exists (id: ${existingSection.id}), skipping`,
      );
      aboutSections.push(existingSection);
    } else {
      const newSection = await prisma.about.create({
        data: {
          heading: data.heading,
          intro: data.intro,
          valuesTitle: data.valuesTitle,
          values: {
            connect: sectionValues.map((value) => ({ id: value.id })),
          },
          closing: data.closing,
          language: {
            connect: {
              id: languageId,
            },
          },
        },
      });
      console.log(
        `✓ Created about section for ${data.language.value} (id: ${newSection.id})`,
      );
      aboutSections.push(newSection);
    }
  }

  console.log(`✓ Total about sections: ${aboutSections.length}`);

  return aboutSections;
};

const clear = async (prisma: PrismaClient) => {
  console.log("Clearing about sections...");
  const aboutResult = await prisma.about.deleteMany({});
  console.log(`Deleted ${aboutResult.count} about section(s).`);

  console.log("Clearing about values...");
  const valuesResult = await prisma.value.deleteMany({});
  console.log(`Deleted ${valuesResult.count} value(s).`);
};

const About = {
  data: aboutData,
  seedValues,
  seed,
  clear,
};

export default About;
