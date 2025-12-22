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
  // Create all FAQs at once
  const seededFaqs = await prisma.faq.createManyAndReturn({
    data: faqs.map((faq) => ({
      ...faq,
      language: undefined,
      languageId: languages.find((l) => l.value === faq.language.value)?.id,
    })),
  });
  console.log(`✓ Seeded ${seededFaqs.length} FAQs`);
  return seededFaqs;
};

const seedSections = async (
  prisma: PrismaClient,
  languages: SeededFooterLanguages,
) => {
  const allSeededFaqs = await seed(prisma, languages);
  const seededFaqSections = await Promise.all(
    faqSections.map((section) => {
      const lang = languages.find((l) => l.value === section.language.value);
      // Filter the seeded FAQs (which have IDs) to find matches for this section's language
      const relevantFaqs = allSeededFaqs.filter(
        (f) => f.languageId === lang?.id,
      );

      return prisma.faqSection.create({
        data: {
          title: section.title,
          description: section.description,
          // Include language field if your schema supports it on FaqSection
          language: undefined,
          languageId: lang?.id,
          faqs: {
            connect: relevantFaqs.map((faq) => ({ id: faq.id })),
          },
        },
      });
    }),
  );
  console.log(`✓ Seeded ${seededFaqSections.length} FAQ sections`);
  return seededFaqSections;
};

const FAQs = {
  data: faqSections,
  seed,
  seedSections,
};

export default FAQs;
