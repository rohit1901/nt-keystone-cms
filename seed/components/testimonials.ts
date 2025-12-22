import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import type { SeededImages } from "./images";
import type { SeededSlugs } from "./slugs";
import {
  Language,
  TestimonialBadge,
  TestimonialItem,
  TestimonialSection,
} from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededTestimonialBadges = Awaited<ReturnType<typeof seedBadges>>;
export type SeededTestimonialItems = Awaited<ReturnType<typeof seedItems>>;
export type SeededTestimonialSections = Awaited<
  ReturnType<typeof seedSections>
>;

// --- Testimonial Badge data ---
const english: Language = {
  label: "English",
  value: "en-US",
};

const german: Language = {
  label: "German",
  value: "de-DE",
};

export const testimonialBadges: TestimonialBadge[] = [
  {
    icon: "RiTimeLine",
    label: "Coming Soon",
    language: english,
  },
  {
    icon: "RiTimeLine",
    label: "Bald verfügbar",
    language: german,
  },
];

// --- Testimonial Item data ---
export const testimonialItems: TestimonialItem[] = [
  {
    rating: 5.0,
    badge: testimonialBadges.find(
      (badge) => badge.language.value === english.value,
    ),
    name: "The Nimbus Tech Team",
    role: "Software & Cloud Experts, Germany",
    company: "Nimbus Tech",
    content:
      "As Nimbus Tech launches, we look forward to partnering with innovative organizations and delivering exceptional software and cloud solutions. Your feedback could be featured here!",
    imageKey: "testimonialLogo",
    language: english,
  },
  {
    rating: 5.0,
    badge: testimonialBadges.find(
      (badge) => badge.language.value === german.value,
    ),
    name: "The Nimbus Tech Team",
    role: "Software & Cloud Experts, Germany",
    company: "Nimbus Tech",
    content:
      "Als Nimbus Tech startet, freuen wir uns darauf, innovative Organisationen zu partnern und exzellente Software und Cloud-Lösungen zu liefern. Ihr Feedback könnte hier aufgeführt werden!",
    imageKey: "testimonialLogo",
    language: german,
  },
];

// --- Testimonial Section data ---
export const testimonialSections: TestimonialSection[] = [
  {
    title: "Client Success Stories",
    backgroundImageKeys: ["testimonialField", "testimonialDrone"],
    fallbackIndex: 0,
    language: english,
  },
  {
    title: "Kunden Erfolge",
    backgroundImageKeys: ["testimonialField", "testimonialDrone"],
    fallbackIndex: 0,
    language: german,
  },
];

const seedBadges = async (
  prisma: PrismaClient,
  languages: SeededFooterLanguages,
) => {
  const data = testimonialBadges.map((badge) => {
    const langId = languages.find(
      (lang) => lang.value === badge.language.value,
    )?.id;

    if (!langId) {
      throw new Error(`Language not seeded for badge ${badge.label}`);
    }

    return {
      icon: badge.icon,
      label: badge.label,
      languageId: langId,
    };
  });

  const seededBadges = await prisma.testimonialBadge.createManyAndReturn({
    data,
  });
  console.log(`✓ Seeded ${seededBadges.length} testimonial badges`);
  return seededBadges;
};

const seedItems = async (
  prisma: PrismaClient,
  badges: SeededTestimonialBadges,
  images: SeededImages,
  slugs: SeededSlugs,
  languages: SeededFooterLanguages,
) => {
  // Get the testimonial slug type ID
  const testimonialTypeId = slugs.find(
    (slug) => slug.label === "testimonial",
  )?.id;

  const seededItems = await Promise.all(
    testimonialItems.map((item, index) => {
      const langId = languages.find(
        (lang) => lang.value === item.language.value,
      )?.id;
      // Filter images by testimonial typeId, then find by src pattern
      const image = item.imageKey
        ? images.find((img) => img.typeId === testimonialTypeId)
        : undefined;

      return prisma.testimonialItem.create({
        data: {
          rating: item.rating,
          badgeId: badges.find((badge) => badge.languageId === langId)?.id,
          name: item.name,
          role: item.role,
          company: item.company,
          imageId: image?.id,
          content: item.content,
          languageId: langId,
          badge: undefined,
          image: undefined,
          language: undefined,
        },
      });
    }),
  );
  console.log(`✓ Seeded ${seededItems.length} testimonial items`);
  return seededItems;
};

const seedSections = async (
  prisma: PrismaClient,
  images: SeededImages,
  slugs: SeededSlugs,
  languages: SeededFooterLanguages,
) => {
  const testimonialTypeId = slugs.find(
    (slug) => slug.label === "testimonial",
  )?.id;

  if (!testimonialTypeId) {
    throw new Error("Testimonial slug type not found");
  }

  const badges = await seedBadges(prisma, languages);
  const items = await seedItems(prisma, badges, images, slugs, languages);

  const seededSections = await Promise.all(
    testimonialSections.map((section) => {
      const testimonialImages = images.filter(
        (img) => img.typeId === testimonialTypeId,
      );
      const langId = languages.find(
        (lang) => lang.value === section.language.value,
      )?.id;

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

      const fallbackItem = items.find((item) => item.languageId === langId);

      return prisma.testimonialSection.create({
        data: {
          title: section.title,
          background: backgroundImages.length
            ? { connect: backgroundImages.map((img) => ({ id: img.id })) }
            : undefined,
          fallbackId: fallbackItem ? fallbackItem.id : undefined,
          fallback: undefined,
          languageId: langId,
          language: undefined,
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
