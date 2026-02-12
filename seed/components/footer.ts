import type { PrismaClient } from "@prisma/client";
import {
  FooterSection,
  FooterSectionKey,
  FooterSectionKeys,
  Language,
  NavigationSectionItem,
  PrismaType,
  Slug,
} from "../../data";
import { FooterSections, CompositePageContentWithExtras } from "../../data";
import { SeededSlugs } from "./slugs";
import Languages, { SeededLanguages } from "./languages";

// Re-export for backward compatibility
export type SeededFooterLanguages = SeededLanguages;
export type SeededFooterSections = Awaited<ReturnType<typeof seedSections>>;
export type SeededFooter = Awaited<ReturnType<typeof seed>>;

const footerData: CompositePageContentWithExtras<{
  sections: FooterSections;
  language: Language;
}>[] = [
    {
      title: "Footer",
      sections: {
        services: {
          title: "services",
          items: [
            {
              label: "AWS Cloud Consulting",
              href: "#features",
              language: {
                value: "en-US",
                label: "English",
              },
              type: "footer",
              sectionKey: "services",
            },
            {
              label: "AWS Migration & Modernization",
              href: "#features",
              language: {
                value: "en-US",
                label: "English",
              },
              type: "footer",
              sectionKey: "services",
            },
            {
              label: "DevOps & Automation on AWS",
              href: "#features",
              language: {
                value: "en-US",
                label: "English",
              },
              type: "footer",
              sectionKey: "services",
            },
          ],
        },
        resources: {
          title: "resources",
          items: [
            {
              label: "Contact",
              href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
              language: {
                value: "en-US",
                label: "English",
              },
              type: "footer",
              sectionKey: "resources",
            },
            {
              label: "Support",
              href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
              language: {
                value: "en-US",
                label: "English",
              },
              type: "footer",
              sectionKey: "resources",
            },
            {
              label: "Privacy Policy",
              href: "/privacy-policy",
              language: {
                value: "en-US",
                label: "English",
              },
              type: "footer",
              sectionKey: "resources",
            },
            {
              label: "Terms of Service",
              href: "/terms",
              language: {
                value: "en-US",
                label: "English",
              },
              type: "footer",
              sectionKey: "resources",
            },
          ],
        },
        social: {
          title: "social",
          items: [
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/nimbus-tech-de",
              external: true,
              icon: "RiLinkedinBoxFill",
              language: {
                value: "en-US",
                label: "English",
              },
              type: "footer",
              sectionKey: "social",
            },
            {
              label: "GitHub",
              href: "https://github.com/nimbus-tech",
              external: true,
              icon: "RiGithubFill",
              language: {
                value: "en-US",
                label: "English",
              },
              type: "footer",
              sectionKey: "social",
            },
            {
              label: "Blog",
              href: "https://rohitkhanduri.substack.com",
              external: true,
              icon: "RiArticleFill",
              language: {
                value: "en-US",
                label: "English",
              },
              type: "footer",
              sectionKey: "social",
            },
          ],
        },
      },
      language: {
        value: "en-US",
        label: "English",
      },
    },
    // Add another footer object if needed, e.g., for a different region or variant
    {
      title: "Footer - DE",
      sections: {
        services: {
          title: "services",
          items: [
            {
              label: "AWS-Cloud-Beratung",
              href: "#features",
              language: {
                value: "de-DE",
                label: "German",
              },
              type: "footer",
              sectionKey: "services",
            },
            {
              label: "AWS-Migration & Modernisierung",
              href: "#features",
              language: {
                value: "de-DE",
                label: "German",
              },
              type: "footer",
              sectionKey: "services",
            },
            {
              label: "DevOps & Automatisierung auf AWS",
              href: "#features",
              language: {
                value: "de-DE",
                label: "German",
              },
              type: "footer",
              sectionKey: "services",
            },
          ],
        },
        resources: {
          title: "resources",
          items: [
            {
              label: "Kontakt",
              href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
              language: {
                value: "de-DE",
                label: "German",
              },
              type: "footer",
              sectionKey: "resources",
            },
            {
              label: "Datenschutzerklärung",
              href: "/privacy-policy",
              language: {
                value: "de-DE",
                label: "German",
              },
              type: "footer",
              sectionKey: "resources",
            },
            {
              label: "Impressum",
              href: "/terms",
              language: {
                value: "de-DE",
                label: "German",
              },
              type: "footer",
              sectionKey: "resources",
            },
          ],
        },
        social: {
          title: "social",
          items: [
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/nimbus-tech-de",
              external: true,
              icon: "RiLinkedinBoxFill",
              language: {
                value: "de-DE",
                label: "German",
              },
              type: "footer",
              sectionKey: "social",
            },
            {
              label: "GitHub",
              href: "https://github.com/nimbus-tech",
              external: true,
              icon: "RiGithubFill",
              language: {
                value: "de-DE",
                label: "German",
              },
              type: "footer",
              sectionKey: "social",
            },
            {
              label: "Blog",
              href: "https://rohitkhanduri.substack.com",
              external: true,
              icon: "RiArticleFill",
              language: {
                value: "de-DE",
                label: "German",
              },
              type: "footer",
              sectionKey: "social",
            },
          ],
        },
      },
      language: {
        value: "de-DE",
        label: "German",
      },
    },
  ];

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
  const keys = await prisma.footerSectionKey.createManyAndReturn({
    data: footerSectionKeys.map((key) => ({
      label: key.value,
    })),
  });

  console.log(`✓ Seeded ${keys.length} footer section keys`);

  return keys;
};

const seedSections = async (
  prisma: PrismaClient,
  languages: SeededFooterLanguages,
  slugs: SeededSlugs,
) => {
  console.log("Seeding footer sections...");
  const typeId = slugs.find((slug) => slug.label === "footer")?.id;
  const seededKeys = await seedFooterSectionKeys(prisma);
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
    const languageId = languages.find(
      (language) => language.label === link.language.label,
    )?.id;
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
        languageId: languages.find(
          (language) => language.label === link.language.label,
        )?.id,
        typeId: typeId,
        sectionKeyId: seededKeys.find(
          (key) => key.label?.toLowerCase() === link.sectionKey?.toLowerCase(),
        )?.id,
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
      typeId: typeId,
      languageId: { in: languages.map((lang) => lang.id) },
    },
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
  });

  const existingFooterSectionKeys = new Set(
    existingFooterSections.map((section) => `${section.titleId}-${section.languageId}`),
  );

  const seededSections = [];

  for (const section of sections) {
    const titleId = seededKeys.find((key) => key.label === section.title)?.id;
    const languageId = languages.find(
      (language) => language.label === section.language?.label,
    )?.id;

    const sectionKey = `${titleId}-${languageId}`;

    // Check if section already exists
    const existingSection = existingFooterSections.find(
      (s) => s.titleId === titleId && s.languageId === languageId,
    );

    if (existingSection) {
      console.log(
        `✓ Footer section "${section.title}" for language ${section.language?.label} already exists (id: ${existingSection.id}), skipping`,
      );
      seededSections.push(existingSection);
      continue;
    }

    const connectedItems = allSectionItems
      .filter((item) => {
        const itemSectionKey = seededKeys.find(
          (key) => key.label === section.title.toLowerCase(),
        );
        const itemLanguage = languages.find(
          (language) => language.label === section.language?.label,
        );
        return (
          item.sectionKeyId === itemSectionKey?.id &&
          item.languageId === itemLanguage?.id
        );
      })
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

  const existingLanguageIds = new Set(
    existingFooters.map((footer) => footer.languageId),
  );

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
