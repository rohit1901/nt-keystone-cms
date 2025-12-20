import { list, ListConfig } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  checkbox,
  float,
  integer,
  multiselect,
  password,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";

// --- Keystone CMS Lists ---

export const lists: Record<string, ListConfig<any>> = {
  // --- REQUIRED: User List for Authentication ---
  User: list({
    access: allowAll,
    fields: {
      authId: text({ isIndexed: "unique" }),
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
  Type: list({
    access: allowAll,
    fields: {
      label: select({
        options: [
          { label: "Certification", value: "certification" },
          { label: "CTA", value: "cta" },
        ],
      }),
    },
  }),

  // CTA: Call-to-action links
  Cta: list({
    access: allowAll,
    fields: {
      label: text({ validation: { isRequired: true } }),
      href: text({ validation: { isRequired: true } }),
      external: checkbox({ defaultValue: false }),
      type: relationship({ ref: "Type", many: false }),
      language: relationship({ ref: "Language", many: false }),
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
      type: relationship({ ref: "Type", many: false }),
    },
  }),

  // Background: Background configuration with images

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
      background: relationship({ ref: "Image", many: true }),
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
      language: relationship({ ref: "Language", many: false }),
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
      language: relationship({ ref: "Language", many: false }),
    },
  }),

  // Hero: Complete hero section
  Hero: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({ validation: { isRequired: true } }),
      subHeading: text({ validation: { isRequired: true } }),
      banner: relationship({ ref: "HeroBanner", many: false }),
      cta: relationship({ ref: "Cta", many: false }),
      language: relationship({ ref: "Language", many: false }),
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
      language: relationship({ ref: "Language", many: false }),
    },
  }),

  // BenefitSection: Collection of benefits with title
  BenefitSection: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      benefits: relationship({ ref: "Benefit", many: true }),
      language: relationship({ ref: "Language", many: false }),
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
      language: relationship({ ref: "Language", many: false }),
    },
  }),

  // FaqSection: Collection of FAQs with title and description
  FaqSection: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
      faqs: relationship({ ref: "Faq", many: true }),
      language: relationship({ ref: "Language", many: false }),
    },
  }),

  // --- Certification ---

  // Certification: Certification or credential
  Certification: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
      image: relationship({ ref: "Image", many: false }),
      link: text(),
      language: relationship({ ref: "Language", many: false }),
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
      language: relationship({ ref: "Language", many: false }),
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
      language: relationship({ ref: "Language", many: false }),
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
      language: relationship({ ref: "Language", many: false }),
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
      language: relationship({ ref: "Language", many: false }),
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
      language: relationship({ ref: "Language", many: false }),
    },
  }),

  // Navigation: Navigation section
  Navigation: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
      image: relationship({ ref: "Image", many: false }),
      cta: relationship({ ref: "Cta", many: false }),
      items: relationship({ ref: "NavigationLink", many: true }),
      language: relationship({ ref: "Language", many: false }),
    },
  }),

  // --- Footer ---

  // FooterSection: Section in footer (e.g., Services, Company)
  FooterSection: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      items: relationship({ ref: "NavigationLink", many: true }),
      language: relationship({ ref: "Language", many: false }),
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
      language: relationship({ ref: "Language", many: false }),
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
      language: relationship({ ref: "Language", many: false }),
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
      language: relationship({ ref: "Language", many: false }),
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
      language: relationship({ ref: "Language", many: false }),
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
      language: relationship({ ref: "Language", many: false }),
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
      language: relationship({ ref: "Language", many: false }),
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
      language: relationship({ ref: "Language", many: false }),
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
      background: relationship({ ref: "Image", many: true }),
      language: relationship({ ref: "Language", many: false }),
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
          { label: "FAQ Section", value: "faqSection" },
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
      contentFaqSection: relationship({ ref: "FaqSection", many: false }),
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
      image: relationship({ ref: "Image", many: false }),
      cta: relationship({ ref: "Cta", many: false }),
      sections: relationship({ ref: "Section", many: false }),
      language: relationship({ ref: "Language", many: false }),
    },
  }),
};
