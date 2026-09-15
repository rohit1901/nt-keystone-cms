import "dotenv/config";
import type { PrismaClient } from "../prisma";

import type { SeededSlugs } from "./slugs";
import {
  CertificationImageKey,
  ImageConfig,
  CtaImageKeys,
  imageSeedData,
  TestimonialImageKey,
  ResumeImageKey,
  NavigationImageKey,
  ImageKeys,
} from "../../data";

export type { CertificationImageKey, TestimonialImageKey, ResumeImageKey, NavigationImageKey, ImageKeys };

export type SeededImages = Awaited<ReturnType<typeof seed>>;

const seed = async (prisma: PrismaClient, slugs: SeededSlugs) => {
  const slugByLabel = new Map(slugs.map((slug) => [slug.label, slug.id]));
  if (!slugByLabel.has("certification")) {
    throw new Error("Certification slug not found");
  }
  if (!slugByLabel.has("navigation")) {
    throw new Error("Navigation slug not found");
  }

  // Get existing seeded images by src to check for duplicates
  const existingImages = await prisma.image.findMany({
    where: {
      src: { in: Object.values(imageSeedData).map(({ src }) => src) },
    },
    select: {
      id: true,
      src: true,
      alt: true,
      typeId: true,
    },
  });

  const existingImageSrcs = new Set(existingImages.map(({ src }) => src));

  // Prepare data for images that don't already exist
  const imagesToCreate = Object.entries(imageSeedData)
    .filter(([, { src }]) => !existingImageSrcs.has(src))
    .map(([, { key, ...value }]) => ({
      ...value,
      type: undefined,
      fill: !!value.fill,
      typeId: value.type ? slugByLabel.get(value.type) : undefined,
    }));

  let newImagesCount = 0;
  let seededImages = [...existingImages];

  if (imagesToCreate.length > 0) {
    const newImages = await prisma.image.createManyAndReturn({
      data: imagesToCreate,
    });
    newImagesCount = newImages.length;
    seededImages = [...existingImages, ...newImages];
    console.log(`✓ Created ${newImagesCount} new image(s)`);
  } else {
    console.log(`✓ All images already exist, skipping creation`);
  }

  console.log(`✓ Total images in database: ${seededImages.length}`);
  return seededImages;
};

const clear = async (prisma: PrismaClient) => {
  console.log('Clearing all images...');
  const result = await prisma.image.deleteMany({});
  console.log(`✓ Deleted ${result.count} image(s)`);
};

const Images = {
  seed,
  clear,
  data: imageSeedData,
};

export default Images;
