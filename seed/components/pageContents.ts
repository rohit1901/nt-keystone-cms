import type { PrismaClient, Prisma } from "@prisma/client";
import type { CompositePageContentWithExtras, Language } from "../../data";
import type { WithId as SeedWithId } from "../types";
import Ctas from "./ctas";

// Helper type for runtime entities that have languageId
type RuntimeEntity = SeedWithId<number> & {
  languageId?: number;
  language?: { value: string };
};

type PageContentSeedOptions = {
  prisma: PrismaClient;
  languageMap: Record<Language["value"], number>; // Maps 'en-US' -> ID
};

type PageContentConfig = CompositePageContentWithExtras<{
  slug: string;
  buildSection: (
    deps: PageContentDependencies,
    opts: PageContentSeedOptions,
  ) => SectionBuildResult;
  language: Language;
}>;

const pageContentsData: CompositePageContentWithExtras<{
  slug: string;
  language: Language;
}>[] = [
    // English
    {
      slug: "home",
      title: "Nimbus Tech",
      description:
        "AWS cloud consulting and solutions for SMEs and startups. We design, implement, and optimize your AWS environment so your business can grow securely and cost-effectively.",
      language: {
        label: "English",
        value: "en-US",
      },
      cta: Ctas.data
        .find((cta) => cta.language.value === "en-US")
        ?.ctas.find((cta) => cta.type === "main"),
    },
    // German
    {
      slug: "home-de",
      title: "Nimbus Tech",
      description:
        "AWS-Cloud-Beratung und -Lösungen für KMU und Start-ups. Wir planen, implementieren und optimieren Ihre AWS-Umgebung, damit Ihr Unternehmen sicher und kosteneffizient wachsen kann.",
      language: {
        label: "German",
        value: "de-DE",
      },
      cta: Ctas.data
        .find((cta) => cta.language.value === "de-DE")
        ?.ctas.find((cta) => cta.type === "main"),
    },
  ];

type EntityRef = SeedWithId<any>;

export type PageContentDependencies = {
  hero: EntityRef[];
  benefitSection: EntityRef[];
  features: EntityRef[];
  certificationSection: EntityRef[];
  testimonialSection: EntityRef[];
  approach: EntityRef[];
  analytics: EntityRef[];
  about: EntityRef[];
  faqSection: EntityRef[];
  ctaSection: EntityRef[];
  mapSection: EntityRef[];
  navigation: EntityRef[];
  footer: EntityRef[];
};

type SectionCreateInput = Prisma.SectionCreateArgs["data"];
type SectionUpdateInput = Prisma.SectionUpdateArgs["data"];

type SectionBuildResult = {
  create: SectionCreateInput;
  update: SectionUpdateInput;
};

// Helper to filter entities by the target language ID
const filterByLangId = (items: EntityRef[], langId?: number) => {
  if (!langId) return [];
  return (items as RuntimeEntity[]).filter(
    (item) => item.languageId === langId,
  );
};

const pageContentsConfig: PageContentConfig[] = pageContentsData.map(
  (content) => ({
    slug: content.slug,
    title: content.title,
    description: content.description,
    image: content.image,
    cta: content.cta,
    language: content.language,
    buildSection: (
      deps: PageContentDependencies,
      opts: PageContentSeedOptions,
    ) => {
      // 1. Get the ID for the current page's language
      const targetLangId = opts.languageMap[content.language.value];

      if (!targetLangId) {
        console.warn(`! Language ID not found for ${content.language.value}`);
      }

      // 2. Filter all dependencies to match the language ID
      const featureConnections = filterByLangId(
        deps.features,
        targetLangId,
      ).map((i) => ({ id: i.id }));
      const faqSectionConnections = filterByLangId(
        deps.faqSection,
        targetLangId,
      ).map((i) => ({ id: i.id }));
      const aboutConnections = filterByLangId(deps.about, targetLangId).map(
        (i) => ({ id: i.id }),
      );
      const mapSectionConnections = filterByLangId(
        deps.mapSection,
        targetLangId,
      ).map((i) => ({ id: i.id }));
      const approachConnections = filterByLangId(
        deps.approach,
        targetLangId,
      ).map((i) => ({ id: i.id }));
      const benefitSectionConnections = filterByLangId(
        deps.benefitSection,
        targetLangId,
      ).map((i) => ({ id: i.id }));
      const certificationSectionConnections = filterByLangId(
        deps.certificationSection,
        targetLangId,
      ).map((i) => ({ id: i.id }));

      // THIS FIXES THE CTA ERROR: Only connect CTA Sections with matching language
      const ctaSectionConnections = filterByLangId(
        deps.ctaSection,
        targetLangId,
      ).map((i) => ({ id: i.id }));

      const navigationSectionConnections = filterByLangId(
        deps.navigation,
        targetLangId,
      ).map((i) => ({ id: i.id }));
      const testimonialSectionConnections = filterByLangId(
        deps.testimonialSection,
        targetLangId,
      ).map((i) => ({ id: i.id }));
      const footerSectionConnections = filterByLangId(
        deps.footer,
        targetLangId,
      ).map((i) => ({ id: i.id }));
      const heroSectionConnections = filterByLangId(
        deps.hero,
        targetLangId,
      ).map((i) => ({ id: i.id }));

      // Analytics special handling (might have relation object or just ID)
      const matchingAnalytic =
        (deps.analytics as RuntimeEntity[]).find(
          (a) =>
            a.languageId === targetLangId ||
            a.language?.value === content.language.value,
        ) || deps.analytics[0];

      if (!matchingAnalytic) {
        throw new Error(
          `No matching analytic found for language ${content.language.value}`,
        );
      }

      const create: SectionCreateInput = {
        type: "hero",
        contentAnalytics: { connect: { id: matchingAnalytic.id } },
      };

      // 3. Connect filtered sections
      if (featureConnections.length)
        create.contentFeatures = { connect: featureConnections };
      if (faqSectionConnections.length)
        create.contentFaqSection = { connect: faqSectionConnections };
      if (aboutConnections.length)
        create.contentAbout = { connect: aboutConnections };
      if (approachConnections.length)
        create.contentApproach = { connect: approachConnections };
      if (benefitSectionConnections.length)
        create.contentBenefits = { connect: benefitSectionConnections };
      if (certificationSectionConnections.length)
        create.contentCertifications = {
          connect: certificationSectionConnections,
        };
      if (ctaSectionConnections.length)
        create.contentCta = { connect: ctaSectionConnections };
      if (mapSectionConnections.length)
        create.contentMap = { connect: mapSectionConnections };
      if (navigationSectionConnections.length)
        create.contentNavigation = { connect: navigationSectionConnections };
      if (testimonialSectionConnections.length)
        create.contentTestimonials = { connect: testimonialSectionConnections };
      if (footerSectionConnections.length)
        create.contentFooter = { connect: footerSectionConnections };
      if (heroSectionConnections.length)
        create.contentHero = { connect: heroSectionConnections };

      return {
        create,
        update: create,
      };
    },
  }),
);

export type SeededPageContents = Awaited<ReturnType<typeof seed>>;

async function seed(prisma: PrismaClient, deps: PageContentDependencies) {
  console.log("Seeding page contents...");

  // Pre-fetch languages to map value ('en-US') to ID
  const allLanguages = await prisma.language.findMany();
  // Only use this version if your database IDs are actually Integers (1, 2, 3...)
  const languageMap: Record<Language["value"], number> = allLanguages.reduce(
    (acc, lang) => {
      acc[lang.value] = lang.id;
      return acc;
    },
    {} as Record<string, number>, // <--- This must match the variable type
  );

  // Check for existing page contents
  const existingPageContents = await prisma.pageContent.findMany({
    where: {
      slug: { in: pageContentsConfig.map(c => c.slug) },
    },
    include: {
      sections: true,
    },
  });

  const existingSlugs = new Set(existingPageContents.map(pc => pc.slug));

  const seededContents = [];

  for (const config of pageContentsConfig) {
    // Check if page content already exists for this slug
    const existingContent = existingPageContents.find(
      (pc) => pc.slug === config.slug,
    );

    if (existingContent) {
      console.log(
        `✓ Page content for slug "${config.slug}" already exists (id: ${existingContent.id}), skipping`,
      );
      seededContents.push(existingContent);
      continue;
    }

    // Pass languageMap to buildSection
    const { create } = config.buildSection(deps, { prisma, languageMap });
    const type = await prisma.type.findFirstOrThrow({
      where: {
        label: "main",
      },
    });
    const languageId = allLanguages.find(
      (lang) => lang.value === config.language.value,
    )?.id;

    if (!languageId) {
      throw new Error(
        `Language not found for value: ${config.language.value}`,
      );
    }

    const cta = await prisma.cta.findFirstOrThrow({
      where: {
        type: {
          id: type.id,
        },
        language: {
          id: languageId,
        },
      },
    });

    const pageContent = await prisma.pageContent.create({
      data: {
        slug: config.slug,
        title: config.title,
        description: config.description,
        // Connect Page Language
        language: {
          connect: {
            id: allLanguages.find(
              (lang) => lang.value === config.language.value,
            )?.id,
          },
        },
        // Create the Master Section with filtered connections
        sections: {
          create: create,
        },
        cta: {
          connect: {
            id: cta.id,
          },
        },
      },
    });

    console.log(
      `✓ Created page content for slug "${config.slug}" (id: ${pageContent.id})`,
    );
    seededContents.push(pageContent);
  }

  console.log(`✓ Total page contents: ${seededContents.length}`);
  return seededContents;
}

const clear = async (prisma: PrismaClient) => {
  console.log("Clearing all page contents...");

  // Delete sections first (they depend on page contents)
  const sectionsResult = await prisma.section.deleteMany({});
  console.log(`Deleted ${sectionsResult.count} section(s).`);

  // Then delete page contents
  const pageContentsResult = await prisma.pageContent.deleteMany({});
  console.log(`Deleted ${pageContentsResult.count} page content(s).`);

  console.log("✓ Cleared all page contents and sections.");
};

const PageContents = {
  data: pageContentsConfig.map(
    ({ slug, title, description, image, cta, language }) => ({
      slug,
      title,
      description,
      image,
      cta,
      language,
    }),
  ),
  seed,
  clear,
};

export default PageContents;
