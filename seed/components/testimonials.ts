import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import type { SeededImages } from "./images";
import type { SeededSlugs } from "./slugs";

// --- Testimonial Types ---
export type TestimonialBadge = {
  icon: string;
  label: string;
};

export type TestimonialItem = {
  rating?: number;
  badge?: TestimonialBadge;
  name: string;
  role: string;
  company: string;
  content: string;
  imageKey?: string;
};

export type TestimonialSection = {
  title: string;
  backgroundImageKeys: string[];
  fallbackIndex: number;
};

export type SeededTestimonialBadges = Awaited<ReturnType<typeof seedBadges>>;
export type SeededTestimonialItems = Awaited<ReturnType<typeof seedItems>>;
export type SeededTestimonialSections = Awaited<
  ReturnType<typeof seedSections>
>;

// --- Testimonial Badge data ---
export const testimonialBadges: TestimonialBadge[] = [
  {
    icon: "RiTimeLine",
    label: "Coming Soon",
  },
];

// --- Testimonial Item data ---
export const testimonialItems: TestimonialItem[] = [
  {
    rating: 5.0,
    badge: testimonialBadges[0],
    name: "The Nimbus Tech Team",
    role: "Software & Cloud Experts, Germany",
    company: "Nimbus Tech",
    content:
      "As Nimbus Tech launches, we look forward to partnering with innovative organizations and delivering exceptional software and cloud solutions. Your feedback could be featured here!",
    imageKey: "testimonialLogo",
  },
];

// --- Testimonial Section data ---
export const testimonialSections: TestimonialSection[] = [
  {
    title: "Client Success Stories",
    backgroundImageKeys: ["testimonialField", "testimonialDrone"],
    fallbackIndex: 0,
  },
];

const seedBadges = async (prisma: PrismaClient) => {
  const seededBadges = await prisma.testimonialBadge.createManyAndReturn({
    data: testimonialBadges,
  });
  console.log(`✓ Seeded ${seededBadges.length} testimonial badges`);
  return seededBadges;
};

const seedItems = async (
  prisma: PrismaClient,
  badges: SeededTestimonialBadges,
  images: SeededImages,
  slugs: SeededSlugs,
) => {
  // Get the testimonial slug type ID
  const testimonialTypeId = slugs.find(
    (slug) => slug.label === "testimonial",
  )?.id;

  const seededItems = await Promise.all(
    testimonialItems.map((item, index) => {
      // Filter images by testimonial typeId, then find by src pattern
      const image = item.imageKey
        ? images
            .filter((img) => img.typeId === testimonialTypeId)
            .find((img) => img.src?.includes("nimbus"))
        : undefined;

      return prisma.testimonialItem.create({
        data: {
          rating: item.rating,
          badge: item.badge
            ? { connect: { id: badges[index]?.id || badges[0].id } }
            : undefined,
          name: item.name,
          role: item.role,
          company: item.company,
          image: image ? { connect: { id: image.id } } : undefined,
          content: item.content,
        },
      });
    }),
  );
  console.log(`✓ Seeded ${seededItems.length} testimonial items`);
  return seededItems;
};

const seedSections = async (
  prisma: PrismaClient,
  items: SeededTestimonialItems,
  images: SeededImages,
  slugs: SeededSlugs,
) => {
  // Get the testimonial slug type ID
  const testimonialTypeId = slugs.find(
    (slug) => slug.label === "testimonial",
  )?.id;

  const seededSections = await Promise.all(
    testimonialSections.map((section) => {
      // Filter images by testimonial typeId, then find by src pattern
      const testimonialImages = images.filter(
        (img) => img.typeId === testimonialTypeId,
      );

      const backgroundImages = section.backgroundImageKeys
        .map((key) => {
          if (key === "testimonialField") {
            return testimonialImages.find((img) => img.src?.includes("field"));
          }
          if (key === "testimonialDrone") {
            return testimonialImages.find((img) => img.src?.includes("drone"));
          }
          return undefined;
        })
        .filter((img): img is NonNullable<typeof img> => img !== undefined);

      const fallbackItem = items[section.fallbackIndex];

      return prisma.testimonialSection.create({
        data: {
          title: section.title,
          background: backgroundImages.length
            ? { connect: backgroundImages.map((img) => ({ id: img.id })) }
            : undefined,
          fallback: fallbackItem
            ? { connect: { id: fallbackItem.id } }
            : undefined,
        },
      });
    }),
  );
  console.log(`✓ Seeded ${seededSections.length} testimonial sections`);
  return seededSections;
};

const Testimonials = {
  badges: testimonialBadges,
  items: testimonialItems,
  sections: testimonialSections,
  seedBadges,
  seedItems,
  seedSections,
};

export default Testimonials;
