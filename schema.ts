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
} from "@keystone-6/core/fields";

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
  // CTA configs
  Cta: list({
    access: allowAll,
    fields: {
      label: text({ validation: { isRequired: true } }),
      href: text({ validation: { isRequired: true } }),
      external: checkbox(),
    },
  }),
  CtaSection: list({
    access: allowAll,
    fields: {
      background: relationship({ ref: "Background", many: true }),
      ctas: relationship({ ref: "Cta", many: true }),
    },
  }),
  Image: list({
    access: allowAll,
    fields: {
      width: integer(),
      height: integer(),
      src: text(),
      alt: text(),
      fill: checkbox(),
      className: text(),
    },
  }),
  Background: list({
    access: allowAll,
    fields: {
      image: relationship({ ref: "Image", many: false }),
      outerClassName: text(),
    },
  }),
  // Testimonial configs
  TestimonialBadge: {
    access: allowAll,
    fields: {
      icon: text(),
      label: text(),
    },
  },
  Testimonial: {
    access: allowAll,
    fields: {
      badge: relationship({ ref: "TestimonialBadge", many: false }),
      name: text(),
      role: text(),
      company: text(),
      image: relationship({ ref: "Image", many: false }),
      content: text({ ui: { displayMode: "textarea" } }),
    },
  },
  TestimonialSection: {
    access: allowAll,
    fields: {
      background: relationship({ ref: "Background", many: true }),
      testimonials: relationship({ ref: "Testimonial", many: true }),
      fallback: relationship({ ref: "Testimonial", many: false }),
    },
  },
  // Hero configs
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
  // Benefits configs
  Benefit: list({
    access: allowAll,
    fields: {
      icon: text(),
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
    },
  }),
  // FAQs configs
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
  // Certifications configs
  Certification: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
      image: relationship({ ref: "Image", many: false }),
      link: text(),
    },
  }),
  // Features configs
  Feature: list({
    access: allowAll,
    fields: {
      fid: text({ validation: { isRequired: true } }),
      title: text(),
      description: text(),
      longDescription: text({ ui: { displayMode: "textarea" } }),
      visualization: text(),
    },
  }),
  // Approach configs
  ApproachStep: list({
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
      aid: integer({ validation: { isRequired: true } }),
    },
  }),
  Approach: list({
    access: allowAll,
    fields: {
      title: text(),
      description: text({ ui: { displayMode: "textarea" } }),
      steps: relationship({ ref: "ApproachStep", many: true }),
    },
  }),
  // Language configs
  // TODO: check whether this should be a list or a single item
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
  // Navigation configs
  NavigationLink: list({
    access: allowAll,
    fields: {
      label: text(),
      href: text(),
      external: checkbox(),
      icon: text(),
    },
  }),
  // Footer configs
  FooterPart: {
    access: allowAll,
    fields: {
      title: text(),
      items: relationship({ ref: "NavigationLink", many: true }),
    },
  },
  Footer: {
    access: allowAll,
    fields: {
      sections: relationship({ ref: "FooterPart", many: true }),
      languages: relationship({
        ref: "Language",
        many: true,
        ui: {
          displayMode: "select",
          labelField: "label",
        },
      }),
    },
  },
  // Analytics configs
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
  AnalyticsSection: {
    access: allowAll,
    fields: {
      heading: text(),
      subheading: text(),
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
  },
  // About configs
  Value: {
    access: allowAll,
    fields: {
      label: text(),
      description: text(),
      icon: text(),
    },
  },
  About: {
    access: allowAll,
    fields: {
      heading: text(),
      intro: text(),
      valuesTitle: text(),
      values: relationship({ ref: "Value", many: true }),
      closing: text(),
    },
  },
  // Map configs
  Map: {
    access: allowAll,
    fields: {
      title: text(),
      subheading: text(),
      description: text(),
    },
  },
  // Section configs
  Section: {
    access: allowAll,
    fields: {
      type: select({
        options: [
          { label: "Hero", value: "hero" },
          { label: "Benefit", value: "benefits" },
          { label: "Feature", value: "features" },
          { label: "FAQ", value: "faqs" },
          { label: "Testimonial", value: "testimonials" },
          { label: "Certification", value: "certifications" },
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
      contentFeatures: relationship({ ref: "Feature", many: true }),
      contentFaqs: relationship({ ref: "Faq", many: true }),
      contentTestimonials: relationship({
        ref: "TestimonialSection",
        many: false,
      }),
      contentCertifications: relationship({ ref: "Certification", many: true }),
      contentApproach: relationship({ ref: "Approach", many: true }),
      contentAbout: relationship({ ref: "About", many: false }),
      contentAnalytics: relationship({ ref: "AnalyticsSection", many: false }),
      contentNavigation: relationship({
        ref: "NavigationLink",
        many: true,
      }),
      contentFooter: relationship({ ref: "Footer", many: true }),
      contentCta: relationship({ ref: "CtaSection", many: true }),
      contentMap: relationship({ ref: "Map", many: false }),
    },
  },
  // PageContent configs
  PageContent: {
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text(),
      image: relationship({ ref: "Image", many: false }),
      cta: relationship({ ref: "Cta", many: false }),
      sections: relationship({ ref: "Section", many: true }),
    },
  },
};
