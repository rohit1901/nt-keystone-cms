import Images from "./images";
import type { SeededImages } from "./images";
import type { PrismaClient } from "@prisma/client";
import type { SeededSlugs } from "./slugs";
import Ctas, { CTA, SeededCTAs } from "./ctas";
import { remixIconMap } from "../../data/icons/remixicon-map";
import { ImageConfig } from "../../data";

// --- Types ---
export type Hero = {
  title: string;
  description?: string;
  image?: ImageConfig;
  cta?: CTA;
  hero: {
    banner: {
      icon?: keyof typeof remixIconMap;
      additional?: {
        icon: keyof typeof remixIconMap;
        text: string;
      };
    } & Omit<CTA, "type">;
    subHeading: string;
  };
};
export type SeededHeroes = Awaited<ReturnType<typeof seed>>;

// --- Heroes Data ---
const fallbackCTA: CTA = {
  label: "News",
  href: "https://rohitkhanduri.substack.com", // TODO: Substack for now, change later
  external: true,
  type: "hero",
};
const bannerCta: CTA =
  Ctas.data.ctas.find((cta) => cta.type === "hero" && cta.external) ??
  fallbackCTA;
const heroesData: Hero = {
  title: "Nimbus Tech",
  description:
    "Custom software development, cloud architecture, and scalable solutions for modern enterprises.",
  hero: {
    subHeading: "Expert Software & Cloud Solutions",
    banner: {
      label: bannerCta.label,
      href: bannerCta.href,
      external: bannerCta.external,
      additional: {
        icon: "RiArrowRightUpLine",
        text: "Nimbus Tech is launching soon!",
      },
    },
  },
  cta: Ctas.data.ctas.find((cta) => cta.type === "hero"),
};

const seed = async (
  prisma: PrismaClient,
  images: SeededImages,
  slugs: SeededSlugs,
  ctas: SeededCTAs,
) => {
  const foundCtaSlug = slugs.find((slug) => slug.label === "hero");
  const foundCta = ctas
    .filter((cta) => cta.typeId === foundCtaSlug?.id)
    .find((cta) => !!cta.external);
  const seededHeroSection = await prisma.hero.create({
    data: {
      title: heroesData.title,
      description: heroesData.description,
      subHeading: heroesData.hero.subHeading,
      banner: {
        create: {
          ...heroesData.hero.banner,
          additional: {
            create: {
              ...heroesData.hero.banner.additional,
            },
          },
        },
      },
      cta: {
        connect: {
          id: foundCta?.id,
        },
      },
    },
  });

  console.log(`✓ Seeded Hero Section: ${seededHeroSection.id}`);
  return seededHeroSection;
};

const Heroes = {
  data: heroesData,
  seed,
};

export default Heroes;
