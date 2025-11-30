// Type Definitions
export type IdentifierSlug = {
  slug: "main";
};

export type CTA = {
  label: string;
  href: string;
  external?: boolean;
};

export type Benefit = {
  icon: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Certification = {
  title: string;
  description: string;
  image?: Image;
  link?: string;
};

// Section Subtypes

export type TestimonialItem = {
  badge: { icon: string; label: string };
  name: string;
  role: string;
  company: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  };
  content: string;
};

export type Image = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
};

export type Testimonial = {
  background: {
    image: Image;
    outerClassName: string;
  }[];
  testimonials?: TestimonialItem[];
  fallback: TestimonialItem;
};

export type FeatureSection = {
  fid: string;
  title: string;
  description: string;
  longDescription: string;
  visualization: string;
};

export type CTASection = {
  background: {
    image: Image;
    outerClassName?: string;
  }[];
  ctas: CTA[];
};

export type FooterSection = { title: string; items: NavigationSectionItem[] };
export type FooterSectionContent = {
  sections: FooterSection[];
  languages: Language[];
};

export type NavigationSectionItem = {
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
};

export type HeroSection = {
  subHeading: string;
  banner: {
    label: string;
    href: string;
    external?: boolean;
    additional?: { icon: string; text: string };
  };
};

export type ApproachSection = {
  title: string;
  description: string;
  steps: ApproachStep[];
};

export type ApproachStep = {
  aid: number;
  type: "done" | "in progress" | "open";
  title: string;
  description: string;
  activityTime: string;
};

export type AboutSection = {
  heading: string;
  intro: string;
  valuesTitle: string;
  values: Array<{
    label: string;
    description: string;
    icon: string;
  }>;
  closing: string;
};

export type Language = {
  label: "English" | "German";
  value: "en-US" | "de-DE";
};

export type MapSection = {
  title: string;
  subheading: string;
  description: string;
};

// Add analytics section type
export type AnalyticsSection = {
  heading: string;
  subheading: string;
  stats: AnalyticsStats;
  tableHeadings: string[];
  summary: AnalyticsSummaryItem[];
};

export type AnalyticsStats = {
  totalDeployments: string;
  deploymentChange: string;
  deploymentChangePercent: string;
  changePeriod: string;
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

export type NavigationSection = {
  title: string;
  description: string;
  image: Image;
  cta: CTA;
  items: NavigationSectionItem[];
};

// PAGE CONTENT type for multi-page support
export interface PageContent {
  title: string;
  slug: string;
  description?: string;
  image?: Image;
  cta?: CTA;
  sections: Section[];
}
// Strict, Discriminated Union for Sections
export type Section =
  | { type: "benefits"; id: string; content: Benefit[] }
  | { type: "faqs"; id: string; content: FaqItem[] }
  | {
      type: "certifications";
      id: string;
      content: Certification[];
    }
  | {
      type: "testimonials";
      id: string;
      content: Testimonial;
    }
  | {
      type: "features";
      id: string;
      content: FeatureSection[];
    }
  | { type: "cta"; id: string; content: CTASection }
  | {
      type: "footer";
      id: string;
      content: FooterSectionContent;
    }
  | { type: "hero"; id: string; content: HeroSection }
  | {
      type: "approach";
      id: string;
      content: ApproachSection;
    }
  | { type: "about"; id: string; content: AboutSection }
  | { type: "map"; id: string; content: MapSection }
  | {
      type: "analytics";
      id: string;
      content: AnalyticsSection;
    }
  | {
      type: "navigation";
      id: string;
      content: NavigationSection;
    };

// Prisma Types
export type PrismaType<T, U = {}> = T & { id: string } & U;
