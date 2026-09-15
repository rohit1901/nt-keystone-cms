import type { PrismaClient } from "../prisma";
import { analyticsSeedData, tableHeadingValueMap, AnalyticsData } from "../../data";

export type SeededAnalyticsStat = Awaited<ReturnType<typeof seedStat>>;
export type SeededAnalyticsSummaryItems = Awaited<
  ReturnType<typeof seedSummaryItems>
>;
export type SeededAnalytics = Awaited<ReturnType<typeof seed>>;

const resolveTableHeadingValues = (headings: string[]) => {
  return headings.map((heading) => {
    const value = tableHeadingValueMap[heading];
    if (!value) {
      throw new Error(`Unsupported analytics table heading: ${heading}`);
    }
    return value;
  });
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
      languageId,
      totalDeployments: statsData.totalDeployments,
    },
    select: { id: true },
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
      languageId,
      name: { in: summaryData.map((item) => item.name) },
    },
    select: { id: true, name: true },
  });

  const existingNames = new Set(existingItems.map((item) => item.name));

  // Only create items that don't exist
  const itemsToCreate = summaryData.filter(
    (item) => !existingNames.has(item.name),
  );

  let seededItems = existingItems;
  if (itemsToCreate.length > 0) {
    const newItems = await prisma.analyticsSummaryItem.createManyAndReturn({
      data: itemsToCreate.map((item) => ({
        name: item.name,
        deployments: item.deployments,
        uptime: item.uptime,
        clientSatisfaction: item.clientSatisfaction,
        efficiency: item.efficiency,
        revenueGrowth: item.revenueGrowth,
        bgColor: item.bgColor,
        changeType: item.changeType,
        languageId,
      })),
    });
    seededItems = [...existingItems, ...newItems];
    console.log(`✓ Created ${newItems.length} new analytics summary items`);
  } else {
    console.log(
      `✓ All analytics summary items already exist for this language, skipping creation`,
    );
  }

  console.log(`✓ Total analytics summary items: ${seededItems.length}`);

  return seededItems;
};

const seed = async (prisma: PrismaClient) => {
  console.log("Seeding analytics section...");

  const locales = analyticsSeedData.map(({ language }) => language.value);
  const languages = await prisma.language.findMany({
    where: { value: { in: locales } },
    select: { id: true, value: true },
  });
  const languageIdByValue = new Map(
    languages.map((language) => [language.value, language.id]),
  );
  const englishId = languageIdByValue.get("en-US");
  const germanId = languageIdByValue.get("de-DE");
  if (!englishId || !germanId) {
    throw new Error("English and German languages must be seeded first");
  }
  const existingAnalytics = await prisma.analytic.findMany({
    where: { languageId: { in: [englishId, germanId] } },
    select: { id: true, languageId: true },
  });
  const existingAnalyticByLanguageId = new Map(
    existingAnalytics.map((analytic) => [analytic.languageId, analytic]),
  );

  const seededAnalytics = await Promise.all(
    analyticsSeedData.map(async (data) => {
      const locale = data.language.value;
      const languageId = languageIdByValue.get(locale)!;

      console.log(`Processing Analytics data for ${locale}`);

      const existingAnalytic = existingAnalyticByLanguageId.get(languageId);
      if (existingAnalytic) {
        console.log(
          `✓ Analytics section for ${locale} already exists (id: ${existingAnalytic.id}), skipping`,
        );
        return existingAnalytic;
      }

      const [stat, summaryItems] = await Promise.all([
        seedStat(prisma, data.stats, languageId),
        seedSummaryItems(prisma, data.summary, languageId),
      ]);

      const analytic = await prisma.analytic.create({
        data: {
          heading: data.heading,
          subheading: data.subheading,
          stats: { connect: { id: stat.id } },
          tableHeadings: resolveTableHeadingValues(data.tableHeadings),
          summary: {
            connect: summaryItems.map((item) => ({ id: item.id })),
          },
          language: { connect: { id: languageId } },
        },
      });

      console.log(`✓ Created analytics section with id ${analytic.id}`);
      return analytic;
    }),
  );

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
