/**
 * Test Script for Legal Pages Seeding
 *
 * Run this script to verify that legal pages are seeded correctly.
 *
 * Usage:
 *   npx tsx seed/components/testLegalPages.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testLegalPages() {
  console.log("\n🧪 Testing Legal Pages Seeding...\n");

  try {
    // Test 1: Check if all 4 legal pages exist
    console.log("Test 1: Checking if all legal pages exist...");
    const expectedSlugs = ["terms", "impressum", "privacy-policy", "datenschutz"];

    const legalPages = await prisma.pageContent.findMany({
      where: {
        slug: {
          in: expectedSlugs,
        },
      },
      include: {
        language: true,
      },
    });

    if (legalPages.length !== 4) {
      console.error(`❌ Expected 4 legal pages, found ${legalPages.length}`);
      console.log("Found slugs:", legalPages.map(p => p.slug));
      return;
    }
    console.log("✓ All 4 legal pages exist");

    // Test 2: Verify each page has required fields
    console.log("\nTest 2: Verifying required fields...");
    for (const page of legalPages) {
      if (!page.slug || !page.title || !page.description || !page.language) {
        console.error(`❌ Page ${page.slug} is missing required fields`);
        return;
      }

      if (page.description.length < 100) {
        console.error(`❌ Page ${page.slug} has suspiciously short description`);
        return;
      }
    }
    console.log("✓ All pages have required fields");

    // Test 3: Verify language assignments
    console.log("\nTest 3: Verifying language assignments...");
    const englishPages = legalPages.filter(p => p.language?.value === "en-US");
    const germanPages = legalPages.filter(p => p.language?.value === "de-DE");

    if (englishPages.length !== 2 || germanPages.length !== 2) {
      console.error(`❌ Expected 2 English and 2 German pages`);
      console.log(`Found: ${englishPages.length} English, ${germanPages.length} German`);
      return;
    }
    console.log("✓ Language assignments correct (2 English, 2 German)");

    // Test 4: Verify English page slugs
    console.log("\nTest 4: Verifying English slugs...");
    const englishSlugs = englishPages.map(p => p.slug).sort();
    const expectedEnglishSlugs = ["privacy-policy", "terms"];

    if (JSON.stringify(englishSlugs) !== JSON.stringify(expectedEnglishSlugs)) {
      console.error(`❌ English slugs mismatch`);
      console.log("Expected:", expectedEnglishSlugs);
      console.log("Found:", englishSlugs);
      return;
    }
    console.log("✓ English slugs correct:", englishSlugs.join(", "));

    // Test 5: Verify German page slugs
    console.log("\nTest 5: Verifying German slugs...");
    const germanSlugs = germanPages.map(p => p.slug).sort();
    const expectedGermanSlugs = ["datenschutz", "impressum"];

    if (JSON.stringify(germanSlugs) !== JSON.stringify(expectedGermanSlugs)) {
      console.error(`❌ German slugs mismatch`);
      console.log("Expected:", expectedGermanSlugs);
      console.log("Found:", germanSlugs);
      return;
    }
    console.log("✓ German slugs correct:", germanSlugs.join(", "));

    // Test 6: Verify content structure
    console.log("\nTest 6: Verifying content structure...");
    for (const page of legalPages) {
      const hasMarkdownHeaders = page.description.includes("#");
      const hasMultipleSections = page.description.split("**").length > 3;

      if (!hasMarkdownHeaders || !hasMultipleSections) {
        console.error(`❌ Page ${page.slug} doesn't appear to have proper markdown structure`);
        return;
      }
    }
    console.log("✓ All pages have proper markdown structure");

    // Test 7: Display summary
    console.log("\n📊 Legal Pages Summary:");
    console.log("─".repeat(80));
    for (const page of legalPages) {
      const contentPreview = page.description.substring(0, 50).replace(/\n/g, " ");
      console.log(`  ${page.slug.padEnd(20)} | ${page.language?.value} | ${page.title}`);
      console.log(`    Content: ${contentPreview}...`);
      console.log(`    Length: ${page.description.length} characters`);
      console.log();
    }
    console.log("─".repeat(80));

    // All tests passed
    console.log("\n✅ All tests passed! Legal pages are seeded correctly.\n");

  } catch (error) {
    console.error("\n❌ Test failed with error:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run tests
testLegalPages().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
