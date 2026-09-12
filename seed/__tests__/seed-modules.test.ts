import { describe, it, expect, vi, beforeEach } from "vitest";
import { SEED_ORDER, SeedCache } from "../index";
import Slugs from "../components/slugs";
import Images from "../components/images";
import Ctas from "../components/ctas";
import Certifications from "../components/certifications";
import Heroes from "../components/heroes";
import Benefits from "../components/benefits";
import Approaches from "../components/approaches";
import About from "../components/about";
import Analytics from "../components/analytics";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import FAQs from "../components/faqs";
import Features from "../components/features";
import Testimonials from "../components/testimonials";
import Maps from "../components/maps";
import Resume from "../components/resume";
import LegalPages from "../components/legalPages";
import PageContents from "../components/pageContents";

// Mock Prisma client
const createMockPrisma = () => ({
  type: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  language: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  image: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  cta: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  ctaSection: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  hero: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  heroBanner: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  heroBannerAdditional: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  benefit: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  benefitSection: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  approach: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  approachStep: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  about: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  value: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  analytic: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  analyticsStat: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  analyticsSummaryItem: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  navigation: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  navigationLink: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  footer: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  footerSection: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  footerSectionKey: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  faq: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  faqSection: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  feature: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  testimonialBadge: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  testimonialItem: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  testimonialSection: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  map: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  certification: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  certificationSection: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  section: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  pageContent: {
    findMany: vi.fn().mockResolvedValue([]),
    createManyAndReturn: vi.fn().mockResolvedValue([]),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  resume: {
    findFirst: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: 1 }),
    update: vi.fn().mockResolvedValue({ id: 1 }),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  resumeBasicInformation: {
    findFirst: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: 1 }),
    update: vi.fn().mockResolvedValue({ id: 1 }),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  resumeWork: {
    findFirst: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: 1 }),
    update: vi.fn().mockResolvedValue({ id: 1 }),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  resumeVolunteer: {
    findFirst: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: 1 }),
    update: vi.fn().mockResolvedValue({ id: 1 }),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  resumeEducation: {
    findFirst: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: 1 }),
    update: vi.fn().mockResolvedValue({ id: 1 }),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  resumeAward: {
    findFirst: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: 1 }),
    update: vi.fn().mockResolvedValue({ id: 1 }),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  resumePublication: {
    findFirst: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: 1 }),
    update: vi.fn().mockResolvedValue({ id: 1 }),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  resumeSkill: {
    findFirst: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: 1 }),
    update: vi.fn().mockResolvedValue({ id: 1 }),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  resumeLanguage: {
    findFirst: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: 1 }),
    update: vi.fn().mockResolvedValue({ id: 1 }),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  resumeInterest: {
    findFirst: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: 1 }),
    update: vi.fn().mockResolvedValue({ id: 1 }),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  resumeReference: {
    findFirst: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: 1 }),
    update: vi.fn().mockResolvedValue({ id: 1 }),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  resumeProject: {
    findFirst: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: 1 }),
    update: vi.fn().mockResolvedValue({ id: 1 }),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  resumeHighlight: {
    findFirst: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: 1 }),
    update: vi.fn().mockResolvedValue({ id: 1 }),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  resumeLocation: {
    findFirst: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: 1 }),
    update: vi.fn().mockResolvedValue({ id: 1 }),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  resumeProfile: {
    findFirst: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: 1 }),
    update: vi.fn().mockResolvedValue({ id: 1 }),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  resumeCertification: {
    findFirst: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({ id: 1 }),
    update: vi.fn().mockResolvedValue({ id: 1 }),
    deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
  },
  $transaction: vi.fn((fn: Function) => fn(createMockPrisma())),
});

describe("Seed Module Structure", () => {
  it("should have SEED_ORDER with all required components", () => {
    expect(SEED_ORDER).toContain("slugs");
    expect(SEED_ORDER).toContain("languages");
    expect(SEED_ORDER).toContain("images");
    expect(SEED_ORDER).toContain("ctas");
    expect(SEED_ORDER).toContain("certifications");
    expect(SEED_ORDER).toContain("heroes");
    expect(SEED_ORDER).toContain("benefits");
    expect(SEED_ORDER).toContain("approaches");
    expect(SEED_ORDER).toContain("about");
    expect(SEED_ORDER).toContain("analytics");
    expect(SEED_ORDER).toContain("navigation");
    expect(SEED_ORDER).toContain("footer");
    expect(SEED_ORDER).toContain("faqs");
    expect(SEED_ORDER).toContain("features");
    expect(SEED_ORDER).toContain("testimonials");
    expect(SEED_ORDER).toContain("maps");
    expect(SEED_ORDER).toContain("pageContents");
    expect(SEED_ORDER).toContain("resume");
    expect(SEED_ORDER).toContain("legalPages");
  });

  it("should have correct dependency order", () => {
    const slugsIndex = SEED_ORDER.indexOf("slugs");
    const languagesIndex = SEED_ORDER.indexOf("languages");
    const imagesIndex = SEED_ORDER.indexOf("images");
    const ctasIndex = SEED_ORDER.indexOf("ctas");
    const pageContentsIndex = SEED_ORDER.indexOf("pageContents");

    expect(slugsIndex).toBeLessThan(imagesIndex);
    expect(languagesIndex).toBeLessThan(ctasIndex);
    expect(imagesIndex).toBeLessThan(ctasIndex);
    expect(ctasIndex).toBeLessThan(pageContentsIndex);
  });
});

describe("Slugs Module", () => {
  it("should export seed function", () => {
    expect(typeof Slugs.seed).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof Slugs.clear).toBe("function");
  });

  it("should have slug data", () => {
    expect(Array.isArray(Slugs.data)).toBe(true);
    expect(Slugs.data.length).toBeGreaterThan(0);
  });

  it("should contain required slugs", () => {
    expect(Slugs.data).toContain("main");
    expect(Slugs.data).toContain("hero");
    expect(Slugs.data).toContain("navigation");
    expect(Slugs.data).toContain("footer");
    expect(Slugs.data).toContain("resume");
  });

  it("seed should return seeded types", async () => {
    const prisma = createMockPrisma();
    const result = await Slugs.seed(prisma as any);
    expect(Array.isArray(result)).toBe(true);
  });

  it("clear should delete all types", async () => {
    const prisma = createMockPrisma();
    await Slugs.clear(prisma as any);
    expect(prisma.type.deleteMany).toHaveBeenCalledWith({});
  });
});

describe("Images Module", () => {
  it("should export seed function", () => {
    expect(typeof Images.seed).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof Images.clear).toBe("function");
  });

  it("should have image data", () => {
    expect(typeof Images.data).toBe("object");
    expect(Object.keys(Images.data).length).toBeGreaterThan(0);
  });

  it("should have required image keys", () => {
    expect(Images.data).toHaveProperty("certIsaQbAdvanced");
    expect(Images.data).toHaveProperty("navigationPrimary");
    expect(Images.data).toHaveProperty("testimonialField");
    expect(Images.data).toHaveProperty("resumePhoto");
  });

  it("image data should have required fields", () => {
    for (const [key, image] of Object.entries(Images.data)) {
      expect(image).toHaveProperty("src");
      expect(image).toHaveProperty("alt");
      expect(image).toHaveProperty("type");
      expect(typeof image.src).toBe("string");
      expect(typeof image.alt).toBe("string");
    }
  });

  it("clear should delete all images", async () => {
    const prisma = createMockPrisma();
    await Images.clear(prisma as any);
    expect(prisma.image.deleteMany).toHaveBeenCalledWith({});
  });
});

describe("Ctas Module", () => {
  it("should export seed function", () => {
    expect(typeof Ctas.seed).toBe("function");
  });

  it("should export seedSection function", () => {
    expect(typeof Ctas.seedSection).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof Ctas.clear).toBe("function");
  });
});

describe("Certifications Module", () => {
  it("should export seed function", () => {
    expect(typeof Certifications.seed).toBe("function");
  });

  it("should export seedSection function", () => {
    expect(typeof Certifications.seedSection).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof Certifications.clear).toBe("function");
  });
});

describe("Heroes Module", () => {
  it("should export seed function", () => {
    expect(typeof Heroes.seed).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof Heroes.clear).toBe("function");
  });
});

describe("Benefits Module", () => {
  it("should export seed function", () => {
    expect(typeof Benefits.seed).toBe("function");
  });

  it("should export seedSection function", () => {
    expect(typeof Benefits.seedSection).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof Benefits.clear).toBe("function");
  });
});

describe("Approaches Module", () => {
  it("should export seed function", () => {
    expect(typeof Approaches.seed).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof Approaches.clear).toBe("function");
  });
});

describe("About Module", () => {
  it("should export seed function", () => {
    expect(typeof About.seed).toBe("function");
  });

  it("should export seedValues function", () => {
    expect(typeof About.seedValues).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof About.clear).toBe("function");
  });
});

describe("Analytics Module", () => {
  it("should export seed function", () => {
    expect(typeof Analytics.seed).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof Analytics.clear).toBe("function");
  });
});

describe("Navigation Module", () => {
  it("should export seed function", () => {
    expect(typeof Navigation.seed).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof Navigation.clear).toBe("function");
  });
});

describe("Footer Module", () => {
  it("should export seed function", () => {
    expect(typeof Footer.seed).toBe("function");
  });

  it("should export seedLanguages function", () => {
    expect(typeof Footer.seedLanguages).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof Footer.clear).toBe("function");
  });
});

describe("FAQs Module", () => {
  it("should export seed function", () => {
    expect(typeof FAQs.seed).toBe("function");
  });

  it("should export seedSections function", () => {
    expect(typeof FAQs.seedSections).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof FAQs.clear).toBe("function");
  });
});

describe("Features Module", () => {
  it("should export seed function", () => {
    expect(typeof Features.seed).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof Features.clear).toBe("function");
  });
});

describe("Testimonials Module", () => {
  it("should export seedBadges function", () => {
    expect(typeof Testimonials.seedBadges).toBe("function");
  });

  it("should export seedItems function", () => {
    expect(typeof Testimonials.seedItems).toBe("function");
  });

  it("should export seedSections function", () => {
    expect(typeof Testimonials.seedSections).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof Testimonials.clear).toBe("function");
  });

  it("should have testimonial badges data", () => {
    expect(Array.isArray(Testimonials.badges)).toBe(true);
    expect(Testimonials.badges.length).toBeGreaterThan(0);
  });

  it("should have testimonial items data", () => {
    expect(Array.isArray(Testimonials.items)).toBe(true);
    expect(Testimonials.items.length).toBeGreaterThan(0);
  });

  it("should have testimonial sections data", () => {
    expect(Array.isArray(Testimonials.sections)).toBe(true);
    expect(Testimonials.sections.length).toBeGreaterThan(0);
  });
});

describe("Maps Module", () => {
  it("should export seed function", () => {
    expect(typeof Maps.seed).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof Maps.clear).toBe("function");
  });
});

describe("Resume Module", () => {
  it("should export seed function", () => {
    expect(typeof Resume.seed).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof Resume.clear).toBe("function");
  });
});

describe("LegalPages Module", () => {
  it("should export seed function", () => {
    expect(typeof LegalPages.seed).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof LegalPages.clear).toBe("function");
  });
});

describe("PageContents Module", () => {
  it("should export seed function", () => {
    expect(typeof PageContents.seed).toBe("function");
  });

  it("should export clear function", () => {
    expect(typeof PageContents.clear).toBe("function");
  });
});

describe("Seed Data Integrity", () => {
  it("Slugs data should be unique", () => {
    const uniqueSlugs = new Set(Slugs.data);
    expect(uniqueSlugs.size).toBe(Slugs.data.length);
  });

  it("Images data should have valid URLs", () => {
    for (const [key, image] of Object.entries(Images.data)) {
      expect(image.src).toMatch(/^https?:\/\//);
    }
  });

  it("Images should have valid types", () => {
    const validTypes = ["certification", "cta", "navigation", "testimonial", "resume"];
    for (const [key, image] of Object.entries(Images.data)) {
      expect(validTypes).toContain(image.type);
    }
  });
});

describe("Clear Module Integration", () => {
  it("should have clear functions for all components", () => {
    expect(typeof Slugs.clear).toBe("function");
    expect(typeof Images.clear).toBe("function");
    expect(typeof Ctas.clear).toBe("function");
    expect(typeof Certifications.clear).toBe("function");
    expect(typeof Heroes.clear).toBe("function");
    expect(typeof Benefits.clear).toBe("function");
    expect(typeof Approaches.clear).toBe("function");
    expect(typeof About.clear).toBe("function");
    expect(typeof Analytics.clear).toBe("function");
    expect(typeof Navigation.clear).toBe("function");
    expect(typeof Footer.clear).toBe("function");
    expect(typeof FAQs.clear).toBe("function");
    expect(typeof Features.clear).toBe("function");
    expect(typeof Testimonials.clear).toBe("function");
    expect(typeof Maps.clear).toBe("function");
    expect(typeof Resume.clear).toBe("function");
    expect(typeof LegalPages.clear).toBe("function");
    expect(typeof PageContents.clear).toBe("function");
  });
});

describe("Seed Function Signatures", () => {
  it("Slugs.seed should accept prisma client", async () => {
    const prisma = createMockPrisma();
    const result = await Slugs.seed(prisma as any);
    expect(Array.isArray(result)).toBe(true);
  });

  it("Images.seed should accept prisma and slugs", async () => {
    const prisma = createMockPrisma();
    const slugs = [{ id: 1, label: "certification" }, { id: 2, label: "navigation" }];
    const result = await Images.seed(prisma as any, slugs as any);
    expect(Array.isArray(result)).toBe(true);
  });

  it("Footer.seedLanguages should accept prisma", async () => {
    const prisma = createMockPrisma();
    const result = await Footer.seedLanguages(prisma as any);
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Module Exports", () => {
  it("All modules should have default export", () => {
    expect(Slugs).toBeDefined();
    expect(Images).toBeDefined();
    expect(Ctas).toBeDefined();
    expect(Certifications).toBeDefined();
    expect(Heroes).toBeDefined();
    expect(Benefits).toBeDefined();
    expect(Approaches).toBeDefined();
    expect(About).toBeDefined();
    expect(Analytics).toBeDefined();
    expect(Navigation).toBeDefined();
    expect(Footer).toBeDefined();
    expect(FAQs).toBeDefined();
    expect(Features).toBeDefined();
    expect(Testimonials).toBeDefined();
    expect(Maps).toBeDefined();
    expect(Resume).toBeDefined();
    expect(LegalPages).toBeDefined();
    expect(PageContents).toBeDefined();
  });

  it("All modules should have seed and clear functions", () => {
    const modulesWithSeedAndClear = [
      Slugs, Images, Ctas, Certifications, Heroes, Benefits,
      Approaches, About, Analytics, Navigation, Footer, FAQs,
      Features, Maps, Resume, LegalPages, PageContents
    ];

    for (const mod of modulesWithSeedAndClear) {
      expect(typeof mod.seed).toBe("function");
      expect(typeof mod.clear).toBe("function");
    }

    // Testimonials has different seed functions
    expect(typeof Testimonials.seedSections).toBe("function");
    expect(typeof Testimonials.clear).toBe("function");
  });
});
