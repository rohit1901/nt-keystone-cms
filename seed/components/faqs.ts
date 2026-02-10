import { PrismaClient } from "@prisma/client";
import { FAQ, FaqSection } from "../../data";
import { SeededFooterLanguages } from "./footer";

export type SeededFAQs = Awaited<ReturnType<typeof seed>>;
export type SeededFaqSections = Awaited<ReturnType<typeof seedSections>>;

// --- FAQ data ---
export const faqs: FAQ[] = [
  // English FAQs (en-US)
  {
    question: "What cloud platforms do you support?",
    answer:
      "We specialize in AWS but also work with Azure, Google Cloud, and multi-cloud architectures.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity, but we typically deliver MVPs within 8-12 weeks.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes, we offer maintenance, monitoring, and support packages tailored to your needs.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    question: "What industries do you serve?",
    answer:
      "We work with clients across various industries including fintech, healthcare, e-commerce, and SaaS.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    question: "Can you help migrate existing applications to the cloud?",
    answer:
      "Absolutely! We have extensive experience in cloud migration strategies and implementations.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    question: "What is your development approach?",
    answer:
      "We follow agile methodologies with iterative development, continuous feedback, and regular deliverables.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    question: "Do you offer consulting services?",
    answer:
      "Yes, we provide architecture reviews, technology assessments, and strategic consulting services.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    question: "How do you ensure code quality?",
    answer:
      "We implement automated testing, code reviews, CI/CD pipelines, and follow industry best practices.",
    language: {
      label: "English",
      value: "en-US",
    },
  },
  // German FAQs (de-DE)
  {
    question: "Welche Cloud-Plattformen unterstützen Sie?",
    answer:
      "Wir sind auf AWS spezialisiert, arbeiten aber auch mit Azure, Google Cloud und Multi-Cloud-Architekturen.",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    question: "Wie lange dauert ein typisches Projekt?",
    answer:
      "Die Projektlaufzeiten variieren je nach Komplexität, aber wir liefern MVPs typischerweise innerhalb von 8-12 Wochen.",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    question: "Bieten Sie laufenden Support an?",
    answer:
      "Ja, wir bieten auf Ihre Bedürfnisse zugeschnittene Wartungs-, Überwachungs- und Supportpakete an.",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    question: "Welche Branchen bedienen Sie?",
    answer:
      "Wir arbeiten mit Kunden aus verschiedenen Branchen, darunter Fintech, Gesundheitswesen, E-Commerce und SaaS.",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    question:
      "Können Sie bei der Migration bestehender Anwendungen in die Cloud helfen?",
    answer:
      "Absolut! Wir verfügen über umfangreiche Erfahrung mit Cloud-Migrationsstrategien und deren Umsetzung.",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    question: "Was ist Ihr Entwicklungsansatz?",
    answer:
      "Wir folgen agilen Methoden mit iterativer Entwicklung, kontinuierlichem Feedback und regelmäßigen Lieferungen.",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    question: "Bieten Sie Beratungsdienste an?",
    answer:
      "Ja, wir bieten Architektur-Reviews, Technologie-Bewertungen und strategische Beratungsdienste an.",
    language: {
      label: "German",
      value: "de-DE",
    },
  },
  {
    question: "Wie stellen Sie die Codequalität sicher?",
    answer:
      "Wir setzen auf automatisierte Tests, Code-Reviews, CI/CD-Pipelines und befolgen Best Practices der Branche.",
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
      "Find answers to common questions about our cloud engineering services, development approach, and how we can help your business succeed.",
    faqs: faqs.filter((faq) => faq.language.value === "en-US"),
    language: {
      label: "English",
      value: "en-US",
    },
  },
  {
    title: "Häufig gestellte Fragen",
    description:
      "Finden Sie Antworten auf häufig gestellte Fragen zu unseren Cloud-Engineering-Diensten, unserem Entwicklungsansatz und wie wir Ihnen helfen können, Ihr Unternehmen erfolgreich zu gestalten.",
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
