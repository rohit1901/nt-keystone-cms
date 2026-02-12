import { PrismaClient } from "@prisma/client";
import { Feature } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededFeatures = Awaited<ReturnType<typeof seed>>;

// --- Feature data ---
export const features: Feature[] = [
  // English (en-US)
  {
    featureId: 1,
    title: "AWS Cloud Consulting",
    description:
      "Strategic AWS guidance for SMEs and startups – from first cloud projects to mature environments.",
    longDescription:
      "We help you define a clear AWS strategy, choose the right services, and design an architecture that fits your business goals. Together, we create a roadmap that balances speed, risk, and budget so you can grow safely in the cloud.",
    visualization: "ArchitectureFeatureVisualization",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    featureId: 2,
    title: "AWS Migration & Modernization",
    description:
      "Securely move existing systems to AWS and modernize step by step without disrupting your business.",
    longDescription:
      "Whether you are lifting and shifting, re-platforming, or re-architecting, we plan and execute your AWS migration with minimal downtime. We modernize where it adds value – using containers, serverless, and managed services to reduce operational effort and costs.",
    visualization: "CloudFeatureVisualization",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    featureId: 3,
    title: "DevOps & Automation on AWS",
    description:
      "Reliable CI/CD pipelines, infrastructure as code, and monitoring tailored to your team and stack.",
    longDescription:
      "We set up or improve your deployment pipelines, infrastructure as code (Terraform/CDK), and observability so your team can ship changes safely and frequently. You get an automated AWS foundation that supports your product instead of slowing it down.",
    visualization: "CloudFeatureVisualization",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  // German (de-DE)
  {
    featureId: 1,
    title: "AWS-Cloud-Beratung",
    description:
      "Strategische AWS-Beratung für KMU und Start-ups – von den ersten Cloud-Schritten bis zu gewachsenen Umgebungen.",
    longDescription:
      "Wir entwickeln gemeinsam mit Ihnen eine klare AWS-Strategie, wählen passende Services aus und entwerfen eine Architektur, die zu Ihren Geschäftsanforderungen passt. So entsteht eine Roadmap, die Geschwindigkeit, Risiko und Budget sinnvoll ausbalanciert.",
    visualization: "OrbitFeatureVisualization",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    featureId: 2,
    title: "AWS-Migration & Modernisierung",
    description:
      "Sichere Migration bestehender Systeme nach AWS und schrittweise Modernisierung ohne Betriebsunterbrechung.",
    longDescription:
      "Ob Lift-and-Shift, Re-Platforming oder Re-Architektur – wir planen und begleiten Ihre AWS-Migration mit minimaler Downtime. Wir modernisieren dort, wo es echten Mehrwert bringt, etwa mit Containern, Serverless und Managed Services.",
    visualization: "CloudFeatureVisualization",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    featureId: 3,
    title: "DevOps & Automatisierung auf AWS",
    description:
      "Zuverlässige CI/CD-Pipelines, Infrastructure as Code und Monitoring, abgestimmt auf Ihr Team.",
    longDescription:
      "Wir richten Deployment-Pipelines, Infrastructure as Code (z.B. Terraform/CDK) und Observability ein oder verbessern bestehende Lösungen. So kann Ihr Team Änderungen häufiger und sicherer ausrollen.",
    visualization: "ArchitectureFeatureVisualization",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
];

const seed = async (prisma: PrismaClient, languages: SeededFooterLanguages) => {
  // Get all existing features to check for duplicates
  const existingFeatures = await prisma.feature.findMany({
    select: { id: true, featureId: true, title: true, languageId: true },
  });

  // Create unique keys based on featureId + languageId
  const existingFeatureKeys = new Set(
    existingFeatures.map((feature) => `${feature.featureId}|${feature.languageId}`)
  );

  // Filter out features that already exist
  const featuresToCreate = features
    .map((feature) => {
      const languageId = languages.find(
        (language) => language.value === feature.language.value,
      )?.id;

      if (!languageId) {
        console.warn(`! Language not found: ${feature.language.value}`);
        return null;
      }

      return {
        featureId: feature.featureId,
        title: feature.title,
        description: feature.description,
        longDescription: feature.longDescription,
        visualization: feature.visualization,
        languageId,
        key: `${feature.featureId}|${languageId}`,
      };
    })
    .filter((feature): feature is NonNullable<typeof feature> => feature !== null)
    .filter(({ key }) => !existingFeatureKeys.has(key));

  let newFeaturesCount = 0;
  let seededFeatures = [...existingFeatures];

  if (featuresToCreate.length > 0) {
    const newFeatures = await prisma.feature.createManyAndReturn({
      data: featuresToCreate.map(({ key, ...data }) => data),
    });
    newFeaturesCount = newFeatures.length;
    seededFeatures = [...existingFeatures, ...newFeatures];
    console.log(`✓ Created ${newFeaturesCount} new feature(s)`);
  } else {
    console.log(`✓ All features already exist, skipping creation`);
  }

  console.log(`✓ Total features in database: ${seededFeatures.length}`);
  return seededFeatures;
};

const clear = async (prisma: PrismaClient) => {
  console.log('Clearing all features...');
  const result = await prisma.feature.deleteMany({});
  console.log(`✓ Deleted ${result.count} feature(s)`);
};

const Features = {
  data: features,
  seed,
  clear,
};

export default Features;
