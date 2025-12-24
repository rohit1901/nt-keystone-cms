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
    href: "https://rohitkhanduri.substack.com",
    external: true,
    type: "hero",
    language: { label: "English", value: "en-US" },
  },
  {
    label: "Aktuelles",
    href: "https://rohitkhanduri.substack.com",
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
    title: "Nimbus Tech",
    description:
      "Custom software development, cloud architecture, and scalable solutions for modern enterprises.",
    language: { label: "English", value: "en-US" },
    hero: {
      subHeading: "Expert Software & Cloud Solutions",
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
      "Maßgeschneiderte Softwareentwicklung, Cloud-Architektur und skalierbare Lösungen für moderne Unternehmen.",
    language: { label: "German", value: "de-DE" },
    hero: {
      subHeading: "Experten für Software- & Cloud-Lösungen",
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

  // Iterate over the array to create both English and German entries
  const seededHeroes = await Promise.all(
    heroesData.map(async (heroData) => {
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

      // 3. Create the Hero record
      return prisma.hero.create({
        data: {
          title: heroData.title,
          description: heroData.description ?? "",
          subHeading: heroData.hero.subHeading,
          // Connect Top-Level Language
          language: languageId ? { connect: { id: languageId } } : undefined,
          banner: {
            create: {
              label: heroData.hero.banner.label,
              href: heroData.hero.banner.href,
              external: heroData.hero.banner.external,
              icon: heroData.hero.banner.icon,
              // Connect Banner Language
              language: languageId
                ? { connect: { id: languageId } }
                : undefined,
              additional: heroData.hero.banner.additional
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
    }),
  );

  console.log(`✓ Seeded ${seededHeroes.length} Hero sections`);

  return seededHeroes;
};

const Heroes = {
  data: heroesData,
  seed,
};

export default Heroes;
