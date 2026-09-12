import "dotenv/config";
import type { PrismaClient } from "../prisma";
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
  const languageIdByValue = new Map(
    languages.map((language) => [language.value, language.id]),
  );
  const badgeKeys = testimonialBadges.flatMap((badge) => {
    const languageId = languageIdByValue.get(badge.language.value);
    return languageId ? [{ label: badge.label, languageId }] : [];
  });

  // Get only existing badges matching known seed keys.
  const existingBadges = await prisma.testimonialBadge.findMany({
    where: { OR: badgeKeys },
    select: { id: true, label: true, languageId: true },
  });

  // Create unique keys based on label + languageId
  const existingBadgeKeys = new Set(
    existingBadges.map((badge) => `${badge.label}|${badge.languageId}`)
  );

  const badgesToCreate = testimonialBadges
    .map((badge) => {
      const langId = languageIdByValue.get(badge.language.value);

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
  const testimonialTypeId = slugs.find(
    (slug) => slug.label === "testimonial",
  )?.id;
  const languageIdByValue = new Map(
    languages.map((language) => [language.value, language.id]),
  );
  const itemKeys = testimonialItems.map((item) => ({
    name: item.name,
    content: item.content,
    languageId: languageIdByValue.get(item.language.value),
  }));

  // Get only existing testimonial items matching known seed keys.
  const existingItems = await prisma.testimonialItem.findMany({
    where: { OR: itemKeys },
    select: { id: true, name: true, content: true, languageId: true },
  });

  // Create unique keys based on name + content + languageId
  const existingItemKeys = new Set(
    existingItems.map((item) => `${item.name}|${item.content}|${item.languageId}`)
  );

  const testimonialLogo = images.find(
    (image) =>
      image.typeId === testimonialTypeId && image.alt.includes("logo"),
  );
  const badgeIdByLanguageId = new Map(
    badges.map((badge) => [badge.languageId, badge.id]),
  );
  const itemsToCreate = testimonialItems
    .map((item) => {
      const langId = languageIdByValue.get(item.language.value);
      const image = item.imageKey ? testimonialLogo : undefined;
      const badgeId = badgeIdByLanguageId.get(langId ?? null);

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
    const newItems = await prisma.testimonialItem.createManyAndReturn({
      data: itemsToCreate.map(({ key, ...data }) => data),
    });
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
  const languageIdByValue = new Map(
    languages.map((language) => [language.value, language.id]),
  );
  const sectionKeys = testimonialSections.flatMap((section) => {
    const languageId = languageIdByValue.get(section.language.value);
    return languageId ? [{ title: section.title, languageId }] : [];
  });

  // Get only existing testimonial sections matching known seed keys.
  const existingSections = await prisma.testimonialSection.findMany({
    where: { OR: sectionKeys },
    select: { id: true, title: true, languageId: true },
  });

  // Create unique keys based on title + languageId
  const existingSectionKeys = new Set(
    existingSections.map((section) => `${section.title}|${section.languageId}`)
  );

  const sectionsToCreate = testimonialSections.filter((section) => {
    const langId = languageIdByValue.get(section.language.value);
    const key = `${section.title}|${langId}`;
    return !existingSectionKeys.has(key);
  });

  const testimonialImages = images.filter(
    (image) => image.typeId === testimonialTypeId,
  );
  const backgroundImageByKey = new Map([
    [
      "testimonialField",
      testimonialImages.find((image) => image.src.includes("field")),
    ],
    [
      "testimonialDrone",
      testimonialImages.find((image) => image.src.includes("drone")),
    ],
  ]);
  const itemByLanguageId = new Map(
    items.map((item) => [item.languageId, item]),
  );

  let newSectionsCount = 0;
  const seededSections = [...existingSections];

  if (sectionsToCreate.length > 0) {
    const newSections = await Promise.all(
      sectionsToCreate.map((section) => {
        const langId = languageIdByValue.get(section.language.value);
        const backgroundImages = section.backgroundImageKeys
          .map((key) => backgroundImageByKey.get(key))
          .filter((image): image is NonNullable<typeof image> => Boolean(image));
        const fallbackItem = itemByLanguageId.get(langId ?? null);

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
