import type { PrismaClient, Prisma } from "@prisma/client";
import type {
  CompositePageContentWithExtras,
  Language,
  PageContent as SchemaPageContent,
} from "../../data";
import type { WithId as SeedWithId } from "../types";

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
      "Custom software development, cloud architecture, and scalable solutions for modern enterprises.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  // German
  {
    slug: "home-de",
    title: "Nimbus Tech",
    description:
      "Maßgeschneiderte Softwareentwicklung, Cloud-Architektur und skalierbare Lösungen für moderne Unternehmen.",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
];

type EntityRef = SeedWithId<unknown>;

export type PageContentDependencies = {
  hero?: EntityRef[];
  benefitSection: EntityRef[];
  features: EntityRef[];
  certificationSection: EntityRef[];
  testimonialSection: EntityRef[];
  approach: EntityRef[];
  analytics: EntityRef[]; // Updated to Array
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
      const featureConnections = deps.features.map((feature) => ({
        id: feature.id,
      }));
      const faqSectionConnections = deps.faqSection.map((faqSection) => ({
        id: faqSection.id,
      }));
      const aboutConnections = deps.about.map((about) => ({ id: about.id }));
      const mapSectionConnections = deps.mapSection.map((mapSection) => ({
        id: mapSection.id,
      }));

      // Find the analytic that matches the current content language
      // We cast to any here because EntityRef hides the 'language' relation
      // present on the runtime object returned by Analytics.seed
      const matchingAnalytic =
        (deps.analytics as any[]).find(
          (a) => a.language?.value === content.language.value,
        ) || deps.analytics[0];

      if (!matchingAnalytic) {
        throw new Error(
          `No matching analytic found for language ${content.language.value}`,
        );
      }

      const approachConnections = deps.approach.map((approach) => ({
        id: approach.id,
      }));

      const benefitSectionConnections = deps.benefitSection.map(
        (benefitSection) => ({
          id: benefitSection.id,
        }),
      );

      const certificationSectionConnections = deps.certificationSection.map(
        (certificationSection) => ({
          id: certificationSection.id,
        }),
      );

      const ctaSectionConnections = deps.ctaSection.map((ctaSection) => ({
        id: ctaSection.id,
      }));

      const navigationSectionConnections = deps.navigation.map(
        (navigation) => ({
          id: navigation.id,
        }),
      );

      const testimonialSectionConnections = deps.testimonialSection.map(
        (testimonialSection) => ({
          id: testimonialSection.id,
        }),
      );

      const footerSectionConnections = deps.footer.map((footer) => ({
        id: footer.id,
      }));

      const create: SectionCreateInput = {
        type: "hero",
        contentAnalytics: { connect: { id: matchingAnalytic.id } },
      };

      if (featureConnections.length) {
        create.contentFeatures = { connect: featureConnections };
      }

      if (faqSectionConnections.length) {
        create.contentFaqSection = { connect: faqSectionConnections };
      }

      if (aboutConnections.length) {
        create.contentAbout = { connect: aboutConnections };
      }

      if (approachConnections.length) {
        create.contentApproach = { connect: approachConnections };
      }

      if (benefitSectionConnections.length) {
        create.contentBenefits = { connect: benefitSectionConnections };
      }

      if (certificationSectionConnections.length) {
        create.contentCertifications = {
          connect: certificationSectionConnections,
        };
      }

      if (ctaSectionConnections.length) {
        create.contentCta = { connect: ctaSectionConnections };
      }

      if (mapSectionConnections.length) {
        create.contentMap = { connect: mapSectionConnections };
      }

      if (navigationSectionConnections.length) {
        create.contentNavigation = { connect: navigationSectionConnections };
      }

      if (testimonialSectionConnections.length) {
        create.contentTestimonials = { connect: testimonialSectionConnections };
      }

      if (footerSectionConnections.length) {
        create.contentFooter = { connect: footerSectionConnections };
      }

      const update: SectionUpdateInput = {
        type: "hero",
        contentBenefits: { set: benefitSectionConnections },
        contentCertifications: { set: certificationSectionConnections },
        contentTestimonials: { set: testimonialSectionConnections },
        contentApproach: { set: approachConnections },
        contentAnalytics: { connect: { id: matchingAnalytic.id } },
        contentAbout: {
          set: aboutConnections,
        },
        contentNavigation: { set: navigationSectionConnections },
        contentCta: { set: ctaSectionConnections },
        contentFeatures: { set: featureConnections },
        contentFaqSection: { set: faqSectionConnections },
        contentMap: { set: mapSectionConnections },
        contentFooter: { set: footerSectionConnections },
      };

      return { create, update };
    },
  }),
);

type PageContentSlug = (typeof pageContentsConfig)[number]["slug"];

export type SeededPageContents = Awaited<ReturnType<typeof seed>>;

type PageContentSeedOptions = {
  pageImages?: Partial<Record<PageContentSlug, number | null>>;
  pageCtas?: Partial<Record<PageContentSlug, number | null>>;
  pageAbout?: Record<Language["value"], number | undefined>;
};

const resolveLanguageId = async (
  prisma: PrismaClient,
  cache: Map<string, number>,
  language: PageContentConfig["language"],
) => {
  const cacheKey = language.value;
  const cached = cache.get(cacheKey);
  if (cached != null) {
    return cached;
  }

  const existing = await prisma.language.findFirst({
    where: {
      value: language.value,
    },
    select: { id: true, label: true },
  });

  if (existing) {
    if (existing.label !== language.label) {
      await prisma.language.update({
        where: { id: existing.id },
        data: { label: language.label },
      });
    }
    cache.set(cacheKey, existing.id);
    return existing.id;
  }

  const created = await prisma.language.create({
    data: {
      label: language.label,
      value: language.value,
    },
    select: { id: true },
  });

  console.log(
    `✓ Created language ${language.label} (${language.value}) while seeding page contents`,
  );

  cache.set(cacheKey, created.id);
  return created.id;
};

const seed = async (
  prisma: PrismaClient,
  dependencies: PageContentDependencies,
  options: PageContentSeedOptions = {},
) => {
  console.log("Seeding page contents...");

  const results: Awaited<ReturnType<typeof prisma.pageContent.upsert>>[] = [];
  const languageCache = new Map<string, number>();

  for (const config of pageContentsConfig) {
    const sectionBuild = config.buildSection(dependencies, options);
    const languageId = await resolveLanguageId(
      prisma,
      languageCache,
      config.language,
    );

    const existingPageContent = await prisma.pageContent.findUnique({
      where: { slug: config.slug },
      select: { sectionsId: true },
    });

    let sectionId: number;

    if (existingPageContent?.sectionsId != null) {
      await prisma.section.update({
        where: { id: existingPageContent.sectionsId },
        data: sectionBuild.update,
      });
      sectionId = existingPageContent.sectionsId;
      console.log(
        `✓ Updated section ${sectionId} for page content "${config.slug}"`,
      );
    } else {
      const section = await prisma.section.create({
        data: sectionBuild.create,
      });
      sectionId = section.id;
      console.log(
        `✓ Created section ${sectionId} for page content "${config.slug}"`,
      );
    }

    const imageId = options.pageImages?.[config.slug];
    const ctaId = options.pageCtas?.[config.slug];

    const languageConnect = { connect: { id: languageId } };

    const pageContentCreateData: Prisma.PageContentCreateArgs["data"] = {
      slug: config.slug,
      title: config.title,
      description: config.description ?? "",
      sections: { connect: { id: sectionId } },
      language: languageConnect,
    };

    const pageContentUpdateData: Prisma.PageContentUpdateArgs["data"] = {
      title: config.title,
      description: config.description ?? "",
      sections: { connect: { id: sectionId } },
      language: languageConnect,
    };

    if (imageId != null) {
      pageContentCreateData.image = { connect: { id: imageId } };
      pageContentUpdateData.image = { connect: { id: imageId } };
    } else {
      pageContentUpdateData.image = { disconnect: true };
    }

    if (ctaId != null) {
      pageContentCreateData.cta = { connect: { id: ctaId } };
      pageContentUpdateData.cta = { connect: { id: ctaId } };
    } else {
      pageContentUpdateData.cta = { disconnect: true };
    }

    const pageContent = await prisma.pageContent.upsert({
      where: { slug: config.slug },
      create: pageContentCreateData,
      update: pageContentUpdateData,
    });

    results.push(pageContent);

    console.log(
      `✓ Upserted page content "${pageContent.slug}" (section ${sectionId})`,
    );
  }

  return results;
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
};

export default PageContents;
