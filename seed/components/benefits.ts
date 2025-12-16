import Images from "./images";
import type { ImageConfig, SeededImages } from "./images";
import type { PrismaClient } from "@prisma/client";
import type { SeededSlugs, Slug } from "./slugs";
import Ctas, { CTA, SeededCTAs } from "./ctas";
import { remixIconMap } from "../../data/icons/remixicon-map";

// --- Types ---
export type Benefit = {
  title: string;
  description: string;
  icon: keyof typeof remixIconMap;
};
export type BenefitSection = {
  title: string;
  benefits: Benefit[];
};

export type SeededBenefits = Awaited<ReturnType<typeof seed>>;

// --- Data ---
const benefitsSectionData: BenefitSection = {
  title: "Your Benefits with Nimbus Tech",
  benefits: [
    {
      icon: "RiAwardFill",
      title: "Certified Experts",
      description: "We are experienced and certified AWS cloud specialists.",
    },
    {
      icon: "RiMoneyEuroBoxFill",
      title: "Full Cost Control",
      description:
        "We ensure transparent and predictable costs for your cloud project.",
    },
    {
      icon: "RiFlashlightFill",
      title: "Fast Implementation",
      description:
        "We implement your individual cloud project efficiently and quickly.",
    },
  ],
};

const seed = async (
  prisma: PrismaClient,
  images: SeededImages,
  slugs: SeededSlugs,
  ctas: SeededCTAs,
) => {
  return await prisma.benefit.createManyAndReturn({
    data: benefitsSectionData.benefits.map((benefit) => ({
      title: benefit.title,
      description: benefit.description,
      icon: benefit.icon,
    })),
  });
};

const seedSection = async (
  prisma: PrismaClient,
  images: SeededImages,
  slugs: SeededSlugs,
  ctas: SeededCTAs,
) => {
  const seededBenefits = await seed(prisma, images, slugs, ctas);
  const seededBenefitSection = await prisma.benefitSection.create({
    data: {
      title: benefitsSectionData.title,
      benefits: {
        connect: seededBenefits.map((benefit) => ({
          id: benefit.id,
        })),
      },
    },
  });

  console.log(`✓ Seeded Benefit Section: ${seededBenefitSection.id}`);
  return seededBenefitSection;
};

const Benefits = {
  data: benefitsSectionData,
  seed,
  seedSection,
};

export default Benefits;
