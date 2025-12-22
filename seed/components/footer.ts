import type { PrismaClient } from "@prisma/client";
import { Language, PrismaType, Slug } from "../../data";
import { FooterSections, CompositePageContentWithExtras } from "../../data";
import { SeededSlugs } from "./slugs";

export type SeededFooterLanguages = Awaited<ReturnType<typeof seedLanguages>>;
export type SeededFooterSections = Awaited<ReturnType<typeof seedSections>>;
export type SeededFooter = Awaited<ReturnType<typeof seed>>;

const footerData: CompositePageContentWithExtras<{
  sections: FooterSections;
  languages: Language[];
  language: Language;
}>[] = [
  {
    title: "Footer",
    sections: {
      services: {
        title: "Services",
        items: [
          {
            label: "Software Development",
            href: "#features",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
          },
          {
            label: "Cloud Architecture",
            href: "#features",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
          },
          {
            label: "DevOps & Automation",
            href: "#features",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
          },
          {
            label: "Software Architecture",
            href: "#features",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
          },
          {
            label: "Technology Assessment",
            href: "#features",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
          },
          // German translations
          {
            label: "Softwareentwicklung",
            href: "#features",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
          {
            label: "Cloud-Architektur",
            href: "#features",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
          {
            label: "DevOps & Automatisierung",
            href: "#features",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
          {
            label: "Software-Architektur",
            href: "#features",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
          {
            label: "Technologiebewertung",
            href: "#features",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
        ],
      },
      company: {
        title: "Company",
        items: [
          {
            label: "About Nimbus Tech",
            href: "#about-us",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
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
          },
          {
            label: "Our Values",
            href: "#our-values",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
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
          },
          // German translations
          {
            label: "Über Nimbus Tech",
            href: "#about-us",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
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
          },
          {
            label: "Unsere Werte",
            href: "#our-values",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
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
          },
        ],
      },
      resources: {
        title: "Resources",
        items: [
          {
            label: "Contact",
            href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
          },
          {
            label: "Support",
            href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
          },
          {
            label: "Privacy Policy",
            href: "#",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
          },
          {
            label: "Terms of Service",
            href: "#",
            language: {
              value: "en-US",
              label: "English",
            },
            type: "footer",
          },
          // German translations
          {
            label: "Kontakt",
            href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
          {
            label: "Support",
            href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
          {
            label: "Datenschutz",
            href: "#",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
          {
            label: "Nutzungsbedingungen",
            href: "#",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
        ],
      },
      social: {
        title: "Follow Us",
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
          },
          // German translations
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
          },
        ],
      },
    },
    languages: [
      {
        label: "English",
        value: "en-US",
      },
      {
        label: "German",
        value: "de-DE",
      },
    ],
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
        title: "Leistungen",
        items: [
          {
            label: "Softwareentwicklung",
            href: "#features",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
          {
            label: "Cloud-Architektur",
            href: "#features",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
          {
            label: "DevOps & Automatisierung",
            href: "#features",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
          {
            label: "Software-Architektur",
            href: "#features",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
          {
            label: "Technologiebewertung",
            href: "#features",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
        ],
      },
      company: {
        title: "Unternehmen",
        items: [
          {
            label: "Über Nimbus Tech",
            href: "#about-us",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
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
          },
          {
            label: "Unsere Werte",
            href: "#our-values",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
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
          },
        ],
      },
      resources: {
        title: "Ressourcen",
        items: [
          {
            label: "Kontakt",
            href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
          {
            label: "Support",
            href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
          {
            label: "Datenschutz",
            href: "#",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
          {
            label: "Nutzungsbedingungen",
            href: "#",
            language: {
              value: "de-DE",
              label: "German",
            },
            type: "footer",
          },
        ],
      },
      social: {
        title: "Folgen Sie uns",
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
          },
        ],
      },
    },
    languages: [
      {
        label: "German",
        value: "de-DE",
      },
    ],
    language: {
      value: "de-DE",
      label: "German",
    },
  },
];

const seedLanguages = async (prisma: PrismaClient) => {
  console.log("Seeding footer languages...");

  const languages = await prisma.language.createManyAndReturn({
    data: footerData
      .flatMap((data) => data.languages)
      .map((language) => ({
        label: language.label,
        value: language.value,
      })),
  });

  console.log(`✓ Seeded ${languages.length} footer languages`);

  return languages;
};

const seedSections = async (
  prisma: PrismaClient,
  languages: SeededFooterLanguages,
  slugs: SeededSlugs,
) => {
  console.log("Seeding footer sections...");
  const typeId = slugs.find((slug) => slug.label === "footer")?.id;
  const sections = await Promise.all(
    footerData
      .flatMap((data) => Object.values(data.sections))
      .map(async (section) => {
        const links = await prisma.navigationLink.createManyAndReturn({
          data: section.items.map((item) => ({
            label: item.label,
            href: item.href,
            external: item.external ?? false,
            languageId: languages.find(
              (language) => language.value === item.language.value,
            )?.id,
            typeId,
            language: undefined,
            type: undefined,
          })),
        });

        const footerSection = await prisma.footerSection.create({
          data: {
            title: section.title,
            items: {
              connect: links
                .filter((p) => p.typeId === typeId)
                .map((link) => ({ id: link.id })),
            },
          },
        });

        return footerSection;
      }),
  );

  console.log(`✓ Seeded ${sections.length} footer sections`);

  return sections;
};

const seed = async (
  prisma: PrismaClient,
  options: {
    slugs: SeededSlugs;
    languages: SeededFooterLanguages;
    sections?: SeededFooterSections;
  },
) => {
  console.log("Seeding footers...");

  const sections =
    options.sections ??
    (await seedSections(prisma, options.languages, options.slugs));

  const footers = await Promise.all(
    footerData.map(async (data) => {
      const language = options.languages.find(
        (language) => language.value === data.language.value,
      );
      const footer = await prisma.footer.create({
        data: {
          title: data.title,
          sections: {
            connect: sections
              .filter((section) => section.languageId === language?.id)
              .map((section) => ({ id: section.id })),
          },
          languages: {
            connect: options.languages.map((language) => ({ id: language.id })),
          },
          languageId: language?.id,
          language: undefined,
        },
      });

      console.log(`✓ Seeded footer with id ${footer.id}`);
      return footer;
    }),
  );

  return footers;
};

const Footer = {
  data: footerData,
  seedLanguages,
  seedSections,
  seed,
};

export default Footer;
