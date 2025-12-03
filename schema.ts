import { list, ListConfig } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  text,
  relationship,
  select,
  integer,
  checkbox,
  password,
  timestamp,
  multiselect,
  float,
} from "@keystone-6/core/fields";
import { ImageProps } from "next/image";

// --- TypeScript Type Definitions ---

export type PageContent = {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  cta?: CTA;
};

export type CTA = {
  label: string;
  href: string;
  external?: boolean;
};

export type Language = {
  label: "English" | "German";
  value: "de-DE" | "en-US";
};

export type PageContentWithSubHeading = CompositePageContent<
  "subheading",
  string
>;

export type Certification = {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
  width: number;
  height: number;
};

export type HeroType = {
  banner: {
    icon?: string;
    additional?: {
      icon: string;
      text: string;
    };
  } & CTA;
  subHeading: string;
};

export type FeatureVisualization =
  | "OrbitFeatureVisualization"
  | "CloudFeatureVisualization"
  | "ArchitectureFeatureVisualization";

export type Benefit = {
  icon: string;
  title: string;
  description: string;
};

export type Testimonial = {
  rating?: number;
  badge?: {
    icon: string;
    label: string;
  };
  name: string;
  role: string;
  company: string;
  image?: ImageProps;
  content: string;
};

export type NavigationSectionItem = {
  icon?: string;
} & CTA;

export type FooterSection = {
  title: string;
  items: NavigationSectionItem[];
};

export type FooterSections = {
  [key: string]: FooterSection;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ApproachStep = {
  id: number;
  type: "done" | "in progress" | "open";
  title: string;
  description: string;
  activityTime: string;
};

export type OurApproachContent = {
  title: string;
  description: string;
  steps: ApproachStep[];
};

export type AnalyticsSummaryItem = {
  name: string;
  deployments: string;
  uptime: string;
  clientSatisfaction: string;
  efficiency: string;
  revenueGrowth: string;
  bgColor: string;
  changeType: "positive" | "negative";
};

export type AnalyticsStats = {
  totalDeployments: string;
  deploymentChange: string;
  deploymentChangePercent: string;
  changePeriod: string;
};

export type AnalyticsData = {
  heading: string;
  subheading: string;
  stats: AnalyticsStats;
  tableHeadings: string[];
  summary: AnalyticsSummaryItem[];
};

// --- Generic Composite Helper Types ---

export type CompositePageContent<
  ExtraKey extends string,
  ExtraType,
> = PageContent & {
  [K in ExtraKey]: ExtraType;
};

export type CompositePageContentWithExtras<
  Extras extends Record<string, unknown>,
> = PageContent & Extras;

export type CompositePageContentLC<
  ExtraKey extends string,
  ExtraType,
> = PageContent & {
  [K in Lowercase<ExtraKey>]: ExtraType;
};

type KeyMap = {
  Benefit: "benefits";
  FaqItem: "faq";
};

export type CompositePageContentWithMap<
  T,
  K extends keyof KeyMap,
> = PageContent & {
  [P in KeyMap[K]]: T;
};

// --- Keystone CMS Lists ---

export const lists: Record<string, ListConfig<any>> = {
  // --- REQUIRED: User List for Authentication ---
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
      }),
      password: password({ validation: { isRequired: true } }),
      createdAt: timestamp({
        defaultValue: { kind: "now" },
      }),
    },
  }),

  // --- Core Content Types ---

  // CTA: Call-to-action links
  Cta: list({
    access: allowAll,
    fields: {
      label: text({ validation: { isRequired: true } }),
      href: text({ validation: { isRequired: true } }),
      external: checkbox({ defaultValue: false }),
    },
  }),

  // Image: Image metadata and configuration
  Image: list({
    access: allowAll,
    fields: {
      src: text({ validation: { isRequired: true } }),
      alt: text({ validation: { isRequired: true } }),
      width: integer(),
      height: integer(),
      fill: checkbox({ defaultValue: false }),
      className: text(),
    },
  }),

  // Background: Background configuration with images
  Background: list({
    access: allowAll,
    fields: {
      image: relationship({ ref: "Image", many: false }),
      outerClassName: text(),
    },
  }),

  // Language: Language selector options
  Language: list({
    access: allowAll,
    fields: {
      label: select({
        options: [
          { label: "English", value: "English" },
          { label: "German", value: "German" },
        ],
        validation: { isRequired: true },
      }),
      value: select({
        options: [
          { label: "en-US", value: "en-US" },
          { label: "de-DE", value: "de-DE" },
        ],
        validation: { isRequired: true },
      }),
    },
  }),

  // --- Testimonial Related ---

  // TestimonialBadge: Badge displayed on testimonials
  TestimonialBadge: list({
    access: allowAll,
    fields: {
      icon: text(),
      label: text(),
    },
  }),

  // TestimonialItem: Individual testimonial
  TestimonialItem: list({
    access: allowAll,
    fields: {
      rating: float(),
      badge: relationship({ ref: "TestimonialBadge", many: false }),
      name: text({ validation: { isRequired: true } }),
      role: text({ validation: { isRequired: true } }),
      company: text({ validation: { isRequired: true } }),
      image: relationship({ ref: "Image", many: false }),
      content: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
      }),
    },
  }),

  // TestimonialSection: Testimonial section with background and fallback
  TestimonialSection: list({
    access: allowAll,
    fields: {
      title: text(),
      background: relationship({ ref: "Background", many: true }),
      testimonials: relationship({ ref: "TestimonialItem", many: true }),
      fallback: relationship({ ref: "TestimonialItem", many: false }),
    },
  }),

  // --- Hero Related ---

  // HeroBannerAdditional: Additional content for hero banner
  HeroBannerAdditional: list({
    access: allowAll,
    fields: {
      icon: text(),
      text: text({ validation: { isRequired: true } }),
    },
  }),

  // HeroBanner: Hero banner configuration
  HeroBanner: list({
    access: allowAll,
    fields: {
      label: text({ validation: { isRequired: true } }),
      href: text({ validation: { isRequired: true } }),
      external: checkbox({ defaultValue: false }),
      icon: text(),
      additional: relationship({ ref: "HeroBannerAdditional", many: false }),
    },
  }),

  // Hero: Complete hero section
  Hero: list({
    access: allowAll,
    fields: {
      subHeading: text({ validation: { isRequired: true } }),
      banner: relationship({ ref: "HeroBanner", many: false }),
    },
  }),

  // --- Benefit ---

  // Benefit: Feature or benefit item
  Benefit: list({
    access: allowAll,
    fields: {
      icon: text({ validation: { isRequired: true } }),
      title: text({ validation: { isRequired: true } }),
      description: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
      }),
    },
  }),

  // BenefitSection: Collection of benefits with title
  BenefitSection: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      benefits: relationship({ ref: "Benefit", many: true }),
    },
  }),

  // --- FAQ ---

  // Faq: Frequently asked question item
  Faq: list({
    access: allowAll,
    fields: {
      question: text({ validation: { isRequired: true } }),
      answer: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
      }),
    },
  }),

  // --- Certification ---

  // Certification: Certification or credential
  Certification: list({
    access: allowAll,
    fields: {
      certId: integer({ validation: { isRequired: true } }),
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
      image: text({ validation: { isRequired: true } }),
      link: text(),
      width: integer({ validation: { isRequired: true } }),
      height: integer({ validation: { isRequired: true } }),
    },
  }),

  // CertificationSection: Collection of certifications
  CertificationSection: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
      cta: relationship({ ref: "Cta", many: false }),
      certifications: relationship({ ref: "Certification", many: true }),
    },
  }),

  // --- Feature ---

  // Feature: Product or service feature
  Feature: list({
    access: allowAll,
    fields: {
      featureId: integer({ validation: { isRequired: true } }),
      title: text({ validation: { isRequired: true } }),
      description: text({ validation: { isRequired: true } }),
      longDescription: text({ ui: { displayMode: "textarea" } }),
      visualization: select({
        options: [
          { label: "Orbit", value: "OrbitFeatureVisualization" },
          { label: "Cloud", value: "CloudFeatureVisualization" },
          { label: "Architecture", value: "ArchitectureFeatureVisualization" },
        ],
      }),
    },
  }),

  // --- Approach ---

  // ApproachStep: Individual step in approach/process
  ApproachStep: list({
    access: allowAll,
    fields: {
      stepId: integer({ validation: { isRequired: true } }),
      type: select({
        options: [
          { label: "Done", value: "done" },
          { label: "In Progress", value: "in progress" },
          { label: "Open", value: "open" },
        ],
        validation: { isRequired: true },
      }),
      title: text({ validation: { isRequired: true } }),
      description: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
      }),
      activityTime: text({ validation: { isRequired: true } }),
    },
  }),

  // Approach: Complete approach/process section
  Approach: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
      }),
      steps: relationship({ ref: "ApproachStep", many: true }),
    },
  }),

  // --- Navigation ---

  // NavigationLink: Navigation menu item
  NavigationLink: list({
    access: allowAll,
    fields: {
      label: text({ validation: { isRequired: true } }),
      href: text({ validation: { isRequired: true } }),
      external: checkbox({ defaultValue: false }),
      icon: text(),
    },
  }),

  // Navigation: Navigation section
  Navigation: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
      image: text(),
      imageAlt: text(),
      cta: relationship({ ref: "Cta", many: false }),
      items: relationship({ ref: "NavigationLink", many: true }),
    },
  }),

  // --- Footer ---

  // FooterSection: Section in footer (e.g., Services, Company)
  FooterSection: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      items: relationship({ ref: "NavigationLink", many: true }),
    },
  }),

  // Footer: Complete footer configuration
  Footer: list({
    access: allowAll,
    fields: {
      title: text(),
      sections: relationship({ ref: "FooterSection", many: true }),
      languages: relationship({
        ref: "Language",
        many: true,
        ui: {
          displayMode: "select",
          labelField: "label",
        },
      }),
    },
  }),

  // --- Analytics ---

  // AnalyticsStat: Analytics statistics summary
  AnalyticsStat: list({
    access: allowAll,
    fields: {
      totalDeployments: text({ validation: { isRequired: true } }),
      deploymentChange: text({ validation: { isRequired: true } }),
      deploymentChangePercent: text({ validation: { isRequired: true } }),
      changePeriod: text({ validation: { isRequired: true } }),
    },
  }),

  // AnalyticsSummaryItem: Individual analytics summary row
  AnalyticsSummaryItem: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      deployments: text({ validation: { isRequired: true } }),
      uptime: text({ validation: { isRequired: true } }),
      clientSatisfaction: text({ validation: { isRequired: true } }),
      efficiency: text({ validation: { isRequired: true } }),
      revenueGrowth: text({ validation: { isRequired: true } }),
      bgColor: text(),
      changeType: select({
        options: [
          { label: "Positive", value: "positive" },
          { label: "Negative", value: "negative" },
        ],
        validation: { isRequired: true },
      }),
    },
  }),

  // Analytic: Complete analytics section
  Analytic: list({
    access: allowAll,
    fields: {
      heading: text({ validation: { isRequired: true } }),
      subheading: text({ validation: { isRequired: true } }),
      stats: relationship({ ref: "AnalyticsStat", many: false }),
      tableHeadings: multiselect({
        options: [
          { label: "Project", value: "project" },
          { label: "Deployments", value: "deployments" },
          { label: "Uptime", value: "uptime" },
          { label: "Client Sat.", value: "clientSatisfaction" },
          { label: "Efficiency", value: "efficiency" },
          { label: "Revenue Growth", value: "revenueGrowth" },
        ],
      }),
      summary: relationship({ ref: "AnalyticsSummaryItem", many: true }),
    },
  }),

  // --- About ---

  // Value: Company value item
  Value: list({
    access: allowAll,
    fields: {
      label: text({ validation: { isRequired: true } }),
      description: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
      }),
      icon: text({ validation: { isRequired: true } }),
    },
  }),

  // About: About us section
  About: list({
    access: allowAll,
    fields: {
      heading: text({ validation: { isRequired: true } }),
      intro: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
      }),
      valuesTitle: text({ validation: { isRequired: true } }),
      values: relationship({ ref: "Value", many: true }),
      closing: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
      }),
    },
  }),

  // --- Map ---

  // Map: Map section
  Map: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      subheading: text({ validation: { isRequired: true } }),
      description: text({
        ui: { displayMode: "textarea" },
        validation: { isRequired: true },
      }),
    },
  }),

  // --- CTA Section ---

  // CtaSection: Call-to-action section with background
  CtaSection: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
      ctas: relationship({ ref: "Cta", many: true }),
      background: relationship({ ref: "Background", many: true }),
    },
  }),

  // --- Page Structure ---

  // Section: Dynamic section for page composition
  Section: list({
    access: allowAll,
    fields: {
      type: select({
        options: [
          { label: "Hero", value: "hero" },
          { label: "Benefits", value: "benefits" },
          { label: "Features", value: "features" },
          { label: "FAQ", value: "faq" },
          { label: "Testimonials", value: "testimonials" },
          { label: "Certifications", value: "certifications" },
          { label: "Approach", value: "approach" },
          { label: "About", value: "about" },
          { label: "Analytics", value: "analytics" },
          { label: "Navigation", value: "navigation" },
          { label: "Footer", value: "footer" },
          { label: "CTA", value: "cta" },
          { label: "Map", value: "map" },
        ],
        validation: { isRequired: true },
      }),
      // Content references based on section type
      contentHero: relationship({ ref: "Hero", many: false }),
      contentBenefits: relationship({ ref: "BenefitSection", many: false }),
      contentFeatures: relationship({ ref: "Feature", many: true }),
      contentFaqs: relationship({ ref: "Faq", many: true }),
      contentTestimonials: relationship({
        ref: "TestimonialSection",
        many: false,
      }),
      contentCertifications: relationship({
        ref: "CertificationSection",
        many: false,
      }),
      contentApproach: relationship({ ref: "Approach", many: false }),
      contentAbout: relationship({ ref: "About", many: false }),
      contentAnalytics: relationship({ ref: "Analytic", many: false }),
      contentNavigation: relationship({ ref: "Navigation", many: false }),
      contentFooter: relationship({ ref: "Footer", many: false }),
      contentCta: relationship({ ref: "CtaSection", many: false }),
      contentMap: relationship({ ref: "Map", many: false }),
    },
  }),

  // PageContent: Complete page configuration
  PageContent: list({
    access: allowAll,
    fields: {
      slug: text({
        validation: { isRequired: true },
        isIndexed: "unique",
      }),
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
      image: text(),
      imageAlt: text(),
      cta: relationship({ ref: "Cta", many: false }),
      sections: relationship({ ref: "Section", many: true }),
    },
  }),
};
