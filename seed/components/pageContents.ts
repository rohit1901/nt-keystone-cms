import type { PrismaClient, Prisma } from "@prisma/client";
import type { PageContent as SchemaPageContent } from "../../schema";
import type { WithId as SeedWithId } from "../types";
import { mainPageContent } from "../../data";

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

type PageContentConfig = SchemaPageContent & {
  slug: string;
  buildSection: (deps: PageContentDependencies) => SectionBuildResult;
};

const pageContentsConfig = [
  {
    slug: "home",
    title: mainPageContent.title,
    description: mainPageContent.description,
    image: mainPageContent.image,
    cta: mainPageContent.cta,
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

const seed = async (
  prisma: PrismaClient,
  dependencies: PageContentDependencies,
  options: PageContentSeedOptions = {},
) => {
  console.log("Seeding page contents...");

  const results: Awaited<ReturnType<typeof prisma.pageContent.upsert>>[] = [];

  for (const config of pageContentsConfig) {
    const sectionBuild = config.buildSection(dependencies);

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

    const pageContentCreateData: Prisma.PageContentCreateArgs["data"] = {
      slug: config.slug,
      title: config.title,
      description: config.description ?? "",
      sections: { connect: { id: sectionId } },
    };

    const pageContentUpdateData: Prisma.PageContentUpdateArgs["data"] = {
      title: config.title,
      description: config.description ?? "",
      sections: { connect: { id: sectionId } },
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
  data: pageContentsConfig.map(({ slug, title, description, image, cta }) => ({
    slug,
    title,
    description,
    image,
    cta,
  })),
  seed,
};

export default PageContents;
