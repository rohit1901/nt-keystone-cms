import { PrismaClient } from '@prisma/client';

/**
 * Generic clear script that can clear any seed config by name.
 *
 * Usage examples:
 *   - Clear a single config by name:
 *       ts-node --transpile-only ./seed/clear.ts resume
 *   - Clear multiple configs:
 *       ts-node --transpile-only ./seed/clear.ts resume analytics navigation
 *   - Clear all known configs (best-effort):
 *       ts-node --transpile-only ./seed/clear.ts --all
 *
 * Notes:
 * - Each seed config module is expected to export a default object with a `clear(prisma)` function.
 * - The module resolution path is `./seed/components/<name>`. For example, `resume` -> `./seed/components/resume.ts`.
 * - If a given config does not export `clear`, this script will skip it and report the issue.
 */

type SeedModule = {
  clear?: (prisma: PrismaClient) => Promise<void>;
  [key: string]: unknown;
};

const DEFAULT_COMPONENTS = [
  'resume',
  // Add other component names here as you create clear() APIs for them:
  // 'analytics',
  // 'navigation',
  // 'certifications',
  // 'faq',
  // 'hero',
  // 'map',
  // etc.
];

async function loadSeedModule(name: string): Promise<SeedModule | null> {
  try {
    // Resolve relative to this script location; assumes this file lives in nt-keystone-cms/seed/clear.ts
    const modulePath = `./components/${name}`;
    const mod = await import(modulePath);
    // Default export is expected
    const exported = (mod?.default ?? mod) as SeedModule;
    return exported;
  } catch (err) {
    console.error(`Failed to load seed component "${name}":`, err);
    return null;
  }
}

async function clearComponent(prisma: PrismaClient, name: string): Promise<void> {
  const mod = await loadSeedModule(name);
  if (!mod) {
    console.warn(`Skipping "${name}": module could not be loaded.`);
    return;
  }
  if (typeof mod.clear !== 'function') {
    console.warn(`Skipping "${name}": clear() function not found in module.`);
    return;
  }
  console.log(`Clearing "${name}"...`);
  await mod.clear!(prisma);
  console.log(`Cleared "${name}".`);
}

async function main() {
  const args = process.argv.slice(2);
  const prisma = new PrismaClient();

  // Determine target components to clear
  const isAll = args.includes('--all');
  const explicitNames = args.filter(a => !a.startsWith('-'));

  const componentsToClear = isAll
    ? DEFAULT_COMPONENTS
    : explicitNames.length > 0
      ? explicitNames
      : [];

  if (componentsToClear.length === 0) {
    console.log('No components specified to clear.');
    console.log('Usage:');
    console.log('  ts-node --transpile-only ./seed/clear.ts <componentName> [moreNames...]');
    console.log('  ts-node --transpile-only ./seed/clear.ts --all');
    process.exit(0);
  }

  try {
    for (const name of componentsToClear) {
      await clearComponent(prisma, name);
    }
    console.log('Clear operation completed.');
  } catch (err) {
    console.error('Error during clear operation:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
