// types.ts

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
  image: string;
  link?: string;
  width: number;
  height: number;
};

export type PageContent = {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  cta?: CTA;
  benefits?: Benefit[];
  faqs?: FaqItem[];
  certifications?: Certification[];
};

// Navigation Item & Footer Section
export type NavigationSectionItem = {
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
};
export type FooterSection = {
  title: string;
  items: NavigationSectionItem[];
};

// Analytics
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

export type ApproachStep = {
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

export type Language = {
  label: "English" | "German";
  value: "en-US" | "de-DE";
};
