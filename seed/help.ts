/**
 * Database Commands Help
 * Displays comprehensive reference for all database-related commands
 */

const SEED_ORDER = [
  "slugs",
  "languages",
  "images",
  "ctas",
  "certifications",
  "heroes",
  "benefits",
  "approaches",
  "about",
  "analytics",
  "navigation",
  "footer",
  "faqs",
  "features",
  "testimonials",
  "maps",
  "pageContents",
  "resume",
  "legalPages",
] as const;

/**
 * Get component description for help text
 */
function getComponentDescription(component: string): string {
  const descriptions: Record<string, string> = {
    slugs: "URL slugs and routes",
    languages: "Language configurations",
    images: "Image assets",
    ctas: "Call-to-action buttons and sections",
    certifications: "Certification sections",
    heroes: "Hero sections",
    benefits: "Benefit sections",
    approaches: "Approach workflows",
    about: "About sections and values",
    analytics: "Analytics dashboards",
    navigation: "Navigation menus",
    footer: "Footer sections",
    faqs: "FAQ sections",
    features: "Feature sections",
    testimonials: "Testimonial sections",
    maps: "Map sections",
    pageContents: "Page content (requires all dependencies)",
    resume: "Resume/CV data",
    legalPages: "Legal pages (privacy, terms, etc.)",
  };
  return descriptions[component] || "";
}

/**
 * Display comprehensive database commands help
 */
function displayDatabaseHelp() {
  console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                  📚 Keystone CMS Database Commands Reference               ║
╚════════════════════════════════════════════════════════════════════════════╝

QUICK REFERENCE:
  For detailed documentation, see: ./seed/SCRIPTS.md

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🌱 SEEDING COMMANDS                                                         │
└─────────────────────────────────────────────────────────────────────────────┘

  npm run db:seed              Seed all components (default)
  npm run db:seed:all          Explicitly seed all components
  npm run db:seed:help         Show detailed seed help
  npm run db:help              Show this comprehensive help

  npm run db:seed <component>  Seed specific component(s)
    Examples:
      npm run db:seed slugs
      npm run db:seed about analytics navigation

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🗑️  CLEARING COMMANDS                                                       │
└─────────────────────────────────────────────────────────────────────────────┘

  npm run db:clear:all         Clear all seeded data
  npm run db:clear:help        Show detailed clear help

  npm run db:clear -- <flags>  Clear specific components
    Examples:
      npm run db:clear -- --about
      npm run db:clear -- --analytics --navigation
      npm run db:clear -- --pages home terms

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🔄 DATABASE MANAGEMENT                                                      │
└─────────────────────────────────────────────────────────────────────────────┘

  npm run db:push              Push schema without migrations
  npm run db:reset             Reset database (⚠️  DELETES ALL DATA)
  npm run db:fresh             Reset + seed all (complete fresh start)
  npm run db:reset:seed        Alias for db:fresh

┌─────────────────────────────────────────────────────────────────────────────┐
│ 📋 SCHEMA MANAGEMENT                                                        │
└─────────────────────────────────────────────────────────────────────────────┘

  npm run generate             Generate migrations (development)
  npm run schema:verify:dev    Verify schema (development)
  npm run schema:verify:prod   Verify schema (production)

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🎯 COMMON WORKFLOWS                                                         │
└─────────────────────────────────────────────────────────────────────────────┘

  Initial Setup:
    npm run db:push && npm run db:seed

  After Schema Changes:
    npm run generate && npm run db:push

  Fresh Start:
    npm run db:fresh

  Update Specific Content:
    npm run db:clear -- --about
    npm run db:seed about

  Testing with Fresh Data:
    npm run db:fresh

┌─────────────────────────────────────────────────────────────────────────────┐
│ 📦 AVAILABLE COMPONENTS                                                     │
└─────────────────────────────────────────────────────────────────────────────┘

${SEED_ORDER.map(c => `  • ${c.padEnd(20)} ${getComponentDescription(c)}`).join('\n')}

┌─────────────────────────────────────────────────────────────────────────────┐
│ 🔍 COMPONENT DEPENDENCIES                                                   │
└─────────────────────────────────────────────────────────────────────────────┘

  Components are automatically seeded in dependency order:

    slugs → images → heroes
          → ctas → navigation
    languages → about
              → analytics
              → features
              → (most other components)

  Note: When you seed a component, all its dependencies are seeded first.

┌─────────────────────────────────────────────────────────────────────────────┐
│ ⚡ QUICK TIPS                                                                │
└─────────────────────────────────────────────────────────────────────────────┘

  • Dependencies are handled automatically - just seed what you need
  • Use db:fresh for a complete reset and reseed
  • Check console output to see what's being seeded
  • Clear before reseeding to avoid duplicates
  • Use component-specific commands for targeted updates

┌─────────────────────────────────────────────────────────────────────────────┐
│ 📖 DOCUMENTATION                                                            │
└─────────────────────────────────────────────────────────────────────────────┘

  Quick Reference:    npm run db:help
  Detailed Guide:     ./seed/SCRIPTS.md
  Full README:        ./seed/README.md
  Seed Help:          npm run db:seed:help
  Clear Help:         npm run db:clear:help

For step-by-step workflows and troubleshooting, see ./seed/SCRIPTS.md
`);
}

// Run the help display
displayDatabaseHelp();
