import "dotenv/config";
import { PrismaClient } from "@prisma/client";
// Import data objects (edit paths if your file layout differs)
import {
  benefitsContent,
  certifications,
  faqs,
  analyticsData,
  // Add other exports here as needed
} from "./data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Keystone DB...");

  // Seed Benefits
  if (benefitsContent?.benefits) {
    for (const benefit of benefitsContent.benefits) {
      await prisma.benefit.create({
        data: {
          title: benefit.title,
          description: benefit.description,
          icon:
            typeof benefit.icon === "string"
              ? benefit.icon
              : String(benefit.icon),
        },
      });
      console.log(`Benefit seeded: ${benefit.title}`);
    }
  }

  // Seed Certifications
  if (Array.isArray(certifications)) {
    for (const cert of certifications) {
      await prisma.certification.create({
        data: {
          id: cert.id.toString(),
          title: cert.title,
          description: cert.description,
          image: cert.image,
          link: cert.link,
          width: cert.width,
          height: cert.height,
        },
      });
      console.log(`Certification seeded: ${cert.title}`);
    }
  }

  // Seed FAQs
  if (Array.isArray(faqs)) {
    for (const faq of faqs) {
      await prisma.faqItem.create({
        data: {
          question: faq.question,
          answer: faq.answer,
        },
      });
      console.log(`FAQ seeded: ${faq.question}`);
    }
  }

  // Seed Analytics Summary Table
  let summaryItemIds: string[] = [];
  if (analyticsData?.summary) {
    for (const row of analyticsData.summary) {
      const summaryItem = await prisma.analyticsSummaryItem.create({
        data: {
          name: row.name,
          deployments: row.deployments,
          uptime: row.uptime,
          clientSatisfaction: row.clientSatisfaction,
          efficiency: row.efficiency,
          revenueGrowth: row.revenueGrowth,
          bgColor: row.bgColor,
          changeType: row.changeType,
        },
      });
      summaryItemIds.push(summaryItem.id);
      console.log(`Analytics Summary Item seeded: ${row.name}`);
    }
  }

  // Seed Analytics Main Report
  await prisma.analyticsReport.create({
    data: {
      heading: analyticsData.heading,
      subheading: analyticsData.subheading,
      stats: analyticsData.stats.toString(),
      tableHeadings: analyticsData.tableHeadings.toString(),
      summaryItems: {
        connect: summaryItemIds.map((id) => ({ id })),
      },
    },
  });
  console.log("AnalyticsReport seeded");

  // Repeat similar blocks for any other content as needed.

  console.log("Seeding complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
