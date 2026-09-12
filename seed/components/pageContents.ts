import type { PrismaClient, Prisma } from "../prisma";
import type { CompositePageContentWithExtras, Language } from "../../data";
import type { WithId as SeedWithId } from "../types";
import Ctas from "./ctas";

// Helper type for runtime entities that have languageId
type RuntimeEntity = SeedWithId<number> & {
  languageId?: number;
  language?: { value: string };
};

type PageContentSeedOptions = {
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
        "AWS cloud consulting and cloud-native solutions for small, mid-market, and enterprise businesses. We design, implement, and optimize your AWS environment using Infrastructure as Code (IaC), serverless computing, and a secure cloud transformation approach so your business can grow safely and cost-effectively.",
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
        "AWS-Cloud-Beratung und cloud-native Lösungen für Unternehmen. Wir entwerfen, implementieren und optimieren Ihre AWS-Umgebung mit Infrastructure as Code (IaC), Serverless Computing und einem Ansatz für sichere Cloud-Transformation, damit Ihr Unternehmen sicher und kosteneffizient wachsen kann.",
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

  const languageValues = pageContentsConfig.map(
    ({ language }) => language.value,
  );
  const [allLanguages, existingPageContents, mainType] = await Promise.all([
    prisma.language.findMany({
      where: { value: { in: languageValues } },
      select: { id: true, value: true },
    }),
    prisma.pageContent.findMany({
      where: { slug: { in: pageContentsConfig.map(({ slug }) => slug) } },
      select: { id: true, slug: true },
    }),
    prisma.type.findFirstOrThrow({
      where: { label: "main" },
      select: { id: true },
    }),
  ]);
  const languageMap = Object.fromEntries(
    allLanguages.map((language) => [language.value, language.id]),
  ) as Record<Language["value"], number>;
  const existingContentBySlug = new Map(
    existingPageContents.map((content) => [content.slug, content]),
  );
  const ctas = await prisma.cta.findMany({
    where: {
      typeId: mainType.id,
      languageId: { in: allLanguages.map(({ id }) => id) },
    },
    select: { id: true, languageId: true },
  });
  const ctaByLanguageId = new Map(
    ctas.map((cta) => [cta.languageId, cta]),
  );

  const seededContents = await Promise.all(
    pageContentsConfig.map(async (config) => {
      const existingContent = existingContentBySlug.get(config.slug);
      if (existingContent) {
        console.log(
          `✓ Page content for slug "${config.slug}" already exists (id: ${existingContent.id}), skipping`,
        );
        return existingContent;
      }

      const languageId = languageMap[config.language.value];
      if (!languageId) {
        throw new Error(
          `Language not found for value: ${config.language.value}`,
        );
      }
      const cta = ctaByLanguageId.get(languageId);
      if (!cta) {
        throw new Error(
          `Main CTA not found for language: ${config.language.value}`,
        );
      }
      const { create } = config.buildSection(deps, { languageMap });
      const pageContent = await prisma.pageContent.create({
        data: {
          slug: config.slug,
          title: config.title,
          description: config.description,
          language: { connect: { id: languageId } },
          sections: { create },
          cta: { connect: { id: cta.id } },
        },
      });

      console.log(
        `✓ Created page content for slug "${config.slug}" (id: ${pageContent.id})`,
      );
      return pageContent;
    }),
  );

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
