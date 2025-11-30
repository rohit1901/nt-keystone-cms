// seed.ts
import "dotenv/config";
import { PrismaClient, Prisma, AnalyticsStat } from "@prisma/client";
import {
  mapSection,
  navigation,
  benefitsSection,
  heroSection,
  ctaSection,
  testimonialSection,
  faqsSection,
  certificationsSection,
  featuresSection,
  approachSection,
  footerSection,
  analyticsSection,
  aboutSection,
  mainPageContent,
  Certification,
  FooterSection,
  PageContent,
} from "./data";
import { Section, Image, PrismaType } from "./data";

const prisma = new PrismaClient();

const createImages = async (input: Image[]): Promise<PrismaType<Image>[]> => {
  const images = await prisma.image.createManyAndReturn({
    data: input,
  });
  console.log(`Testimonial Images seeded`);
  return images as PrismaType<Image>[];
};
// Generic function to create backgrounds
const createBackgrounds = async (
  section: Section,
  images: PrismaType<Image>[],
) => {
  if (section.type == "cta" || section.type == "testimonials") {
    const data = images.map((image) => {
      const outerClassName = section.content.background.find(
        (background) => background.image.src === image.src,
      )?.outerClassName;
      return {
        imageId: image.id,
        outerClassName,
      };
    });
    const backgrounds = await prisma.background.createManyAndReturn({
      data,
    });
    console.log(`${section.type} backgrounds seeded`);
    return backgrounds;
  }
  throw new Error("Invalid section type");
};

const seedCtaSection = async () => {
  if (ctaSection.type !== "cta") {
    throw new Error("Invalid cta section type");
  }
  const backgrounds = await createBackgrounds(
    ctaSection,
    await createImages(ctaSection.content.background.map((b) => b.image)),
  );
  const ctas = await prisma.cta.createManyAndReturn({
    data: ctaSection.content.ctas,
  });
  const sectionRecord = await prisma.ctaSection.create({
    data: {
      background: {
        connect: backgrounds.map((b) => ({ id: b.id })),
      },
      ctas: {
        connect: ctas.map((c) => ({ id: c.id })),
      },
    },
  });
  console.log(`CTA Section seeded: ${sectionRecord.id}`);
  return sectionRecord.id;
};

const seedTestimonialSection = async () => {
  if (testimonialSection.type !== "testimonials") {
    throw new Error("Invalid testimonial section type");
  }
  const { fallback } = testimonialSection.content;
  const createdImages = await createImages([
    ...testimonialSection.content.background.map((b) => b.image),
    testimonialSection.content.fallback.image,
  ]);
  const foundBackgrounds = await createBackgrounds(
    testimonialSection,
    createdImages,
  );
  const badge = await prisma.testimonialBadge.create({
    data: {
      ...fallback.badge,
    },
  });
  const image = await createImages([fallback.image]);
  const createdFallback = await prisma.testimonialItem.create({
    data: {
      badge: {
        connect: {
          id: badge.id,
        },
      },
      name: fallback.name,
      role: fallback.role,
      company: fallback.company,
      content: fallback.content,
      image: {
        connect: {
          id: image[0].id,
        },
      },
    },
  });
  const sectionRecord = await prisma.testimonial.create({
    data: {
      background: {
        connect: foundBackgrounds.map((background) => ({
          id: background.id,
        })),
      },
      fallbackId: createdFallback.id,
    },
  });
  console.log(`${testimonialSection.type} Section seeded: ${sectionRecord.id}`);
  return sectionRecord.id;
};

const seedHeroSection = async () => {
  const type = heroSection.type;
  if (type !== "hero") {
    throw new Error("Invalid hero section type");
  }
  const heroBannerAdditional = heroSection.content.banner.additional
    ? await prisma.heroBannerAdditional.create({
        data: {
          icon: heroSection.content.banner.additional.icon,
          text: heroSection.content.banner.additional.text,
        },
      })
    : null;
  const heroBanner = heroSection.content.banner
    ? await prisma.heroBanner.create({
        data: {
          additional: {
            connect: {
              id: heroBannerAdditional?.id,
            },
          },
        },
      })
    : null;
  const sectionRecord = await prisma.hero.create({
    data: {
      subHeading: heroSection.content.subHeading,
      bannerId: heroBanner?.id,
    },
  });
  console.log(`${heroSection.type} seeded: ${sectionRecord.id}`);
  return sectionRecord.id;
};

const seedBenefitsSection = async () => {
  if (benefitsSection.type !== "benefits") {
    throw new Error("Invalid benefits section type");
  }
  const benefits = benefitsSection.content;
  const sectionRecord = await prisma.benefit.createManyAndReturn({
    data: benefits.map((benefit) => ({
      icon: benefit.icon,
      title: benefit.title,
      description: benefit.description,
    })),
  });
  console.log(`${benefitsSection.type} Section seeded`);
  return sectionRecord.map((benefit) => benefit.id);
};

const seedFaqs = async () => {
  if (faqsSection.type !== "faqs") {
    throw new Error("Invalid faqs section type");
  }
  const faqs = faqsSection.content;
  const sectionRecord = await prisma.faq.createManyAndReturn({
    data: faqs.map((faq) => ({
      ...faq,
    })),
  });
  console.log(`${faqsSection.type} Section seeded`);
  return sectionRecord.map((faq) => faq.id);
};
const createCertification = async (certification: Certification) => {
  const image = certification.image
    ? await createImages([certification.image])
    : [];
  return prisma.certification.create({
    data: {
      title: certification.title,
      description: certification.description,
      imageId: image[0].id,
    },
  });
};
const seedCertifications = async () => {
  if (certificationsSection.type !== "certifications") {
    throw new Error("Invalid certifications section type");
  }
  const certifications = certificationsSection.content;
  const sectionRecord = await Promise.all(
    certifications.map(createCertification),
  );
  console.log(
    `${certificationsSection.type} Section seeded: ${certifications.length} records`,
  );
  return sectionRecord.map((certification) => certification.id);
};

const seedFeatures = async () => {
  if (featuresSection.type !== "features") {
    throw new Error("Invalid features section type");
  }
  const features = featuresSection.content;
  const sectionRecord = await prisma.feature.createManyAndReturn({
    data: features.map((feature) => ({
      ...feature,
    })),
  });
  console.log(`${featuresSection.type} Section seeded`);
  return sectionRecord.map((feature) => feature.id);
};

const seedApproaches = async () => {
  if (approachSection.type !== "approach") {
    throw new Error("Invalid approaches section type");
  }
  const approaches = approachSection.content;

  const steps = await prisma.approachStep.createManyAndReturn({
    data: approaches.steps.map((step) => ({
      title: step.title,
      description: step.description,
      activityTime: step.activityTime,
      aid: step.aid,
    })),
  });
  const sectionRecord = await prisma.approach.create({
    data: {
      title: approaches.title,
      description: approaches.description,
      steps: {
        connect: steps.map((step) => ({ id: step.id })),
      },
    },
  });
  console.log(
    `${approachSection.type} Section seeded: ${steps.length} records`,
  );
  return sectionRecord.id;
};

const seedNavigationSection = async () => {
  if (navigation.type !== "navigation") {
    throw new Error("Invalid navigation section type");
  }

  const navigationItems = await prisma.navigationLink.createManyAndReturn({
    data: navigation.content.items,
  });
  const n = navigation.content;
  const sectionRecord = await prisma.navigation.create({
    data: {
      title: n.title,
      description: n.description,
      items: {
        connect: navigationItems.map((item) => ({ id: item.id })),
      },
    },
  });
  console.log(`Navigation Section seeded: ${navigationItems.length} records`);
  return sectionRecord.id;
};
const createFooterPartItems = async (section: FooterSection) => {
  const items = await prisma.navigationLink.createManyAndReturn({
    data: section.items,
  });
  return items;
};
const createFooterPart = async (section: FooterSection) => {
  const items = await createFooterPartItems(section);
  return await prisma.footerPart.create({
    data: {
      title: section.title,
      items: {
        connect: items.map((item) => ({ id: item.id })),
      },
    },
  });
};
const seedFooter = async () => {
  if (footerSection.type !== "footer") {
    throw new Error("Invalid footer section type");
  }
  await Promise.all(
    footerSection.content.sections.map(async (section) => {
      return await createFooterPart(section);
    }),
  );
  const parts = await prisma.footerPart.findMany();
  const languages = await prisma.language.createManyAndReturn({
    data: footerSection.content.languages,
  });
  const sectionRecords = await prisma.footer.create({
    data: {
      sections: {
        connect: parts.map((part) => ({ id: part.id })),
      },
      languages: {
        connect: languages.map((language) => ({ id: language.id })),
      },
    },
  });
  console.log(`Footer seeded`);
  return sectionRecords.id;
};

const seedAnalyticsSection = async () => {
  if (analyticsSection.type !== "analytics") {
    throw new Error("Invalid analytics section type");
  }
  const analyticsStats: PrismaType<AnalyticsStat> =
    await prisma.analyticsStat.create({
      data: {
        ...analyticsSection.content.stats,
      },
    });
  const analyticsSummaries =
    await prisma.analyticsSummaryItem.createManyAndReturn({
      data: analyticsSection.content.summary,
    });
  const sectionRecord = await prisma.analytic.create({
    data: {
      heading: analyticsSection.content.heading,
      subheading: analyticsSection.content.subheading,
      tableHeadings: JSON.stringify(analyticsSection.content.tableHeadings),
      statsId: analyticsStats.id,
      summary: {
        connect: analyticsSummaries.map((summary) => ({ id: summary.id })),
      },
    },
  });
  console.log(`Section seeded: ${analyticsSection.type}`);
  return sectionRecord.id;
};

const seedAboutSection = async () => {
  if (aboutSection.type !== "about") {
    throw new Error("Invalid about section type");
  }
  const valueRecords = await prisma.value.createManyAndReturn({
    data: aboutSection.content.values,
  });
  const sectionRecord = await prisma.about.create({
    data: {
      heading: aboutSection.content.heading,
      intro: aboutSection.content.intro,
      valuesTitle: aboutSection.content.valuesTitle,
      values: {
        connect: valueRecords.map((value) => ({ id: value.id })),
      },
    },
  });
  console.log(`Section seeded: ${aboutSection.type}`);
  return sectionRecord.id;
};

const seedMapSection = async () => {
  if (mapSection.type !== "map") {
    throw new Error("Invalid map section type");
  }
  const mapRecord = await prisma.map.create({
    data: {
      title: mapSection.content.title,
      subheading: mapSection.content.subheading,
      description: mapSection.content.description,
    },
  });
  console.log(`Section seeded: ${mapSection.type}`);

  return mapRecord.id;
};

const seedPageContent = async (
  content: PageContent,
  createdSectionId: string,
) => {
  const img = content.image ? await createImages([content.image]) : undefined;
  const cta = await prisma.cta.create({
    data: content.cta,
  });
  // main page content
  const mainPageContentRecord = await prisma.pageContent.create({
    data: {
      title: content.title,
      description: content.description,
      cta: {
        connect: {
          id: cta.id,
        },
      },
      slug: "main",
      image: {
        connect: {
          id: img?.[0]?.id,
        },
      },
      sections: {
        connect: {
          id: createdSectionId,
        },
      },
    },
  });
  console.log(`Page Content Section seeded`);
};
const seedSections = async ({
  heroId,
  benefitIds,
  featureIds,
  faqIds,
  testimonialId,
  certificationIds,
  approachId,
  aboutId,
  analyticsId,
  navigationId,
  footerId,
  ctaSectionId,
  mapId,
}: {
  heroId: string;
  benefitIds: string[];
  featureIds: string[];
  faqIds: string[];
  testimonialId: string;
  certificationIds: string[];
  approachId: string;
  aboutId: string;
  analyticsId: string;
  navigationId: string;
  footerId: string;
  ctaSectionId: string;
  mapId: string;
}) => {
  const mainPageSections = await prisma.section.create({
    data: {
      type: "section",
      contentHero: {
        connect: {
          id: heroId,
        },
      },
      contentBenefits: {
        connect: benefitIds.map((id) => ({ id })),
      },
      contentFeatures: {
        connect: featureIds.map((id) => ({ id })),
      },
      contentFaqs: {
        connect: faqIds.map((id) => ({ id })),
      },
      contentTestimonials: {
        connect: { id: testimonialId },
      },
      contentCertifications: {
        connect: certificationIds.map((id) => ({ id })),
      },
      contentApproaches: {
        connect: { id: approachId },
      },
      contentAbout: {
        connect: { id: aboutId },
      },
      contentAnalytics: {
        connect: { id: analyticsId },
      },
      contentNavigation: {
        connect: {
          id: navigationId,
        },
      },
      contentFooter: {
        connect: { id: footerId },
      },
      contentCta: {
        connect: { id: ctaSectionId },
      },
      contentMap: {
        connect: { id: mapId },
      },
    },
  });
  return mainPageSections.id;
};
async function main() {
  console.log("Seeding Keystone DB...");

  // Seed Benefits
  const benefitsSectionId = await seedBenefitsSection();

  // Seed Map
  const testimonialSectionId = await seedTestimonialSection();

  // Seed Hero
  const heroSectionId = await seedHeroSection();

  // Seed CTA
  const ctaSectionId = await seedCtaSection();

  // Seed Certifications
  const certificationsSectionId = await seedCertifications();

  const navigationSectionId = await seedNavigationSection();

  const faqsSectionId = await seedFaqs();

  const featuresSectionId = await seedFeatures();

  const approachesSectionId = await seedApproaches();

  const footerSectionId = await seedFooter();

  const analyticsSectionId = await seedAnalyticsSection();

  const aboutSectionId = await seedAboutSection();

  const mapSectionId = await seedMapSection();

  const sectionId = await seedSections({
    heroId: heroSectionId,
    navigationId: navigationSectionId,
    faqIds: faqsSectionId,
    featureIds: featuresSectionId,
    approachId: approachesSectionId,
    footerId: footerSectionId,
    analyticsId: analyticsSectionId,
    aboutId: aboutSectionId,
    mapId: mapSectionId,
    benefitIds: benefitsSectionId,
    certificationIds: certificationsSectionId,
    ctaSectionId: ctaSectionId,
    testimonialId: testimonialSectionId,
  });

  await seedPageContent(mainPageContent, sectionId);

  console.log("Seeding complete!");
  await prisma.$disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
