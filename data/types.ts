import { Maybe } from "../seed/types";
import { remixIconMap } from "./icons/remixicon-map";
// --- Image Types ---
export type ImageConfig = {
  src: string;
  alt: string;
  width?: Maybe<number>;
  height?: Maybe<number>;
  fill?: Maybe<boolean>;
  type?: Maybe<Slug>;
  key?: CertificationImageKey;
};
// --- Slug Type ---
export type Slug =
  | "main"
  | "certification"
  | "cta"
  | "hero"
  | "navigation"
  | "testimonial"
  | "footer";

export type PageContent = {
  title: string;
  description?: string;
  image?: ImageConfig;
  cta?: CTA;
};

// --- Types ---
export type MapSection = {
  title: string;
  description: string;
  subheading: string;
  language: Language;
};

// --- FAQ Type ---
export type FAQ = {
  question: string;
  answer: string;
  language: Language;
};

export type FaqSection = {
  title: string;
  description: string;
  faqs: FAQ[];
  language: Language;
};

export type CtaImageKeys = "ctaForeground";
export type CTA = {
  label: string;
  href: string;
  external?: boolean;
  type: Slug;
  language: Language;
};

export type CtaSection = {
  title: string;
  description: string;
  backgrounds: ImageConfig[];
  ctas: CTA[];
  language: Language;
};

export type Language = {
  label: "English" | "German";
  value: "de-DE" | "en-US";
};

export type PageContentWithSubHeading = CompositePageContent<
  "subheading",
  string
>;

// --- Certification Types ---
export type CertificationImageKey =
  | "certIsaQbAdvanced"
  | "certIsaQbFoundation"
  | "certApolloProfessional"
  | "certApolloAssociate"
  | "certGitKraken"
  | "certAwsDeveloper"
  | "certAwsSap";

export type Certification = {
  title: string;
  description: string;
  image: Partial<Record<CertificationImageKey, ImageConfig>>;
  link?: string; // Optional link for certifications that have a URL
  language: Language;
  key?: CertificationImageKey;
};

export type CertificationSection = {
  title: string;
  certifications: Certification[];
  language: Language;
  description: string;
  cta?: CTA;
};

export type HeroType = {
  title: string;
  description?: string;
  image?: ImageConfig;
  cta?: CTA;
  language: { label: string; value: string };
  hero: {
    banner: {
      icon?: keyof typeof remixIconMap;
      additional?: {
        icon: keyof typeof remixIconMap;
        text: string;
      };
    } & Omit<CTA, "type" | "language">;
    subHeading: string;
  };
};

export type FeatureVisualization =
  | "OrbitFeatureVisualization"
  | "CloudFeatureVisualization"
  | "ArchitectureFeatureVisualization";

export type Feature = {
  featureId: number;
  title: string;
  description: string;
  longDescription?: string;
  visualization?: FeatureVisualization;
  language: Language;
};

export type BenefitSection = {
  title: string;
  benefits: Benefit[];
  language: Language;
};
export type Benefit = {
  icon: keyof typeof remixIconMap;
  title: string;
  description: string;
  language: Language;
};

// --- Testimonial Types ---
export type TestimonialBadge = {
  icon: string;
  label: string;
  language: Language;
};

export type TestimonialItem = {
  rating?: number;
  badge?: TestimonialBadge;
  name: string;
  role: string;
  company: string;
  content: string;
  imageKey?: string;
  language: Language;
};

export type TestimonialSection = {
  title: string;
  backgroundImageKeys: string[];
  fallbackIndex: number;
  language: Language;
};

export type NavigationSection = {
  title: string;
  description: string;
  image: ImageConfig;
  cta: CTA;
  items: NavigationSectionItem[];
  language: Language;
};

export type NavigationSectionItem = {
  icon?: keyof typeof remixIconMap;
  sectionKey?: FooterSectionKey;
} & CTA;

// Type for a single footer section (e.g., Services, Company)
export type FooterSection = {
  title: FooterSectionKey;
  items: NavigationSectionItem[];
  language?: Language;
};

// Type for the overall sections object
export type FooterSectionKey = "services" | "company" | "resources" | "social";

export type FooterSectionKeys = {
  label: FooterSectionKey;
  value: FooterSectionKey;
};

export type FooterSections = Record<FooterSectionKey, FooterSection>;

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
  language: Language;
};
export type ApproachData = {
  title: string;
  description: string;
  steps: ApproachStep[];
  language: Language;
};

// Type for a single project summary row
export type AnalyticsSummaryItem = {
  name: string;
  deployments: string;
  uptime: string;
  clientSatisfaction: string;
  efficiency: string;
  revenueGrowth: string;
  bgColor: string;
  changeType: "positive" | "negative";
  language: Language;
};

// Type for the stats section above the table
export type AnalyticsStats = {
  totalDeployments: string;
  deploymentChange: string;
  deploymentChangePercent: string;
  changePeriod: string;
  language: Language;
};

// Type for the overall analytics data object
export type AnalyticsData = {
  heading: string;
  subheading: string;
  stats: AnalyticsStats;
  tableHeadings: string[];
  summary: AnalyticsSummaryItem[];
  language: Language;
};

export type Value = {
  label: string;
  description: string;
  icon: keyof typeof remixIconMap;
};

export type AboutSection = {
  heading: string;
  intro: string;
  valuesTitle: string;
  values: Value[];
  closing: string;
  language: Language;
};

// --- Generic Composite Helper (single extra section) ---

export type CompositePageContent<
  ExtraKey extends string,
  ExtraType,
> = PageContent & {
  [K in ExtraKey]: ExtraType;
};

// Usage:
/*
type PageWithBenefits = CompositePageContent<'benefits', Benefit[]>;
type PageWithFaq = CompositePageContent<'faq', FaqItem[]>;
*/

// --- Generic Composite Helper (multiple extra sections) ---
export type CompositePageContentWithExtras<
  Extras extends Record<string, unknown>,
> = PageContent & Extras;

// Usage:
/*
type PageWithBenefitsAndFaq = CompositePageContentWithExtras<{
  benefits: Benefit[];
  faq: FaqItem[];
}>;
*/

// --- Helper with Lowercase Key ---

export type CompositePageContentLC<
  ExtraKey extends string,
  ExtraType,
> = PageContent & {
  [K in Lowercase<ExtraKey>]: ExtraType;
};

// Usage:
// type PageWithBenefitsLC = CompositePageContentLC<'Benefits', Benefit[]>;

// --- Composite with Mapping Table (for pluralization, etc.) ---

type KeyMap = {
  Benefit: "benefits";
  FaqItem: "faq";
  // Add more as needed
};

export type CompositePageContentWithMap<
  T,
  K extends keyof KeyMap,
> = PageContent & {
  [P in KeyMap[K]]: T;
};

// Usage:
/*
type PageWithBenefitsMapped = CompositePageContentWithMap<Benefit[], 'Benefit'>;
type PageWithFaqMapped = CompositePageContentWithMap<FaqItem[], 'FaqItem'>;
 */

// --- Example Usage ---

/*
const example: PageWithBenefitsAndFaq = {
  title: "Welcome",
  benefits: [
    { icon: "icon1", title: "Fast", description: "Very fast" }
  ],
  faq: [
    { question: "How?", answer: "Like this." }
  ]
};
*/

// Prisma Types
export type PrismaType<T, U = {}> = T & { id: number } & U;
