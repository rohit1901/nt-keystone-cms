// seed.ts
import "dotenv/config";
import { PrismaClient, Prisma, AnalyticsStat } from "@prisma/client";
import {
  mapSection,
  navigationSection,
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
  navigationPageContent,
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
  const sectionRecord = await prisma.testimonialSection.create({
    data: {
      background: {
        connect: foundBackgrounds.map((background) => ({
          id: background.id,
        })),
      },
      fallback: {
        create: {
          badge: {
            create: {
              ...fallback.badge,
            },
          },
          image: {
            create: {
              ...fallback.image,
            },
          },
          name: fallback.name,
          role: fallback.role,
          company: fallback.company,
          content: fallback.content,
        },
      },
    },
  });
  console.log(`${testimonialSection.type} Section seeded: ${sectionRecord.id}`);
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
      banner: {
        connect: {
          id: heroBanner?.id,
        },
      },
    },
  });
  console.log(`${heroSection.type} seeded: ${sectionRecord.id}`);
};

const seedBenefitsSection = async () => {
  if (benefitsSection.type !== "benefits") {
    throw new Error("Invalid benefits section type");
  }
  const benefits = benefitsSection.content;
  const sectionRecord = await prisma.benefit.createMany({
    data: benefits.map((benefit) => ({
      icon: benefit.icon,
      title: benefit.title,
      description: benefit.description,
    })),
  });
  console.log(`${benefitsSection.type} Section seeded`);
};

const seedFaqs = async () => {
  if (faqsSection.type !== "faqs") {
    throw new Error("Invalid faqs section type");
  }
  const faqs = faqsSection.content;
  const sectionRecord = await prisma.faq.createMany({
    data: faqs,
  });
  console.log(`${faqsSection.type} Section seeded`);
};
const createCertification = async (certification: Certification) => {
  const image = certification.image
    ? await createImages([certification.image])
    : [];
  return prisma.certification.create({
    data: {
      title: certification.title,
      description: certification.description,
      image:
        image.length > 0
          ? {
              connect: {
                id: image[0]?.id,
              },
            }
          : undefined,
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
};

const seedFeatures = async () => {
  if (featuresSection.type !== "features") {
    throw new Error("Invalid features section type");
  }
  const features = featuresSection.content;
  const sectionRecord = await prisma.feature.createMany({
    data: features,
  });
  console.log(`${featuresSection.type} Section seeded`);
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
};

const seedNavigationSection = async () => {
  if (navigationSection.type !== "navigation") {
    throw new Error("Invalid navigation section type");
  }

  const sectionRecord = await prisma.navigationLink.createMany({
    data: navigationSection.content.items,
  });
  console.log(`Navigation Section seeded: ${sectionRecord.count} records`);
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
  const sectionRecord = await prisma.analyticsSection.create({
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
};

const seedAboutSection = async () => {
  if (aboutSection.type !== "about") {
    throw new Error("Invalid about section type");
  }
  const valueRecords = await prisma.value.createManyAndReturn({
    data: aboutSection.content.values,
  });
  await prisma.about.create({
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
};

const seedPageContent = async (content: PageContent) => {
  const img = content.image ? await createImages([content.image]) : null;
  const cta = await prisma.cta.create({
    data: content.cta,
  });
  // main page content
  const mainPageContentRecord = await prisma.pageContent.create({
    data: {
      title: content.title,
      description: content.description,
      imageId: img ? img[0].id : null,
      ctaId: cta.id,
      // TODO: manually connect sections or think of an identifier to connect sections
    },
  });
  console.log(`Page Content Section seeded`);
};

async function main() {
  console.log("Seeding Keystone DB...");

  // Seed Benefits
  await seedBenefitsSection();

  // Seed Map
  await seedMapSection();

  await seedTestimonialSection();

  // Seed Navigation Section
  await seedNavigationSection();

  // Seed Hero
  await seedHeroSection();

  // Seed CTA
  await seedCtaSection();

  // Seed Certifications
  await seedCertifications();

  await seedFaqs();

  await seedFeatures();

  await seedApproaches();

  await seedFooter();

  await seedAnalyticsSection();

  await seedAboutSection();

  await seedPageContent(mainPageContent);
  await seedPageContent(navigationPageContent);

  console.log("Seeding complete!");
  await prisma.$disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
