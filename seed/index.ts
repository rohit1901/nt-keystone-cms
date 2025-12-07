import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import Images from "./components/images";
import Certifications from "./components/certifications";
import Slugs from "./components/slugs";
import Ctas from "./components/ctas";

const prisma = new PrismaClient();

async function main(prisma: PrismaClient) {
  console.log("\n🌱 Starting Keystone CMS database seed...\n");

  try {
    const seededSlugs = await Slugs.seed(prisma);
    const seededImages = await Images.seed(prisma, seededSlugs);
    const seededCtas = await Ctas.seed(prisma, seededSlugs);
    const seededCtaSections = await Ctas.seedSection(
      prisma,
      seededCtas,
      seededImages,
    );
    const seededCertifications = await Certifications.seed(
      prisma,
      seededImages,
    );
    const seededCertificationSections = await Certifications.seedSection(
      prisma,
      seededCertifications,
      seededCtas,
    );
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
main(prisma).catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
