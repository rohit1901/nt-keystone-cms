import "dotenv/config";
import type { PrismaClient } from "@prisma/client";
import type { Maybe } from "../types";
import type { SeededSlugs } from "./slugs";
import {
  CertificationImageKey,
  ImageConfig,
  Slug,
  CtaImageKeys,
} from "../../data";

export type TestimonialImageKey =
  | "testimonialField"
  | "testimonialDrone"
  | "testimonialLogo";

export type ResumeImageKey =
  | "resumeAvatar"
  | "resumePhoto";

export type SeededImages = Awaited<ReturnType<typeof seed>>;
export type NavigationImageKey = "navigationPrimary";
export type ImageKeys =
  | CertificationImageKey
  | CtaImageKeys
  | NavigationImageKey
  | TestimonialImageKey
  | TestimonialImageKey
  | ResumeImageKey;

// --- Image Data ---
const imageSeedData: Record<ImageKeys, ImageConfig> = {
  certIsaQbAdvanced: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/certifications/cpsa.a.png",
    alt: "CPSA-A certification badge",
    width: 200,
    height: 200,
    type: "certification",
    key: "certIsaQbAdvanced",
  },
  certIsaQbFoundation: {
    src: "https://app.skillsclub.com/participants/115738/credentials/217564-2301-CPSAFL-223971-EN.png?ngsw-bypass=true&v=1716371214&Expires=1837082997&Signature=duhUg5dapPCYABZlu903zk~WlmPt75Sap-7sFkFgk0Cxd51gSm7lf4XBuR4SM8fU5ephShR50oFamcrsxF23t9E5yuCjSYC0FL1Oeujv7z1BkujgoVK37pdYCYPPlfeW7DepRSYJeAlIYejTrjxq2gsHYHHpOpqBhekyMCVbJ0HPov6B0FNuQtJ9Jr8eH9kAyxwxuAV5AWtT3T5Xfhw33V6zVU55sGWvYEW5i70T24kEodo2FZgVVMOgWsJK4QgjhdlVzMAwVCKrOJshKA33CY48kdPe6DQy26PnbFIoV-j9k6124QIBwLC4X66Gw3R9pMpBLVn6ym3nppBozizmnw__&Key-Pair-Id=APKAJGVOLYFJFHV5FSSQ",
    alt: "CPSA-F certification badge",
    width: 200,
    height: 200,
    type: "certification",
    key: "certIsaQbFoundation",
  },
  certApolloProfessional: {
    src: "https://res.cloudinary.com/apollographql/image/upload/v1654200365/odyssey/certifications/graph_professional_badge.svg",
    alt: "Apollo Graph Professional certification badge",
    width: 200,
    height: 200,
    type: "certification",
    key: "certApolloProfessional",
  },
  certApolloAssociate: {
    src: "https://res.cloudinary.com/apollographql/image/upload/v1632844693/badge_sfsiin.svg",
    alt: "Apollo Graph Associate certification badge",
    width: 200,
    height: 200,
    type: "certification",
    key: "certApolloAssociate",
  },
  certGitKraken: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/certifications/gitkraken.svg",
    alt: "GitKraken Git certification badge",
    width: 200,
    height: 200,
    type: "certification",
    key: "certGitKraken",
  },
  certAwsDeveloper: {
    src: "https://d1.awsstatic.com/certification/badges/AWS-Certified-Developer-Associate_badge_150x150.a8973e238efb2d1b0b24f5282e1ad87eb554e6ef.png",
    alt: "AWS Certified Developer badge",
    width: 200,
    height: 200,
    type: "certification",
    key: "certAwsDeveloper",
  },
  certAwsSap: {
    src: "https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
    alt: "AWS Solutions Architect Professional badge",
    width: 200,
    height: 200,
    type: "certification",
    key: "certAwsSap",
  },
  ctaForeground: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/images/farm-footer.webp",
    alt: "Farm with vehicles",
    width: 1000,
    height: 1000,
    type: "cta",
  },
  navigationPrimary: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/nimbus.logo.svg",
    alt: "Nimbus Tech Navbar Logo",
    width: 50,
    height: 50,
    type: "navigation",
  },
  testimonialField: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/images/field.png",
    alt: "clouds background",
    fill: true,
    type: "testimonial",
  },
  testimonialDrone: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/images/drone.png",
    alt: "clouds background",
    width: 1583,
    height: 554,
    type: "testimonial",
  },
  testimonialLogo: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/nimbus.svg",
    alt: "Nimbus Tech logo",
    width: 50,
    height: 50,
    type: "testimonial",
  },
  resumeAvatar: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/resume/avatar.png",
    alt: "Resume Avatar",
    width: 150,
    height: 150,
    type: "resume",
  },
  resumePhoto: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/resume/profile-pic.jpeg",
    alt: "Resume Photo",
    width: 150,
    height: 150,
    type: "resume",
  },
};

const navigationPageContent = {
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
  },
};

const getTypeId = (type: Maybe<Slug>, slugs: Maybe<SeededSlugs>) => {
  if (!type) return undefined;
  if (!slugs) return undefined;
  const slug = slugs.find(({ label }) => label === type);
  return slug?.id;
};

const seed = async (prisma: PrismaClient, slugs: SeededSlugs) => {
  const certificationSlugId = slugs.find(
    ({ label }) => label === "certification",
  )?.id;
  if (!certificationSlugId) throw new Error("Certification slug not found");

  const navigationSlugExists = slugs.some(
    ({ label }) => label === "navigation",
  );
  if (!navigationSlugExists) throw new Error("Navigation slug not found");

  if (!navigationPageContent.image) {
    throw new Error(
      "Navigation image data is required in navigationPageContent.image before seeding.",
    );
  }

  // Get all existing images by src to check for duplicates
  const existingImages = await prisma.image.findMany();

  const existingImageSrcs = new Set(existingImages.map(img => img.src));

  // Prepare data for images that don't already exist
  const imagesToCreate = Object.entries(imageSeedData)
    .filter(([, { src }]) => !existingImageSrcs.has(src))
    .map(([, { key, ...value }]) => ({
      ...value,
      type: undefined,
      fill: !!value.fill,
      typeId: getTypeId(value.type, slugs),
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
