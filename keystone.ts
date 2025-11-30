// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from "@keystone-6/core";

// to keep this file tidy, we define our schema in a different file
import { lists } from "./schema";

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from "./auth";
const modelsToClear = [
  "Cta",
  "CtaSection",
  "Image",
  "Background",
  "TestimonialBadge",
  "Testimonial",
  "HeroBannerAdditional",
  "HeroBanner",
  "Hero",
  "Benefit",
  "Faq",
  "Certification",
  "Feature",
  "ApproachStep",
  "Approach",
  "Language",
  "Navigation",
  "NavigationLink",
  "FooterPart",
  "Footer",
  "AnalyticsStat",
  "AnalyticsSummaryItem",
  "AnalyticsSection",
  "Value",
  "About",
  "Map",
  "Section",
  "PageContent",
];

export default withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "sqlite",
      url: "file:./keystone.db",
      onConnect: async (context) => {
        console.log("🔌 onConnect fired");
        console.log(
          "Available lists:",
          Object.keys(context.__internal.lists || {}),
        );
        console.log("NODE_ENV:", process.env.NODE_ENV);
        if (process.env.NODE_ENV === "development") {
          for (const model of modelsToClear) {
            console.log("🚀 Starting clear...");
            const deleteResult = context.prisma[model]
              ? context.prisma[model].deleteMany(undefined)
              : null;
            console.log(`Cleared ${model}`);
          }
        }
      },
    },
    lists,
    session,
  }),
);
