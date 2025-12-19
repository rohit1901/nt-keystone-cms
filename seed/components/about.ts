import type { PrismaClient } from "@prisma/client";

export type SeededValues = Awaited<ReturnType<typeof seedValues>>;
export type SeededAbout = Awaited<ReturnType<typeof seed>>;

const aboutData = {
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
      description: "Open communication and honest advice at all times.",
      icon: "RiMoneyEuroBoxFill",
    },
    {
      label: "Collaboration",
      description: "Building the best solutions together with our clients.",
      icon: "RiFlashlightFill",
    },
    {
      label: "Reliability",
      description: "Consistent delivery and long-term support.",
      icon: "RiShieldCheckFill",
    },
    {
      label: "Innovation",
      description: "Embracing new technologies and creative thinking.",
      icon: "RiLightbulbFill",
    },
  ],
  closing:
    "At Nimbus Tech, we are passionate about helping you succeed in your digital transformation journey.",
};

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

const seed = async (prisma: PrismaClient, seededValues?: SeededValues) => {
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
