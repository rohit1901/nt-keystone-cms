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

  // Check if stat already exists for this language
  const existingStat = await prisma.analyticsStat.findFirst({
    where: {
      languageId: languageId,
      totalDeployments: statsData.totalDeployments,
    },
  });

  if (existingStat) {
    console.log(
      `✓ Analytics stats for ${statsData.language.value} already exist (id: ${existingStat.id}), skipping`,
    );
    return existingStat;
  }

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

  console.log(`✓ Created analytics stats with id ${stat.id}`);

  return stat;
};

const seedSummaryItems = async (
  prisma: PrismaClient,
  summaryData: AnalyticsData["summary"],
  languageId: number,
) => {
  console.log(`Seeding analytics summary items...`);

  // Check for existing summary items
  const existingItems = await prisma.analyticsSummaryItem.findMany({
    where: {
      languageId: languageId,
      name: { in: summaryData.map((item) => item.name) },
    },
  });

  const existingNames = new Set(existingItems.map((item) => item.name));

  // Only create items that don't exist
  const itemsToCreate = summaryData.filter(
    (item) => !existingNames.has(item.name),
  );

  const newItems = [];
  if (itemsToCreate.length > 0) {
    for (const item of itemsToCreate) {
      const summaryItem = await prisma.analyticsSummaryItem.create({
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
      });
      newItems.push(summaryItem);
    }
    console.log(`✓ Created ${newItems.length} new analytics summary items`);
  } else {
    console.log(
      `✓ All analytics summary items already exist for this language, skipping creation`,
    );
  }

  // Return all items (existing + newly created)
  const allItems = await prisma.analyticsSummaryItem.findMany({
    where: {
      languageId: languageId,
      name: { in: summaryData.map((item) => item.name) },
    },
  });

  console.log(`✓ Total analytics summary items: ${allItems.length}`);

  return allItems;
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

    // Check if analytic section already exists for this language
    const existingAnalytic = await prisma.analytic.findFirst({
      where: {
        languageId: languageId,
      },
      include: {
        stats: true,
        summary: true,
      },
    });

    if (existingAnalytic) {
      console.log(
        `✓ Analytics section for ${locale} already exists (id: ${existingAnalytic.id}), skipping`,
      );
      seededAnalytics.push(existingAnalytic);
      continue;
    }

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
        tableHeadings: resolveTableHeadingValues(data.tableHeadings),
        summary: {
          connect: summaryItems.map((item) => ({ id: item.id })),
        },
        language: {
          connect: { id: languageId },
        },
      },
    });

    console.log(`✓ Created analytics section with id ${analytic.id}`);
    seededAnalytics.push(analytic);
  }

  console.log(`✓ Total analytics sections: ${seededAnalytics.length}`);

  return seededAnalytics;
};

const clear = async (prisma: PrismaClient) => {
  console.log("Clearing analytics sections...");
  const analyticsResult = await prisma.analytic.deleteMany({});
  console.log(`Deleted ${analyticsResult.count} analytics section(s).`);

  console.log("Clearing analytics stats...");
  const statsResult = await prisma.analyticsStat.deleteMany({});
  console.log(`Deleted ${statsResult.count} analytics stat(s).`);

  console.log("Clearing analytics summary items...");
  const summaryResult = await prisma.analyticsSummaryItem.deleteMany({});
  console.log(`Deleted ${summaryResult.count} analytics summary item(s).`);
};

const Analytics = {
  data: analyticsSeedData,
  seedStat,
  seedSummaryItems,
  seed,
  clear,
};

export default Analytics;
