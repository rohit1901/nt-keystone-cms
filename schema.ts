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
  TestimonialBadge: {
    access: allowAll,
    fields: {
      icon: text(),
      label: text(),
    },
  },
  TestimonialItem: list({
    access: allowAll,
    fields: {
      badge: relationship({ ref: "TestimonialBadge", many: false }),
      name: text(),
      role: text(),
      company: text(),
      image: relationship({ ref: "Image", many: false }),
      content: text({ ui: { displayMode: "textarea" } }),
    },
  }),
  HeroBannerAdditional: list({
    access: allowAll,
    fields: {
      icon: text(),
      text: text(),
    },
  }),
  HeroBanner: list({
    access: allowAll,
    fields: {
      label: text({ validation: { isRequired: true } }),
      href: text({ validation: { isRequired: true } }),
      external: checkbox(),
      additional: relationship({ ref: "HeroBannerAdditional", many: false }),
    },
  }),
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
  // TODO: check whether this should be a list or a single item
  Language: list({
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
  }),
  NavigationLink: list({
    access: allowAll,
    fields: {
      label: text(),
      href: text(),
      external: checkbox(),
      icon: text(),
    },
  }),
  AnalyticsStat: list({
    access: allowAll,
    fields: {
      totalDeployments: text(),
      deploymentChange: text(),
      deploymentChangePercent: text(),
      changePeriod: text(),
    },
  }),
  AnalyticsSummaryItem: list({
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
  }),
  FooterPart: list({
    access: allowAll,
    fields: {
      title: text(),
      items: relationship({ ref: "NavigationLink", many: true }),
    },
  }),
  Value: list({
    access: allowAll,
    fields: {
      label: text(),
      description: text(),
      icon: text(),
    },
  }),
  // Sections
  CtaSection: list({
    access: allowAll,
    fields: {
      background: relationship({ ref: "Background", many: true }),
      ctas: relationship({ ref: "Cta", many: true }),
    },
  }),
  Testimonial: list({
    access: allowAll,
    fields: {
      background: relationship({ ref: "Background", many: true }),
      testimonials: relationship({ ref: "TestimonialItem", many: true }),
      fallback: relationship({ ref: "TestimonialItem", many: false }),
    },
  }),
  Hero: list({
    access: allowAll,
    fields: {
      subHeading: text({ validation: { isRequired: true } }),
      banner: relationship({ ref: "HeroBanner", many: false }),
    },
  }),
  Benefit: list({
    access: allowAll,
    fields: {
      icon: text(),
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
    },
  }),
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
  Certification: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
      image: relationship({ ref: "Image", many: false }),
      link: text(),
    },
  }),
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
  Approach: list({
    access: allowAll,
    fields: {
      title: text(),
      description: text({ ui: { displayMode: "textarea" } }),
      steps: relationship({ ref: "ApproachStep", many: true }),
    },
  }),
  Navigation: list({
    access: allowAll,
    fields: {
      title: text(),
      description: text({ ui: { displayMode: "textarea" } }),
      image: relationship({ ref: "Image", many: false }),
      cta: relationship({ ref: "Cta", many: false }),
      items: relationship({ ref: "NavigationLink", many: true }),
    },
  }),
  Footer: list({
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
  }),
  Analytic: list({
    access: allowAll,
    fields: {
      heading: text({
        validation: { isRequired: true },
      }),
      subheading: text({
        validation: { isRequired: true },
      }),
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
  About: list({
    access: allowAll,
    fields: {
      heading: text({
        validation: { isRequired: true },
      }),
      intro: text({
        validation: { isRequired: true },
      }),
      valuesTitle: text({
        validation: { isRequired: true },
      }),
      values: relationship({ ref: "Value", many: true }),
      closing: text({
        validation: { isRequired: true },
      }),
    },
  }),
  Map: list({
    access: allowAll,
    fields: {
      title: text({
        validation: { isRequired: true },
      }),
      subheading: text({
        validation: { isRequired: true },
      }),
      description: text({
        validation: { isRequired: true },
      }),
    },
  }),
  Section: list({
    access: allowAll,
    fields: {
      type: select({
        options: [
          { label: "Hero", value: "hero" },
          { label: "Benefit", value: "benefit" },
          { label: "Feature", value: "feature" },
          { label: "FAQ", value: "faq" },
          { label: "Testimonial", value: "testimonial" },
          { label: "Certification", value: "certification" },
          { label: "Approach", value: "approach" },
          { label: "About", value: "about" },
          { label: "Analytic", value: "analytic" },
          { label: "Navigation", value: "navigation" },
          { label: "Footer", value: "footer" },
          { label: "CTA", value: "cta" },
          { label: "Map", value: "map" },
        ],
        validation: { isRequired: true },
      }),
      contentHero: relationship({
        ref: "Hero",
        many: false,
      }),
      contentBenefits: relationship({
        ref: "Benefit",
        many: true,
      }),
      contentFeatures: relationship({
        ref: "Feature",
        many: true,
      }),
      contentFaqs: relationship({
        ref: "Faq",
        many: true,
      }),
      contentTestimonials: relationship({
        ref: "Testimonial",
        many: false,
      }),
      contentCertifications: relationship({
        ref: "Certification",
        many: true,
      }),
      contentApproaches: relationship({
        ref: "Approach",
        many: false,
      }),
      contentAbout: relationship({
        ref: "About",
        many: false,
      }),
      contentAnalytics: relationship({
        ref: "Analytic",
        many: false,
      }),
      contentNavigation: relationship({
        ref: "Navigation",
        many: false,
      }),
      contentFooter: relationship({
        ref: "Footer",
        many: false,
      }),
      // TODO: rename cta section
      contentCta: relationship({
        ref: "CtaSection",
        many: false,
      }),
      contentMap: relationship({
        ref: "Map",
        many: false,
      }),
    },
  }),
  // PageContent configs
  // Each page has a unique slug and sections
  PageContent: list({
    access: allowAll,
    fields: {
      slug: text({ validation: { isRequired: true } }),
      title: text({ validation: { isRequired: true } }),
      description: text({ validation: { isRequired: true } }),
      image: relationship({ ref: "Image", many: false }),
      cta: relationship({ ref: "Cta", many: false }),
      sections: relationship({
        ref: "Section",
        many: false,
      }),
    },
  }),
};
