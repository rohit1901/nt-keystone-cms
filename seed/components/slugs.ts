import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Slug } from "../../data";

export type SeededSlugs = Awaited<ReturnType<typeof seed>>;

// --- Slug data ---
export const slugs: Slug[] = [
  "main",
  "certification",
  "cta",
  "hero",
  "navigation",
  "testimonial",
  "footer",
];

const seed = async (prisma: PrismaClient) => {
  const certificationSlugs = await prisma.type.createManyAndReturn({
    data: slugs.map((slug) => ({ label: slug })),
  });
  console.log(`✓ Seeded slugs with labels: ${slugs.join(", ")}`);
  return certificationSlugs;
};

const Slugs = {
  data: slugs,
  seed,
};

export default Slugs;
