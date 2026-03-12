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
      "Strategic AWS guidance for small, mid-market, and enterprise businesses – from first cloud-native projects to mature, multi-account environments.",
    longDescription:
      "We help you define a clear AWS strategy, choose the right services, and design a cloud-native architecture that fits your business goals. Together, we create a roadmap based on the AWS Well-Architected Framework and a solid multi-account strategy, so your move to AWS becomes a secure cloud transformation that balances speed, risk, and budget.",
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
      "Securely move existing systems to AWS and modernize step by step as part of a secure cloud transformation – without disrupting your business.",
    longDescription:
      "Whether you are lifting and shifting, re-platforming, or re-architecting, we plan and execute your AWS migration with minimal downtime. We modernize where it adds value – using Infrastructure as Code (IaC), serverless computing, and managed services to reduce operational effort, improve security, and optimize costs over time.",
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
      "Reliable CI/CD pipelines, Infrastructure as Code (IaC), and monitoring tailored to your team and stack, built for secure multi-account AWS environments.",
    longDescription:
      "We set up or improve your deployment pipelines, Infrastructure as Code (Terraform/CDK), and observability so your team can ship changes safely and frequently. You get an automated, cloud-native AWS foundation aligned with the Well-Architected Framework, making secure cloud transformation and ongoing cost optimization part of your daily operations instead of one-off projects.",
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
      "Strategische AWS-Beratung für Unternehmen – von ersten cloud-native Projekten bis hin zu gewachsenen Multi-Account-Umgebungen.",
    longDescription:
      "Wir entwickeln gemeinsam mit Ihnen eine klare AWS-Strategie, wählen passende Services aus und entwerfen eine cloud-native Architektur, die zu Ihren Geschäftsanforderungen passt. Auf Basis des AWS Well-Architected Frameworks und einer soliden Multi-Account-Strategie entsteht so eine sichere Cloud-Transformation, die Geschwindigkeit, Risiko und Budget sinnvoll ausbalanciert.",
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
      "Sichere Migration bestehender Systeme nach AWS und schrittweise Modernisierung im Rahmen einer sicheren Cloud-Transformation – ohne Betriebsunterbrechung.",
    longDescription:
      "Ob Lift-and-Shift, Re-Platforming oder Re-Architektur – wir planen und begleiten Ihre AWS-Migration mit minimaler Downtime. Wir modernisieren dort, wo es echten Mehrwert bringt – mit Infrastructure as Code (IaC), Serverless Computing und Managed Services, um Betriebsaufwand zu reduzieren, Sicherheit zu erhöhen und Kosten langfristig zu optimieren.",
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
      "Zuverlässige CI/CD-Pipelines, Infrastructure as Code (IaC) und Monitoring, abgestimmt auf Ihr Team und Multi-Account-AWS-Umgebungen.",
    longDescription:
      "Wir richten Deployment-Pipelines, Infrastructure as Code (z.B. Terraform/CDK) und Observability ein oder verbessern bestehende Lösungen, damit Ihr Team Änderungen häufiger und sicherer ausrollen kann. Sie erhalten ein automatisiertes, cloud-natives AWS-Fundament, das sich am Well-Architected Framework orientiert – so werden sichere Cloud-Transformation und laufende Kostenoptimierung Teil Ihres Tagesgeschäfts statt einmaliger Projekte.",
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
