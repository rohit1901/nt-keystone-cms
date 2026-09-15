import Image from "./images";
import type { SeededCTAs } from "./ctas";
import type { SeededImages } from "./images";
import type { PrismaClient } from "../prisma";
import type { SeededSlugs } from "./slugs";
import Ctas from "./ctas";
import { certificationSectionsData } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededCertifications = Awaited<ReturnType<typeof seed>>;
export type SeededCertificationSections = Awaited<ReturnType<typeof seedSection>>;

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

  const languageIdByValue = new Map(
    languages.map((language) => [language.value, language.id]),
  );
  const seededImageIdByKey = new Map(
    images.map((image) => [
      `${image.typeId}|${image.src}|${image.alt}`,
      image.id,
    ]),
  );
  const localImageByKey = new Map(
    certificationSectionsData.flatMap((section) =>
      section.certifications.flatMap((certification) => {
        if (!certification.image || !certification.key) return [];
        const image = certification.image[certification.key];
        return image ? [[certification.key, image] as const] : [];
      }),
    ),
  );
  const allCertifications = certificationSectionsData.flatMap(
    (section) => section.certifications,
  );
  const resolvedCertifications = allCertifications.map((cert) => {
    const languageId = languageIdByValue.get(cert.language.value);
    if (!languageId) {
      throw new Error(`Language not found: ${cert.language.value}`);
    }

    const localImage = cert.key ? localImageByKey.get(cert.key) : undefined;
    const imageId = localImage
      ? seededImageIdByKey.get(
          `${certificationSlug.id}|${localImage.src}|${localImage.alt}`,
        )
      : undefined;
    if (!imageId) {
      throw new Error(`Certification image not found for key: ${cert.key}`);
    }

    return {
      title: cert.title,
      description: cert.description,
      link: cert.link ?? "",
      imageId,
      languageId,
      key: `${imageId}|${languageId}`,
    };
  });

  const existingCertifications = await prisma.certification.findMany({
    where: {
      OR: resolvedCertifications.map(({ imageId, languageId }) => ({
        imageId,
        languageId,
      })),
    },
    select: {
      id: true,
      title: true,
      description: true,
      link: true,
      imageId: true,
      languageId: true,
    },
  });
  const certificationByKey = new Map(
    existingCertifications.map((certification) => [
      `${certification.imageId}|${certification.languageId}`,
      certification,
    ]),
  );

  const certificationsToUpdate = resolvedCertifications.flatMap((resolved) => {
    const existing = certificationByKey.get(resolved.key);
    return existing &&
      (existing.title !== resolved.title ||
        existing.description !== resolved.description ||
        existing.link !== resolved.link)
      ? [{ existing, resolved }]
      : [];
  });
  const updatedCertifications = await Promise.all(
    certificationsToUpdate.map(({ existing, resolved }) =>
      prisma.certification.update({
        where: { id: existing.id },
        data: {
          title: resolved.title,
          description: resolved.description,
          link: resolved.link,
        },
      }),
    ),
  );
  for (const certification of updatedCertifications) {
    certificationByKey.set(
      `${certification.imageId}|${certification.languageId}`,
      certification,
    );
  }

  const certificationsToCreate = resolvedCertifications.filter(
    ({ key }) => !certificationByKey.has(key),
  );
  if (certificationsToCreate.length > 0) {
    const newCertifications = await prisma.certification.createManyAndReturn({
      data: certificationsToCreate.map(({ key, ...data }) => data),
    });
    for (const certification of newCertifications) {
      certificationByKey.set(
        `${certification.imageId}|${certification.languageId}`,
        certification,
      );
    }
    console.log(`✓ Created ${newCertifications.length} new certification(s)`);
  } else {
    console.log(`✓ All certifications already exist, skipping creation`);
  }
  if (updatedCertifications.length > 0) {
    console.log(`✓ Updated ${updatedCertifications.length} certification(s)`);
  }

  const seededCertifications = resolvedCertifications.map(({ key }) => {
    const certification = certificationByKey.get(key);
    if (!certification) {
      throw new Error(`Failed to reconcile certification seed key: ${key}`);
    }
    return certification;
  });
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

  const languageIdByValue = new Map(
    languages.map((language) => [language.value, language.id]),
  );
  const sectionKeys = certificationSectionsData.flatMap((section) => {
    const languageId = languageIdByValue.get(section.language.value);
    return languageId ? [{ title: section.title, languageId }] : [];
  });

  // Get only existing certification sections matching known seed keys.
  const existingSections = await prisma.certificationSection.findMany({
    where: { OR: sectionKeys },
    select: { id: true, title: true, languageId: true },
  });

  // Create unique keys based on title + languageId
  const existingSectionKeys = new Set(
    existingSections.map((section) => `${section.title}|${section.languageId}`)
  );

  // Filter out sections that already exist
  const sectionsToCreate = certificationSectionsData.filter((sectionData) => {
    const languageId = languageIdByValue.get(sectionData.language.value);
    const key = `${sectionData.title}|${languageId}`;
    return !existingSectionKeys.has(key);
  });

  const ctaIdByLanguageId = new Map(
    ctas
      .filter((cta) => cta.typeId === certificationCtaType.id)
      .map((cta) => [cta.languageId, cta.id]),
  );
  const certificationsByLanguageId = new Map<number | null, { id: number }[]>();
  for (const certification of allCertifications) {
    const matching =
      certificationsByLanguageId.get(certification.languageId) ?? [];
    matching.push(certification);
    certificationsByLanguageId.set(certification.languageId, matching);
  }

  const seededSections = [...existingSections];

  if (sectionsToCreate.length > 0) {
    const newSections = await Promise.all(
      sectionsToCreate.map(async (sectionData) => {
        const languageId = languageIdByValue.get(
          sectionData.language.value,
        );

        if (!languageId) {
          console.warn(`! Language not found: ${sectionData.language.value}`);
          return null;
        }

        const foundCtaId = ctaIdByLanguageId.get(languageId);

        if (!foundCtaId) {
          console.warn(`! CTA not found for certification section (${sectionData.language.value})`);
        }

        const matchingCertifications =
          certificationsByLanguageId.get(languageId) ?? [];

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
