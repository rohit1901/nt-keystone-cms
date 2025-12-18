import "dotenv/config";
import type { PrismaClient } from "@prisma/client";
import type { Maybe } from "../types";
import type { CertificationImageKey } from "./certifications";
import type { SeededSlugs, Slug } from "./slugs";
import type { CtaImageKeys } from "./ctas";
import { navigationPageContent } from "../../data";

export type TestimonialImageKey =
  | "testimonialField"
  | "testimonialDrone"
  | "testimonialLogo";

// --- Image Types ---
export type ImageConfig = {
  src: string;
  alt: string;
  width?: Maybe<number>;
  height?: Maybe<number>;
  fill?: Maybe<boolean>;
  type?: Maybe<Slug>;
};
export type SeededImages = Awaited<ReturnType<typeof seed>>;
export type NavigationImageKey = "navigationPrimary";
export type ImageKeys =
  | CertificationImageKey
  | CtaImageKeys
  | NavigationImageKey
  | TestimonialImageKey;

// --- Image Data ---
const imageSeedData: Record<ImageKeys, ImageConfig> = {
  certIsaQbAdvanced: {
    src: "/cpsa.a.png",
    alt: "CPSA-A certification badge",
    width: 200,
    height: 200,
    type: "certification",
  },
  certIsaQbFoundation: {
    src: "https://app.skillsclub.com/participants/115738/credentials/217564-2301-CPSAFL-223971-EN.png?ngsw-bypass=true&v=1716371214&Expires=1837082997&Signature=duhUg5dapPCYABZlu903zk~WlmPt75Sap-7sFkFgk0Cxd51gSm7lf4XBuR4SM8fU5ephShR50oFamcrsxF23t9E5yuCjSYC0FL1Oeujv7z1BkujgoVK37pdYCYPPlfeW7DepRSYJeAlIYejTrjxq2gsHYHHpOpqBhekyMCVbJ0HPov6B0FNuQtJ9Jr8eH9kAyxwxuAV5AWtT3T5Xfhw33V6zVU55sGWvYEW5i70T24kEodo2FZgVVMOgWsJK4QgjhdlVzMAwVCKrOJshKA33CY48kdPe6DQy26PnbFIoV-j9k6124QIBwLC4X66Gw3R9pMpBLVn6ym3nppBozizmnw__&Key-Pair-Id=APKAJGVOLYFJFHV5FSSQ",
    alt: "CPSA-F certification badge",
    width: 200,
    height: 200,
    type: "certification",
  },
  certApolloProfessional: {
    src: "https://res.cloudinary.com/apollographql/image/upload/v1654200365/odyssey/certifications/graph_professional_badge.svg",
    alt: "Apollo Graph Professional certification badge",
    width: 200,
    height: 200,
    type: "certification",
  },
  certApolloAssociate: {
    src: "https://res.cloudinary.com/apollographql/image/upload/v1632844693/badge_sfsiin.svg",
    alt: "Apollo Graph Associate certification badge",
    width: 200,
    height: 200,
    type: "certification",
  },
  certGitKraken: {
    src: "/gitkraken.svg",
    alt: "GitKraken Git certification badge",
    width: 200,
    height: 200,
    type: "certification",
  },
  certAwsDeveloper: {
    src: "https://d1.awsstatic.com/certification/badges/AWS-Certified-Developer-Associate_badge_150x150.a8973e238efb2d1b0b24f5282e1ad87eb554e6ef.png",
    alt: "AWS Certified Developer badge",
    width: 200,
    height: 200,
    type: "certification",
  },
  certAwsSap: {
    src: "https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
    alt: "AWS Solutions Architect Professional badge",
    width: 200,
    height: 200,
    type: "certification",
  },
  ctaBackground: {
    src: "/images/farm-footer.webp",
    alt: "Farm with vehicles blurred",
    width: 1000,
    height: 1000,
    type: "cta",
  },
  ctaForeground: {
    src: "/images/farm-footer.webp",
    alt: "Farm with vehicles",
    width: 1000,
    height: 1000,
    type: "cta",
  },
  navigationPrimary: {
    src: "https://nimbus-tech.de/images/nimbus-tech-hero-image.jpg", // Example image URL, replace with actual image path
    alt: "Nimbus Tech Hero Image",
    width: 1600,
    height: 900,
    type: "navigation",
  },
  testimonialField: {
    src: "/images/field.png",
    alt: "clouds background",
    fill: true,
    type: "testimonial",
  },
  testimonialDrone: {
    src: "/images/drone.png",
    alt: "clouds background",
    width: 1583,
    height: 554,
    type: "testimonial",
  },
  testimonialLogo: {
    src: "/nimbus.svg",
    alt: "Nimbus Tech logo",
    width: 50,
    height: 50,
    type: "testimonial",
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
  const seededImages = await prisma.image.createManyAndReturn({
    data: Object.entries(imageSeedData).map(([, value]) => ({
      ...value,
      type: undefined,
      fill: !!value.fill,
      typeId: getTypeId(value.type, slugs),
    })),
  });
  console.log(`✓ Seeded images with ${seededImages.length} images`);
  return seededImages;
};

const Images = {
  seed,
  data: imageSeedData,
};

export default Images;
