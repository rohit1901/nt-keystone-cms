import "dotenv/config";
import { PrismaClient } from "@prisma/client";
// --- Slug Type ---
export type Slug = "certification" | "cta" | "hero" | "testimonial";
export type SeededSlugs = Awaited<ReturnType<typeof seed>>;

// --- Slug data ---
export const slugs: Slug[] = ["certification", "cta", "hero", "testimonial"];

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
