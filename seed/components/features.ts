import { PrismaClient } from "@prisma/client";
import { Feature } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededFeatures = Awaited<ReturnType<typeof seed>>;

// --- Feature data ---
export const features: Feature[] = [
  // English (en-US)
  {
    featureId: 1,
    title: "Software development",
    description:
      "Custom applications tailored to your business needs, from web to mobile.",
    longDescription:
      "Our team specializes in creating custom software solutions that streamline your operations, enhance productivity, and drive growth. Whether you need a web application, mobile app, or cloud-based solution, we have the expertise to deliver results that exceed your expectations.",
    visualization: "OrbitFeatureVisualization",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    featureId: 2,
    title: "Cloud Development",
    description:
      "Seamless cloud migration and scalable solutions leveraging AWS, Azure, or GCP",
    longDescription:
      "Our cloud development services help you migrate to the cloud effortlessly, ensuring your applications are optimized for performance, security, and scalability. We specialize in AWS, Azure, and GCP, providing tailored solutions that meet your unique requirements.",
    visualization: "CloudFeatureVisualization",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    featureId: 3,
    title: "Architecture & Consulting",
    description:
      "Robust system design and technical consulting for future-proof infrastructure.",
    longDescription:
      "Our architecture and consulting services ensure your systems are designed for scalability, reliability, and performance. We work closely with you to understand your business goals and provide tailored solutions that align with your vision.",
    visualization: "ArchitectureFeatureVisualization",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  // German (de-DE)
  {
    featureId: 1,
    title: "Softwareentwicklung",
    description:
      "Maßgeschneiderte Anwendungen für Ihre Geschäftsanforderungen, von Web bis Mobile.",
    longDescription:
      "Unser Team ist darauf spezialisiert, maßgeschneiderte Softwarelösungen zu entwickeln, die Ihre Abläufe optimieren, die Produktivität steigern und das Wachstum vorantreiben. Egal, ob Sie eine Webanwendung, eine mobile App oder eine Cloud-basierte Lösung benötigen – wir verfügen über das Fachwissen, um Ergebnisse zu liefern, die Ihre Erwartungen übertreffen.",
    visualization: "OrbitFeatureVisualization",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    featureId: 2,
    title: "Cloud-Entwicklung",
    description:
      "Nahtlose Cloud-Migration und skalierbare Lösungen mit AWS, Azure oder GCP.",
    longDescription:
      "Unsere Cloud-Entwicklungsdienste helfen Ihnen, mühelos in die Cloud zu migrieren und stellen sicher, dass Ihre Anwendungen auf Leistung, Sicherheit und Skalierbarkeit optimiert sind. Wir sind auf AWS, Azure und GCP spezialisiert und bieten maßgeschneiderte Lösungen, die Ihren individuellen Anforderungen entsprechen.",
    visualization: "CloudFeatureVisualization",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    featureId: 3,
    title: "Architektur & Beratung",
    description:
      "Robustes Systemdesign und technische Beratung für zukunftssichere Infrastrukturen.",
    longDescription:
      "Unsere Architektur- und Beratungsdienste stellen sicher, dass Ihre Systeme auf Skalierbarkeit, Zuverlässigkeit und Leistung ausgelegt sind. Wir arbeiten eng mit Ihnen zusammen, um Ihre Geschäftsziele zu verstehen und maßgeschneiderte Lösungen anzubieten, die Ihrer Vision entsprechen.",
    visualization: "ArchitectureFeatureVisualization",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
];

const seed = async (prisma: PrismaClient, languages: SeededFooterLanguages) => {
  // Using createManyAndReturn to efficiently seed multiple objects in one query
  const seededFeatures = await prisma.feature.createManyAndReturn({
    data: features.map((feature) => ({
      ...feature,
      language: undefined,
      languageId: languages.find(
        (language) => language.value === feature.language.value,
      )?.id,
    })),
    skipDuplicates: true, // Optional: Prevents errors if run multiple times
  });
  console.log(`✓ Seeded ${seededFeatures.length} features`);
  return seededFeatures;
};

const Features = {
  data: features,
  seed,
};

export default Features;
