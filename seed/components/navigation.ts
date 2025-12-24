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
const navigationLinksByLanguage: Record<
  Language["value"],
  NavigationSectionItem[]
> = {
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
      "Nimbus Tech is a software development and consulting company specializing in cloud architecture, DevOps, and automation solutions. We help businesses build scalable, efficient, and secure software systems.",
    image: {
      src: "https://nimbus-tech.de/images/nimbus-tech-hero-image.jpg",
      alt: "Nimbus Tech Hero Image",
      width: 1600,
      height: 900,
    },
    cta: {
      label: "Get started",
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
    items: navigationLinksByLanguage["en-US"],
  },
  {
    title: "Nimbus Tech",
    description:
      "Nimbus Tech ist ein Softwareentwicklungs- und Beratungsunternehmen mit Schwerpunkt auf Cloud-Architektur, DevOps und Automatisierungslösungen. Wir helfen Unternehmen, skalierbare, effiziente und sichere Softwaresysteme aufzubauen.",
    image: {
      src: "https://nimbus-tech.de/images/nimbus-tech-hero-image.jpg",
      alt: "Nimbus Tech Hero Image",
      width: 1600,
      height: 900,
    },
    cta: {
      label: "Jetzt starten",
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
    items: navigationLinksByLanguage["de-DE"],
  },
];

const seedLinks = async (
  prisma: PrismaClient,
  languageId: number | null,
  items: NavigationSectionItem[],
  navigationSlugId: number | null,
) => {
  console.log(`Seeding navigation links for languageId=${languageId}...`);

  const links = await prisma.navigationLink.createManyAndReturn({
    data: items.map((link) => ({
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
    `✓ Seeded ${links.length} navigation links for languageId=${languageId}`,
  );

  return links;
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

  const seededNavigations = [];

  for (const section of navigationSections) {
    const navigationLanguageId =
      languages.find((language) => language.value === section.language.value)
        ?.id ?? null;

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
      `✓ Seeded navigation with id ${navigation.id} for language ${section.language.value}`,
    );
    seededNavigations.push(navigation);
  }

  return seededNavigations;
};

const Navigation = {
  data: navigationSections,
  links: navigationLinksByLanguage,
  seedLinks,
  seed,
};

export default Navigation;
