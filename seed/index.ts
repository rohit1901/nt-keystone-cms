import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import Images from "./components/images";
import Certifications from "./components/certifications";
import Slugs from "./components/slugs";
import Ctas from "./components/ctas";
import Heroes from "./components/heroes";
import Benefits from "./components/benefits";
import FAQs from "./components/faqs";
import Features from "./components/features";
import Testimonials from "./components/testimonials";

const prisma = new PrismaClient();

async function main(prisma: PrismaClient) {
  console.log("\n🌱 Starting Keystone CMS database seed...\n");

  try {
    const seededSlugs = await Slugs.seed(prisma);
    const seededImages = await Images.seed(prisma, seededSlugs);
    const seededCtas = await Ctas.seed(prisma, seededSlugs);
    const seededCtaSections = await Ctas.seedSection(
      prisma,
      seededSlugs,
      seededCtas,
      seededImages,
    );
    const seededCertifications = await Certifications.seed(
      prisma,
      seededSlugs,
      seededCtas,
      seededImages,
    );
    const seededCertificationSections = await Certifications.seedSection(
      prisma,
      seededSlugs,
      seededCtas,
      seededImages,
      seededCertifications,
    );
    const seededHeroes = await Heroes.seed(
      prisma,
      seededImages,
      seededSlugs,
      seededCtas,
    );
    const seededBenefitSections = await Benefits.seedSection(
      prisma,
      seededImages,
      seededSlugs,
      seededCtas,
    );
    const seededFAQs = await FAQs.seed(prisma);
    const seededFAQSections = await FAQs.seedSections(prisma, seededFAQs);
    const seededFeatures = await Features.seed(prisma);
    const seededTestimonialBadges = await Testimonials.seedBadges(prisma);
    const seededTestimonialItems = await Testimonials.seedItems(
      prisma,
      seededTestimonialBadges,
      seededImages,
      seededSlugs,
    );
    const seededTestimonialSections = await Testimonials.seedSections(
      prisma,
      seededTestimonialItems,
      seededImages,
      seededSlugs,
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
