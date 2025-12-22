import Images from "./images";
import type { SeededImages } from "./images";
import type { PrismaClient } from "@prisma/client";
import type { SeededSlugs } from "./slugs";
import { CTA, CtaSection, ImageConfig, Slug } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededCTAs = Awaited<ReturnType<typeof seed>>;

// --- CTAs Data ---
const backgrounds: ImageConfig[] = [
  {
    src: "/images/farm-footer.webp",
    alt: "Farm with vehicles blurred",
    width: 1000,
    height: 1000,
  },
  {
    src: "/images/farm-footer.webp",
    alt: "Farm with vehicles",
    width: 1000,
    height: 1000,
  },
];
const ctas: CTA[] = [
  // English CTAs
  {
    label: "Start now",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
    type: "cta",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    label: "Schedule a discovery call",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de", // TODO: add link to calendars
    external: false,
    type: "cta",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    label: "Let’s Talk",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
    type: "certification",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    label: "Contact Us",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de", // TODO: Substack for now, change later
    external: false,
    type: "hero",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    label: "News",
    href: "https://rohitkhanduri.substack.com", // TODO: Substack for now, change later
    external: true,
    type: "hero",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    label: "Get started",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    language: {
      label: "English",
      value: "en-US",
    },
    type: "navigation",
  },
  // German CTAs
  {
    label: "Jetzt starten",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
    type: "cta",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    label: "Termin vereinbaren",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de", // TODO: add link to calendars
    external: false,
    type: "cta",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    label: "Lass uns sprechen",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
    type: "certification",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    label: "Kontakt",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de", // TODO: Substack for now, change later
    external: false,
    type: "hero",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    label: "Aktuelles",
    href: "https://rohitkhanduri.substack.com", // TODO: Substack for now, change later
    external: true,
    type: "hero",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    label: "Los geht's",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    language: {
      label: "German",
      value: "de-DE",
    },
    type: "navigation",
  },
];
// --- Section Data ---
const sectionsData: CtaSection[] = [
  {
    title: "Ready to get started?",
    description:
      "We help you build digital products that your users will love. Let’s talk about your project.",
    language: {
      label: "English",
      value: "en-US",
    },
    ctas: ctas.filter((cta) => cta.language.value === "en-US"),
    backgrounds,
  },
  {
    title: "Bereit loszulegen?",
    description:
      "Wir helfen Ihnen, digitale Produkte zu entwickeln, die Ihre Nutzer lieben werden. Lassen Sie uns über Ihr Projekt sprechen.",
    language: {
      label: "German",
      value: "de-DE",
    },
    ctas: ctas.filter((cta) => cta.language.value === "de-DE"),
    backgrounds,
  },
];

async function seed(
  prisma: PrismaClient,
  slugs: SeededSlugs,
  languages: SeededFooterLanguages,
) {
  const seededCtas = await prisma.cta.createManyAndReturn({
    data: ctas.map((cta) => {
      const typeId = slugs.find((slug) => slug.label === cta.type)?.id;
      if (!typeId) {
        throw new Error(`Type not found for CTA: ${cta.label}`);
      }
      return {
        ...cta,
        language: undefined,
        languageId: languages.find(
          (language) => language.value === cta.language.value,
        )?.id,
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
  languages: SeededFooterLanguages,
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

  const backgroundsToConnect = backgrounds.filter((background) =>
    ctaImageIds.includes(background.id),
  );

  // Map over sectionsData to create multiple sections (en-US, de-DE)
  const sections = await Promise.all(
    sectionsData.map(async (sectionData) => {
      const sectionLang = languages.find(
        (lang) => lang.label === sectionData.language.label,
      );
      // Filter CTAs by Type AND Language
      const foundCtaCTAs = ctas.filter(
        (cta) =>
          cta.typeId === foundCtaSlug.id && cta.languageId === sectionLang?.id,
      );

      if (!foundCtaCTAs.length) {
        console.warn(
          `! No CTA records found for language ${sectionData.language}`,
        );
      }

      return prisma.ctaSection.create({
        data: {
          title: sectionData.title,
          description: sectionData.description,
          background: {
            connect: backgroundsToConnect.map((b) => ({
              id: b.id,
            })),
          },
          ctas: {
            connect: foundCtaCTAs.map((cta) => ({ id: cta.id })),
          },
          // Add missing property here
          language: {
            connect: {
              id: sectionLang?.id,
            },
          },
        },
      });
    }),
  );

  console.log(`✓ Seeded ${sections.length} CTA sections`);
  return sections;
}

const Ctas = {
  data: sectionsData,
  seed,
  seedSection,
};

export default Ctas;
