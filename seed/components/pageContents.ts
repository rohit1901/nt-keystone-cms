import type { PrismaClient, Prisma } from "@prisma/client";
import type {
  CompositePageContentWithExtras,
  Language,
  PageContent as SchemaPageContent,
} from "../../data";
import type { WithId as SeedWithId } from "../types";

type PageContentConfig = CompositePageContentWithExtras<{
  slug: string;
  buildSection: (deps: PageContentDependencies) => SectionBuildResult;
  language: Language;
}>;

const mainPageContent: CompositePageContentWithExtras<{
  language: Language;
}> = {
  title: "Nimbus Tech",
  description:
    "Custom software development, cloud architecture, and scalable solutions for modern enterprises.",
  language: {
    label: "English",
    value: "en-US",
  },
};

type EntityRef = SeedWithId<unknown>;

export type PageContentDependencies = {
  hero: EntityRef;
  benefitSection: EntityRef;
  features: EntityRef[];
  certificationSection: EntityRef;
  testimonialSection: EntityRef;
  approach: EntityRef;
  analytics: EntityRef;
  about: EntityRef;
  faqItems: EntityRef[];
  faqSection?: EntityRef;
  ctaSection: EntityRef;
  mapSection: EntityRef;
  navigation: EntityRef;
  footer: EntityRef;
};

type SectionCreateInput = Prisma.SectionCreateArgs["data"];
type SectionUpdateInput = Prisma.SectionUpdateArgs["data"];

type SectionBuildResult = {
  create: SectionCreateInput;
  update: SectionUpdateInput;
};

const pageContentsConfig: PageContentConfig[] = [
  {
    slug: "home",
    title: mainPageContent.title,
    description: mainPageContent.description,
    image: mainPageContent.image,
    cta: mainPageContent.cta,
    language: mainPageContent.language,
    buildSection: (deps: PageContentDependencies) => {
      const featureConnections = deps.features.map((feature) => ({
        id: feature.id,
      }));
      const faqConnections = deps.faqItems.map((faq) => ({ id: faq.id }));

      const create: SectionCreateInput = {
        type: "hero",
        contentHero: { connect: { id: deps.hero.id } },
        contentBenefits: { connect: { id: deps.benefitSection.id } },
        contentCertifications: {
          connect: { id: deps.certificationSection.id },
        },
        contentTestimonials: {
          connect: { id: deps.testimonialSection.id },
        },
        contentApproach: { connect: { id: deps.approach.id } },
        contentAnalytics: { connect: { id: deps.analytics.id } },
        contentAbout: { connect: { id: deps.about.id } },
        contentNavigation: { connect: { id: deps.navigation.id } },
        contentFooter: { connect: { id: deps.footer.id } },
        contentCta: { connect: { id: deps.ctaSection.id } },
        contentMap: { connect: { id: deps.mapSection.id } },
      };

      if (featureConnections.length) {
        create.contentFeatures = { connect: featureConnections };
      }

      if (faqConnections.length) {
        create.contentFaqs = { connect: faqConnections };
      }

      if (deps.faqSection) {
        create.contentFaqSection = { connect: { id: deps.faqSection.id } };
      }

      const update: SectionUpdateInput = {
        type: "hero",
        contentHero: { connect: { id: deps.hero.id } },
        contentBenefits: { connect: { id: deps.benefitSection.id } },
        contentCertifications: {
          connect: { id: deps.certificationSection.id },
        },
        contentTestimonials: {
          connect: { id: deps.testimonialSection.id },
        },
        contentApproach: { connect: { id: deps.approach.id } },
        contentAnalytics: { connect: { id: deps.analytics.id } },
        contentAbout: { connect: { id: deps.about.id } },
        contentNavigation: { connect: { id: deps.navigation.id } },
        contentFooter: { connect: { id: deps.footer.id } },
        contentCta: { connect: { id: deps.ctaSection.id } },
        contentFeatures: { set: featureConnections },
        contentFaqs: { set: faqConnections },
        contentMap: { connect: { id: deps.mapSection.id } },
      };

      update.contentFaqSection = deps.faqSection
        ? { connect: { id: deps.faqSection.id } }
        : { disconnect: true };

      return { create, update };
    },
  },
] satisfies readonly PageContentConfig[];

type PageContentSlug = (typeof pageContentsConfig)[number]["slug"];

export type SeededPageContents = Awaited<ReturnType<typeof seed>>;

type PageContentSeedOptions = {
  pageImages?: Partial<Record<PageContentSlug, number | null>>;
  pageCtas?: Partial<Record<PageContentSlug, number | null>>;
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
    const sectionBuild = config.buildSection(dependencies);
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
