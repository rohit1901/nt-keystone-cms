import { list } from "@keystone-6/core";
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

// --- 1. Reusable Field Groups (Type definitions) ---

// Maps to your 'CTA' type
// We flatten this for better Admin UI (easier than managing relations for simple links)
const ctaFields = {
  ctaLabel: text({ validation: { isRequired: true } }),
  ctaHref: text({ validation: { isRequired: true } }),
  ctaExternal: checkbox({ label: "Open in new tab?" }),
};

// Maps to your 'PageContent' type
const pageContentFields = {
  title: text({ validation: { isRequired: true } }),
  description: text({ ui: { displayMode: "textarea" } }),
  image: text({ label: "Image URL" }), // Or use an 'image' field if using local/S3 storage
  imageAlt: text(),
  // We embed CTA fields directly to mimic "cta?: CTA"
  ...ctaFields,
};

// Maps to 'Language' options
const languageOptions = [
  { label: "English", value: "en-US" },
  { label: "German", value: "de-DE" },
];

// --- 2. Concrete Lists ---

export const lists = {
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
  // --- Content Blocks ---

  Certification: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
      image: text({ label: "Image URL" }),
      link: text(),
      width: integer(),
      height: integer(),
    },
  }),

  Benefit: list({
    access: allowAll,
    fields: {
      icon: text({ label: "RemixIcon Name" }), // e.g., "RiCloudLine"
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
    },
  }),

  Testimonial: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      role: text(),
      company: text(),
      content: text({ ui: { displayMode: "textarea" } }),
      rating: integer({ validation: { min: 1, max: 5 } }),
      imageUrl: text(),
      // Badge is a nested small object; JSON is often simplest for this UI fluff
      badge: json({
        label: "Badge Config",
        defaultValue: { icon: "", label: "" },
      }),
    },
  }),

  FaqItem: list({
    access: allowAll,
    fields: {
      question: text({ validation: { isRequired: true } }),
      answer: text({ ui: { displayMode: "textarea" } }),
    },
  }),

  // --- Complex Page Sections ---

  // Maps to 'HeroType'
  Hero: list({
    access: allowAll,
    fields: {
      subHeading: text(),
      // Hero has the CTA fields merged in your type
      ...ctaFields,
      // The 'banner' prop is deeply nested ({ icon, additional: { icon, text } })
      // A JSON field is best here to preserve strict structure without creating 3 separate lists
      bannerConfig: json({
        label: "Banner Configuration",
        defaultValue: {
          icon: "RiFlagLine",
          additional: { icon: "RiStarLine", text: "New Feature" },
        },
      }),
    },
  }),

  // Maps to 'NavigationSectionItem' & 'FooterSection'
  // We create a list for the Items, and the Section will relate to them
  NavigationItem: list({
    access: allowAll,
    fields: {
      icon: text({ label: "RemixIcon Name" }),
      // Extends CTA
      ...ctaFields,
      // Relationship back to section (optional, or defined on the Section side)
      section: relationship({ ref: "FooterSection.items", many: false }),
    },
  }),

  FooterSection: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      items: relationship({ ref: "NavigationItem.section", many: true }),
    },
  }),

  // --- Process / Approach ---

  ApproachStep: list({
    access: allowAll,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({ ui: { displayMode: "textarea" } }),
      activityTime: text(),
      type: select({
        options: [
          { label: "Done", value: "done" },
          { label: "In Progress", value: "in progress" },
          { label: "Open", value: "open" },
        ],
      }),
      // Sorting/Ordering index is usually helpful here
      stepOrder: integer(),
    },
  }),

  // --- Analytics Data (Singleton-like structure) ---

  AnalyticsReport: list({
    access: allowAll,
    ui: {
      labelField: "heading",
    },
    fields: {
      heading: text(),
      subheading: text(),
      // 'stats' is a fixed object structure (AnalyticsStats)
      stats: json({
        label: "Top Level Stats",
        defaultValue: {
          totalDeployments: "0",
          deploymentChange: "+0",
          deploymentChangePercent: "0%",
          changePeriod: "Last 30 days",
        },
      }),
      // 'tableHeadings' is a string array
      tableHeadings: json({ defaultValue: [] }),
      // 'summary' is the list of rows
      summaryItems: relationship({ ref: "AnalyticsSummaryItem", many: true }),
    },
  }),

  AnalyticsSummaryItem: list({
    access: allowAll,
    fields: {
      name: text(),
      deployments: text(), // Keeping as text per your type ("string"), change to integer if needed
      uptime: text(),
      clientSatisfaction: text(),
      efficiency: text(),
      revenueGrowth: text(),
      bgColor: text({ label: "Background Hex Color" }),
      changeType: select({
        options: [
          { label: "Positive", value: "positive" },
          { label: "Negative", value: "negative" },
        ],
      }),
    },
  }),

  // --- Example Composite Implementation ---

  // Maps to 'PageContentWithSubHeading'
  StandardPage: list({
    access: allowAll,
    fields: {
      // 1. Base PageContent
      ...pageContentFields,
      // 2. The Composite extension
      subheading: text(),
      // 3. Relationships to other sections (Implementing your generic maps)
      benefits: relationship({ ref: "Benefit", many: true }),
      faqs: relationship({ ref: "FaqItem", many: true }),
    },
  }),
};
