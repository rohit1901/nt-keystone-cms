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
 *   - Clear PageContents by slug:
 *       ts-node --transpile-only ./seed/clear.ts --pages privacy-policy terms-of-service
 *   - Clear all images:
 *       ts-node --transpile-only ./seed/clear.ts --images
 *   - Clear all types (slugs):
 *       ts-node --transpile-only ./seed/clear.ts --types
 *   - Clear all CTAs and CTA sections:
 *       ts-node --transpile-only ./seed/clear.ts --ctas
 *   - Clear all languages:
 *       ts-node --transpile-only ./seed/clear.ts --languages
 *   - Clear all testimonials:
 *       ts-node --transpile-only ./seed/clear.ts --testimonials
 *   - Clear all heroes:
 *       ts-node --transpile-only ./seed/clear.ts --heroes
 *   - Clear all benefits:
 *       ts-node --transpile-only ./seed/clear.ts --benefits
 *   - Clear all FAQs:
 *       ts-node --transpile-only ./seed/clear.ts --faqs
 *   - Clear all certifications:
 *       ts-node --transpile-only ./seed/clear.ts --certifications
 *   - Clear all features:
 *       ts-node --transpile-only ./seed/clear.ts --features
 * - Clear all maps:
 *       ts-node --transpile-only ./seed/clear.ts --maps
 * - Clear all approaches:
 *       ts-node --transpile-only ./seed/clear.ts --approaches
 * - Clear all about sections:
 *       ts-node --transpile-only ./seed/clear.ts --about
 * - Clear all analytics:
 *       ts-node --transpile-only ./seed/clear.ts --analytics
 * - Clear all navigation:
 *       ts-node --transpile-only ./seed/clear.ts --navigation
 * - Clear all footer:
 *       ts-node --transpile-only ./seed/clear.ts --footer
 *
 * Notes:
 * - Each seed config module is expected to export a default object with a `clear(prisma)` function.
 * - The module resolution path is `./seed/components/<name>`. For example, `resume` -> `./seed/components/resume.ts`.
 * - If a given config does not export `clear`, this script will skip it and report the issue.
 * - The --pages flag allows you to delete specific PageContent records by their slug.
 * - The --images flag allows you to delete all Image records from the database.
 * - The --types flag allows you to delete all Type records (slugs) from the database.
 * - The --ctas flag allows you to delete all CTA and CtaSection records from the database.
 * - The --languages flag allows you to delete all Language records from the database.
 * - The --testimonials flag allows you to delete all Testimonial records from the database.
 * - The --heroes flag allows you to delete all Hero records from the database.
 * - The --benefits flag allows you to delete all Benefit records from the database.
 * - The --faqs flag allows you to delete all FAQ records from the database.
 * - The --certifications flag allows you to delete all Certification records from the database.
 * - The --features flag allows you to delete all Feature records from the database.
 * - The --maps flag allows you to delete all Map records from the database.
 * - The --approaches flag allows you to delete all Approach records from the database.
 * - The --about flag allows you to delete all About sections and values from the database.
 * - The --analytics flag allows you to delete all Analytics sections, stats, and summary items from the database.
 * - The --navigation flag allows you to delete all Navigation sections and links from the database.
 * - The --footer flag allows you to delete all Footer sections, links, and keys from the database.
 * - The --resume flag allows you to delete all Resume data from the database.
 * - The --page-contents flag allows you to delete all PageContent and Section records from the database.
 */

type SeedModule = {
  clear?: (prisma: PrismaClient) => Promise<void>;
  [key: string]: unknown;
};

const DEFAULT_COMPONENTS = [
  'resume',
  'images',
  'slugs',
  'ctas',
  'languages',
  'testimonials',
  'heroes',
  'benefits',
  'faqs',
  'certifications',
  'features',
  'maps',
  'approaches',
  'about',
  'analytics',
  'navigation',
  'footer',
  'resume',
  'pageContents',
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

async function clearPagesBySlug(prisma: PrismaClient, slugs: string[]): Promise<void> {
  console.log(`Clearing PageContents with slugs: ${slugs.join(', ')}...`);
  const result = await prisma.pageContent.deleteMany({
    where: {
      slug: {
        in: slugs,
      },
    },
  });
  console.log(`Deleted ${result.count} PageContent record(s).`);
}

async function clearImages(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all images...');
  const result = await prisma.image.deleteMany({});
  console.log(`Deleted ${result.count} image(s).`);
}

async function clearTypes(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all types (slugs)...');
  const result = await prisma.type.deleteMany({});
  console.log(`Deleted ${result.count} type(s).`);
}

async function clearCtas(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all CTA sections...');
  const sectionsResult = await prisma.ctaSection.deleteMany({});
  console.log(`Deleted ${sectionsResult.count} CTA section(s).`);

  console.log('Clearing all CTAs...');
  const ctasResult = await prisma.cta.deleteMany({});
  console.log(`Deleted ${ctasResult.count} CTA(s).`);
}

async function clearLanguages(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all languages...');
  const result = await prisma.language.deleteMany({});
  console.log(`Deleted ${result.count} language(s).`);
}

async function clearTestimonials(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all testimonial sections...');
  const sectionsResult = await prisma.testimonialSection.deleteMany({});
  console.log(`Deleted ${sectionsResult.count} testimonial section(s).`);

  console.log('Clearing all testimonial items...');
  const itemsResult = await prisma.testimonialItem.deleteMany({});
  console.log(`Deleted ${itemsResult.count} testimonial item(s).`);

  console.log('Clearing all testimonial badges...');
  const badgesResult = await prisma.testimonialBadge.deleteMany({});
  console.log(`Deleted ${badgesResult.count} testimonial badge(s).`);
}

async function clearHeroes(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all heroes...');
  const heroesResult = await prisma.hero.deleteMany({});
  console.log(`Deleted ${heroesResult.count} hero section(s).`);

  console.log('Clearing all hero banners...');
  const bannersResult = await prisma.heroBanner.deleteMany({});
  console.log(`Deleted ${bannersResult.count} hero banner(s).`);

  console.log('Clearing all hero banner additionals...');
  const additionalsResult = await prisma.heroBannerAdditional.deleteMany({});
  console.log(`Deleted ${additionalsResult.count} hero banner additional(s).`);
}

async function clearBenefits(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all benefit sections...');
  const sectionsResult = await prisma.benefitSection.deleteMany({});
  console.log(`Deleted ${sectionsResult.count} benefit section(s).`);

  console.log('Clearing all benefits...');
  const benefitsResult = await prisma.benefit.deleteMany({});
  console.log(`Deleted ${benefitsResult.count} benefit(s).`);
}

async function clearFaqs(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all FAQ sections...');
  const sectionsResult = await prisma.faqSection.deleteMany({});
  console.log(`Deleted ${sectionsResult.count} FAQ section(s).`);

  console.log('Clearing all FAQs...');
  const faqsResult = await prisma.faq.deleteMany({});
  console.log(`Deleted ${faqsResult.count} FAQ(s).`);
}

async function clearCertifications(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all certification sections...');
  const sectionsResult = await prisma.certificationSection.deleteMany({});
  console.log(`Deleted ${sectionsResult.count} certification section(s).`);

  console.log('Clearing all certifications...');
  const certificationsResult = await prisma.certification.deleteMany({});
  console.log(`Deleted ${certificationsResult.count} certification(s).`);
}

async function clearFeatures(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all features...');
  const result = await prisma.feature.deleteMany({});
  console.log(`Deleted ${result.count} feature(s).`);
}

async function clearMaps(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all maps...');
  const result = await prisma.map.deleteMany({});
  console.log(`Deleted ${result.count} map(s).`);
}

async function clearApproaches(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all approaches...');
  const approachesResult = await prisma.approach.deleteMany({});
  console.log(`Deleted ${approachesResult.count} approach(es).`);

  console.log('Clearing all approach steps...');
  const stepsResult = await prisma.approachStep.deleteMany({});
  console.log(`Deleted ${stepsResult.count} approach step(s).`);
}

async function clearAbout(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all about sections...');
  const aboutResult = await prisma.about.deleteMany({});
  console.log(`Deleted ${aboutResult.count} about section(s).`);

  console.log('Clearing all about values...');
  const valuesResult = await prisma.value.deleteMany({});
  console.log(`Deleted ${valuesResult.count} value(s).`);
}

async function clearAnalytics(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all analytics sections...');
  const analyticsResult = await prisma.analytic.deleteMany({});
  console.log(`Deleted ${analyticsResult.count} analytics section(s).`);

  console.log('Clearing all analytics stats...');
  const statsResult = await prisma.analyticsStat.deleteMany({});
  console.log(`Deleted ${statsResult.count} analytics stat(s).`);

  console.log('Clearing all analytics summary items...');
  const summaryResult = await prisma.analyticsSummaryItem.deleteMany({});
  console.log(`Deleted ${summaryResult.count} analytics summary item(s).`);
}

async function clearNavigation(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all navigation sections...');
  const navigationResult = await prisma.navigation.deleteMany({});
  console.log(`Deleted ${navigationResult.count} navigation section(s).`);

  console.log('Clearing all navigation links...');
  const linksResult = await prisma.navigationLink.deleteMany({});
  console.log(`Deleted ${linksResult.count} navigation link(s).`);
}

async function clearResume(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all resume data...');

  const resumeResult = await prisma.resume.deleteMany({});
  console.log(`Deleted ${resumeResult.count} resume(s).`);

  const basicInfoResult = await prisma.resumeBasicInformation.deleteMany({});
  console.log(`Deleted ${basicInfoResult.count} resume basic information record(s).`);

  const workResult = await prisma.resumeWork.deleteMany({});
  console.log(`Deleted ${workResult.count} resume work record(s).`);

  const volunteerResult = await prisma.resumeVolunteer.deleteMany({});
  console.log(`Deleted ${volunteerResult.count} resume volunteer record(s).`);

  const educationResult = await prisma.resumeEducation.deleteMany({});
  console.log(`Deleted ${educationResult.count} resume education record(s).`);

  const awardResult = await prisma.resumeAward.deleteMany({});
  console.log(`Deleted ${awardResult.count} resume award(s).`);

  const publicationResult = await prisma.resumePublication.deleteMany({});
  console.log(`Deleted ${publicationResult.count} resume publication(s).`);

  const skillResult = await prisma.resumeSkill.deleteMany({});
  console.log(`Deleted ${skillResult.count} resume skill(s).`);

  const languageResult = await prisma.resumeLanguage.deleteMany({});
  console.log(`Deleted ${languageResult.count} resume language(s).`);

  const interestResult = await prisma.resumeInterest.deleteMany({});
  console.log(`Deleted ${interestResult.count} resume interest(s).`);

  const referenceResult = await prisma.resumeReference.deleteMany({});
  console.log(`Deleted ${referenceResult.count} resume reference(s).`);

  const projectResult = await prisma.resumeProject.deleteMany({});
  console.log(`Deleted ${projectResult.count} resume project(s).`);

  const locationResult = await prisma.resumeLocation.deleteMany({});
  console.log(`Deleted ${locationResult.count} resume location(s).`);

  const profileResult = await prisma.resumeProfile.deleteMany({});
  console.log(`Deleted ${profileResult.count} resume profile(s).`);

  const highlightResult = await prisma.resumeHighlight.deleteMany({});
  console.log(`Deleted ${highlightResult.count} resume highlight(s).`);
}

async function clearPageContents(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all page contents...');

  const sectionsResult = await prisma.section.deleteMany({});
  console.log(`Deleted ${sectionsResult.count} section(s).`);

  const pageContentsResult = await prisma.pageContent.deleteMany({});
  console.log(`Deleted ${pageContentsResult.count} page content(s).`);
}

async function clearFooter(prisma: PrismaClient): Promise<void> {
  console.log('Clearing all footers...');
  const footerResult = await prisma.footer.deleteMany({});
  console.log(`Deleted ${footerResult.count} footer(s).`);

  console.log('Clearing all footer sections...');
  const footerSectionResult = await prisma.footerSection.deleteMany({});
  console.log(`Deleted ${footerSectionResult.count} footer section(s).`);

  console.log('Clearing footer navigation links...');
  const footerSlug = await prisma.type.findFirst({
    where: { label: 'footer' },
  });
  if (footerSlug) {
    const linksResult = await prisma.navigationLink.deleteMany({
      where: { typeId: footerSlug.id },
    });
    console.log(`Deleted ${linksResult.count} footer navigation link(s).`);
  }

  console.log('Clearing footer section keys...');
  const keysResult = await prisma.footerSectionKey.deleteMany({});
  console.log(`Deleted ${keysResult.count} footer section key(s).`);
}

async function main() {
  const args = process.argv.slice(2);
  const prisma = new PrismaClient();

  // Check for --footer flag
  const footerFlag = args.includes('--footer');
  if (footerFlag) {
    try {
      await clearFooter(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --page-contents flag
  const pageContentsFlag = args.includes('--page-contents');
  if (pageContentsFlag) {
    try {
      await clearPageContents(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --resume flag
  const resumeFlag = args.includes('--resume');
  if (resumeFlag) {
    try {
      await clearResume(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --navigation flag
  const navigationFlag = args.includes('--navigation');
  if (navigationFlag) {
    try {
      await clearNavigation(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --analytics flag
  const analyticsFlag = args.includes('--analytics');
  if (analyticsFlag) {
    try {
      await clearAnalytics(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --about flag
  const aboutFlag = args.includes('--about');
  if (aboutFlag) {
    try {
      await clearAbout(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --approaches flag
  const approachesFlag = args.includes('--approaches');
  if (approachesFlag) {
    try {
      await clearApproaches(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --maps flag
  const mapsFlag = args.includes('--maps');
  if (mapsFlag) {
    try {
      await clearMaps(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --features flag
  const featuresFlag = args.includes('--features');
  if (featuresFlag) {
    try {
      await clearFeatures(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --certifications flag
  const certificationsFlag = args.includes('--certifications');
  if (certificationsFlag) {
    try {
      await clearCertifications(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --faqs flag
  const faqsFlag = args.includes('--faqs');
  if (faqsFlag) {
    try {
      await clearFaqs(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --benefits flag
  const benefitsFlag = args.includes('--benefits');
  if (benefitsFlag) {
    try {
      await clearBenefits(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --heroes flag
  const heroesFlag = args.includes('--heroes');
  if (heroesFlag) {
    try {
      await clearHeroes(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --testimonials flag
  const testimonialsFlag = args.includes('--testimonials');
  if (testimonialsFlag) {
    try {
      await clearTestimonials(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --languages flag
  const languagesFlag = args.includes('--languages');
  if (languagesFlag) {
    try {
      await clearLanguages(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --ctas flag
  const ctasFlag = args.includes('--ctas');
  if (ctasFlag) {
    try {
      await clearCtas(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --types flag
  const typesFlag = args.includes('--types');
  if (typesFlag) {
    try {
      await clearTypes(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --images flag
  const imagesFlag = args.includes('--images');
  if (imagesFlag) {
    try {
      await clearImages(prisma);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

  // Check for --pages flag
  const pagesIndex = args.indexOf('--pages');
  if (pagesIndex !== -1) {
    const slugs = args.slice(pagesIndex + 1).filter(a => !a.startsWith('-'));
    if (slugs.length === 0) {
      console.log('No slugs specified with --pages flag.');
      console.log('Usage:');
      console.log('  ts-node --transpile-only ./seed/clear.ts --pages <slug1> [slug2...]');
      process.exit(0);
    }
    try {
      await clearPagesBySlug(prisma, slugs);
      console.log('Clear operation completed.');
    } catch (err) {
      console.error('Error during clear operation:', err);
      process.exitCode = 1;
    } finally {
      await prisma.$disconnect();
    }
    return;
  }

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
    console.log('  ts-node --transpile-only ./seed/clear.ts --pages <slug1> [slug2...]');
    console.log('  ts-node --transpile-only ./seed/clear.ts --images');
    console.log('  ts-node --transpile-only ./seed/clear.ts --types');
    console.log('  ts-node --transpile-only ./seed/clear.ts --ctas');
    console.log('  ts-node --transpile-only ./seed/clear.ts --languages');
    console.log('  ts-node --transpile-only ./seed/clear.ts --testimonials');
    console.log('  ts-node --transpile-only ./seed/clear.ts --heroes');
    console.log('  ts-node --transpile-only ./seed/clear.ts --benefits');
    console.log('  ts-node --transpile-only ./seed/clear.ts --faqs');
    console.log('  ts-node --transpile-only ./seed/clear.ts --certifications');
    console.log('  ts-node --transpile-only ./seed/clear.ts --features');
    console.log('  ts-node --transpile-only ./seed/clear.ts --maps');
    console.log('  ts-node --transpile-only ./seed/clear.ts --approaches');
    console.log('  ts-node --transpile-only ./seed/clear.ts --about');
    console.log('  ts-node --transpile-only ./seed/clear.ts --analytics');
    console.log('  ts-node --transpile-only ./seed/clear.ts --navigation');
    console.log('  ts-node --transpile-only ./seed/clear.ts --footer');
    console.log('  ts-node --transpile-only ./seed/clear.ts --resume');
    console.log('  ts-node --transpile-only ./seed/clear.ts --page-contents');
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
