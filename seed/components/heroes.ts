import type { SeededImages } from "./images";
import type { PrismaClient } from "../prisma";
import type { SeededSlugs } from "./slugs";
import Ctas, { SeededCTAs } from "./ctas";
import { heroesData, ctasData } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededHeroes = Awaited<ReturnType<typeof seed>>;

const seed = async (
  prisma: PrismaClient,
  images: SeededImages,
  slugs: SeededSlugs,
  ctas: SeededCTAs,
  languages: SeededFooterLanguages,
) => {
  const foundCtaSlug = slugs.find((slug) => slug.label === "hero");
  const languageIdByValue = new Map(
    languages.map((language) => [language.value, language.id]),
  );
  const heroKeys = heroesData.flatMap((hero) => {
    const languageId = languageIdByValue.get(hero.language.value);
    return languageId
      ? [{ title: hero.title, subHeading: hero.hero.subHeading, languageId }]
      : [];
  });
  const additionalKeys = heroesData.flatMap((hero) => {
    const languageId = languageIdByValue.get(hero.language.value);
    const additional = hero.hero.banner.additional;
    return languageId && additional
      ? [{ text: additional.text, languageId }]
      : [];
  });
  const bannerKeys = heroesData.flatMap((hero) => {
    const languageId = languageIdByValue.get(hero.language.value);
    return languageId
      ? [
          {
            label: hero.hero.banner.label,
            href: hero.hero.banner.href,
            languageId,
          },
        ]
      : [];
  });

  const [existingHeroes, existingAdditionals, existingBanners] =
    await Promise.all([
      prisma.hero.findMany({
        where: { OR: heroKeys },
        select: { id: true, title: true, subHeading: true, languageId: true },
      }),
      prisma.heroBannerAdditional.findMany({
        where: { OR: additionalKeys },
        select: { id: true, text: true, languageId: true },
      }),
      prisma.heroBanner.findMany({
        where: { OR: bannerKeys },
        select: { id: true, label: true, href: true, languageId: true },
      }),
    ]);

  const existingHeroKeys = new Set(
    existingHeroes.map(
      (hero) => `${hero.title}|${hero.subHeading}|${hero.languageId}`,
    ),
  );
  const additionalByKey = new Map(
    existingAdditionals.map((additional) => [
      `${additional.text}|${additional.languageId}`,
      additional,
    ]),
  );
  const bannerByKey = new Map(
    existingBanners.map((banner) => [
      `${banner.label}|${banner.href}|${banner.languageId}`,
      banner,
    ]),
  );
  const ctaByLanguageId = new Map(
    ctas
      .filter((cta) => cta.typeId === foundCtaSlug?.id && cta.external)
      .map((cta) => [cta.languageId, cta]),
  );

  // Filter out heroes that already exist
  const heroesToCreate = heroesData.filter((heroData) => {
    const languageId = languageIdByValue.get(heroData.language.value);
    const key = `${heroData.title}|${heroData.hero.subHeading}|${languageId}`;
    return !existingHeroKeys.has(key);
  });

  let newHeroesCount = 0;
  let seededHeroes = [...existingHeroes];

  if (heroesToCreate.length > 0) {
    const newHeroes = await Promise.all(
      heroesToCreate.map(async (heroData) => {
        // 1. Find the correct Language ID
        const languageId = languageIdByValue.get(heroData.language.value);

        if (!languageId) {
          console.warn(`! Language not found: ${heroData.language.value}`);
        }

        // 2. Find the correct CTA ID (matching type 'hero' and the hero's language)
        const foundCta = ctaByLanguageId.get(languageId ?? null);

        // Check if banner additional already exists
        let additionalId: number | undefined = undefined;
        if (heroData.hero.banner.additional) {
          const additionalKey = `${heroData.hero.banner.additional.text}|${languageId}`;
          const existingAdditional = additionalByKey.get(additionalKey);
          additionalId = existingAdditional?.id;
        }

        // Check if banner already exists
        const bannerKey = `${heroData.hero.banner.label}|${heroData.hero.banner.href}|${languageId}`;
        const existingBanner = bannerByKey.get(bannerKey);

        // 3. Create the Hero record
        return prisma.hero.create({
          data: {
            title: heroData.title,
            description: heroData.description ?? "",
            subHeading: heroData.hero.subHeading,
            // Connect Top-Level Language
            language: languageId ? { connect: { id: languageId } } : undefined,
            banner: existingBanner
              ? { connect: { id: existingBanner.id } }
              : {
                create: {
                  label: heroData.hero.banner.label,
                  href: heroData.hero.banner.href,
                  external: heroData.hero.banner.external,
                  icon: heroData.hero.banner.icon,
                  // Connect Banner Language
                  language: languageId
                    ? { connect: { id: languageId } }
                    : undefined,
                  additional:
                    heroData.hero.banner.additional && !additionalId
                      ? {
                        create: {
                          text: heroData.hero.banner.additional.text,
                          icon: heroData.hero.banner.additional.icon,
                          // Connect Additional Info Language
                          language: languageId
                            ? { connect: { id: languageId } }
                            : undefined,
                        },
                      }
                      : additionalId
                        ? { connect: { id: additionalId } }
                        : undefined,
                },
              },
            cta: foundCta
              ? {
                connect: {
                  id: foundCta.id,
                },
              }
              : undefined,
          },
        });
      })
    );
    newHeroesCount = newHeroes.length;
    seededHeroes = [...existingHeroes, ...newHeroes];
    console.log(`✓ Created ${newHeroesCount} new hero section(s)`);
  } else {
    console.log(`✓ All hero sections already exist, skipping creation`);
  }

  console.log(`✓ Total hero sections in database: ${seededHeroes.length}`);
  return seededHeroes;
};

const clear = async (prisma: PrismaClient) => {
  console.log('Clearing all heroes...');
  const heroesResult = await prisma.hero.deleteMany({});
  console.log(`✓ Deleted ${heroesResult.count} hero section(s)`);

  console.log('Clearing all hero banners...');
  const bannersResult = await prisma.heroBanner.deleteMany({});
  console.log(`✓ Deleted ${bannersResult.count} hero banner(s)`);

  console.log('Clearing all hero banner additionals...');
  const additionalsResult = await prisma.heroBannerAdditional.deleteMany({});
  console.log(`✓ Deleted ${additionalsResult.count} hero banner additional(s)`);
};

const Heroes = {
  data: heroesData,
  seed,
  clear,
};

export default Heroes;
