/**
 * Test Script to Verify Legal Files Loading
 *
 * This script tests that the markdown files can be loaded correctly
 * before running the actual seed.
 *
 * Usage:
 *   npx tsx seed/components/testLegalFilesLoading.ts
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";

const LEGAL_FILES = [
  { file: "impressum-en.md", slug: "terms", language: "English" },
  { file: "impressum-de.md", slug: "impressum", language: "German" },
  { file: "datenschutz-en.md", slug: "privacy-policy", language: "English" },
  { file: "datenschutz-de.md", slug: "datenschutz", language: "German" },
];

function testLegalFilesLoading() {
  console.log("\n🧪 Testing Legal Files Loading...\n");

  let allTestsPassed = true;

  for (const { file, slug, language } of LEGAL_FILES) {
    const filePath = join(process.cwd(), "legal", file);

    // Test 1: File exists
    if (!existsSync(filePath)) {
      console.error(`❌ File not found: ${file}`);
      console.error(`   Expected path: ${filePath}`);
      allTestsPassed = false;
      continue;
    }
    console.log(`✓ File exists: ${file}`);

    // Test 2: File can be read
    try {
      const content = readFileSync(filePath, "utf-8");

      // Test 3: File is not empty
      if (!content || content.trim().length === 0) {
        console.error(`❌ File is empty: ${file}`);
        allTestsPassed = false;
        continue;
      }
      console.log(`✓ File can be read: ${file} (${content.length} chars)`);

      // Test 4: File contains markdown header
      if (!content.includes("#")) {
        console.error(`❌ File doesn't appear to contain markdown: ${file}`);
        allTestsPassed = false;
        continue;
      }
      console.log(`✓ File contains markdown: ${file}`);

      // Test 5: File has reasonable content length
      if (content.length < 100) {
        console.error(`❌ File seems too short: ${file} (${content.length} chars)`);
        allTestsPassed = false;
        continue;
      }
      console.log(`✓ File has reasonable length: ${file}`);

      // Test 6: Display file info
      const lines = content.split("\n").length;
      const firstLine = content.split("\n")[0].trim();
      console.log(`  → ${lines} lines, starts with: "${firstLine}"`);
      console.log(`  → Will be used for slug: "${slug}" (${language})\n`);
    } catch (error) {
      console.error(`❌ Error reading file ${file}:`, error);
      allTestsPassed = false;
    }
  }

  console.log("─".repeat(80));

  if (allTestsPassed) {
    console.log("\n✅ All tests passed! Legal files can be loaded successfully.\n");
    console.log("You can now run: npm run db:seed legalPages\n");
    process.exit(0);
  } else {
    console.error("\n❌ Some tests failed. Please check the errors above.\n");
    process.exit(1);
  }
}

testLegalFilesLoading();
