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
import Resume from "./components/resume";

const prisma = new PrismaClient();

async function seedAll(prisma: PrismaClient) {
  console.log("\n🌱 Starting Keystone CMS database seed...\n");

  try {
    const seededSlugs = await Slugs.seed(prisma);
    const seededImages = await Images.seed(prisma, seededSlugs);
    const seededLanguages = await Footer.seedLanguages(prisma);
    const seededCtas = await Ctas.seed(prisma, seededSlugs, seededLanguages);
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
      seededLanguages,
    );
    const seededCertificationSections = await Certifications.seedSection(
      prisma,
      seededSlugs,
      seededCtas,
      seededImages,
    );

    // const seededHeroes = await Heroes.seed(
    //   prisma,
    //   seededImages,
    //   seededSlugs,
    //   seededCtas,
    // );
    const seededBenefitSections = await Benefits.seedSection(
      prisma,
      seededImages,
      seededSlugs,
      seededCtas,
    );
    const seededApproach = await Approaches.seed(prisma, seededLanguages);
    const seededNavigation = await Navigation.seed(
      prisma,
      seededImages,
      seededCtas,
      seededSlugs,
      seededLanguages,
    );
    // const seededFooterSections = await Footer.seedSections(prisma);
    const seededValues = await About.seedValues(prisma);
    const seededAbout = await About.seed(prisma, seededValues);
    const seededAnalytics = await Analytics.seed(prisma);
    const seededFooter = await Footer.seed(prisma, {
      languages: seededLanguages,
      slugs: seededSlugs,
    });
    const seededFAQSections = await FAQs.seedSections(prisma, seededLanguages);
    const seededFeatures = await Features.seed(prisma, seededLanguages);
    const seededTestimonialSections = await Testimonials.seedSections(
      prisma,
      seededImages,
      seededSlugs,
      seededLanguages,
    );
    const seededMapSection = await Maps.seed(prisma, seededLanguages);

    const primaryTestimonialSection = seededTestimonialSections[0];
    if (!primaryTestimonialSection) {
      throw new Error("Testimonial sections seeding returned no entries");
    }

    const seededHero = await Heroes.seed(
      prisma,
      seededImages,
      seededSlugs,
      seededCtas,
      seededLanguages,
    );

    await PageContents.seed(prisma, {
      benefitSection: seededBenefitSections,
      features: seededFeatures,
      certificationSection: seededCertificationSections,
      testimonialSection: seededTestimonialSections,
      approach: seededApproach,
      analytics: seededAnalytics,
      about: seededAbout,
      faqSection: seededFAQSections,
      ctaSection: seededCtaSections,
      navigation: seededNavigation,
      mapSection: seededMapSection,
      footer: seededFooter,
      hero: seededHero,
    });
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export async function seedComponent(component: string, prisma: PrismaClient, action: "seed" | "delete" = "seed") {
  try {
    if (action === "delete") {
      switch (component) {
        case "slugs":
          await prisma.type.deleteMany();
          break;
        case "images":
          await prisma.image.deleteMany();
          break;
        case "ctas":
          await prisma.cta.deleteMany();
          break;
        case "heroes":
          await prisma.hero.deleteMany();
          break;
        case "benefits":
          await prisma.benefit.deleteMany();
          break;
        case "approaches":
          await prisma.approach.deleteMany();
          break;
        case "about":
          await prisma.about.deleteMany();
          break;
        case "analytics":
          await prisma.analytic.deleteMany();
          break;
        case "navigation":
          await prisma.navigation.deleteMany();
          break;
        case "footer":
          await prisma.footer.deleteMany();
          break;
        case "faqs":
          await prisma.faq.deleteMany();
          break;
        case "features":
          await prisma.feature.deleteMany();
          break;
        case "testimonials":
          await prisma.testimonialItem.deleteMany();
          break;
        case "maps":
          await prisma.map.deleteMany();
          break;
        case "pageContents":
          await prisma.pageContent.deleteMany();
          break;
        default:
          console.log(`Unknown component: ${component}`);
          break;
      }
      return;
    }

    switch (component) {
      case "slugs":
        await Slugs.seed(prisma);
        break;
      case "images":
        const seededSlugs = await Slugs.seed(prisma);
        await Images.seed(prisma, seededSlugs);
        break;
      case "ctas":
        const seededSlugsForCtas = await Slugs.seed(prisma);
        const seededLanguagesForCtas = await Footer.seedLanguages(prisma);
        await Ctas.seed(prisma, seededSlugsForCtas, seededLanguagesForCtas);
        break;
      case "heroes":
        const seededSlugsForHeroes = await Slugs.seed(prisma);
        const seededImagesForHeroes = await Images.seed(prisma, seededSlugsForHeroes);
        const seededLanguagesForHeroes = await Footer.seedLanguages(prisma);
        const seededCtasForHeroes = await Ctas.seed(prisma, seededSlugsForHeroes, seededLanguagesForHeroes);
        await Heroes.seed(prisma, seededImagesForHeroes, seededSlugsForHeroes, seededCtasForHeroes, seededLanguagesForHeroes);
        break;
      case "benefits":
        const seededSlugsForBenefits = await Slugs.seed(prisma);
        const seededImagesForBenefits = await Images.seed(prisma, seededSlugsForBenefits);
        const seededLanguagesForBenefits = await Footer.seedLanguages(prisma);
        const seededCtasForBenefits = await Ctas.seed(prisma, seededSlugsForBenefits, seededLanguagesForBenefits);
        await Benefits.seedSection(prisma, seededImagesForBenefits, seededSlugsForBenefits, seededCtasForBenefits);
        break;
      case "approaches":
        const seededLanguagesForApproaches = await Footer.seedLanguages(prisma);
        await Approaches.seed(prisma, seededLanguagesForApproaches);
        break;
      case "about":
        const seededValues = await About.seedValues(prisma);
        await About.seed(prisma, seededValues);
        break;
      case "analytics":
        await Analytics.seed(prisma);
        break;
      case "navigation":
        const seededSlugsForNavigation = await Slugs.seed(prisma);
        const seededImagesForNavigation = await Images.seed(prisma, seededSlugsForNavigation);
        const seededLanguagesForNavigation = await Footer.seedLanguages(prisma);
        const seededCtasForNavigation = await Ctas.seed(prisma, seededSlugsForNavigation, seededLanguagesForNavigation);
        await Navigation.seed(prisma, seededImagesForNavigation, seededCtasForNavigation, seededSlugsForNavigation, seededLanguagesForNavigation);
        break;
      case "footer":
        const seededSlugsForFooter = await Slugs.seed(prisma);
        const seededLanguagesForFooter = await Footer.seedLanguages(prisma);
        await Footer.seed(prisma, {
          languages: seededLanguagesForFooter,
          slugs: seededSlugsForFooter,
        });
        break;
      case "faqs":
        const seededLanguagesForFAQs = await Footer.seedLanguages(prisma);
        await FAQs.seedSections(prisma, seededLanguagesForFAQs);
        break;
      case "features":
        const seededLanguagesForFeatures = await Footer.seedLanguages(prisma);
        await Features.seed(prisma, seededLanguagesForFeatures);
        break;
      case "testimonials":
        const seededSlugsForTestimonials = await Slugs.seed(prisma);
        const seededImagesForTestimonials = await Images.seed(prisma, seededSlugsForTestimonials);
        const seededLanguagesForTestimonials = await Footer.seedLanguages(prisma);
        await Testimonials.seedSections(prisma, seededImagesForTestimonials, seededSlugsForTestimonials, seededLanguagesForTestimonials);
        break;
      case "maps":
        const seededLanguagesForMaps = await Footer.seedLanguages(prisma);
        await Maps.seed(prisma, seededLanguagesForMaps);
        break;
      case "pageContents":
        const seededSlugsForPageContents = await Slugs.seed(prisma);
        const seededImagesForPageContents = await Images.seed(prisma, seededSlugsForPageContents);
        const seededLanguagesForPageContents = await Footer.seedLanguages(prisma);
        const seededCtasForPageContents = await Ctas.seed(prisma, seededSlugsForPageContents, seededLanguagesForPageContents);
        const seededCtaSectionsForPageContents = await Ctas.seedSection(prisma, seededSlugsForPageContents, seededCtasForPageContents, seededImagesForPageContents, seededLanguagesForPageContents);
        const seededCertificationSectionsForPageContents = await Certifications.seedSection(prisma, seededSlugsForPageContents, seededCtasForPageContents, seededImagesForPageContents);
        const seededBenefitSectionsForPageContents = await Benefits.seedSection(prisma, seededImagesForPageContents, seededSlugsForPageContents, seededCtasForPageContents);
        const seededApproachForPageContents = await Approaches.seed(prisma, seededLanguagesForPageContents);
        const seededNavigationForPageContents = await Navigation.seed(prisma, seededImagesForPageContents, seededCtasForPageContents, seededSlugsForPageContents, seededLanguagesForPageContents);
        const seededValuesForPageContents = await About.seedValues(prisma);
        const seededAboutForPageContents = await About.seed(prisma, seededValuesForPageContents);
        const seededAnalyticsForPageContents = await Analytics.seed(prisma);
        const seededFooterForPageContents = await Footer.seed(prisma, {
          languages: seededLanguagesForPageContents,
          slugs: seededSlugsForPageContents,
        });
        const seededFAQSectionsForPageContents = await FAQs.seedSections(prisma, seededLanguagesForPageContents);
        const seededFeaturesForPageContents = await Features.seed(prisma, seededLanguagesForPageContents);
        const seededTestimonialSectionsForPageContents = await Testimonials.seedSections(prisma, seededImagesForPageContents, seededSlugsForPageContents, seededLanguagesForPageContents);
        const seededMapSectionForPageContents = await Maps.seed(prisma, seededLanguagesForPageContents);
        const seededHeroForPageContents = await Heroes.seed(prisma, seededImagesForPageContents, seededSlugsForPageContents, seededCtasForPageContents, seededLanguagesForPageContents);
        await PageContents.seed(prisma, {
          benefitSection: seededBenefitSectionsForPageContents,
          features: seededFeaturesForPageContents,
          certificationSection: seededCertificationSectionsForPageContents,
          testimonialSection: seededTestimonialSectionsForPageContents,
          approach: seededApproachForPageContents,
          analytics: seededAnalyticsForPageContents,
          about: seededAboutForPageContents,
          faqSection: seededFAQSectionsForPageContents,
          ctaSection: seededCtaSectionsForPageContents,
          navigation: seededNavigationForPageContents,
          mapSection: seededMapSectionForPageContents,
          footer: seededFooterForPageContents,
          hero: seededHeroForPageContents,
        });
        break;
      case "resume":
        await Resume.seed(prisma);
        break;
      default:
        console.log(`Unknown component: ${component}`);
        break;
    }
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const args = process.argv.slice(2);
  const component = args[0];

  if (component) {
    console.log(`\n🌱 Seeding component: ${component}...\n`);
    await seedComponent(component, prisma);
  } else {
    await seedAll(prisma);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
