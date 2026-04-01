import Images from "./images";
import type { SeededImages } from "./images";
import type { PrismaClient } from "@prisma/client";
import type { SeededSlugs } from "./slugs";
import Ctas, { SeededCTAs } from "./ctas";
import { remixIconMap } from "../../data/icons/remixicon-map";
import { CTA, HeroType, ImageConfig } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededHeroes = Awaited<ReturnType<typeof seed>>;

// --- Heroes Data ---

const fallbackCTA: CTA[] = [
  {
    label: "News",
    href: "https://nimbustechgmbh.substack.com/p/nimbus-tech-gmbh-is-launching-soon",
    external: true,
    type: "hero",
    language: { label: "English", value: "en-US" },
  },
  {
    label: "Aktuelles",
    href: "https://nimbustechgmbh.substack.com/p/nimbus-tech-gmbh-is-launching-soon",
    external: true,
    type: "hero",
    language: { label: "German", value: "de-DE" },
  },
];

// Helper to find banner CTA by language
const getBannerCta = (langValue: string) =>
  Ctas.ctas.find(
    (cta) =>
      cta.type === "hero" && cta.external && cta.language.value === langValue,
  ) ??
  fallbackCTA.find((c) => c.language.value === langValue) ??
  fallbackCTA[0];

const heroesData: HeroType[] = [
  // English Hero
  {
    title: "AWS Cloud Consulting for SMEs & Startups",
    description:
      "AWS expertise in cloud-native architecture, secure cloud transformation, and cost-optimized infrastructures for your business.",
    language: { label: "English", value: "en-US" },
    hero: {
      subHeading: "AWS expertise for cloud-native, secure, and cost-optimized infrastructures.",
      banner: {
        ...getBannerCta("en-US"),
        additional: {
          icon: "RiArrowRightUpLine",
          text: "Nimbus Tech is launching soon!",
        },
      },
    },
  },
  // German Hero
  {
    title: "Nimbus Tech",
    description:
      "Nimbus Tech unterstützt kleine und mittelständische Unternehmen sowie Start-ups in der DACH-Region dabei, AWS optimal zu nutzen – mit cloud-native Architekturen und einer durchdachten Multi-Account-Strategie. Wir planen, bauen und optimieren Ihre Cloud-Umgebung mit Infrastructure as Code (IaC), setzen Serverless Computing dort ein, wo es sinnvoll ist, und nutzen bewährte Methoden zur Kostenoptimierung.",
    language: { label: "German", value: "de-DE" },
    hero: {
      subHeading: "AWS-Expertise für cloud-native, sichere und kostenoptimierte Infrastrukturen.",
      banner: {
        ...getBannerCta("de-DE"),
        additional: {
          icon: "RiArrowRightUpLine",
          text: "Nimbus Tech startet bald!",
        },
      },
    },
  },
];

const seed = async (
  prisma: PrismaClient,
  images: SeededImages,
  slugs: SeededSlugs,
  ctas: SeededCTAs,
  languages: SeededFooterLanguages,
) => {
  const foundCtaSlug = slugs.find((slug) => slug.label === "hero");

  // Get all existing heroes to check for duplicates
  const existingHeroes = await prisma.hero.findMany({
    select: { id: true, title: true, subHeading: true, languageId: true },
  });

  // Create unique keys based on title + subHeading + languageId
  const existingHeroKeys = new Set(
    existingHeroes.map((hero) => `${hero.title}|${hero.subHeading}|${hero.languageId}`)
  );

  // Get existing hero banner additionals to check for duplicates
  const existingAdditionals = await prisma.heroBannerAdditional.findMany({
    select: { id: true, text: true, languageId: true },
  });
  const existingAdditionalKeys = new Set(
    existingAdditionals.map((add) => `${add.text}|${add.languageId}`)
  );

  // Get existing hero banners to check for duplicates
  const existingBanners = await prisma.heroBanner.findMany({
    select: { id: true, label: true, href: true, languageId: true },
  });
  const existingBannerKeys = new Set(
    existingBanners.map((banner) => `${banner.label}|${banner.href}|${banner.languageId}`)
  );

  // Filter out heroes that already exist
  const heroesToCreate = heroesData.filter((heroData) => {
    const languageId = languages.find(
      (l) => l.value === heroData.language.value,
    )?.id;
    const key = `${heroData.title}|${heroData.hero.subHeading}|${languageId}`;
    return !existingHeroKeys.has(key);
  });

  let newHeroesCount = 0;
  let seededHeroes = [...existingHeroes];

  if (heroesToCreate.length > 0) {
    const newHeroes = await Promise.all(
      heroesToCreate.map(async (heroData) => {
        // 1. Find the correct Language ID
        const languageId = languages.find(
          (l) => l.value === heroData.language.value,
        )?.id;

        if (!languageId) {
          console.warn(`! Language not found: ${heroData.language.value}`);
        }

        // 2. Find the correct CTA ID (matching type 'hero' and the hero's language)
        const foundCta = ctas.find(
          (cta) =>
            cta.typeId === foundCtaSlug?.id &&
            cta.languageId === languageId &&
            cta.external,
        );

        // Check if banner additional already exists
        let additionalId: number | undefined = undefined;
        if (heroData.hero.banner.additional) {
          const additionalKey = `${heroData.hero.banner.additional.text}|${languageId}`;
          const existingAdditional = existingAdditionals.find(
            (add) => `${add.text}|${add.languageId}` === additionalKey
          );
          additionalId = existingAdditional?.id;
        }

        // Check if banner already exists
        const bannerKey = `${heroData.hero.banner.label}|${heroData.hero.banner.href}|${languageId}`;
        const existingBanner = existingBanners.find(
          (banner) => `${banner.label}|${banner.href}|${banner.languageId}` === bannerKey
        );

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
