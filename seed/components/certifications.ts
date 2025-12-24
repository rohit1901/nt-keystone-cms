import Image from "./images";
import type { SeededCTAs } from "./ctas";
import type { SeededImages } from "./images";
import type { PrismaClient } from "@prisma/client";
import { SeededSlugs } from "./slugs";
import Ctas from "./ctas";
import { CertificationSection, ImageConfig } from "../../data";

export type SeededCertifications = Awaited<ReturnType<typeof seed>>;

// --- Certifications Data ---
const certificationSectionsData: CertificationSection[] = [
  // English (en-US)
  {
    title: "Our Certifications",
    description:
      "Nimbus Tech is certified in various technologies and methodologies, ensuring the highest quality standards in our projects.",
    cta: Ctas.data
      .find((cta) => cta.language.value === "en-US")
      ?.ctas.find((cta) => cta.type === "certification"),
    language: {
      label: "English",
      value: "en-US",
    },
    certifications: [
      {
        title:
          "iSAQB® Certified Professional for Software Architecture - Advanced Level (CPSA-A)",
        description:
          "Advanced expertise in software architecture principles and practices.",
        image: {
          certIsaQbAdvanced: Image.data.certIsaQbAdvanced,
        },
        key: "certIsaQbAdvanced",
        language: {
          label: "English",
          value: "en-US",
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
        key: "certIsaQbFoundation",
        link: "https://app.skillsclub.com/credential/28340-f57d08ae92c30e28a0c2850516e8fec9616ac7473feba42e7c4a2e62585c44c0?locale=en&badge=true",
        language: {
          label: "English",
          value: "en-US",
        },
      },
      {
        title: "Apollo Certified Graph Developer - Professional",
        description:
          "Certified skills in GraphQL development and Apollo client/server technologies.",
        image: {
          certApolloProfessional: Image.data.certApolloProfessional,
        },
        key: "certApolloProfessional",
        link: "https://www.apollographql.com/tutorials/certifications/d5356f71-0760-4701-ae67-8b56c425c89a",
        language: {
          label: "English",
          value: "en-US",
        },
      },
      {
        title: "Apollo Certified Graph Developer - Associate",
        description:
          "Certified skills in GraphQL development and Apollo client/server technologies.",
        image: {
          certApolloAssociate: Image.data.certApolloAssociate,
        },
        key: "certApolloAssociate",
        link: "https://www.apollographql.com/tutorials/certifications/3ad7e4dd-4b29-46f2-8e65-6e5706e0c067",
        language: {
          label: "English",
          value: "en-US",
        },
      },
      {
        title: "Git Certified Specialist by GitKraken",
        description:
          "Expertise in Git version control and collaboration workflows.",
        image: {
          certGitKraken: Image.data.certGitKraken,
        },
        key: "certGitKraken",
        link: "https://cdn.filestackcontent.com/dq8NILlGROaJpp4bxYlC?policy=eyJjYWxsIjpbInJlYWQiXSwiZXhwaXJ5IjoxNzUwNjg3MzIwLCJwYXRoIjoiLyJ9&signature=3180d99a6f24a049042e2341f449f4e35a12688f261859fa6dfd88cac212d230",
        language: {
          label: "English",
          value: "en-US",
        },
      },
      {
        title: "AWS Certified Developer - Associate",
        description:
          "Demonstrates proficiency in developing and maintaining applications on AWS.",
        image: {
          certAwsDeveloper: Image.data.certAwsDeveloper,
        },
        key: "certAwsDeveloper",
        language: {
          label: "English",
          value: "en-US",
        },
      },
      {
        title: "AWS Certified Solutions Architect - Associate",
        description:
          "Demonstrates proficiency in architecting applications on AWS.",
        image: {
          certAwsSap: Image.data.certAwsSap,
        },
        key: "certAwsSap",
        language: {
          label: "English",
          value: "en-US",
        },
      },
    ],
  },
  // German (de-DE)
  {
    title: "Unsere Zertifizierungen",
    description:
      "Nimbus Tech ist in verschiedenen Technologien und Methoden zertifiziert, um höchste Qualitätsstandards in unseren Projekten zu gewährleisten.",
    cta: Ctas.data
      .find((cta) => cta.language.value === "de-DE")
      ?.ctas.find((cta) => cta.type === "certification"),
    language: {
      label: "German",
      value: "de-DE",
    },
    certifications: [
      {
        title:
          "iSAQB® Certified Professional for Software Architecture - Advanced Level (CPSA-A)",
        description:
          "Fortgeschrittene Expertise in Softwarearchitektur-Prinzipien und -Praktiken.",
        image: {
          certIsaQbAdvanced: Image.data.certIsaQbAdvanced,
        },
        key: "certIsaQbAdvanced",
        language: {
          label: "German",
          value: "de-DE",
        },
      },
      {
        title:
          "iSAQB® Certified Professional for Software Architecture - Foundation Level (CPSA-F)",
        description:
          "Grundlegendes Wissen über Konzepte und Methoden der Softwarearchitektur.",
        image: {
          certIsaQbFoundation: Image.data.certIsaQbFoundation,
        },
        key: "certIsaQbFoundation",
        link: "https://app.skillsclub.com/credential/28340-f57d08ae92c30e28a0c2850516e8fec9616ac7473feba42e7c4a2e62585c44c0?locale=en&badge=true",
        language: {
          label: "German",
          value: "de-DE",
        },
      },
      {
        title: "Apollo Certified Graph Developer - Professional",
        description:
          "Zertifizierte Fähigkeiten in der GraphQL-Entwicklung und Apollo-Client/Server-Technologien.",
        image: {
          certApolloProfessional: Image.data.certApolloProfessional,
        },
        key: "certApolloProfessional",
        link: "https://www.apollographql.com/tutorials/certifications/d5356f71-0760-4701-ae67-8b56c425c89a",
        language: {
          label: "German",
          value: "de-DE",
        },
      },
      {
        title: "Apollo Certified Graph Developer - Associate",
        description:
          "Zertifizierte Fähigkeiten in der GraphQL-Entwicklung und Apollo-Client/Server-Technologien.",
        image: {
          certApolloAssociate: Image.data.certApolloAssociate,
        },
        key: "certApolloAssociate",
        link: "https://www.apollographql.com/tutorials/certifications/3ad7e4dd-4b29-46f2-8e65-6e5706e0c067",
        language: {
          label: "German",
          value: "de-DE",
        },
      },
      {
        title: "Git Certified Specialist by GitKraken",
        description:
          "Expertise in Git-Versionskontrolle und Kollaborations-Workflows.",
        image: {
          certGitKraken: Image.data.certGitKraken,
        },
        key: "certGitKraken",
        link: "https://cdn.filestackcontent.com/dq8NILlGROaJpp4bxYlC?policy=eyJjYWxsIjpbInJlYWQiXSwiZXhwaXJ5IjoxNzUwNjg3MzIwLCJwYXRoIjoiLyJ9&signature=3180d99a6f24a049042e2341f449f4e35a12688f261859fa6dfd88cac212d230",
        language: {
          label: "German",
          value: "de-DE",
        },
      },
      {
        title: "AWS Certified Developer - Associate",
        description:
          "Zeigt Fachwissen in der Entwicklung und Wartung von Anwendungen auf AWS.",
        image: {
          certAwsDeveloper: Image.data.certAwsDeveloper,
        },
        key: "certAwsDeveloper",
        link: "https://www.aws.training/certification/aws-certified-developer-associate",
        language: {
          label: "German",
          value: "de-DE",
        },
      },
      {
        title: "AWS Certified Solutions Architect - Associate",
        description:
          "Zeigt Fachwissen in der Architektur von Anwendungen auf AWS.",
        image: {
          certAwsSap: Image.data.certAwsSap,
        },
        key: "certAwsSap",
        language: {
          label: "German",
          value: "de-DE",
        },
      },
    ],
  },
];

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
  const englishLanguageId = await prisma.language.findFirstOrThrow({
    where: { value: "en-US" },
    select: { id: true },
  });
  const germanLanguageId = await prisma.language.findFirstOrThrow({
    where: { value: "de-DE" },
    select: { id: true },
  });
  const allCertifications = [];

  // Iterate over all language sections to create certifications
  for (const sectionData of certificationSectionsData) {
    const createdCerts = await prisma.certification.createManyAndReturn({
      data: sectionData.certifications.map(({ key, ...cert }) => ({
        ...cert,
        image: undefined,
        language: undefined,
        languageId:
          sectionData.language.value === "en-US"
            ? englishLanguageId.id
            : germanLanguageId.id,
        // Assuming we use the same image ID logic for both languages as per original code
        imageId: findImageId(
          images,
          certificationSlug.id,
          sectionData.certifications.flatMap((cert) => {
            if (!cert.image) return []; // Return empty array to "filter out" this item

            const v = Object.values(cert.image);

            if (!cert.key) {
              // If v[0] exists return it in an array, otherwise empty
              return v[0] ? [v[0]] : [];
            }

            const img = cert.image[cert.key];
            return img ? [img] : [];
          }),
          key,
        ),
      })),
    });
    allCertifications.push(...createdCerts);
  }

  console.log(
    `✓ Seeded certifications with ${allCertifications.length} certifications across all languages`,
  );
  return allCertifications;
}

const findImageId = (
  images: SeededImages,
  typeId: number,
  localImages: ImageConfig[],
  key?: string,
): number | undefined => {
  // 1. Find the local image config that matches the provided key
  const localImage = localImages.find((img) => img.key === key);

  if (!localImage) {
    console.warn(`No local image found with key: ${key}`);
    return undefined;
  }

  // 2. Search through the seeded images to find a match
  // We match based on:
  // - The provided typeId (assuming the dictionary keys might contain the typeId)
  // - The src and alt from the local configuration
  const foundImage = images.find((imgData) => {
    // Check if the image belongs to the correct type (if typeId is part of the structure)
    // and matches the visual properties (src/alt)
    return (
      imgData.typeId === typeId &&
      imgData.src === localImage.src &&
      imgData.alt === localImage.alt
    );
  });

  // 3. Return the ID if found, otherwise undefined
  return foundImage ? foundImage.id : undefined;
};

async function seedSection(
  prisma: PrismaClient,
  slugs: SeededSlugs,
  ctas: SeededCTAs,
  images: SeededImages,
) {
  const certifications = await seed(prisma, slugs, ctas, images);
  console.log("Seeding certification sections...");
  const certificationCtaType = slugs.find(
    (slug) => slug.label === "certification",
  );
  if (!certificationCtaType) {
    throw new Error(`Slug not found for label: certification`);
  }

  const englishLanguageId = await prisma.language.findFirstOrThrow({
    where: { value: "en-US" },
    select: { id: true },
  });
  const germanLanguageId = await prisma.language.findFirstOrThrow({
    where: { value: "de-DE" },
    select: { id: true },
  });
  const englishCertifications = certifications.filter(
    (cert) => cert.languageId === englishLanguageId.id,
  );
  const germanCertifications = certifications.filter(
    (cert) => cert.languageId === germanLanguageId.id,
  );

  const createdSections = [];

  for (const sectionData of certificationSectionsData) {
    const languageId =
      sectionData.language.value === "en-US"
        ? englishLanguageId.id
        : germanLanguageId.id;
    const foundCtaId = ctas.find(
      (cta) => cta.typeId === certificationCtaType.id,
    )?.id;

    if (!foundCtaId) {
      throw new Error(`CTA not found for certification`);
    }

    // Filter created certifications to find the ones matching this section's language
    // matching by language.value (e.g., 'en-US' or 'de-DE')
    const matchingCertifications =
      sectionData.language.value === "en-US"
        ? englishCertifications
        : germanCertifications;

    const section = await prisma.certificationSection.create({
      data: {
        ...sectionData,
        languageId,
        language: undefined,
        certifications: {
          connect: matchingCertifications.map((cert) => ({ id: cert.id })),
        },
        ctaId: foundCtaId,
        cta: undefined,
      },
    });
    createdSections.push(section);
    console.log(
      `✓ Seeded certification section (${sectionData.language.value}) with id: ${section.id}`,
    );
  }

  return createdSections;
}

const Certifications = {
  data: certificationSectionsData,
  seed,
  seedSection,
};

export default Certifications;
