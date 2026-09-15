import type { PrismaClient } from "../prisma";
import {
  FooterSection,
  FooterSectionKey,
  FooterSectionKeys,
  Language,
  NavigationSectionItem,
  Slug,
} from "../../data";
import { FooterSections, CompositePageContentWithExtras, footerData } from "../../data";
import { SeededSlugs } from "./slugs";
import Languages, { SeededLanguages } from "./languages";

// Re-export for backward compatibility
export type SeededFooterLanguages = SeededLanguages;
export type SeededFooterSections = Awaited<ReturnType<typeof seedSections>>;
export type SeededFooter = Awaited<ReturnType<typeof seed>>;

const footerSectionKeys: FooterSectionKeys[] = [
  {
    label: "services",
    value: "services",
  },
  {
    label: "resources",
    value: "resources",
  },
  {
    label: "social",
    value: "social",
  },
];

// Deprecated: Use Languages.seed() instead
const seedLanguages = async (prisma: PrismaClient) => {
  console.log("Seeding footer languages (via Languages component)...");
  return await Languages.seed(prisma);
};

const seedFooterSectionKeys = async (prisma: PrismaClient) => {
  console.log("Seeding footer section keys...");
  const labels = footerSectionKeys.map(({ value }) => value);
  const existingKeys = await prisma.footerSectionKey.findMany({
    where: { label: { in: labels } },
    orderBy: { id: "asc" },
  });
  const keyByLabel = new Map<string, (typeof existingKeys)[number]>();

  for (const key of existingKeys) {
    if (key.label && !keyByLabel.has(key.label)) {
      keyByLabel.set(key.label, key);
    }
  }

  const missingLabels = labels.filter((label) => !keyByLabel.has(label));
  if (missingLabels.length > 0) {
    const createdKeys = await prisma.footerSectionKey.createManyAndReturn({
      data: missingLabels.map((label) => ({ label })),
    });
    createdKeys.forEach((key) => {
      if (key.label) keyByLabel.set(key.label, key);
    });
    console.log(`✓ Created ${createdKeys.length} footer section key(s)`);
  } else {
    console.log("✓ All footer section keys already exist, skipping creation");
  }

  return labels.map((label) => {
    const key = keyByLabel.get(label);
    if (!key) throw new Error(`Footer section key not found: ${label}`);
    return key;
  });
};

const seedSections = async (
  prisma: PrismaClient,
  languages: SeededFooterLanguages,
  slugs: SeededSlugs,
) => {
  console.log("Seeding footer sections...");
  const typeId = slugs.find((slug) => slug.label === "footer")?.id;
  if (!typeId) throw new Error("Footer type not found");

  const seededKeys = await seedFooterSectionKeys(prisma);
  const languageIdByLabel = new Map(
    languages.map((language) => [language.label, language.id]),
  );
  const keyByLabel = new Map(
    seededKeys.flatMap((key) => key.label ? [[key.label.toLowerCase(), key] as const] : []),
  );
  const sectionsData = footerData.map((footer) => footer.sections);

  // creating all NavigationItems in FooterSections
  const items: NavigationSectionItem[] = sectionsData.flatMap((section) => {
    const { resources, services, social } = section;
    return [
      ...resources.items,
      ...services.items,
      ...social.items,
    ];
  });

  // Check for existing navigation links
  const existingLinks = await prisma.navigationLink.findMany({
    where: {
      typeId: typeId,
      languageId: { in: languages.map((lang) => lang.id) },
    },
  });

  const existingLinkKeys = new Set(
    existingLinks.map((link) => `${link.label}-${link.href}-${link.languageId}`),
  );

  const linksToCreate = items.filter((link) => {
    const languageId = languageIdByLabel.get(link.language.label);
    const key = `${link.label}-${link.href}-${languageId}`;
    return !existingLinkKeys.has(key);
  });

  let seededSectionItems = [];
  if (linksToCreate.length > 0) {
    seededSectionItems = await prisma.navigationLink.createManyAndReturn({
      data: linksToCreate.map((link) => ({
        label: link.label,
        href: link.href,
        external: link.external ?? false,
        languageId: languageIdByLabel.get(link.language.label),
        typeId,
        sectionKeyId: link.sectionKey
          ? keyByLabel.get(link.sectionKey.toLowerCase())?.id
          : undefined,
        type: undefined,
        language: undefined,
        sectionKey: undefined,
        icon: link.icon,
      })),
    });
    console.log(`✓ Created ${seededSectionItems.length} new footer section items`);
  } else {
    console.log(`✓ All footer section items already exist, skipping creation`);
  }

  // Get all footer navigation links
  const allSectionItems = await prisma.navigationLink.findMany({
    where: {
      typeId,
      languageId: { in: languages.map((lang) => lang.id) },
    },
    include: { sectionKey: true },
  });

  console.log(`✓ Total footer section items: ${allSectionItems.length}`);

  // creating all FooterSections
  const sections: FooterSection[] = footerData.flatMap(
    ({ sections, language }) => {
      const { resources, services, social } = sections;
      return [
        { ...resources, language },
        { ...services, language },
        { ...social, language },
      ];
    },
  );

  // Check for existing footer sections
  const existingFooterSections = await prisma.footerSection.findMany({
    where: {
      languageId: { in: languages.map((lang) => lang.id) },
    },
    include: { title: true },
  });

  const seededSections = [];

  for (const section of sections) {
    const normalizedTitle = section.title.toLowerCase();
    const titleId = keyByLabel.get(normalizedTitle)?.id;
    const languageId = section.language?.label
      ? languageIdByLabel.get(section.language.label)
      : undefined;

    if (!titleId || !languageId) {
      throw new Error(
        `Missing footer section dependency for ${section.title}/${section.language?.label}`,
      );
    }

    // Match semantically by key label so legacy duplicate key rows do not cause
    // another section to be created.
    const existingSection = existingFooterSections.find(
      (candidate) =>
        candidate.title?.label?.toLowerCase() === normalizedTitle &&
        candidate.languageId === languageId,
    );

    if (existingSection) {
      console.log(
        `✓ Footer section "${section.title}" for language ${section.language?.label} already exists (id: ${existingSection.id}), skipping`,
      );
      seededSections.push(existingSection);
      continue;
    }

    const connectedItems = allSectionItems
      .filter(
        (item) =>
          item.sectionKey?.label?.toLowerCase() === normalizedTitle &&
          item.languageId === languageId,
      )
      .map((item) => ({ id: item.id }));

    const newSection = await prisma.footerSection.create({
      data: {
        titleId,
        languageId,
        items: {
          connect: connectedItems,
        },
      },
    });

    console.log(
      `✓ Created footer section "${section.title}" for language ${section.language?.label} (id: ${newSection.id})`,
    );
    seededSections.push(newSection);
  }

  console.log(`✓ Total footer sections: ${seededSections.length}`);
  return seededSections;
};

const seed = async (
  prisma: PrismaClient,
  options: {
    slugs: SeededSlugs;
    languages: SeededFooterLanguages;
  },
) => {
  console.log("Seeding footers...");
  const seededSections = await seedSections(
    prisma,
    options.languages,
    options.slugs,
  );

  // Check for existing footers
  const existingFooters = await prisma.footer.findMany({
    where: {
      languageId: { in: options.languages.map((lang) => lang.id) },
    },
    include: {
      sections: true,
    },
  });

  const footers = [];

  for (const data of footerData) {
    const languageId = options.languages.find(
      (language) => language.value === data.language.value,
    )?.id;

    if (!languageId) {
      console.warn(`⚠️  Language not found for ${data.language.value}, skipping footer`);
      continue;
    }

    // Check if footer already exists for this language
    const existingFooter = existingFooters.find(
      (footer) => footer.languageId === languageId,
    );

    if (existingFooter) {
      console.log(
        `✓ Footer for ${data.language.value} already exists (id: ${existingFooter.id}), skipping`,
      );
      footers.push(existingFooter);
      continue;
    }

    // Filter sections that match the current footer's language
    const connectedSections = seededSections
      .filter((section) => section.languageId === languageId)
      .map((section) => ({ id: section.id }));

    const footer = await prisma.footer.create({
      data: {
        title: data.title,
        language: {
          connect: { id: languageId },
        },
        sections: {
          connect: connectedSections,
        },
      },
    });

    console.log(`✓ Created footer for ${data.language.value} (id: ${footer.id})`);
    footers.push(footer);
  }

  console.log(`✓ Total footers: ${footers.length}`);
  return footers;
};

const clear = async (prisma: PrismaClient) => {
  console.log("Clearing all footers...");
  const footerResult = await prisma.footer.deleteMany({});
  console.log(`Deleted ${footerResult.count} footer(s).`);

  console.log("Clearing all footer sections...");
  const footerSectionResult = await prisma.footerSection.deleteMany({});
  console.log(`Deleted ${footerSectionResult.count} footer section(s).`);

  console.log("Clearing footer navigation links...");
  const footerSlug = await prisma.type.findFirst({
    where: { label: "footer" },
  });
  if (footerSlug) {
    const linksResult = await prisma.navigationLink.deleteMany({
      where: { typeId: footerSlug.id },
    });
    console.log(`Deleted ${linksResult.count} footer navigation link(s).`);
  }

  console.log("Clearing footer section keys...");
  const keysResult = await prisma.footerSectionKey.deleteMany({});
  console.log(`Deleted ${keysResult.count} footer section key(s).`);
};

const Footer = {
  data: footerData,
  seedLanguages,
  seedSections,
  seed,
  clear,
};

export default Footer;
