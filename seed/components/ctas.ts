import Images from "./images";
import type { ImageConfig, SeededImages } from "./images";
import type { PrismaClient } from "@prisma/client";
import type { SeededSlugs, Slug } from "./slugs";

// --- Types ---
export type CtaImageKeys = "ctaBackground" | "ctaForeground";
export type CTA = {
  label: string;
  href: string;
  external?: boolean;
  type: Slug;
};

type CtaSection = {
  title: string;
  description: string;
  backgrounds: ImageConfig[];
  ctas: CTA[];
};

export type SeededCTAs = Awaited<ReturnType<typeof seed>>;

// --- CTAs Data ---
const ctas: CTA[] = [
  {
    label: "Start now",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: true,
    type: "cta",
  },
  {
    label: "Schedule a discovery call",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de", // TODO: add link to calendars
    external: true,
    type: "cta",
  },
  {
    label: "Let’s Talk",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: true,
    type: "certification",
  },
];

const CtasSectionData: CtaSection = {
  title: "Ready to get started?",
  description:
    "Let’s build scalable software solutions tailored to your business goals.",
  ctas: ctas.filter((cta) => cta.type === "cta"),
  backgrounds: Object.entries(Images.data)
    .filter(([key, value]) => value.type === "cta")
    .map(([key, value]) => value),
};

async function seed(prisma: PrismaClient, slugs: SeededSlugs) {
  const seededCtas = await prisma.cta.createManyAndReturn({
    data: ctas.map((cta) => {
      const typeId = slugs.find((slug) => slug.label === cta.type)?.id;
      if (!typeId) {
        throw new Error(`Type not found for CTA: ${cta.label}`);
      }
      return {
        ...cta,
        type: undefined,
        typeId,
      };
    }),
  });
  console.log(`✓ Seeded ctas with ${seededCtas.length} ctas`);
  return seededCtas;
}

async function seedSection(
  prisma: PrismaClient,
  slugs: SeededSlugs,
  ctas: SeededCTAs,
  backgrounds: SeededImages,
) {
  const foundCtaSlug = slugs.find((slug) => slug.label === "cta");

  if (!foundCtaSlug) {
    throw new Error("CTA slug not found");
  }

  const ctaImageIds = backgrounds
    .filter((image) => image.typeId === foundCtaSlug.id)
    .map(({ id }) => id);

  if (!ctaImageIds.length) {
    throw new Error("CTA background images not found");
  }

  const foundCtaCTAs = ctas.filter((cta) => cta.typeId === foundCtaSlug.id);

  if (!foundCtaCTAs.length) {
    throw new Error("CTA records not found");
  }

  const backgroundsToConnect = backgrounds.filter((background) =>
    ctaImageIds.includes(background.id),
  );

  const sections = await prisma.ctaSection.create({
    data: {
      title: CtasSectionData.title,
      description: CtasSectionData.description,
      background: {
        connect: backgroundsToConnect.map((b) => ({
          id: b.id,
        })),
      },
      ctas: {
        connect: foundCtaCTAs.map((cta) => ({ id: cta.id })),
      },
    },
  });
  console.log(`✓ Seeded CTA section with ${sections.id}`);
  return sections;
}

const Ctas = {
  data: CtasSectionData,
  seed,
  seedSection,
};

export default Ctas;
