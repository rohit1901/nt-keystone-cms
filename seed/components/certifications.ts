import Image from "./images";
import type { SeededCTAs } from "./ctas";
import type { ImageConfig, SeededImages } from "./images";
import type { PrismaClient } from "@prisma/client";
import { SeededSlugs } from "./slugs";
import Ctas from "./ctas";

// --- Certification Types ---
export type CertificationImageKey =
  | "certIsaQbAdvanced"
  | "certIsaQbFoundation"
  | "certApolloProfessional"
  | "certApolloAssociate"
  | "certGitKraken"
  | "certAwsDeveloper"
  | "certAwsSap";

export type Certification = {
  id: number;
  title: string;
  description: string;
  image: Partial<Record<CertificationImageKey, ImageConfig>>;
  link?: string; // Optional link for certifications that have a URL
};

export type SeededCertifications = Awaited<ReturnType<typeof seed>>;

// --- Certifications Data ---
const certificationsData = {
  title: "Our Certifications",
  description:
    "Nimbus Tech is certified in various technologies and methodologies, ensuring the highest quality standards in our projects.",
  cta: Ctas.data.ctas.find(({ type }) => type === "certification"),
  certifications: [
    {
      title:
        "iSAQB® Certified Professional for Software Architecture - Advanced Level (CPSA-A)",
      description:
        "Advanced expertise in software architecture principles and practices.",
      image: {
        certIsaQbAdvanced: Image.data.certIsaQbAdvanced,
      },
    },
    {
      title:
        "iSAQB® Certified Professional for Software Architecture - Foundation Level (CPSA-F)",
      description:
        "Fundamental knowledge of software architecture concepts and methodologies.",
      image: {
        certIsaQbFoundation: Image.data.certIsaQbFoundation,
      },
      link: "https://app.skillsclub.com/credential/28340-f57d08ae92c30e28a0c2850516e8fec9616ac7473feba42e7c4a2e62585c44c0?locale=en&badge=true",
    },
    {
      title: "Apollo Certified Graph Developer - Professional",
      description:
        "Certified skills in GraphQL development and Apollo client/server technologies.",
      image: {
        certApolloProfessional: Image.data.certApolloProfessional,
      },
      link: "https://www.apollographql.com/tutorials/certifications/d5356f71-0760-4701-ae67-8b56c425c89a",
    },
    {
      title: "Apollo Certified Graph Developer - Associate",
      description:
        "Certified skills in GraphQL development and Apollo client/server technologies.",
      image: {
        certApolloAssociate: Image.data.certApolloAssociate,
      },
      link: "https://www.apollographql.com/tutorials/certifications/3ad7e4dd-4b29-46f2-8e65-6e5706e0c067",
    },
    {
      title: "Git Certified Specialist by GitKraken",
      description:
        "Expertise in Git version control and collaboration workflows.",
      image: {
        certGitKraken: Image.data.certGitKraken,
      },
      link: "https://cdn.filestackcontent.com/dq8NILlGROaJpp4bxYlC?policy=eyJjYWxsIjpbInJlYWQiXSwiZXhwaXJ5IjoxNzUwNjg3MzIwLCJwYXRoIjoiLyJ9&signature=3180d99a6f24a049042e2341f449f4e35a12688f261859fa6dfd88cac212d230",
    },
    {
      title: "AWS Certified Developer - Associate",
      description:
        "Demonstrates proficiency in developing and maintaining applications on AWS.",
      image: {
        certAwsDeveloper: Image.data.certAwsDeveloper,
      },
    },
    {
      title: "AWS Certified Solutions Architect - Associate",
      description:
        "Demonstrates proficiency in architecting applications on AWS.",
      image: {
        certAwsSap: Image.data.certAwsSap,
      },
    },
  ],
};

async function seed(
  prisma: PrismaClient,
  slugs: SeededSlugs,
  ctas: SeededCTAs,
  images: SeededImages,
) {
  console.log("Seeding certifications...");
  const certificationSlug = slugs.find(
    (slug) => slug.label === "certification",
  );
  if (!certificationSlug) {
    throw new Error(`Slug not found for label: certification`);
  }
  const certifications = await prisma.certification.createManyAndReturn({
    data: certificationsData.certifications.map((cert) => ({
      ...cert,
      image: undefined,
      imageId: images.find((i) => i.typeId === certificationSlug.id)?.id,
    })),
  });
  console.log(
    `✓ Seeded certifications with ${certifications.length} certifications`,
  );
  return certifications;
}

async function seedSection(
  prisma: PrismaClient,
  slugs: SeededSlugs,
  ctas: SeededCTAs,
  images: SeededImages,
  certifications: SeededCertifications,
) {
  console.log("Seeding certification sections...");
  const certificationCtaType = slugs.find(
    (slug) => slug.label === "certification",
  );
  if (!certificationCtaType) {
    throw new Error(`Slug not found for label: certification`);
  }
  const foundCtaId = ctas.find(
    (cta) => cta.typeId === certificationCtaType.id,
  )?.id;

  if (!foundCtaId) {
    throw new Error(`CTA not found for certification`);
  }
  const sections = await prisma.certificationSection.create({
    data: {
      ...certificationsData,
      cta: {
        connect: { id: foundCtaId },
      },
      certifications: {
        connect: certifications.map((cert) => ({ id: cert.id })),
      },
    },
  });
  console.log(`✓ Seeded certification section with ${sections.id}`);
  return sections;
}

const Certifications = {
  data: certificationsData,
  seed,
  seedSection,
};

export default Certifications;
