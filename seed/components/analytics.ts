import type { PrismaClient } from "@prisma/client";
import { analyticsData as analyticsSeedData } from "../../data/data";

export type SeededAnalyticsStat = Awaited<ReturnType<typeof seedStat>>;
export type SeededAnalyticsSummaryItems = Awaited<
  ReturnType<typeof seedSummaryItems>
>;
export type SeededAnalytics = Awaited<ReturnType<typeof seed>>;

const tableHeadingValueMap: Record<string, string> = {
  Project: "project",
  Deployments: "deployments",
  Uptime: "uptime",
  "Client Sat.": "clientSatisfaction",
  Efficiency: "efficiency",
  "Revenue Growth": "revenueGrowth",
};

const resolveTableHeadingValues = () => {
  return analyticsSeedData.tableHeadings.map((heading) => {
    const value = tableHeadingValueMap[heading];
    if (!value) {
      throw new Error(`Unsupported analytics table heading: ${heading}`);
    }
    return value;
  });
};

const seedStat = async (prisma: PrismaClient) => {
  console.log("Seeding analytics stats...");

  const stat = await prisma.analyticsStat.create({
    data: {
      totalDeployments: analyticsSeedData.stats.totalDeployments,
      deploymentChange: analyticsSeedData.stats.deploymentChange,
      deploymentChangePercent: analyticsSeedData.stats.deploymentChangePercent,
      changePeriod: analyticsSeedData.stats.changePeriod,
    },
  });

  console.log(`✓ Seeded analytics stats with id ${stat.id}`);

  return stat;
};

const seedSummaryItems = async (prisma: PrismaClient) => {
  console.log("Seeding analytics summary items...");

  const summaryItems = await prisma.analyticsSummaryItem.createManyAndReturn({
    data: analyticsSeedData.summary.map((item) => ({
      name: item.name,
      deployments: item.deployments,
      uptime: item.uptime,
      clientSatisfaction: item.clientSatisfaction,
      efficiency: item.efficiency,
      revenueGrowth: item.revenueGrowth,
      bgColor: item.bgColor,
      changeType: item.changeType,
    })),
  });

  console.log(`✓ Seeded ${summaryItems.length} analytics summary items`);

  return summaryItems;
};

const seed = async (
  prisma: PrismaClient,
  seededStat?: SeededAnalyticsStat,
  seededSummaryItems?: SeededAnalyticsSummaryItems,
) => {
  console.log("Seeding analytics section...");

  const stat = seededStat ?? (await seedStat(prisma));
  const summaryItems = seededSummaryItems ?? (await seedSummaryItems(prisma));

  const analytic = await prisma.analytic.create({
    data: {
      heading: analyticsSeedData.heading,
      subheading: analyticsSeedData.subheading,
      stats: {
        connect: { id: stat.id },
      },
      tableHeadings: JSON.stringify(resolveTableHeadingValues()),
      summary: {
        connect: summaryItems.map((item) => ({ id: item.id })),
      },
    },
  });

  console.log(`✓ Seeded analytics section with id ${analytic.id}`);

  return analytic;
};

const Analytics = {
  data: analyticsSeedData,
  seedStat,
  seedSummaryItems,
  seed,
};

export default Analytics;
