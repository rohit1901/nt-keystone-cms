"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var ctaFields = {
  ctaLabel: (0, import_fields.text)({ validation: { isRequired: true } }),
  ctaHref: (0, import_fields.text)({ validation: { isRequired: true } }),
  ctaExternal: (0, import_fields.checkbox)({ label: "Open in new tab?" })
};
var pageContentFields = {
  title: (0, import_fields.text)({ validation: { isRequired: true } }),
  description: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
  image: (0, import_fields.text)({ label: "Image URL" }),
  // Or use an 'image' field if using local/S3 storage
  imageAlt: (0, import_fields.text)(),
  // We embed CTA fields directly to mimic "cta?: CTA"
  ...ctaFields
};
var lists = {
  // --- REQUIRED: The User List for Authentication ---
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  // --- Content Blocks ---
  Certification: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      description: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      image: (0, import_fields.text)({ label: "Image URL" }),
      link: (0, import_fields.text)(),
      width: (0, import_fields.integer)(),
      height: (0, import_fields.integer)()
    }
  }),
  Benefit: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      icon: (0, import_fields.text)({ label: "RemixIcon Name" }),
      // e.g., "RiCloudLine"
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      description: (0, import_fields.text)({ ui: { displayMode: "textarea" } })
    }
  }),
  Testimonial: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      role: (0, import_fields.text)(),
      company: (0, import_fields.text)(),
      content: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      rating: (0, import_fields.integer)({ validation: { min: 1, max: 5 } }),
      imageUrl: (0, import_fields.text)(),
      // Badge is a nested small object; JSON is often simplest for this UI fluff
      badge: (0, import_fields.json)({
        label: "Badge Config",
        defaultValue: { icon: "", label: "" }
      })
    }
  }),
  FaqItem: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      question: (0, import_fields.text)({ validation: { isRequired: true } }),
      answer: (0, import_fields.text)({ ui: { displayMode: "textarea" } })
    }
  }),
  // --- Complex Page Sections ---
  // Maps to 'HeroType'
  Hero: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      subHeading: (0, import_fields.text)(),
      // Hero has the CTA fields merged in your type
      ...ctaFields,
      // The 'banner' prop is deeply nested ({ icon, additional: { icon, text } })
      // A JSON field is best here to preserve strict structure without creating 3 separate lists
      bannerConfig: (0, import_fields.json)({
        label: "Banner Configuration",
        defaultValue: {
          icon: "RiFlagLine",
          additional: { icon: "RiStarLine", text: "New Feature" }
        }
      })
    }
  }),
  // Maps to 'NavigationSectionItem' & 'FooterSection'
  // We create a list for the Items, and the Section will relate to them
  NavigationItem: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      icon: (0, import_fields.text)({ label: "RemixIcon Name" }),
      // Extends CTA
      ...ctaFields,
      // Relationship back to section (optional, or defined on the Section side)
      section: (0, import_fields.relationship)({ ref: "FooterSection.items", many: false })
    }
  }),
  FooterSection: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      items: (0, import_fields.relationship)({ ref: "NavigationItem.section", many: true })
    }
  }),
  // --- Process / Approach ---
  ApproachStep: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      description: (0, import_fields.text)({ ui: { displayMode: "textarea" } }),
      activityTime: (0, import_fields.text)(),
      type: (0, import_fields.select)({
        options: [
          { label: "Done", value: "done" },
          { label: "In Progress", value: "in progress" },
          { label: "Open", value: "open" }
        ]
      }),
      // Sorting/Ordering index is usually helpful here
      stepOrder: (0, import_fields.integer)()
    }
  }),
  // --- Analytics Data (Singleton-like structure) ---
  AnalyticsReport: (0, import_core.list)({
    access: import_access.allowAll,
    ui: {
      labelField: "heading"
    },
    fields: {
      heading: (0, import_fields.text)(),
      subheading: (0, import_fields.text)(),
      // 'stats' is a fixed object structure (AnalyticsStats)
      stats: (0, import_fields.json)({
        label: "Top Level Stats",
        defaultValue: {
          totalDeployments: "0",
          deploymentChange: "+0",
          deploymentChangePercent: "0%",
          changePeriod: "Last 30 days"
        }
      }),
      // 'tableHeadings' is a string array
      tableHeadings: (0, import_fields.json)({ defaultValue: [] }),
      // 'summary' is the list of rows
      summaryItems: (0, import_fields.relationship)({ ref: "AnalyticsSummaryItem", many: true })
    }
  }),
  AnalyticsSummaryItem: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)(),
      deployments: (0, import_fields.text)(),
      // Keeping as text per your type ("string"), change to integer if needed
      uptime: (0, import_fields.text)(),
      clientSatisfaction: (0, import_fields.text)(),
      efficiency: (0, import_fields.text)(),
      revenueGrowth: (0, import_fields.text)(),
      bgColor: (0, import_fields.text)({ label: "Background Hex Color" }),
      changeType: (0, import_fields.select)({
        options: [
          { label: "Positive", value: "positive" },
          { label: "Negative", value: "negative" }
        ]
      })
    }
  }),
  // --- Example Composite Implementation ---
  // Maps to 'PageContentWithSubHeading'
  StandardPage: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      // 1. Base PageContent
      ...pageContentFields,
      // 2. The Composite extension
      subheading: (0, import_fields.text)(),
      // 3. Relationships to other sections (Implementing your generic maps)
      benefits: (0, import_fields.relationship)({ ref: "Benefit", many: true }),
      faqs: (0, import_fields.relationship)({ ref: "FaqItem", many: true })
    }
  })
};

// auth.ts
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: process.env.SESSION_SECRET
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    lists,
    session
  })
);
//# sourceMappingURL=config.js.map
