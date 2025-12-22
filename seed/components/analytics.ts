import type { PrismaClient } from "@prisma/client";
import { AnalyticsData } from "../../data";

export type SeededAnalyticsStat = Awaited<ReturnType<typeof seedStat>>;
export type SeededAnalyticsSummaryItems = Awaited<
  ReturnType<typeof seedSummaryItems>
>;
export type SeededAnalytics = Awaited<ReturnType<typeof seed>>;

const analyticsSeedData: AnalyticsData[] = [
  // English (en-US)
  {
    heading: "Project Performance Overview",
    subheading:
      "Expert insights into deployments, uptime, and client satisfaction across key Nimbus Tech projects.",
    stats: {
      totalDeployments: "305",
      deploymentChange: "+25 deployments",
      deploymentChangePercent: "8.9",
      changePeriod: "Last quarter",
      language: {
        label: "English",
        value: "en-US",
      },
    },
    tableHeadings: [
      "Project",
      "Deployments",
      "Uptime",
      "Client Sat.",
      "Efficiency",
      "Revenue Growth",
    ],
    summary: [
      {
        name: "Project Nimbus",
        deployments: "120",
        uptime: "99.9%",
        clientSatisfaction: "+4.8",
        efficiency: "+7.2%",
        revenueGrowth: "+12.5%",
        bgColor: "bg-blue-500",
        changeType: "positive",
        language: {
          label: "English",
          value: "en-US",
        },
      },
      {
        name: "Cloud Migration",
        deployments: "85",
        uptime: "99.7%",
        clientSatisfaction: "+3.9",
        efficiency: "+5.4%",
        revenueGrowth: "+8.3%",
        bgColor: "bg-green-500",
        changeType: "positive",
        language: {
          label: "English",
          value: "en-US",
        },
      },
      {
        name: "Enterprise App",
        deployments: "60",
        uptime: "98.5%",
        clientSatisfaction: "-1.2",
        efficiency: "-2.5%",
        revenueGrowth: "-3.8%",
        bgColor: "bg-yellow-400",
        changeType: "negative",
        language: {
          label: "English",
          value: "en-US",
        },
      },
    ],
    language: {
      label: "English",
      value: "en-US",
    },
  },
  // German (de-DE)
  {
    heading: "Projekt-Leistungsübersicht",
    subheading:
      "Experteneinblicke in Deployments, Betriebszeit und Kundenzufriedenheit bei wichtigen Nimbus Tech-Projekten.",
    stats: {
      totalDeployments: "305",
      deploymentChange: "+25 Deployments",
      deploymentChangePercent: "8.9",
      changePeriod: "Letztes Quartal",
      language: {
        label: "German",
        value: "de-DE",
      },
    },
    tableHeadings: [
      "Projekt",
      "Deployments",
      "Betriebszeit",
      "Kundenzufriedenheit",
      "Effizienz",
      "Umsatzwachstum",
    ],
    summary: [
      {
        name: "Project Nimbus",
        deployments: "120",
        uptime: "99.9%",
        clientSatisfaction: "+4.8",
        efficiency: "+7.2%",
        revenueGrowth: "+12.5%",
        bgColor: "bg-blue-500",
        changeType: "positive",
        language: {
          label: "German",
          value: "de-DE",
        },
      },
      {
        name: "Cloud-Migration",
        deployments: "85",
        uptime: "99.7%",
        clientSatisfaction: "+3.9",
        efficiency: "+5.4%",
        revenueGrowth: "+8.3%",
        bgColor: "bg-green-500",
        changeType: "positive",
        language: {
          label: "German",
          value: "de-DE",
        },
      },
      {
        name: "Unternehmens-App",
        deployments: "60",
        uptime: "98.5%",
        clientSatisfaction: "-1.2",
        efficiency: "-2.5%",
        revenueGrowth: "-3.8%",
        bgColor: "bg-yellow-400",
        changeType: "negative",
        language: {
          label: "German",
          value: "de-DE",
        },
      },
    ],
    language: {
      label: "German",
      value: "de-DE",
    },
  },
];

const tableHeadingValueMap: Record<string, string> = {
  // English
  Project: "project",
  Deployments: "deployments",
  Uptime: "uptime",
  "Client Sat.": "clientSatisfaction",
  Efficiency: "efficiency",
  "Revenue Growth": "revenueGrowth",
  // German mappings
  Projekt: "project",
  Betriebszeit: "uptime",
  Kundenzufriedenheit: "clientSatisfaction",
  Effizienz: "efficiency",
  Umsatzwachstum: "revenueGrowth",
};

const resolveTableHeadingValues = (headings: string[]) => {
  return headings.map((heading) => {
    const value = tableHeadingValueMap[heading];
    if (!value) {
      throw new Error(`Unsupported analytics table heading: ${heading}`);
    }
    return value;
  });
};

const getLanguageId = async (prisma: PrismaClient, locale: string) => {
  const language = await prisma.language.findFirstOrThrow({
    where: { value: locale },
  });
  return language.id;
};

const seedStat = async (
  prisma: PrismaClient,
  statsData: AnalyticsData["stats"],
  languageId: number,
) => {
  console.log(`Seeding analytics stats for ${statsData.language.value}...`);

  const stat = await prisma.analyticsStat.create({
    data: {
      totalDeployments: statsData.totalDeployments,
      deploymentChange: statsData.deploymentChange,
      deploymentChangePercent: statsData.deploymentChangePercent,
      changePeriod: statsData.changePeriod,
      language: {
        connect: { id: languageId },
      },
    },
  });

  console.log(`✓ Seeded analytics stats with id ${stat.id}`);

  return stat;
};

const seedSummaryItems = async (
  prisma: PrismaClient,
  summaryData: AnalyticsData["summary"],
  languageId: number,
) => {
  console.log(`Seeding analytics summary items...`);

  const summaryItems = await Promise.all(
    summaryData.map((item) =>
      prisma.analyticsSummaryItem.create({
        data: {
          name: item.name,
          deployments: item.deployments,
          uptime: item.uptime,
          clientSatisfaction: item.clientSatisfaction,
          efficiency: item.efficiency,
          revenueGrowth: item.revenueGrowth,
          bgColor: item.bgColor,
          changeType: item.changeType,
          language: {
            connect: { id: languageId },
          },
        },
      }),
    ),
  );

  console.log(`✓ Seeded ${summaryItems.length} analytics summary items`);

  return summaryItems;
};

const seed = async (prisma: PrismaClient) => {
  console.log("Seeding analytics section...");

  const englishId = await getLanguageId(prisma, "en-US");
  const germanId = await getLanguageId(prisma, "de-DE");

  const seededAnalytics = [];

  for (const data of analyticsSeedData) {
    const locale = data.language?.value;
    const languageId = locale === "de-DE" ? germanId : englishId;

    console.log(`Processing Analytics data for ${locale}`);

    const stat = await seedStat(prisma, data.stats, languageId);
    const summaryItems = await seedSummaryItems(
      prisma,
      data.summary,
      languageId,
    );

    const analytic = await prisma.analytic.create({
      data: {
        heading: data.heading,
        subheading: data.subheading,
        stats: {
          connect: { id: stat.id },
        },
        // FIX: Remove JSON.stringify to pass the array directly
        tableHeadings: resolveTableHeadingValues(data.tableHeadings),
        summary: {
          connect: summaryItems.map((item) => ({ id: item.id })),
        },
        language: {
          connect: { id: languageId },
        },
      },
    });

    console.log(`✓ Seeded analytics section with id ${analytic.id}`);
    seededAnalytics.push(analytic);
  }

  return seededAnalytics;
};

const Analytics = {
  data: analyticsSeedData,
  seedStat,
  seedSummaryItems,
  seed,
};

export default Analytics;
