import type { PrismaClient } from "@prisma/client";
import { Language } from "../../data";
import { FooterSections, CompositePageContentWithExtras } from "../../data";

export type SeededFooterLanguages = Awaited<ReturnType<typeof seedLanguages>>;
export type SeededFooterSections = Awaited<ReturnType<typeof seedSections>>;
export type SeededFooter = Awaited<ReturnType<typeof seed>>;

const footerData: CompositePageContentWithExtras<{
  sections: FooterSections;
  languages: Language[];
}> = {
  title: "Footer",
  sections: {
    services: {
      title: "Services",
      items: [
        { label: "Software Development", href: "#features" },
        { label: "Cloud Architecture", href: "#features" },
        { label: "DevOps & Automation", href: "#features" },
        { label: "Software Architecture", href: "#features" },
        { label: "Technology Assessment", href: "#features" },
      ],
    },
    company: {
      title: "Company",
      items: [
        { label: "About Nimbus Tech", href: "#about-us" },
        {
          label: "Blog",
          href: "https://rohitkhanduri.substack.com",
          external: true,
        }, //TODO:  Link to Substack for now
        // Careers removed (add later when hiring)
        // Case Studies removed (add after first projects)
        { label: "Our Values", href: "#our-values" },
        {
          label: "News & Updates",
          href: "https://rohitkhanduri.substack.com",
          external: true,
        }, //TODO:  Link to Substack for now
      ],
    },
    resources: {
      title: "Resources",
      items: [
        // TODO: Add links to documentation, guides, or other resources when available
        {
          label: "Contact",
          href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
        },
        {
          label: "Support",
          href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
        },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        // "Report an Issue" can stay if you want to be open to feedback from day one
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
        },
        {
          label: "LinkedIn",
          href: "#",
          external: true,
          icon: "RiLinkedinBoxFill",
        },
        {
          label: "Xing",
          href: "#",
          external: true,
          icon: "RiXingFill",
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
};

const seedLanguages = async (prisma: PrismaClient) => {
  console.log("Seeding footer languages...");

  const languages = await prisma.language.createManyAndReturn({
    data: footerData.languages.map((language) => ({
      label: language.label,
      value: language.value,
    })),
  });

  console.log(`✓ Seeded ${languages.length} footer languages`);

  return languages;
};

const seedSections = async (prisma: PrismaClient) => {
  console.log("Seeding footer sections...");

  const sections = await Promise.all(
    Object.values(footerData.sections).map(async (section) => {
      const links = await prisma.navigationLink.createManyAndReturn({
        data: section.items.map((item) => ({
          label: item.label,
          href: item.href,
          external: item.external ?? false,
          ...(item.icon ? { icon: item.icon } : {}),
        })),
      });

      const footerSection = await prisma.footerSection.create({
        data: {
          title: section.title,
          items: {
            connect: links.map((link) => ({ id: link.id })),
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
    sections?: SeededFooterSections;
    languages?: SeededFooterLanguages;
  } = {},
) => {
  console.log("Seeding footer...");

  const sections = options.sections ?? (await seedSections(prisma));
  const languages = options.languages ?? (await seedLanguages(prisma));

  const footer = await prisma.footer.create({
    data: {
      title: footerData.title,
      sections: {
        connect: sections.map((section) => ({ id: section.id })),
      },
      languages: {
        connect: languages.map((language) => ({ id: language.id })),
      },
    },
  });

  console.log(`✓ Seeded footer with id ${footer.id}`);

  return footer;
};

const Footer = {
  data: footerData,
  seedLanguages,
  seedSections,
  seed,
};

export default Footer;
