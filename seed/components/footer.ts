import type { PrismaClient } from "@prisma/client";
import { footerPageContent } from "../../data";

export type SeededFooterLanguages = Awaited<ReturnType<typeof seedLanguages>>;
export type SeededFooterSections = Awaited<ReturnType<typeof seedSections>>;
export type SeededFooter = Awaited<ReturnType<typeof seed>>;

const footerData = footerPageContent;

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
