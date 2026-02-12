import { PrismaClient } from "@prisma/client";
import { FAQ, FaqSection } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededFAQs = Awaited<ReturnType<typeof seed>>;
export type SeededFaqSections = Awaited<ReturnType<typeof seedSections>>;

// --- FAQ data ---
export const faqs: FAQ[] = [
  // English FAQs (en-US)
  {
    question: "Who is Nimbus Tech a good fit for?",
    answer:
      "We primarily work with small and medium-sized businesses and startups that want to use AWS more effectively – for new products, migrations, or to stabilize and optimize existing setups.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    question: "Do you only work with AWS?",
    answer:
      "Our clear focus is AWS. We may connect to other platforms or tools if needed, but our consulting, architecture, and operations work is centered on AWS.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    question: "How does a typical engagement start?",
    answer:
      "We usually start with a free 15-minute call to understand your situation. After that, we can offer a short assessment or architecture review and then define a concrete project scope with timeline and budget.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    question: "Can you help if we already use AWS?",
    answer:
      "Yes. Many clients come to us with an existing AWS setup that has grown over time. We review your environment, highlight risks and opportunities, and then help you clean up, secure, and optimize costs.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    question: "How do you charge for your services?",
    answer:
      "We offer fixed-price packages for assessments and clearly scoped projects, and transparent day rates for ongoing support. Together we choose the model that fits your budget and decision process.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    question: "Do you provide ongoing support after a project?",
    answer:
      "If you wish, we stay on as your AWS partner for monitoring, incident response, and continuous improvements. We can also train your internal team so they become more self-sufficient over time.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  // German FAQs (de-DE)
  {
    question: "Für welche Unternehmen ist Nimbus Tech geeignet?",
    answer:
      "Wir arbeiten vor allem mit kleinen und mittelständischen Unternehmen sowie Start-ups, die AWS gezielt einsetzen möchten – für neue Produkte, Migrationen oder die Stabilisierung bestehender Umgebungen.",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    question: "Arbeiten Sie ausschließlich mit AWS?",
    answer:
      "Unser klarer Schwerpunkt ist AWS. Wo nötig binden wir andere Plattformen oder Tools an, aber unsere Beratung, Architektur und der Betrieb sind auf AWS ausgerichtet.",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    question: "Wie startet eine Zusammenarbeit typischerweise?",
    answer:
      "In der Regel beginnen wir mit einem kostenlosen 15-minütigen Gespräch, um Ihre Situation zu verstehen. Darauf folgt bei Bedarf ein kompaktes Assessment oder Architektur-Review, aus dem wir ein konkretes Projektangebot mit Umfang, Zeitplan und Budget ableiten.",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    question: "Unterstützen Sie auch bestehende AWS-Setups?",
    answer:
      "Ja. Viele Kund:innen kommen mit gewachsenen AWS-Umgebungen zu uns. Wir analysieren Ihre Umgebung, zeigen Risiken und Chancen auf und helfen anschließend bei Aufräumen, Absicherung und Kostenoptimierung.",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    question: "Wie berechnen Sie Ihre Leistungen?",
    answer:
      "Für Assessments und klar umrissene Projekte bieten wir Festpreise an, für laufende Unterstützung transparente Tagessätze. Gemeinsam wählen wir das Modell, das zu Ihrem Budget und Entscheidungsprozess passt.",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    question: "Bieten Sie laufende Betreuung an?",
    answer:
      "Auf Wunsch bleiben wir als AWS-Partner an Ihrer Seite – für Monitoring, Incident-Response und kontinuierliche Verbesserungen. Außerdem können wir Ihr internes Team gezielt weiterbilden.",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
];

// --- FAQ Section data ---
export const faqSections: FaqSection[] = [
  {
    title: "Frequently Asked Questions",
    description:
      "Find answers to common questions about our AWS cloud consulting, migration projects, and how we work with SMEs and startups.",
    faqs: faqs.filter((faq) => faq.language.value === "en-US"),
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    title: "Häufige Fragen",
    description:
      "Antworten auf typische Fragen zu unserer AWS-Cloud-Beratung, Migrationsprojekten und der Zusammenarbeit mit KMU und Start-ups.",
    faqs: faqs.filter((faq) => faq.language.value === "de-DE"),
    language: {
      label: "German",
      value: "de-DE",
    },
  },
];

const seed = async (prisma: PrismaClient, languages: SeededFooterLanguages) => {
  // Get all existing FAQs to check for duplicates
  const existingFaqs = await prisma.faq.findMany({
    select: { id: true, question: true, answer: true, languageId: true },
  });

  // Create unique keys based on question + languageId
  const existingFaqKeys = new Set(
    existingFaqs.map((faq) => `${faq.question}|${faq.languageId}`)
  );

  // Filter out FAQs that already exist
  const faqsToCreate = faqs
    .map((faq) => {
      const languageId = languages.find((l) => l.value === faq.language.value)?.id;

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

  // Get all existing FAQ sections to check for duplicates
  const existingSections = await prisma.faqSection.findMany({
    select: { id: true, title: true, languageId: true },
  });

  // Create unique keys based on title + languageId
  const existingSectionKeys = new Set(
    existingSections.map((section) => `${section.title}|${section.languageId}`)
  );

  // Filter out sections that already exist
  const sectionsToCreate = faqSections.filter((section) => {
    const languageId = languages.find((l) => l.value === section.language.value)?.id;
    const key = `${section.title}|${languageId}`;
    return !existingSectionKeys.has(key);
  });

  let newSectionsCount = 0;
  const seededSections = [...existingSections];

  if (sectionsToCreate.length > 0) {
    const newSections = await Promise.all(
      sectionsToCreate.map((section) => {
        const lang = languages.find((l) => l.value === section.language.value);

        if (!lang) {
          console.warn(`! Language not found: ${section.language.value}`);
          return null;
        }

        // Filter the seeded FAQs to find matches for this section's language
        const relevantFaqs = allSeededFaqs.filter(
          (f) => f.languageId === lang.id,
        );

        return prisma.faqSection.create({
          data: {
            title: section.title,
            description: section.description,
            languageId: lang.id,
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
  data: faqSections,
  seed,
  seedSections,
  clear,
};

export default FAQs;
