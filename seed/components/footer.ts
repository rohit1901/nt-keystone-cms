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

export type SeededFooterLanguages = Awaited<ReturnType<typeof seedLanguages>>;
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
            label: "Software Development",
            href: "#features",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
            sectionKey: "services",
          },
          {
            label: "Cloud Architecture",
            href: "#features",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
            sectionKey: "services",
          },
          {
            label: "DevOps & Automation",
            href: "#features",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
            sectionKey: "services",
          },
          {
            label: "Software Architecture",
            href: "#features",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
            sectionKey: "services",
          },
          {
            label: "Technology Assessment",
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
      company: {
        title: "company",
        items: [
          {
            label: "About Nimbus Tech",
            href: "#about-us",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
            sectionKey: "company",
          },
          {
            label: "Blog",
            href: "https://rohitkhanduri.substack.com",
            external: true,
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
            sectionKey: "company",
          },
          {
            label: "Our Values",
            href: "#our-values",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
            sectionKey: "company",
          },
          {
            label: "News & Updates",
            href: "https://rohitkhanduri.substack.com",
            external: true,
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
            sectionKey: "company",
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
            href: "#",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
            sectionKey: "resources",
          },
          {
            label: "Terms of Service",
            href: "#",
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
            label: "GitHub",
            href: "https://rohit1901.github.com",
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
            label: "LinkedIn",
            href: "#",
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
            label: "Xing",
            href: "#",
            external: true,
            icon: "RiXingFill",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
            sectionKey: "social",
          },
          // German translations
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
          // German translations
          {
            label: "Softwareentwicklung",
            href: "#features",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
            sectionKey: "services",
          },
          {
            label: "Cloud-Architektur",
            href: "#features",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
            sectionKey: "services",
          },
          {
            label: "DevOps & Automatisierung",
            href: "#features",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
            sectionKey: "services",
          },
          {
            label: "Software-Architektur",
            href: "#features",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
            sectionKey: "services",
          },
          {
            label: "Technologiebewertung",
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
      company: {
        title: "company",
        items: [
          // German translations
          {
            label: "Über Nimbus Tech",
            href: "#about-us",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
            sectionKey: "company",
          },
          {
            label: "Blog",
            href: "https://rohitkhanduri.substack.com",
            external: true,
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
            sectionKey: "company",
          },
          {
            label: "Unsere Werte",
            href: "#our-values",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
            sectionKey: "company",
          },
          {
            label: "Neuigkeiten & Updates",
            href: "https://rohitkhanduri.substack.com",
            external: true,
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
            sectionKey: "company",
          },
        ],
      },
      resources: {
        title: "resources",
        items: [
          // German translations
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
            label: "Support",
            href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
            sectionKey: "resources",
          },
          {
            label: "Datenschutz",
            href: "#",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
            sectionKey: "resources",
          },
          {
            label: "Nutzungsbedingungen",
            href: "#",
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
            label: "GitHub",
            href: "https://rohit1901.github.com",
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
            label: "LinkedIn",
            href: "#",
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
            label: "Xing",
            href: "#",
            external: true,
            icon: "RiXingFill",
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
    label: "company",
    value: "company",
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

const seedLanguages = async (prisma: PrismaClient) => {
  console.log("Seeding footer languages...");
  const languageData = [
    {
      label: "English",
      value: "en-US",
    },
    {
      label: "German",
      value: "de-DE",
    },
  ];
  const languages = await prisma.language.createManyAndReturn({
    data: languageData,
  });

  console.log(`✓ Seeded ${languages.length} footer languages`);

  return languages;
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
    const { company, resources, services, social } = section;
    return [
      ...company.items,
      ...resources.items,
      ...services.items,
      ...social.items,
    ];
  });
  const seededSectionItems = await prisma.navigationLink.createManyAndReturn({
    data: items.map(
      (link) => ({
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
      }),
      { skipDuplicates: true },
    ),
  });

  console.log(`✓ Seeded ${seededSectionItems.length} footer section items`);
  // creating all FooterSections
  const sections: FooterSection[] = footerData.flatMap(
    ({ sections, language }) => {
      const { company, resources, services, social } = sections;
      return [
        { ...company, language },
        { ...resources, language },
        { ...services, language },
        { ...social, language },
      ];
    },
  );
  const seededSections = await Promise.all(
    sections.map(async (section) => {
      const titleId = seededKeys.find((key) => key.label === section.title)?.id;
      const languageId = languages.find(
        (language) => language.label === section.language?.label,
      )?.id;

      const connectedItems = seededSectionItems
        .filter((item) => {
          const itemSectionKey = seededKeys.find(
            (key) => key.label === section.title.toLowerCase(), // lowercase
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

      return await prisma.footerSection.create({
        data: {
          titleId,
          languageId,
          items: {
            connect: connectedItems,
          },
        },
      });
    }),
  );

  console.log(`✓ Seeded ${seededSections.length} footer sections`);
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
  const footers = await Promise.all(
    footerData.map(async (data) => {
      const languageId = options.languages.find(
        (language) => language.value === data.language.value,
      )?.id;

      // Filter sections that match the current footer's language
      const connectedSections = seededSections
        .filter((section) => section.languageId === languageId)
        .map((section) => ({ id: section.id }));

      return await prisma.footer.create({
        data: {
          title: data.title,
          languageId,
          sections: {
            connect: connectedSections,
          },
        },
      });
    }),
  );

  console.log(`✓ Seeded ${footers.length} footers`);
  return footers;
};

const Footer = {
  data: footerData,
  seedLanguages,
  seedSections,
  seed,
};

export default Footer;
