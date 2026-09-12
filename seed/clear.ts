import "dotenv/config";
import { createPrismaClient, Prisma, PrismaClient } from "./prisma";

/**
 * Destructive seed-data clear CLI.
 *
 * All component clears intentionally retain their historical all-record
 * semantics. In production, an explicit confirmation flag or environment
 * variable is required before a Prisma client is created.
 */

type DatabaseClient = PrismaClient | Prisma.TransactionClient;
type SeedModule = {
  clear?: (prisma: PrismaClient) => Promise<void>;
  [key: string]: unknown;
};
type ClearAction = (prisma: PrismaClient) => Promise<void>;

const PRODUCTION_CONFIRMATION_FLAG = "--confirm-production-clear";
const PRODUCTION_CONFIRMATION_ENV = "ALLOW_PRODUCTION_DB_CLEAR";
const LEGAL_PAGE_SLUGS = [
  "terms",
  "terms-de",
  "privacy-policy",
  "privacy-policy-de",
] as const;

const DEFAULT_COMPONENTS = [
  "resume",
  "legalPages",
  "pageContents",
  "footer",
  "navigation",
  "analytics",
  "about",
  "approaches",
  "maps",
  "features",
  "certifications",
  "faqs",
  "benefits",
  "heroes",
  "testimonials",
  "ctas",
  "images",
  "slugs",
  "languages",
] as const;

async function inTransaction(
  prisma: PrismaClient,
  operation: (transaction: Prisma.TransactionClient) => Promise<void>,
): Promise<void> {
  await prisma.$transaction(operation);
}

async function loadSeedModule(name: string): Promise<SeedModule | null> {
  if (!/^[A-Za-z][A-Za-z0-9]*$/.test(name)) {
    console.error(`Invalid seed component name: "${name}".`);
    return null;
  }

  try {
    const mod = await import(`./components/${name}`);
    return (mod?.default ?? mod) as SeedModule;
  } catch (error) {
    console.error(`Failed to load seed component "${name}":`, error);
    return null;
  }
}

async function clearComponent(prisma: PrismaClient, name: string): Promise<void> {
  const action = CLEAR_ACTIONS[name];
  if (action) {
    await action(prisma);
    return;
  }

  const seedModule = await loadSeedModule(name);
  if (!seedModule) {
    throw new Error(`Seed component "${name}" could not be loaded.`);
  }
  if (typeof seedModule.clear !== "function") {
    throw new Error(`Seed component "${name}" does not export clear().`);
  }

  console.log(`Clearing "${name}"...`);
  await seedModule.clear(prisma);
  console.log(`Cleared "${name}".`);
}

async function clearPagesBySlug(
  prisma: DatabaseClient,
  slugs: readonly string[],
): Promise<void> {
  console.log(`Clearing PageContents with slugs: ${slugs.join(", ")}...`);
  const result = await prisma.pageContent.deleteMany({
    where: { slug: { in: [...slugs] } },
  });
  console.log(`Deleted ${result.count} PageContent record(s).`);
}

async function clearImages(prisma: DatabaseClient): Promise<void> {
  console.log("Clearing all images...");
  const result = await prisma.image.deleteMany({});
  console.log(`Deleted ${result.count} image(s).`);
}

async function clearTypes(prisma: DatabaseClient): Promise<void> {
  console.log("Clearing all types (slugs)...");
  const result = await prisma.type.deleteMany({});
  console.log(`Deleted ${result.count} type(s).`);
}

async function clearCtas(prisma: PrismaClient): Promise<void> {
  await inTransaction(prisma, async (transaction) => {
    console.log("Clearing all CTA sections...");
    const sections = await transaction.ctaSection.deleteMany({});
    console.log(`Deleted ${sections.count} CTA section(s).`);

    console.log("Clearing all CTAs...");
    const ctas = await transaction.cta.deleteMany({});
    console.log(`Deleted ${ctas.count} CTA(s).`);
  });
}

async function clearLanguages(prisma: DatabaseClient): Promise<void> {
  console.log("Clearing all languages...");
  const result = await prisma.language.deleteMany({});
  console.log(`Deleted ${result.count} language(s).`);
}

async function clearTestimonials(prisma: PrismaClient): Promise<void> {
  await inTransaction(prisma, async (transaction) => {
    console.log("Clearing all testimonial sections...");
    const sections = await transaction.testimonialSection.deleteMany({});
    console.log(`Deleted ${sections.count} testimonial section(s).`);

    console.log("Clearing all testimonial items...");
    const items = await transaction.testimonialItem.deleteMany({});
    console.log(`Deleted ${items.count} testimonial item(s).`);

    console.log("Clearing all testimonial badges...");
    const badges = await transaction.testimonialBadge.deleteMany({});
    console.log(`Deleted ${badges.count} testimonial badge(s).`);
  });
}

async function clearHeroes(prisma: PrismaClient): Promise<void> {
  await inTransaction(prisma, async (transaction) => {
    console.log("Clearing all heroes...");
    const heroes = await transaction.hero.deleteMany({});
    console.log(`Deleted ${heroes.count} hero section(s).`);

    console.log("Clearing all hero banners...");
    const banners = await transaction.heroBanner.deleteMany({});
    console.log(`Deleted ${banners.count} hero banner(s).`);

    console.log("Clearing all hero banner additionals...");
    const additionals = await transaction.heroBannerAdditional.deleteMany({});
    console.log(`Deleted ${additionals.count} hero banner additional(s).`);
  });
}

async function clearBenefits(prisma: PrismaClient): Promise<void> {
  await inTransaction(prisma, async (transaction) => {
    console.log("Clearing all benefit sections...");
    const sections = await transaction.benefitSection.deleteMany({});
    console.log(`Deleted ${sections.count} benefit section(s).`);

    console.log("Clearing all benefits...");
    const benefits = await transaction.benefit.deleteMany({});
    console.log(`Deleted ${benefits.count} benefit(s).`);
  });
}

async function clearFaqs(prisma: PrismaClient): Promise<void> {
  await inTransaction(prisma, async (transaction) => {
    console.log("Clearing all FAQ sections...");
    const sections = await transaction.faqSection.deleteMany({});
    console.log(`Deleted ${sections.count} FAQ section(s).`);

    console.log("Clearing all FAQs...");
    const faqs = await transaction.faq.deleteMany({});
    console.log(`Deleted ${faqs.count} FAQ(s).`);
  });
}

async function clearCertifications(prisma: PrismaClient): Promise<void> {
  await inTransaction(prisma, async (transaction) => {
    console.log("Clearing all certification sections...");
    const sections = await transaction.certificationSection.deleteMany({});
    console.log(`Deleted ${sections.count} certification section(s).`);

    console.log("Clearing all certifications...");
    const certifications = await transaction.certification.deleteMany({});
    console.log(`Deleted ${certifications.count} certification(s).`);
  });
}

async function clearFeatures(prisma: DatabaseClient): Promise<void> {
  console.log("Clearing all features...");
  const result = await prisma.feature.deleteMany({});
  console.log(`Deleted ${result.count} feature(s).`);
}

async function clearMaps(prisma: DatabaseClient): Promise<void> {
  console.log("Clearing all maps...");
  const result = await prisma.map.deleteMany({});
  console.log(`Deleted ${result.count} map(s).`);
}

async function clearApproaches(prisma: PrismaClient): Promise<void> {
  await inTransaction(prisma, async (transaction) => {
    console.log("Clearing all approaches...");
    const approaches = await transaction.approach.deleteMany({});
    console.log(`Deleted ${approaches.count} approach(es).`);

    console.log("Clearing all approach steps...");
    const steps = await transaction.approachStep.deleteMany({});
    console.log(`Deleted ${steps.count} approach step(s).`);
  });
}

async function clearAbout(prisma: PrismaClient): Promise<void> {
  await inTransaction(prisma, async (transaction) => {
    console.log("Clearing all about sections...");
    const about = await transaction.about.deleteMany({});
    console.log(`Deleted ${about.count} about section(s).`);

    console.log("Clearing all about values...");
    const values = await transaction.value.deleteMany({});
    console.log(`Deleted ${values.count} value(s).`);
  });
}

async function clearAnalytics(prisma: PrismaClient): Promise<void> {
  await inTransaction(prisma, async (transaction) => {
    console.log("Clearing all analytics sections...");
    const analytics = await transaction.analytic.deleteMany({});
    console.log(`Deleted ${analytics.count} analytics section(s).`);

    console.log("Clearing all analytics stats...");
    const stats = await transaction.analyticsStat.deleteMany({});
    console.log(`Deleted ${stats.count} analytics stat(s).`);

    console.log("Clearing all analytics summary items...");
    const summaries = await transaction.analyticsSummaryItem.deleteMany({});
    console.log(`Deleted ${summaries.count} analytics summary item(s).`);
  });
}

async function clearNavigation(prisma: PrismaClient): Promise<void> {
  await inTransaction(prisma, async (transaction) => {
    console.log("Clearing all navigation sections...");
    const navigation = await transaction.navigation.deleteMany({});
    console.log(`Deleted ${navigation.count} navigation section(s).`);

    console.log("Clearing all navigation links...");
    const links = await transaction.navigationLink.deleteMany({});
    console.log(`Deleted ${links.count} navigation link(s).`);
  });
}

async function clearResume(prisma: PrismaClient): Promise<void> {
  await inTransaction(prisma, async (transaction) => {
    console.log("Clearing all resume data...");

    const resume = await transaction.resume.deleteMany({});
    console.log(`Deleted ${resume.count} resume(s).`);
    const basicInfo = await transaction.resumeBasicInformation.deleteMany({});
    console.log(`Deleted ${basicInfo.count} resume basic information record(s).`);
    const work = await transaction.resumeWork.deleteMany({});
    console.log(`Deleted ${work.count} resume work record(s).`);
    const volunteer = await transaction.resumeVolunteer.deleteMany({});
    console.log(`Deleted ${volunteer.count} resume volunteer record(s).`);
    const education = await transaction.resumeEducation.deleteMany({});
    console.log(`Deleted ${education.count} resume education record(s).`);
    const awards = await transaction.resumeAward.deleteMany({});
    console.log(`Deleted ${awards.count} resume award(s).`);
    const publications = await transaction.resumePublication.deleteMany({});
    console.log(`Deleted ${publications.count} resume publication(s).`);
    const skills = await transaction.resumeSkill.deleteMany({});
    console.log(`Deleted ${skills.count} resume skill(s).`);
    const languages = await transaction.resumeLanguage.deleteMany({});
    console.log(`Deleted ${languages.count} resume language(s).`);
    const interests = await transaction.resumeInterest.deleteMany({});
    console.log(`Deleted ${interests.count} resume interest(s).`);
    const references = await transaction.resumeReference.deleteMany({});
    console.log(`Deleted ${references.count} resume reference(s).`);
    const projects = await transaction.resumeProject.deleteMany({});
    console.log(`Deleted ${projects.count} resume project(s).`);
    const locations = await transaction.resumeLocation.deleteMany({});
    console.log(`Deleted ${locations.count} resume location(s).`);
    const profiles = await transaction.resumeProfile.deleteMany({});
    console.log(`Deleted ${profiles.count} resume profile(s).`);
    const highlights = await transaction.resumeHighlight.deleteMany({});
    console.log(`Deleted ${highlights.count} resume highlight(s).`);
  });
}

async function clearPageContents(prisma: PrismaClient): Promise<void> {
  await inTransaction(prisma, async (transaction) => {
    console.log("Clearing all page contents...");
    const sections = await transaction.section.deleteMany({});
    console.log(`Deleted ${sections.count} section(s).`);
    const pageContents = await transaction.pageContent.deleteMany({});
    console.log(`Deleted ${pageContents.count} page content(s).`);
  });
}

async function clearLegalPages(prisma: PrismaClient): Promise<void> {
  await clearPagesBySlug(prisma, LEGAL_PAGE_SLUGS);
}

async function clearFooter(prisma: PrismaClient): Promise<void> {
  await inTransaction(prisma, async (transaction) => {
    console.log("Clearing all footers...");
    const footers = await transaction.footer.deleteMany({});
    console.log(`Deleted ${footers.count} footer(s).`);

    console.log("Clearing all footer sections...");
    const sections = await transaction.footerSection.deleteMany({});
    console.log(`Deleted ${sections.count} footer section(s).`);

    console.log("Clearing footer navigation links...");
    const footerType = await transaction.type.findFirst({
      where: { label: "footer" },
      select: { id: true },
    });
    if (footerType) {
      const links = await transaction.navigationLink.deleteMany({
        where: { typeId: footerType.id },
      });
      console.log(`Deleted ${links.count} footer navigation link(s).`);
    }

    console.log("Clearing footer section keys...");
    const keys = await transaction.footerSectionKey.deleteMany({});
    console.log(`Deleted ${keys.count} footer section key(s).`);
  });
}

const CLEAR_ACTIONS: Record<string, ClearAction> = {
  about: clearAbout,
  analytics: clearAnalytics,
  approaches: clearApproaches,
  benefits: clearBenefits,
  certifications: clearCertifications,
  ctas: clearCtas,
  faqs: clearFaqs,
  features: clearFeatures,
  footer: clearFooter,
  heroes: clearHeroes,
  images: clearImages,
  languages: clearLanguages,
  legalPages: clearLegalPages,
  maps: clearMaps,
  navigation: clearNavigation,
  pageContents: clearPageContents,
  resume: clearResume,
  slugs: clearTypes,
  testimonials: clearTestimonials,
};

const FLAG_COMPONENTS: Record<string, string> = {
  "--about": "about",
  "--analytics": "analytics",
  "--approaches": "approaches",
  "--benefits": "benefits",
  "--certifications": "certifications",
  "--ctas": "ctas",
  "--faqs": "faqs",
  "--features": "features",
  "--footer": "footer",
  "--heroes": "heroes",
  "--images": "images",
  "--languages": "languages",
  "--legal-pages": "legalPages",
  "--maps": "maps",
  "--navigation": "navigation",
  "--page-contents": "pageContents",
  "--resume": "resume",
  "--testimonials": "testimonials",
  "--types": "slugs",
};

function isProductionEnvironment(): boolean {
  return process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
}

function hasProductionConfirmation(args: string[]): boolean {
  return (
    args.includes(PRODUCTION_CONFIRMATION_FLAG) ||
    process.env[PRODUCTION_CONFIRMATION_ENV] === "true"
  );
}

function displayHelp(): void {
  console.log(`
🗑️  Keystone CMS Database Clear Tool

USAGE:
  pnpm db:clear -- [OPTIONS] [COMPONENTS...]

OPTIONS:
  --all, -a                    Clear every default component
  --pages <slug...>            Clear listed PageContent slugs; must be last
  --legal-pages                Clear the configured legal PageContent records
  --help, -h                   Display this help message
  ${PRODUCTION_CONFIRMATION_FLAG}
                               Required in production unless
                               ${PRODUCTION_CONFIRMATION_ENV}=true

COMPONENT FLAGS:
  ${Object.keys(FLAG_COMPONENTS).join("  ")}

COMPONENT NAMES:
  ${DEFAULT_COMPONENTS.join("  ")}

EXAMPLES:
  pnpm db:clear -- --resume --analytics --navigation
  pnpm db:clear -- resume legalPages
  pnpm db:clear -- --resume --pages privacy-policy terms
  pnpm db:clear -- --all

PRODUCTION:
  NODE_ENV=production pnpm db:clear -- --resume ${PRODUCTION_CONFIRMATION_FLAG}
  ${PRODUCTION_CONFIRMATION_ENV}=true NODE_ENV=production pnpm db:clear -- --resume

⚠️  Every component clear deletes all records in its target tables. Back up the
   database first. Components run in argument order; --pages must be last and
   its requested pages are deleted after component clears.
`);
}

function parseRequests(args: string[]): {
  components: string[];
  pageSlugs: string[];
} {
  const components: string[] = [];
  const pageSlugs: string[] = [];
  const addComponent = (component: string) => {
    if (!components.includes(component)) components.push(component);
  };

  if (args.includes("--all") || args.includes("-a")) {
    DEFAULT_COMPONENTS.forEach(addComponent);
  }

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (
      argument === "--" ||
      argument === "--all" ||
      argument === "-a" ||
      argument === PRODUCTION_CONFIRMATION_FLAG
    ) {
      continue;
    }

    if (argument === "--pages") {
      index += 1;
      while (index < args.length && !args[index].startsWith("-")) {
        pageSlugs.push(args[index]);
        index += 1;
      }
      index -= 1;
      continue;
    }

    const flagComponent = FLAG_COMPONENTS[argument];
    if (flagComponent) {
      addComponent(flagComponent);
      continue;
    }

    if (argument.startsWith("-")) {
      throw new Error(`Unknown option: ${argument}`);
    }

    addComponent(argument);
  }

  return { components, pageSlugs: [...new Set(pageSlugs)] };
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    displayHelp();
    return;
  }

  let requests: ReturnType<typeof parseRequests>;
  try {
    requests = parseRequests(args);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    displayHelp();
    process.exitCode = 1;
    return;
  }

  if (requests.components.length === 0 && requests.pageSlugs.length === 0) {
    console.error("No components or page slugs specified to clear.");
    displayHelp();
    process.exitCode = 1;
    return;
  }

  if (args.includes("--pages") && requests.pageSlugs.length === 0) {
    console.error("No slugs specified after --pages.");
    process.exitCode = 1;
    return;
  }

  if (isProductionEnvironment() && !hasProductionConfirmation(args)) {
    console.error(
      `Refusing to clear a production database. Pass ${PRODUCTION_CONFIRMATION_FLAG} ` +
        `or set ${PRODUCTION_CONFIRMATION_ENV}=true to confirm this destructive operation.`,
    );
    process.exitCode = 1;
    return;
  }

  const prisma = createPrismaClient();
  try {
    for (const component of requests.components) {
      console.log(`\nClearing component "${component}"...`);
      await clearComponent(prisma, component);
      console.log(`Cleared component "${component}".`);
    }

    if (requests.pageSlugs.length > 0) {
      console.log("\nClearing requested pages...");
      await clearPagesBySlug(prisma, requests.pageSlugs);
    }

    console.log("\nClear operation completed.");
  } catch (error) {
    console.error("Error during clear operation:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void main();
