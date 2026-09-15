import { PrismaClient } from "../prisma";
import { faqData, faqSectionsData } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededFAQs = Awaited<ReturnType<typeof seed>>;
export type SeededFaqSections = Awaited<ReturnType<typeof seedSections>>;

const seed = async (prisma: PrismaClient, languages: SeededFooterLanguages) => {
  const languageIdByValue = new Map(
    languages.map((language) => [language.value, language.id]),
  );
  const faqKeys = faqData.flatMap((faq) => {
    const languageId = languageIdByValue.get(faq.language.value);
    return languageId ? [{ question: faq.question, languageId }] : [];
  });

  // Get only existing FAQs matching known seed keys.
  const existingFaqs = await prisma.faq.findMany({
    where: { OR: faqKeys },
    select: { id: true, question: true, languageId: true },
  });

  // Create unique keys based on question + languageId
  const existingFaqKeys = new Set(
    existingFaqs.map((faq) => `${faq.question}|${faq.languageId}`)
  );

  // Filter out FAQs that already exist
  const faqsToCreate = faqData
    .map((faq) => {
      const languageId = languageIdByValue.get(faq.language.value);

      if (!languageId) {
        console.warn(`! Language not found: ${faq.language.value}`);
        return null;
      }

      return {
        question: faq.question,
        answer: faq.answer,
        languageId,
        key: `${faq.question}|${languageId}`,
      };
    })
    .filter((faq): faq is NonNullable<typeof faq> => faq !== null)
    .filter(({ key }) => !existingFaqKeys.has(key));

  let newFaqsCount = 0;
  let seededFaqs = [...existingFaqs];

  if (faqsToCreate.length > 0) {
    const newFaqs = await prisma.faq.createManyAndReturn({
      data: faqsToCreate.map(({ key, ...data }) => data),
    });
    newFaqsCount = newFaqs.length;
    seededFaqs = [...existingFaqs, ...newFaqs];
    console.log(`✓ Created ${newFaqsCount} new FAQ(s)`);
  } else {
    console.log(`✓ All FAQs already exist, skipping creation`);
  }

  console.log(`✓ Total FAQs in database: ${seededFaqs.length}`);
  return seededFaqs;
};

const seedSections = async (
  prisma: PrismaClient,
  languages: SeededFooterLanguages,
) => {
  // First seed all FAQs
  const allSeededFaqs = await seed(prisma, languages);

  const languageIdByValue = new Map(
    languages.map((language) => [language.value, language.id]),
  );
  const sectionKeys = faqSectionsData.flatMap((section) => {
    const languageId = languageIdByValue.get(section.language.value);
    return languageId ? [{ title: section.title, languageId }] : [];
  });

  // Get only existing FAQ sections matching known seed keys.
  const existingSections = await prisma.faqSection.findMany({
    where: { OR: sectionKeys },
    select: { id: true, title: true, languageId: true },
  });

  // Create unique keys based on title + languageId
  const existingSectionKeys = new Set(
    existingSections.map((section) => `${section.title}|${section.languageId}`)
  );

  // Filter out sections that already exist
  const sectionsToCreate = faqSectionsData.filter((section) => {
    const languageId = languageIdByValue.get(section.language.value);
    const key = `${section.title}|${languageId}`;
    return !existingSectionKeys.has(key);
  });

  let newSectionsCount = 0;
  const seededSections = [...existingSections];

  if (sectionsToCreate.length > 0) {
    const newSections = await Promise.all(
      sectionsToCreate.map((section) => {
        const languageId = languageIdByValue.get(section.language.value);

        if (!languageId) {
          console.warn(`! Language not found: ${section.language.value}`);
          return null;
        }

        // Filter the seeded FAQs to find matches for this section's language
        const relevantFaqs = allSeededFaqs.filter(
          (faq) => faq.languageId === languageId,
        );

        return prisma.faqSection.create({
          data: {
            title: section.title,
            description: section.description,
            languageId,
            faqs: {
              connect: relevantFaqs.map((faq) => ({ id: faq.id })),
            },
          },
        });
      })
    );

    const validSections = newSections.filter(
      (section): section is NonNullable<typeof section> => section !== null
    );
    newSectionsCount = validSections.length;
    seededSections.push(...validSections);
    console.log(`✓ Created ${newSectionsCount} new FAQ section(s)`);
  } else {
    console.log(`✓ All FAQ sections already exist, skipping creation`);
  }

  console.log(`✓ Total FAQ sections in database: ${seededSections.length}`);
  return seededSections;
};

const clear = async (prisma: PrismaClient) => {
  console.log('Clearing all FAQ sections...');
  const sectionsResult = await prisma.faqSection.deleteMany({});
  console.log(`✓ Deleted ${sectionsResult.count} FAQ section(s)`);

  console.log('Clearing all FAQs...');
  const faqsResult = await prisma.faq.deleteMany({});
  console.log(`✓ Deleted ${faqsResult.count} FAQ(s)`);
};

const FAQs = {
  data: faqSectionsData,
  seed,
  seedSections,
  clear,
};

export default FAQs;
