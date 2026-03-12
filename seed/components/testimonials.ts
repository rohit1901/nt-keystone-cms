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
    role: "AWS Cloud & Software Experts, Germany",
    company: "Nimbus Tech",
    content:
      "As Nimbus Tech launches, we look forward to partnering with small, mid-market, and enterprise businesses to deliver clear, effective AWS cloud solutions. Your feedback could be featured here!",
    imageKey: "testimonialLogo",
    language: english,
  },
  {
    rating: 5.0,
    badge: testimonialBadges.find(
      (badge) => badge.language.value === german.value,
    ),
    name: "Das Nimbus Tech Team",
    role: "AWS-Cloud- & Software-Expert:innen, Deutschland",
    company: "Nimbus Tech",
    content:
      "Zum Start von Nimbus Tech freuen wir uns darauf, gemeinsam mit Unternehmen klare, wirksame AWS-Cloud-Lösungen umzusetzen. Ihr Feedback könnte hier erscheinen!",
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
    title: "Kundenerfahrungen",
    backgroundImageKeys: ["testimonialField", "testimonialDrone"],
    fallbackIndex: 0,
    language: german,
  },
];

const seedBadges = async (
  prisma: PrismaClient,
  languages: SeededFooterLanguages,
) => {
  // Get all existing testimonial badges to check for duplicates
  const existingBadges = await prisma.testimonialBadge.findMany({
    select: { id: true, label: true, icon: true, languageId: true },
  });

  // Create unique keys based on label + languageId
  const existingBadgeKeys = new Set(
    existingBadges.map((badge) => `${badge.label}|${badge.languageId}`)
  );

  const badgesToCreate = testimonialBadges
    .map((badge) => {
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
        key: `${badge.label}|${langId}`,
      };
    })
    .filter(({ key }) => !existingBadgeKeys.has(key));

  let newBadgesCount = 0;
  let seededBadges = [...existingBadges];

  if (badgesToCreate.length > 0) {
    const newBadges = await prisma.testimonialBadge.createManyAndReturn({
      data: badgesToCreate.map(({ key, ...data }) => data),
    });
    newBadgesCount = newBadges.length;
    seededBadges = [...existingBadges, ...newBadges];
    console.log(`✓ Created ${newBadgesCount} new testimonial badge(s)`);
  } else {
    console.log(`✓ All testimonial badges already exist, skipping creation`);
  }

  console.log(`✓ Total testimonial badges in database: ${seededBadges.length}`);
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

  // Get all existing testimonial items to check for duplicates
  const existingItems = await prisma.testimonialItem.findMany({
    select: { id: true, name: true, content: true, languageId: true, badgeId: true, imageId: true, role: true, company: true, rating: true },
  });

  // Create unique keys based on name + content + languageId
  const existingItemKeys = new Set(
    existingItems.map((item) => `${item.name}|${item.content}|${item.languageId}`)
  );

  const itemsToCreate = testimonialItems
    .map((item) => {
      const langId = languages.find(
        (lang) => lang.value === item.language.value,
      )?.id;

      // Filter images by testimonial typeId, then find by src pattern
      const image = item.imageKey
        ? images.find(
          (img) =>
            img.typeId === testimonialTypeId && img.alt.includes("logo"),
        )
        : undefined;

      const badgeId = badges.find((badge) => badge.languageId === langId)?.id;

      return {
        rating: item.rating,
        badgeId,
        name: item.name,
        role: item.role,
        company: item.company,
        imageId: image?.id,
        content: item.content,
        languageId: langId,
        key: `${item.name}|${item.content}|${langId}`,
      };
    })
    .filter(({ key }) => !existingItemKeys.has(key));

  let newItemsCount = 0;
  let seededItems = [...existingItems];

  if (itemsToCreate.length > 0) {
    const newItems = await Promise.all(
      itemsToCreate.map(async ({ key, ...data }) => {
        return await prisma.testimonialItem.create({
          data,
        });
      })
    );
    newItemsCount = newItems.length;
    seededItems = [...existingItems, ...newItems];
    console.log(`✓ Created ${newItemsCount} new testimonial item(s)`);
  } else {
    console.log(`✓ All testimonial items already exist, skipping creation`);
  }

  console.log(`✓ Total testimonial items in database: ${seededItems.length}`);
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

  // Get all existing testimonial sections to check for duplicates
  const existingSections = await prisma.testimonialSection.findMany({
    select: { id: true, title: true, languageId: true, fallbackId: true },
  });

  // Create unique keys based on title + languageId
  const existingSectionKeys = new Set(
    existingSections.map((section) => `${section.title}|${section.languageId}`)
  );

  const sectionsToCreate = testimonialSections.filter((section) => {
    const langId = languages.find(
      (lang) => lang.value === section.language.value,
    )?.id;
    const key = `${section.title}|${langId}`;
    return !existingSectionKeys.has(key);
  });

  let newSectionsCount = 0;
  const seededSections = [...existingSections];

  if (sectionsToCreate.length > 0) {
    const newSections = await Promise.all(
      sectionsToCreate.map((section) => {
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
            languageId: langId,
          },
        });
      })
    );
    newSectionsCount = newSections.length;
    seededSections.push(...newSections);
    console.log(`✓ Created ${newSectionsCount} new testimonial section(s)`);
  } else {
    console.log(`✓ All testimonial sections already exist, skipping creation`);
  }

  console.log(`✓ Total testimonial sections in database: ${seededSections.length}`);
  return seededSections;
};

const clear = async (prisma: PrismaClient) => {
  console.log('Clearing all testimonial sections...');
  const sectionsResult = await prisma.testimonialSection.deleteMany({});
  console.log(`✓ Deleted ${sectionsResult.count} testimonial section(s)`);

  console.log('Clearing all testimonial items...');
  const itemsResult = await prisma.testimonialItem.deleteMany({});
  console.log(`✓ Deleted ${itemsResult.count} testimonial item(s)`);

  console.log('Clearing all testimonial badges...');
  const badgesResult = await prisma.testimonialBadge.deleteMany({});
  console.log(`✓ Deleted ${badgesResult.count} testimonial badge(s)`);
};

const Testimonials = {
  badges: testimonialBadges,
  items: testimonialItems,
  sections: testimonialSections,
  seedBadges,
  seedItems,
  seedSections,
  clear,
};

export default Testimonials;
