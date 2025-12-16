import "dotenv/config";
import { PrismaClient } from "@prisma/client";

// --- Feature Type ---
export type Feature = {
  featureId: number;
  title: string;
  description: string;
  longDescription?: string;
  visualization?: "OrbitFeatureVisualization" | "CloudFeatureVisualization" | "ArchitectureFeatureVisualization";
};

export type SeededFeatures = Awaited<ReturnType<typeof seed>>;

// --- Feature data ---
export const features: Feature[] = [
  {
    featureId: 1,
    title: "Software development",
    description:
      "Custom applications tailored to your business needs, from web to mobile.",
    longDescription:
      "Our team specializes in creating custom software solutions that streamline your operations, enhance productivity, and drive growth. Whether you need a web application, mobile app, or cloud-based solution, we have the expertise to deliver results that exceed your expectations.",
    visualization: "OrbitFeatureVisualization",
  },
  {
    featureId: 2,
    title: "Cloud Development",
    description:
      "Seamless cloud migration and scalable solutions leveraging AWS, Azure, or GCP",
    longDescription:
      "Our cloud development services help you migrate to the cloud effortlessly, ensuring your applications are optimized for performance, security, and scalability. We specialize in AWS, Azure, and GCP, providing tailored solutions that meet your unique requirements.",
    visualization: "CloudFeatureVisualization",
  },
  {
    featureId: 3,
    title: "Architecture & Consulting",
    description:
      "Robust system design and technical consulting for future-proof infrastructure.",
    longDescription:
      "Our architecture and consulting services ensure your systems are designed for scalability, reliability, and performance. We work closely with you to understand your business goals and provide tailored solutions that align with your vision.",
    visualization: "ArchitectureFeatureVisualization",
  },
];

const seed = async (prisma: PrismaClient) => {
  const seededFeatures = await prisma.feature.createManyAndReturn({
    data: features,
  });
  console.log(`✓ Seeded ${seededFeatures.length} features`);
  return seededFeatures;
};

const Features = {
  data: features,
  seed,
};

export default Features;
