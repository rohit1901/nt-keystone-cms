// seed.ts
// FIXME
import "dotenv/config";
import { PrismaClient, Prisma } from "@prisma/client";
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
} from "./data";
import { Section, Image, PrismaType } from "./data";
import { UnionType } from "@graphql-ts/schema";
import { InternalArgs } from "@prisma/client/runtime/library";

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

// Updated seedTestimonialSection
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
// FIXME
const seedCertifications = async () => {
  if (certificationsSection.type !== "certifications") {
    throw new Error("Invalid certifications section type");
  }
  const certifications = certificationsSection.content;
  const sectionRecord = await prisma.certification.createMany({
    data: certifications,
  });
  console.log(`${certificationsSection.type} Section seeded`);
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
  const sectionRecord = await prisma.approach.createMany({
    data: approaches,
  });
  console.log(
    `${approachSection.type} Section seeded: ${sectionRecord.count} records`,
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

const seedMap = async () => {
  const type = mapSection.type;
  if (type !== "map") {
    throw new Error("Invalid map section type");
  }
  const sectionRecord = await prisma.map.create({
    data: {
      title: mapSection.content.title,
      description: mapSection.content.description,
      subheading: mapSection.content.subheading,
    },
  });
  console.log(`Section seeded: ${sectionRecord.title}`);
};

async function main() {
  console.log("Seeding Keystone DB...");

  // Seed Benefits
  await seedBenefitsSection();

  // Seed Map
  await seedMap();

  // Seed Navigation Section
  await seedNavigationSection();

  // Seed Hero
  await seedHeroSection();

  // Seed CTA
  await seedCtaSection();

  // Seed Certifications
  // await seedCertifications();

  await seedFaqs();

  await seedFeatures();

  console.log("Seeding complete!");
  await prisma.$disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
