import { list, ListConfig } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  text,
  relationship,
  select,
  integer,
  checkbox,
  json,
  password,
  timestamp,
} from "@keystone-6/core/fields";
import { aboutSection } from "./data/data";
import { isTemplateSpan } from "typescript";

// --- Concrete Lists ---

export const lists: Record<string, ListConfig<any>> = {
  // --- REQUIRED: The User List for Authentication ---
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
  CTA: {
    access: allowAll,
    fields: {
      label: text({ validation: { isRequired: true } }),
      href: text({ validation: { isRequired: true } }),
      external: checkbox(),
    },
  },

  HeroBannerAdditional: {
    access: allowAll,
    fields: {
      icon: text(),
      text: text(),
    },
  },

  HeroBanner: {
    access: allowAll,
    fields: {
      label: text({ validation: { isRequired: true } }),
      href: text({ validation: { isRequired: true } }),
      external: checkbox(),
      additional: relationship({ ref: "HeroBannerAdditional", many: false }),
    },
  },

  Hero: {
    access: allowAll,
    fields: {
      subHeading: text({ validation: { isRequired: true } }),
      banner: relationship({ ref: "HeroBanner", many: false }),
    },
  },

  Benefit: {
    access: allowAll,
    fields: {
      icon: text(),
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
    },
  },

  FaqItem: {
    access: allowAll,
    fields: {
      question: text({ validation: { isRequired: true } }),
      answer: text({ ui: { displayMode: "textarea" } }),
    },
  },

  Certification: {
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
      image: text(),
      link: text(),
      width: text(),
      height: text(),
    },
  },

  Testimonial: {
    access: allowAll,
    fields: {
      badgeIcon: text(),
      badgeLabel: text(),
      name: text(),
      role: text(),
      company: text(),
      imageSrc: text(),
      imageAlt: text(),
      imageWidth: text(),
      imageHeight: text(),
      imageClassName: text(),
      content: text({ ui: { displayMode: "textarea" } }),
    },
  },

  FeatureSection: {
    access: allowAll,
    fields: {
      title: text(),
      description: text(),
      longDescription: text({ ui: { displayMode: "textarea" } }),
      visualization: text(),
    },
  },

  ApproachStep: {
    access: allowAll,
    fields: {
      type: select({
        options: [
          { label: "Done", value: "done" },
          { label: "In Progress", value: "in progress" },
          { label: "Open", value: "open" },
        ],
      }),
      title: text(),
      description: text({ ui: { displayMode: "textarea" } }),
      activityTime: text(),
    },
  },
  Language: {
    access: allowAll,
    fields: {
      label: select({
        options: [
          { label: "English", value: "English" },
          { label: "German", value: "German" },
        ],
      }),
      value: select({
        options: [
          { label: "en-US", value: "en-US" },
          { label: "de-DE", value: "de-DE" },
        ],
      }),
    },
  },

  NavigationSectionItem: {
    access: allowAll,
    fields: {
      label: text(),
      href: text(),
      external: checkbox(),
      icon: text(),
    },
  },

  NavigationSection: {
    access: allowAll,
    fields: {
      items: relationship({ ref: "NavigationSectionItem", many: true }),
    },
  },

  FooterPart: {
    access: allowAll,
    fields: {
      title: text(),
      items: relationship({ ref: "CTA", many: true }),
    },
  },

  FooterSection: {
    access: allowAll,
    fields: {
      title: text(),
      sections: relationship({ ref: "FooterPart", many: true }),
    },
  },

  AnalyticsStat: {
    access: allowAll,
    fields: {
      totalDeployments: text(),
      deploymentChange: text(),
      deploymentChangePercent: text(),
      changePeriod: text(),
    },
  },

  AnalyticsSummaryItem: {
    access: allowAll,
    fields: {
      name: text(),
      deployments: text(),
      uptime: text(),
      clientSatisfaction: text(),
      efficiency: text(),
      revenueGrowth: text(),
      bgColor: text(),
      changeType: select({
        options: [
          { label: "Positive", value: "positive" },
          { label: "Negative", value: "negative" },
        ],
      }),
    },
  },

  AnalyticsHeading: {
    access: allowAll,
    fields: {
      text: text(),
    },
  },

  AnalyticsSection: {
    access: allowAll,
    fields: {
      heading: text(),
      subheading: text(),
      stats: relationship({ ref: "AnalyticsStat", many: false }),
      tableHeadings: relationship({ ref: "AnalyticsHeading", many: true }),
      summary: relationship({ ref: "AnalyticsSummaryItem", many: true }),
    },
  },

  Value: {
    access: allowAll,
    fields: {
      label: text(),
      description: text(),
      icon: text(),
    },
  },

  AboutSection: {
    access: allowAll,
    fields: {
      heading: text(),
      intro: text(),
      valuesTitle: text(),
      values: relationship({ ref: "Value", many: true }),
    },
  },

  MapSection: {
    access: allowAll,
    fields: {
      title: text(),
      subheading: text(),
      description: text(),
    },
  },

  Section: {
    access: allowAll,
    fields: {
      type: select({
        options: [
          { label: "Hero", value: "hero" },
          { label: "Benefits", value: "benefits" },
          { label: "Features", value: "features" },
          { label: "FAQs", value: "faqs" },
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
      contentHero: relationship({ ref: "Hero", many: false }),
      contentBenefits: relationship({ ref: "Benefit", many: true }),
      contentFeatures: relationship({ ref: "FeatureSection", many: true }),
      contentFaqs: relationship({ ref: "FaqItem", many: true }),
      contentTestimonials: relationship({ ref: "Testimonial", many: true }),
      contentCertifications: relationship({ ref: "Certification", many: true }),
      contentApproachSteps: relationship({ ref: "ApproachStep", many: true }),
      contentAbout: relationship({ ref: "AboutSection", many: false }),
      contentAnalytics: relationship({ ref: "AnalyticsSection", many: false }),
      contentNavigation: relationship({
        ref: "NavigationSection",
        many: false,
      }),
      contentFooterSections: relationship({ ref: "FooterSection", many: true }),
      contentCTA: relationship({ ref: "CTA", many: true }),
      contentMap: relationship({ ref: "MapSection", many: false }),
    },
  },

  PageContent: {
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text(),
      image: text(),
      imageAlt: text(),
      cta: relationship({ ref: "CTA", many: false }),
      sections: relationship({ ref: "Section", many: true }),
    },
  },
};
