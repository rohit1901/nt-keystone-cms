import type { PrismaClient } from "../prisma";
import type { SeededImages } from "./images";
import {
  navigationSections,
  navigationLinksByLanguage,
  NavigationSectionItem,
  Slug,
} from "../../data";
import { SeededCTAs } from "./ctas";
import { SeededSlugs } from "./slugs";
import { SeededFooterLanguages } from "./footer";

export type SeededNavigationLinks = Awaited<ReturnType<typeof seedLinks>>;
export type SeededNavigation = Awaited<ReturnType<typeof seed>>;

const DEFAULT_NAVIGATION_SLUG: Slug = "navigation";

const seedLinks = async (
  prisma: PrismaClient,
  languageId: number | null,
  items: NavigationSectionItem[],
  navigationSlugId: number | null,
) => {
  console.log(`Seeding navigation links for languageId=${languageId}...`);

  // Check only for existing links matching known seed keys.
  const existingLinks = await prisma.navigationLink.findMany({
    where: {
      languageId,
      typeId: navigationSlugId,
      OR: items.map(({ label, href }) => ({ label, href })),
    },
    select: {
      id: true,
      label: true,
      href: true,
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

  let seededLinks = existingLinks;
  if (linksToCreate.length > 0) {
    const newLinks = await prisma.navigationLink.createManyAndReturn({
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
    seededLinks = [...existingLinks, ...newLinks];
    console.log(
      `✓ Created ${newLinks.length} new navigation links for languageId=${languageId}`,
    );
  } else {
    console.log(
      `✓ All navigation links already exist for languageId=${languageId}, skipping creation`,
    );
  }

  console.log(
    `✓ Total navigation links for languageId=${languageId}: ${seededLinks.length}`,
  );

  return seededLinks;
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
  const languageIdByValue = new Map(
    languages.map((language) => [language.value, language.id]),
  );

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

  const navigationCtaIdByLanguageId = new Map(
    ctas
      .filter((cta) => cta.typeId === navigationSlug)
      .map((cta) => [cta.languageId, cta.id]),
  );

  // Check for existing navigation sections
  const existingNavigations = await prisma.navigation.findMany({
    where: {
      languageId: {
        in: languages.map((lang) => lang.id),
      },
    },
    select: { id: true, languageId: true },
  });

  const existingNavigationByLanguageId = new Map(
    existingNavigations.map((navigation) => [
      navigation.languageId,
      navigation,
    ]),
  );

  const seededNavigations = await Promise.all(
    navigationSections.map(async (section) => {
      const navigationLanguageId =
        languageIdByValue.get(section.language.value) ?? null;
      const existingNavigation =
        existingNavigationByLanguageId.get(navigationLanguageId);

      if (existingNavigation) {
        console.log(
          `✓ Navigation for ${section.language.value} already exists (id: ${existingNavigation.id}), skipping`,
        );
        return existingNavigation;
      }

      const seededLinks = await seedLinks(
        prisma,
        navigationLanguageId,
        section.items,
        navigationSlug,
      );
      const ctaId =
        navigationCtaIdByLanguageId.get(navigationLanguageId) ?? null;
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
      return navigation;
    }),
  );

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
