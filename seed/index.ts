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
// Usage:
//   - Seed all components:
//       npm run db:seed
//   - Seed specific component(s):
//       npm run db:seed slugs
//       npm run db:seed slugs images ctas
//   - Seed with all flag:
//       npm run db:seed --all
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
import LegalPages from "./components/legalPages";

const prisma = new PrismaClient();

// Define seeding order - components that depend on others should come later
export const SEED_ORDER = [
  "slugs",
  "languages",
  "images",
  "ctas",
  "certifications",
  "heroes",
  "benefits",
  "approaches",
  "about",
  "analytics",
  "navigation",
  "footer",
  "faqs",
  "features",
  "testimonials",
  "maps",
  "pageContents",
  "resume",
  "legalPages",
] as const;

type SeedComponent = typeof SEED_ORDER[number];

// Cache for seeded dependencies to avoid re-seeding
type SeedCache = {
  slugs?: Awaited<ReturnType<typeof Slugs.seed>>;
  languages?: Awaited<ReturnType<typeof Footer.seedLanguages>>;
  images?: Awaited<ReturnType<typeof Images.seed>>;
  ctas?: Awaited<ReturnType<typeof Ctas.seed>>;
  ctaSections?: Awaited<ReturnType<typeof Ctas.seedSection>>;
  certificationSections?: Awaited<ReturnType<typeof Certifications.seedSection>>;
  heroes?: Awaited<ReturnType<typeof Heroes.seed>>;
  benefitSections?: Awaited<ReturnType<typeof Benefits.seedSection>>;
  approaches?: Awaited<ReturnType<typeof Approaches.seed>>;
  aboutValues?: Awaited<ReturnType<typeof About.seedValues>>;
  about?: Awaited<ReturnType<typeof About.seed>>;
  analytics?: Awaited<ReturnType<typeof Analytics.seed>>;
  navigation?: Awaited<ReturnType<typeof Navigation.seed>>;
  footer?: Awaited<ReturnType<typeof Footer.seed>>;
  faqSections?: Awaited<ReturnType<typeof FAQs.seedSections>>;
  features?: Awaited<ReturnType<typeof Features.seed>>;
  testimonialSections?: Awaited<ReturnType<typeof Testimonials.seedSections>>;
  mapSections?: Awaited<ReturnType<typeof Maps.seed>>;
};

const cache: SeedCache = {};

/**
 * Ensures slugs are seeded and cached
 */
async function ensureSlugs(prisma: PrismaClient) {
  if (!cache.slugs) {
    console.log("📌 Ensuring slugs are seeded...");
    cache.slugs = await Slugs.seed(prisma);
  }
  return cache.slugs;
}

/**
 * Ensures languages are seeded and cached
 */
async function ensureLanguages(prisma: PrismaClient) {
  if (!cache.languages) {
    console.log("🌍 Ensuring languages are seeded...");
    cache.languages = await Footer.seedLanguages(prisma);
  }
  return cache.languages;
}

/**
 * Ensures images are seeded and cached
 */
async function ensureImages(prisma: PrismaClient) {
  if (!cache.images) {
    console.log("🖼️  Ensuring images are seeded...");
    const slugs = await ensureSlugs(prisma);
    cache.images = await Images.seed(prisma, slugs);
  }
  return cache.images;
}

/**
 * Ensures CTAs are seeded and cached
 */
async function ensureCtas(prisma: PrismaClient) {
  if (!cache.ctas) {
    console.log("🔗 Ensuring CTAs are seeded...");
    const slugs = await ensureSlugs(prisma);
    const languages = await ensureLanguages(prisma);
    cache.ctas = await Ctas.seed(prisma, slugs, languages);
  }
  return cache.ctas;
}

/**
 * Ensures CTA sections are seeded and cached
 */
async function ensureCtaSections(prisma: PrismaClient) {
  if (!cache.ctaSections) {
    console.log("📋 Ensuring CTA sections are seeded...");
    const slugs = await ensureSlugs(prisma);
    const ctas = await ensureCtas(prisma);
    const images = await ensureImages(prisma);
    const languages = await ensureLanguages(prisma);
    cache.ctaSections = await Ctas.seedSection(
      prisma,
      slugs,
      ctas,
      images,
      languages,
    );
  }
  return cache.ctaSections;
}

/**
 * Ensures certification sections are seeded and cached
 */
async function ensureCertificationSections(prisma: PrismaClient) {
  if (!cache.certificationSections) {
    console.log("🎓 Ensuring certification sections are seeded...");
    const slugs = await ensureSlugs(prisma);
    const ctas = await ensureCtas(prisma);
    const images = await ensureImages(prisma);
    const languages = await ensureLanguages(prisma);
    cache.certificationSections = await Certifications.seedSection(
      prisma,
      slugs,
      ctas,
      images,
      languages,
    );
  }
  return cache.certificationSections;
}

/**
 * Ensures benefit sections are seeded and cached
 */
async function ensureBenefitSections(prisma: PrismaClient) {
  if (!cache.benefitSections) {
    console.log("💎 Ensuring benefit sections are seeded...");
    const images = await ensureImages(prisma);
    const slugs = await ensureSlugs(prisma);
    const ctas = await ensureCtas(prisma);
    const languages = await ensureLanguages(prisma);
    cache.benefitSections = await Benefits.seedSection(
      prisma,
      images,
      slugs,
      ctas,
      languages,
    );
  }
  return cache.benefitSections;
}

/**
 * Ensures approaches are seeded and cached
 */
async function ensureApproaches(prisma: PrismaClient) {
  if (!cache.approaches) {
    console.log("🎯 Ensuring approaches are seeded...");
    const languages = await ensureLanguages(prisma);
    cache.approaches = await Approaches.seed(prisma, languages);
  }
  return cache.approaches;
}

/**
 * Ensures about values are seeded and cached
 */
async function ensureAboutValues(prisma: PrismaClient) {
  if (!cache.aboutValues) {
    console.log("💡 Ensuring about values are seeded...");
    cache.aboutValues = await About.seedValues(prisma);
  }
  return cache.aboutValues;
}

/**
 * Ensures about sections are seeded and cached
 */
async function ensureAbout(prisma: PrismaClient) {
  if (!cache.about) {
    console.log("📖 Ensuring about sections are seeded...");
    const values = await ensureAboutValues(prisma);
    cache.about = await About.seed(prisma, values);
  }
  return cache.about;
}

/**
 * Ensures analytics are seeded and cached
 */
async function ensureAnalytics(prisma: PrismaClient) {
  if (!cache.analytics) {
    console.log("📊 Ensuring analytics are seeded...");
    cache.analytics = await Analytics.seed(prisma);
  }
  return cache.analytics;
}

/**
 * Ensures navigation is seeded and cached
 */
async function ensureNavigation(prisma: PrismaClient) {
  if (!cache.navigation) {
    console.log("🧭 Ensuring navigation is seeded...");
    const images = await ensureImages(prisma);
    const ctas = await ensureCtas(prisma);
    const slugs = await ensureSlugs(prisma);
    const languages = await ensureLanguages(prisma);
    cache.navigation = await Navigation.seed(
      prisma,
      images,
      ctas,
      slugs,
      languages,
    );
  }
  return cache.navigation;
}

/**
 * Ensures footer is seeded and cached
 */
async function ensureFooter(prisma: PrismaClient) {
  if (!cache.footer) {
    console.log("🦶 Ensuring footer is seeded...");
    const languages = await ensureLanguages(prisma);
    const slugs = await ensureSlugs(prisma);
    cache.footer = await Footer.seed(prisma, { languages, slugs });
  }
  return cache.footer;
}

/**
 * Ensures FAQ sections are seeded and cached
 */
async function ensureFAQSections(prisma: PrismaClient) {
  if (!cache.faqSections) {
    console.log("❓ Ensuring FAQ sections are seeded...");
    const languages = await ensureLanguages(prisma);
    cache.faqSections = await FAQs.seedSections(prisma, languages);
  }
  return cache.faqSections;
}

/**
 * Ensures features are seeded and cached
 */
async function ensureFeatures(prisma: PrismaClient) {
  if (!cache.features) {
    console.log("⭐ Ensuring features are seeded...");
    const languages = await ensureLanguages(prisma);
    cache.features = await Features.seed(prisma, languages);
  }
  return cache.features;
}

/**
 * Ensures testimonial sections are seeded and cached
 */
async function ensureTestimonialSections(prisma: PrismaClient) {
  if (!cache.testimonialSections) {
    console.log("💬 Ensuring testimonial sections are seeded...");
    const images = await ensureImages(prisma);
    const slugs = await ensureSlugs(prisma);
    const languages = await ensureLanguages(prisma);
    cache.testimonialSections = await Testimonials.seedSections(
      prisma,
      images,
      slugs,
      languages,
    );
  }
  return cache.testimonialSections;
}

/**
 * Ensures map sections are seeded and cached
 */
async function ensureMapSections(prisma: PrismaClient) {
  if (!cache.mapSections) {
    console.log("🗺️  Ensuring map sections are seeded...");
    const languages = await ensureLanguages(prisma);
    cache.mapSections = await Maps.seed(prisma, languages);
  }
  return cache.mapSections;
}

/**
 * Ensures heroes are seeded and cached
 */
async function ensureHeroes(prisma: PrismaClient) {
  if (!cache.heroes) {
    console.log("🦸 Ensuring heroes are seeded...");
    const images = await ensureImages(prisma);
    const slugs = await ensureSlugs(prisma);
    const ctas = await ensureCtas(prisma);
    const languages = await ensureLanguages(prisma);
    cache.heroes = await Heroes.seed(prisma, images, slugs, ctas, languages);
  }
  return cache.heroes;
}

/**
 * Seed individual component by name
 */
async function seedComponent(
  component: SeedComponent,
  prisma: PrismaClient,
): Promise<void> {
  console.log(`\n🌱 Seeding component: ${component}...\n`);

  switch (component) {
    case "slugs":
      await ensureSlugs(prisma);
      break;

    case "languages":
      await ensureLanguages(prisma);
      break;

    case "images":
      await ensureImages(prisma);
      break;

    case "ctas":
      await ensureCtas(prisma);
      await ensureCtaSections(prisma);
      break;

    case "certifications":
      await ensureCertificationSections(prisma);
      break;

    case "heroes":
      await ensureHeroes(prisma);
      break;

    case "benefits":
      await ensureBenefitSections(prisma);
      break;

    case "approaches":
      await ensureApproaches(prisma);
      break;

    case "about":
      await ensureAbout(prisma);
      break;

    case "analytics":
      await ensureAnalytics(prisma);
      break;

    case "navigation":
      await ensureNavigation(prisma);
      break;

    case "footer":
      await ensureFooter(prisma);
      break;

    case "faqs":
      await ensureFAQSections(prisma);
      break;

    case "features":
      await ensureFeatures(prisma);
      break;

    case "testimonials":
      await ensureTestimonialSections(prisma);
      break;

    case "maps":
      await ensureMapSections(prisma);
      break;

    case "pageContents":
      console.log("📄 Seeding page contents with all dependencies...");
      const benefitSections = await ensureBenefitSections(prisma);
      const features = await ensureFeatures(prisma);
      const certificationSections = await ensureCertificationSections(prisma);
      const testimonialSections = await ensureTestimonialSections(prisma);
      const approaches = await ensureApproaches(prisma);
      const analytics = await ensureAnalytics(prisma);
      const about = await ensureAbout(prisma);
      const faqSections = await ensureFAQSections(prisma);
      const ctaSections = await ensureCtaSections(prisma);
      const navigation = await ensureNavigation(prisma);
      const mapSections = await ensureMapSections(prisma);
      const footer = await ensureFooter(prisma);
      const heroes = await ensureHeroes(prisma);

      await PageContents.seed(prisma, {
        benefitSection: benefitSections,
        features: features,
        certificationSection: certificationSections,
        testimonialSection: testimonialSections,
        approach: approaches,
        analytics: analytics,
        about: about,
        faqSection: faqSections,
        ctaSection: ctaSections,
        navigation: navigation,
        mapSection: mapSections,
        footer: footer,
        hero: heroes,
      });
      break;

    case "resume":
      console.log("📝 Seeding resume...");
      await Resume.seed(prisma);
      break;

    case "legalPages":
      console.log("⚖️  Seeding legal pages...");
      await LegalPages.seed(prisma);
      break;

    default:
      console.warn(`⚠️  Unknown component: ${component}`);
      break;
  }

  console.log(`✅ Component ${component} seeded successfully\n`);
}

/**
 * Seed all components in the correct order
 */
async function seedAll(prisma: PrismaClient) {
  console.log("\n🌱 Starting Keystone CMS database seed (all components)...\n");
  console.log("📋 Seed order:", SEED_ORDER.join(" → "), "\n");

  for (const component of SEED_ORDER) {
    await seedComponent(component, prisma);
  }

  console.log("\n✅ All components seeded successfully!\n");
}

/**
 * Display help information
 */
function displayHelp() {
  console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                    🌱 Keystone CMS Database Seed Tool                      ║
╚════════════════════════════════════════════════════════════════════════════╝

DESCRIPTION:
  Seed your Keystone CMS database with initial data. Components are seeded
  in the correct dependency order automatically.

USAGE:
  npm run db:seed [COMPONENTS...]
  npm run db:seed -- [OPTIONS]
  npm run db:seed:all

OPTIONS:
  --all, -a          Seed all components (default if no components specified)
  --help, -h         Display this help message

NOTE: When using flags with npm run, you must use -- before the flags:
  npm run db:seed -- --help
  npm run db:seed:help  (shortcut without --)

COMPONENTS:
  Available components to seed (in dependency order):
${SEED_ORDER.map(c => `    • ${c.padEnd(20)} ${getComponentDescription(c)}`).join('\n')}

EXAMPLES:
  # Seed all components (recommended for initial setup)
  npm run db:seed
  npm run db:seed:all
  npm run db:seed -- --all

  # Seed specific component(s)
  npm run db:seed slugs
  npm run db:seed images ctas heroes
  npm run db:seed:resume

  # Get help
  npm run db:seed:help
  npm run db:seed -- --help
  npm run db:seed -- -h

NOTES:
  • Dependencies are automatically seeded when needed
  • Components are always seeded in the correct order
  • Existing data is NOT deleted (use db:clear to remove data)
  • For a fresh database, use: npm run db:fresh

RELATED COMMANDS:
  npm run db:clear         Clear seeded data
  npm run db:reset         Reset database schema
  npm run db:fresh         Reset database and seed all components

For more information, see: ./seed/README.md
`);
}

/**
 * Display comprehensive database commands help
 */
function displayDatabaseHelp() {
  console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                  📚 Keystone CMS Database Commands Reference               ║
╚════════════════════════════════════════════════════════════════════════════╝

QUICK REFERENCE:
  For detailed documentation, see: ./seed/SCRIPTS.md

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🌱 SEEDING COMMANDS                                                         │
└─────────────────────────────────────────────────────────────────────────────┘

  npm run db:seed              Seed all components (default)
  npm run db:seed:all          Explicitly seed all components
  npm run db:seed:help         Show detailed seed help

  npm run db:seed <component>  Seed specific component(s)
    Examples:
      npm run db:seed slugs
      npm run db:seed about analytics navigation
      npm run db:seed:resume

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🗑️  CLEARING COMMANDS                                                       │
└─────────────────────────────────────────────────────────────────────────────┘

  npm run db:clear:all         Clear all seeded data
  npm run db:clear:help        Show detailed clear help

  npm run db:clear -- <flags>  Clear specific components
    Examples:
      npm run db:clear -- --about
      npm run db:clear -- --analytics --navigation
      npm run db:clear -- --pages home terms

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🔄 DATABASE MANAGEMENT                                                      │
└─────────────────────────────────────────────────────────────────────────────┘

  npm run db:push              Push schema without migrations
  npm run db:reset             Reset database (⚠️  DELETES ALL DATA)
  npm run db:fresh             Reset + seed all (complete fresh start)
  npm run db:reset:seed        Alias for db:fresh

┌─────────────────────────────────────────────────────────────────────────────┐
│ 📋 SCHEMA MANAGEMENT                                                        │
└─────────────────────────────────────────────────────────────────────────────┘

  npm run generate             Generate migrations (development)
  npm run schema:verify:dev    Verify schema (development)
  npm run schema:verify:prod   Verify schema (production)

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🎯 COMMON WORKFLOWS                                                         │
└─────────────────────────────────────────────────────────────────────────────┘

  Initial Setup:
    npm run db:push && npm run db:seed

  After Schema Changes:
    npm run generate && npm run db:push

  Fresh Start:
    npm run db:fresh

  Update Specific Content:
    npm run db:clear -- --about
    npm run db:seed about

┌─────────────────────────────────────────────────────────────────────────────┐
│ 📦 AVAILABLE COMPONENTS                                                     │
└─────────────────────────────────────────────────────────────────────────────┘

${SEED_ORDER.map(c => `  • ${c.padEnd(20)} ${getComponentDescription(c)}`).join('\n')}

┌─────────────────────────────────────────────────────────────────────────────┐
│ 📖 DOCUMENTATION                                                            │
└─────────────────────────────────────────────────────────────────────────────┘

  Detailed Guide:     ./seed/SCRIPTS.md
  Full README:        ./seed/README.md
  Seed Help:          npm run db:seed:help
  Clear Help:         npm run db:clear:help

For step-by-step workflows and advanced usage, see ./seed/SCRIPTS.md
`);
}

/**
 * Get component description for help text
 */
function getComponentDescription(component: SeedComponent): string {
  const descriptions: Record<SeedComponent, string> = {
    slugs: "URL slugs and routes",
    languages: "Language configurations",
    images: "Image assets",
    ctas: "Call-to-action buttons and sections",
    certifications: "Certification sections",
    heroes: "Hero sections",
    benefits: "Benefit sections",
    approaches: "Approach workflows",
    about: "About sections and values",
    analytics: "Analytics dashboards",
    navigation: "Navigation menus",
    footer: "Footer sections",
    faqs: "FAQ sections",
    features: "Feature sections",
    testimonials: "Testimonial sections",
    maps: "Map sections",
    pageContents: "Page content (requires all dependencies)",
    resume: "Resume/CV data",
    legalPages: "Legal pages (privacy, terms, etc.)",
  };
  return descriptions[component] || "";
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2);

  try {
    // Check for database help flag
    if (args.includes("--db-help")) {
      displayDatabaseHelp();
      process.exit(0);
    }

    // Check for help flag
    if (args.includes("--help") || args.includes("-h")) {
      displayHelp();
      process.exit(0);
    }

    // Check for --all flag or no arguments (default to all)
    if (args.length === 0 || args.includes("--all") || args.includes("-a")) {
      await seedAll(prisma);
    } else {
      // Seed specific component(s)
      const components = args.filter(arg => !arg.startsWith("--")) as SeedComponent[];

      if (components.length === 0) {
        console.log("⚠️  No valid components specified. Use --all to seed everything.");
        console.log("\nAvailable components:");
        SEED_ORDER.forEach(c => console.log(`  - ${c}`));
        console.log("\nUse --help for more information.");
        process.exit(1);
      }

      // Validate component names
      const invalidComponents = components.filter(
        c => !SEED_ORDER.includes(c as any)
      );

      if (invalidComponents.length > 0) {
        console.error(`❌ Invalid component(s): ${invalidComponents.join(", ")}`);
        console.log("\nAvailable components:");
        SEED_ORDER.forEach(c => console.log(`  - ${c}`));
        console.log("\nUse --help for more information.");
        process.exit(1);
      }

      // Seed in the correct order (respecting dependencies)
      const orderedComponents = SEED_ORDER.filter(c =>
        components.includes(c as any)
      );

      console.log(`\n🌱 Seeding ${orderedComponents.length} component(s): ${orderedComponents.join(", ")}\n`);

      for (const component of orderedComponents) {
        await seedComponent(component, prisma);
      }

      console.log("\n✅ Requested components seeded successfully!\n");
    }
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
