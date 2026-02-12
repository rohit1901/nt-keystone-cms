import Image from "./images";
import type { SeededCTAs } from "./ctas";
import type { SeededImages } from "./images";
import type { PrismaClient } from "@prisma/client";
import { SeededSlugs } from "./slugs";
import Ctas from "./ctas";
import { CertificationSection, ImageConfig } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededCertifications = Awaited<ReturnType<typeof seed>>;
export type SeededCertificationSections = Awaited<ReturnType<typeof seedSection>>;

// --- Certifications Data ---
const certificationSectionsData: CertificationSection[] = [
  // English (en-US)
  {
    title: "Our Certifications",
    description:
      "Nimbus Tech is certified in AWS and software architecture, ensuring high quality and reliable AWS cloud solutions.",
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
      "Nimbus Tech ist in AWS und Software-Architektur zertifiziert – für hochwertige und verlässliche AWS-Cloud-Lösungen.",
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
  const foundImage = images.find((imgData) => {
    return (
      imgData.typeId === typeId &&
      imgData.src === localImage.src &&
      imgData.alt === localImage.alt
    );
  });

  // 3. Return the ID if found, otherwise undefined
  return foundImage ? foundImage.id : undefined;
};

async function seed(
  prisma: PrismaClient,
  slugs: SeededSlugs,
  images: SeededImages,
  languages: SeededFooterLanguages,
) {
  console.log("Seeding certifications...");
  const certificationSlug = slugs.find(
    (slug) => slug.label === "certification",
  );
  if (!certificationSlug) {
    throw new Error(`Slug not found for label: certification`);
  }

  // Get all existing certifications to check for duplicates
  const existingCertifications = await prisma.certification.findMany({
    select: { id: true, title: true, description: true, languageId: true, imageId: true, link: true },
  });

  // Create unique keys based on title + languageId
  const existingCertificationKeys = new Set(
    existingCertifications.map((cert) => `${cert.title}|${cert.languageId}`)
  );

  // Flatten all certifications from all sections
  const allCertifications = certificationSectionsData.flatMap((sectionData) =>
    sectionData.certifications.map((cert) => ({
      ...cert,
      sectionLanguage: sectionData.language,
    }))
  );

  // Get all local images for finding image IDs
  const localImages = certificationSectionsData.flatMap((section) =>
    section.certifications.flatMap((cert) => {
      if (!cert.image || !cert.key) return [];
      const img = cert.image[cert.key];
      return img ? [img] : [];
    })
  );

  // Filter out certifications that already exist
  const certificationsToCreate = allCertifications
    .map((cert) => {
      const languageId = languages.find(
        (l) => l.value === cert.language.value
      )?.id;

      if (!languageId) {
        console.warn(`! Language not found: ${cert.language.value}`);
        return null;
      }

      const imageId = findImageId(
        images,
        certificationSlug.id,
        localImages,
        cert.key,
      );

      return {
        title: cert.title,
        description: cert.description,
        link: cert.link,
        imageId,
        languageId,
        key: `${cert.title}|${languageId}`,
      };
    })
    .filter((cert): cert is NonNullable<typeof cert> => cert !== null)
    .filter(({ key }) => !existingCertificationKeys.has(key));

  let newCertificationsCount = 0;
  let seededCertifications = [...existingCertifications];

  if (certificationsToCreate.length > 0) {
    const newCertifications = await prisma.certification.createManyAndReturn({
      data: certificationsToCreate.map(({ key, ...data }) => data),
    });
    newCertificationsCount = newCertifications.length;
    seededCertifications = [...existingCertifications, ...newCertifications];
    console.log(`✓ Created ${newCertificationsCount} new certification(s)`);
  } else {
    console.log(`✓ All certifications already exist, skipping creation`);
  }

  console.log(`✓ Total certifications in database: ${seededCertifications.length}`);
  return seededCertifications;
}

async function seedSection(
  prisma: PrismaClient,
  slugs: SeededSlugs,
  ctas: SeededCTAs,
  images: SeededImages,
  languages: SeededFooterLanguages,
) {
  // First seed all certifications
  const allCertifications = await seed(prisma, slugs, images, languages);

  console.log("Seeding certification sections...");
  const certificationCtaType = slugs.find(
    (slug) => slug.label === "certification",
  );
  if (!certificationCtaType) {
    throw new Error(`Slug not found for label: certification`);
  }

  // Get all existing certification sections to check for duplicates
  const existingSections = await prisma.certificationSection.findMany({
    select: { id: true, title: true, languageId: true },
  });

  // Create unique keys based on title + languageId
  const existingSectionKeys = new Set(
    existingSections.map((section) => `${section.title}|${section.languageId}`)
  );

  // Filter out sections that already exist
  const sectionsToCreate = certificationSectionsData.filter((sectionData) => {
    const languageId = languages.find(
      (l) => l.value === sectionData.language.value
    )?.id;
    const key = `${sectionData.title}|${languageId}`;
    return !existingSectionKeys.has(key);
  });

  let newSectionsCount = 0;
  const seededSections = [...existingSections];

  if (sectionsToCreate.length > 0) {
    const newSections = await Promise.all(
      sectionsToCreate.map(async (sectionData) => {
        const languageId = languages.find(
          (l) => l.value === sectionData.language.value
        )?.id;

        if (!languageId) {
          console.warn(`! Language not found: ${sectionData.language.value}`);
          return null;
        }

        const foundCtaId = ctas.find(
          (cta) => cta.typeId === certificationCtaType.id && cta.languageId === languageId,
        )?.id;

        if (!foundCtaId) {
          console.warn(`! CTA not found for certification section (${sectionData.language.value})`);
        }

        // Filter certifications to find the ones matching this section's language
        const matchingCertifications = allCertifications.filter(
          (cert) => cert.languageId === languageId
        );

        const section = await prisma.certificationSection.create({
          data: {
            title: sectionData.title,
            description: sectionData.description,
            languageId,
            certifications: {
              connect: matchingCertifications.map((cert) => ({ id: cert.id })),
            },
            ctaId: foundCtaId,
          },
        });

        console.log(
          `✓ Created certification section (${sectionData.language.value}) with id: ${section.id}`,
        );
        return section;
      })
    );

    const validSections = newSections.filter(
      (section): section is NonNullable<typeof section> => section !== null
    );
    newSectionsCount = validSections.length;
    seededSections.push(...validSections);
  } else {
    console.log(`✓ All certification sections already exist, skipping creation`);
  }

  console.log(`✓ Total certification sections in database: ${seededSections.length}`);
  return seededSections;
}

const clear = async (prisma: PrismaClient) => {
  console.log('Clearing all certification sections...');
  const sectionsResult = await prisma.certificationSection.deleteMany({});
  console.log(`✓ Deleted ${sectionsResult.count} certification section(s)`);

  console.log('Clearing all certifications...');
  const certificationsResult = await prisma.certification.deleteMany({});
  console.log(`✓ Deleted ${certificationsResult.count} certification(s)`);
};

const Certifications = {
  data: certificationSectionsData,
  seed,
  seedSection,
  clear,
};

export default Certifications;
