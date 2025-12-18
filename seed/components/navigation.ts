import type { PrismaClient } from "@prisma/client";
import Images, { type NavigationImageKey, type SeededImages } from "./images";
import { navigationPageContent, navLinks } from "../../data";

export type SeededNavigationLinks = Awaited<ReturnType<typeof seedLinks>>;
export type SeededNavigationCTA = Awaited<ReturnType<typeof seedCTA>>;
export type SeededNavigation = Awaited<ReturnType<typeof seed>>;

const navigationData = navigationPageContent;
const navigationLinksData = navLinks;
const DEFAULT_NAVIGATION_IMAGE_KEY: NavigationImageKey = "navigationPrimary";

export type SeedNavigationOptions = {
  ctaId?: number | null;
  imageId?: number | null;
};

const seedLinks = async (prisma: PrismaClient) => {
  console.log("Seeding navigation links...");

  const links = await prisma.navigationLink.createManyAndReturn({
    data: navigationLinksData.map((link) => ({
      label: link.label,
      href: link.href,
      external: link.external ?? false,
      ...(link.icon ? { icon: link.icon } : {}),
    })),
  });

  console.log(`✓ Seeded ${links.length} navigation links`);

  return links;
};

const seedCTA = async (prisma: PrismaClient) => {
  if (!navigationData.cta) return null;

  console.log("Seeding navigation CTA...");

  const cta = await prisma.cta.create({
    data: {
      label: navigationData.cta.label,
      href: navigationData.cta.href,
      external: navigationData.cta.external ?? false,
    },
  });

  console.log(`✓ Seeded navigation CTA with id ${cta.id}`);

  return cta;
};

const resolveNavigationImageId = (
  images: SeededImages,
  options: SeedNavigationOptions,
) => {
  if (!navigationData.image) return null;

  if (options.imageId !== undefined) {
    return options.imageId ?? null;
  }

  const key = DEFAULT_NAVIGATION_IMAGE_KEY;
  const config = Images.data[key];
  if (!config) return null;

  const matchedImage = images.find(
    (image) => image.src === config.src && image.alt === config.alt,
  );

  return matchedImage?.id ?? null;
};

const seed = async (
  prisma: PrismaClient,
  images: SeededImages,
  links?: SeededNavigationLinks,
  options: SeedNavigationOptions = {},
) => {
  console.log("Seeding navigation section...");

  const seededLinks = links ?? (await seedLinks(prisma));

  if (navigationData.image && images.length === 0) {
    throw new Error(
      "Navigation images must be seeded before creating navigation.",
    );
  }

  const imageId = resolveNavigationImageId(images, options);

  if (navigationData.image && imageId == null) {
    throw new Error(
      "Failed to resolve navigation image id from seeded images.",
    );
  }

  const ctaId =
    options.ctaId !== undefined
      ? (options.ctaId ?? null)
      : navigationData.cta
        ? ((await seedCTA(prisma))?.id ?? null)
        : null;

  const navigation = await prisma.navigation.create({
    data: {
      title: navigationData.title,
      description: navigationData.description,
      ...(imageId ? { image: { connect: { id: imageId } } } : {}),
      ...(ctaId ? { cta: { connect: { id: ctaId } } } : {}),
      items: {
        connect: seededLinks.map((link) => ({ id: link.id })),
      },
    },
  });

  console.log(`✓ Seeded navigation with id ${navigation.id}`);

  return navigation;
};

const Navigation = {
  data: navigationData,
  links: navigationLinksData,
  seedLinks,
  seedCTA,
  seed,
};

export default Navigation;
