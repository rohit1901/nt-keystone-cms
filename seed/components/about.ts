import type { PrismaClient } from "@prisma/client";
import { AboutSection, Value } from "../../data";

export type SeededValues = Awaited<ReturnType<typeof seedValues>>;
export type SeededAbout = Awaited<ReturnType<typeof seed>>;

const aboutData: readonly AboutSection[] = [
  {
    heading: "About Nimbus Tech",
    intro:
      "With over 14 years of experience in software development, architecture, and cloud, Nimbus Tech is your trusted partner for robust, scalable, and innovative digital solutions. Co-founded in Germany by experienced software architects, we combine deep technical expertise with a passion for solving complex challenges and delivering real business value.",
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
      "At Nimbus Tech, we are passionate about guiding you through every step of your digital transformation journey.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    heading: "Über Nimbus Tech",
    intro:
      "Mit über 14 Jahren Erfahrung in Softwareentwicklung, Architektur und Cloud ist Nimbus Tech Ihr verlässlicher Partner für robuste, skalierbare und innovative digitale Lösungen. Gegründet in Deutschland von erfahrenen Softwarearchitekt:innen verbinden wir tiefgehende technische Expertise mit der Leidenschaft, komplexe Herausforderungen zu meistern und messbaren Geschäftswert zu schaffen.",
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
      "Bei Nimbus Tech begleiten wir Sie engagiert auf Ihrem Weg der digitalen Transformation.",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
];

const seedValues = async (prisma: PrismaClient) => {
  console.log("Seeding about values...");

  const input: Value[] = aboutData.flatMap((a) => a.values);

  // createMany does NOT return created records, only a count
  const values = await prisma.value.createManyAndReturn({
    data: input.map((value) => ({
      label: value.label,
      description: value.description,
      icon: value.icon,
    })),
    skipDuplicates: true,
  });

  console.log(`✓ Seeded ${values.length} about values`);

  return values;
};

const seed = async (prisma: PrismaClient, seededValues?: SeededValues) => {
  console.log("Seeding about section...");

  const values = seededValues ?? (await seedValues(prisma));
  const foundEnglish = await prisma.language.findFirstOrThrow({
    where: { value: "en-US" },
  });
  const foundGerman = await prisma.language.findFirstOrThrow({
    where: { value: "de-DE" },
  });

  // Since you want to connect relations, use create in a loop or a transaction
  const aboutSections = await prisma.$transaction(
    aboutData.map((data) =>
      prisma.about.create({
        data: {
          heading: data.heading,
          intro: data.intro,
          valuesTitle: data.valuesTitle,
          values: {
            connect: values.filter((value) => ({ id: value.id })),
          },
          closing: data.closing,
          language: {
            connect: {
              id:
                data.language.value === "en-US"
                  ? foundEnglish.id
                  : foundGerman.id,
            },
          },
        },
      }),
    ),
  );

  console.log(`✓ Seeded ${aboutSections.length} about sections`);

  return aboutSections;
};

const About = {
  data: aboutData,
  seedValues,
  seed,
};

export default About;
