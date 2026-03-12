import type { PrismaClient } from "@prisma/client";
import Images, { type NavigationImageKey, type SeededImages } from "./images";
import {
  NavigationSection,
  NavigationSectionItem,
  Slug,
  Language,
} from "../../data";
import { SeededCTAs } from "./ctas";
import { SeededSlugs } from "./slugs";
import { SeededFooterLanguages } from "./footer";

export type SeededNavigationLinks = Awaited<ReturnType<typeof seedLinks>>;
export type SeededNavigation = Awaited<ReturnType<typeof seed>>;

const DEFAULT_NAVIGATION_SLUG: Slug = "navigation";

export type SeedNavigationOptions = {
  ctaId?: number | null;
  imageId?: number | null;
};

/**
 * Shared link structures per language
 */
const navigationLinksByLanguage: Partial<Record<
  Language["value"],
  NavigationSectionItem[]
>> = {
  "en-US": [
    {
      label: "Services",
      href: "#features",
      language: {
        label: "English",
        value: "en-US",
      },
      type: "navigation",
    },
    {
      label: "About Us",
      href: "#about-us",
      language: {
        label: "English",
        value: "en-US",
      },
      type: "navigation",
    },
    {
      label: "Blog",
      href: "https://rohitkhanduri.substack.com",
      external: true,
      language: {
        label: "English",
        value: "en-US",
      },
      type: "navigation",
    },
    {
      label: "Contact",
      href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
      language: {
        label: "English",
        value: "en-US",
      },
      type: "navigation",
    },
  ],
  "de-DE": [
    {
      label: "Leistungen",
      href: "#features",
      language: {
        label: "German",
        value: "de-DE",
      },
      type: "navigation",
    },
    {
      label: "Über uns",
      href: "#about-us",
      language: {
        label: "German",
        value: "de-DE",
      },
      type: "navigation",
    },
    {
      label: "Blog",
      href: "https://rohitkhanduri.substack.com",
      external: true,
      language: {
        label: "German",
        value: "de-DE",
      },
      type: "navigation",
    },
    {
      label: "Kontakt",
      href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
      language: {
        label: "German",
        value: "de-DE",
      },
      type: "navigation",
    },
  ],
};

/**
 * Multiple navigation sections (per language)
 */
const navigationSections: NavigationSection[] = [
  {
    title: "Nimbus Tech",
    description:
      "Nimbus Tech is an AWS-focused cloud consulting and software engineering company. We help small, mid-market, and enterprise businesses design, migrate, and operate scalable, secure systems on AWS without unnecessary complexity.",
    image: {
      src: "https://d1ljophloyhryl.cloudfront.net/assets/nimbus.logo.svg",
      alt: "Nimbus Tech Navbar Logo",
      width: 50,
      height: 50,
    },
    cta: {
      label: "Contact Us",
      href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
      language: {
        label: "English",
        value: "en-US",
      },
      type: "navigation",
    },
    language: {
      label: "English",
      value: "en-US",
    },
    items: navigationLinksByLanguage["en-US"]!,
  },
  {
    title: "Nimbus Tech",
    description:
      "Nimbus Tech ist ein auf AWS fokussiertes Cloud-Beratungs- und Software-Engineering-Unternehmen. Wir helfen Unternehmen, skalierbare und sichere Systeme auf AWS zu entwerfen, zu migrieren und zu betreiben – ohne unnötige Komplexität.",
    image: {
      src: "https://d1ljophloyhryl.cloudfront.net/assets/nimbus.logo.svg",
      alt: "Nimbus Tech Navbar Logo",
      width: 50,
      height: 50,
      type: "navigation",
    },
    cta: {
      label: "Erstgespräch",
      href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
      language: {
        label: "German",
        value: "de-DE",
      },
      type: "navigation",
    },
    language: {
      label: "German",
      value: "de-DE",
    },
    items: navigationLinksByLanguage["de-DE"]!,
  },
];

const seedLinks = async (
  prisma: PrismaClient,
  languageId: number | null,
  items: NavigationSectionItem[],
  navigationSlugId: number | null,
) => {
  console.log(`Seeding navigation links for languageId=${languageId}...`);

  // Check for existing navigation links
  const existingLinks = await prisma.navigationLink.findMany({
    where: {
      languageId: languageId,
      typeId: navigationSlugId,
    },
  });

  const existingLinkKeys = new Set(
    existingLinks.map((link) => `${link.label}-${link.href}`),
  );

  // Filter out items that already exist
  const linksToCreate = items.filter((item) => {
    const key = `${item.label}-${item.href}`;
    return !existingLinkKeys.has(key);
  });

  let newLinks = [];
  if (linksToCreate.length > 0) {
    newLinks = await prisma.navigationLink.createManyAndReturn({
      data: linksToCreate.map((link) => ({
        label: link.label,
        href: link.href,
        external: link.external ?? false,
        languageId,
        typeId: navigationSlugId,
        type: undefined,
        language: undefined,
      })),
    });
    console.log(
      `✓ Created ${newLinks.length} new navigation links for languageId=${languageId}`,
    );
  } else {
    console.log(
      `✓ All navigation links already exist for languageId=${languageId}, skipping creation`,
    );
  }

  // Return all links (existing + newly created)
  const allLinks = await prisma.navigationLink.findMany({
    where: {
      languageId: languageId,
      typeId: navigationSlugId,
    },
  });

  console.log(
    `✓ Total navigation links for languageId=${languageId}: ${allLinks.length}`,
  );

  return allLinks;
};

const seed = async (
  prisma: PrismaClient,
  images: SeededImages,
  ctas: SeededCTAs,
  slugs: SeededSlugs,
  languages: SeededFooterLanguages,
) => {
  console.log("Seeding navigation sections...");

  const navigationSlug =
    slugs.find((slug) => slug.label === DEFAULT_NAVIGATION_SLUG)?.id ?? null;

  if (
    navigationSections.some((section) => section.image) &&
    images.length === 0
  ) {
    throw new Error(
      "Navigation images must be seeded before creating navigation.",
    );
  }

  const imageId =
    images.find((image) => image.typeId === navigationSlug)?.id ?? null;

  if (navigationSections.some((section) => section.image) && imageId == null) {
    throw new Error(
      "Failed to resolve navigation image id from seeded images.",
    );
  }

  const navigationCtas = ctas.filter((cta) => cta.typeId === navigationSlug);

  // Check for existing navigation sections
  const existingNavigations = await prisma.navigation.findMany({
    where: {
      languageId: {
        in: languages.map((lang) => lang.id),
      },
    },
    include: {
      items: true,
    },
  });

  const existingLanguageIds = new Set(
    existingNavigations.map((nav) => nav.languageId),
  );

  const seededNavigations = [];

  for (const section of navigationSections) {
    const navigationLanguageId =
      languages.find((language) => language.value === section.language.value)
        ?.id ?? null;

    // Check if navigation already exists for this language
    const existingNavigation = existingNavigations.find(
      (nav) => nav.languageId === navigationLanguageId,
    );

    if (existingNavigation) {
      console.log(
        `✓ Navigation for ${section.language.value} already exists (id: ${existingNavigation.id}), skipping`,
      );
      seededNavigations.push(existingNavigation);
      continue;
    }

    const seededLinks = await seedLinks(
      prisma,
      navigationLanguageId,
      section.items,
      navigationSlug,
    );

    const ctaId =
      navigationCtas.find((cta) => cta.languageId === navigationLanguageId)
        ?.id ?? null;

    const navigation = await prisma.navigation.create({
      data: {
        title: section.title,
        description: section.description,
        items: {
          connect: seededLinks.map((link) => ({ id: link.id })),
        },
        languageId: navigationLanguageId,
        imageId,
        ctaId,
        language: undefined,
        image: undefined,
        cta: undefined,
      },
    });

    console.log(
      `✓ Created navigation with id ${navigation.id} for language ${section.language.value}`,
    );
    seededNavigations.push(navigation);
  }

  console.log(`✓ Total navigation sections: ${seededNavigations.length}`);

  return seededNavigations;
};

const clear = async (prisma: PrismaClient) => {
  console.log("Clearing navigation sections...");
  const navigationResult = await prisma.navigation.deleteMany({});
  console.log(`Deleted ${navigationResult.count} navigation section(s).`);

  console.log("Clearing navigation links...");
  const linksResult = await prisma.navigationLink.deleteMany({});
  console.log(`Deleted ${linksResult.count} navigation link(s).`);
};

const Navigation = {
  data: navigationSections,
  links: navigationLinksByLanguage,
  seedLinks,
  seed,
  clear,
};

export default Navigation;
