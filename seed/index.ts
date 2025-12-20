// seed.ts
//
// ⚠️ IMPORTANT: Before running this seed script, you MUST regenerate the Prisma Client:
//
//   1. Delete the old client cache:
//      rm -rf node_modules/.prisma  (or on Windows: rmdir /s /q node_modules\.prisma)
//
//   2. Regenerate Prisma Client:
//      npm run generate
//
//   3. Restart your IDE/Editor to pick up new types
//
//   4. Then run this seed:
//      npm run db:seed
//
// See PRISMA_REGENERATE.md for full details and troubleshooting.
//

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import Images from "./components/images";
import Certifications from "./components/certifications";
import Slugs from "./components/slugs";
import Ctas from "./components/ctas";
import Heroes from "./components/heroes";
import Benefits from "./components/benefits";
import Approaches from "./components/approaches";
import About from "./components/about";
import Analytics from "./components/analytics";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import PageContents from "./components/pageContents";
import FAQs from "./components/faqs";
import Features from "./components/features";
import Testimonials from "./components/testimonials";
import Maps from "./components/maps";

const prisma = new PrismaClient();

async function main(prisma: PrismaClient) {
  console.log("\n🌱 Starting Keystone CMS database seed...\n");

  try {
    const seededSlugs = await Slugs.seed(prisma);
    const seededImages = await Images.seed(prisma, seededSlugs);
    const seededCtas = await Ctas.seed(prisma, seededSlugs);
    const heroSlug = seededSlugs.find((slug) => slug.label === "hero");
    const pageContentHeroCtaId = heroSlug
      ? seededCtas.find((cta) => cta.typeId === heroSlug.id && !cta.external)
          ?.id
      : undefined;
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
    const seededApproachSteps = await Approaches.seedSteps(prisma);
    const seededApproach = await Approaches.seed(prisma, seededApproachSteps);
    const seededNavigationLinks = await Navigation.seedLinks(prisma);
    const seededNavigation = await Navigation.seed(
      prisma,
      seededImages,
      seededNavigationLinks,
    );
    const seededFooterLanguages = await Footer.seedLanguages(prisma);
    const seededFooterSections = await Footer.seedSections(prisma);
    const seededValues = await About.seedValues(prisma);
    const seededAbout = await About.seed(prisma, seededValues);
    const seededAnalyticsStat = await Analytics.seedStat(prisma);
    const seededAnalyticsSummaryItems =
      await Analytics.seedSummaryItems(prisma);
    const seededAnalytics = await Analytics.seed(
      prisma,
      seededAnalyticsStat,
      seededAnalyticsSummaryItems,
    );
    const seededFooter = await Footer.seed(prisma, {
      languages: seededFooterLanguages,
      sections: seededFooterSections,
    });
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
    const seededMapSection = await Maps.seed(prisma);

    const primaryTestimonialSection = seededTestimonialSections[0];
    if (!primaryTestimonialSection) {
      throw new Error("Testimonial sections seeding returned no entries");
    }
    const primaryFaqSection = seededFAQSections[0];
    const pageContentOptions =
      pageContentHeroCtaId != null
        ? {
            pageCtas: {
              home: pageContentHeroCtaId,
            },
            pageAbout: {
              "en-US": seededAbout.find(
                (a) =>
                  a.languageId ===
                  seededFooterLanguages.find((l) => l.value === "en-US")?.id,
              )?.id,
              "de-DE": seededAbout.find(
                (a) =>
                  a.languageId ===
                  seededFooterLanguages.find((l) => l.value === "de-DE")?.id,
              )?.id,
            },
          }
        : undefined;

    await PageContents.seed(
      prisma,
      {
        hero: seededHeroes,
        benefitSection: seededBenefitSections,
        features: seededFeatures,
        certificationSection: seededCertificationSections,
        testimonialSection: primaryTestimonialSection,
        approach: seededApproach,
        analytics: seededAnalytics,
        about: seededAbout,
        faqItems: seededFAQs,
        faqSection: primaryFaqSection,
        ctaSection: seededCtaSections,
        navigation: seededNavigation,
        footer: seededFooter,
        mapSection: seededMapSection,
      },
      pageContentOptions,
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
