import "dotenv/config";
import { PrismaClient } from "@prisma/client";

// --- FAQ Type ---
export type FAQ = {
  question: string;
  answer: string;
};

export type FaqSection = {
  title: string;
  description: string;
  faqs: FAQ[];
};

export type SeededFAQs = Awaited<ReturnType<typeof seed>>;
export type SeededFaqSections = Awaited<ReturnType<typeof seedSections>>;

// --- FAQ data ---
export const faqs: FAQ[] = [
  {
    question: "What cloud platforms do you support?",
    answer:
      "We specialize in AWS but also work with Azure, Google Cloud, and multi-cloud architectures.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity, but we typically deliver MVPs within 8-12 weeks.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes, we offer maintenance, monitoring, and support packages tailored to your needs.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We work with clients across various industries including fintech, healthcare, e-commerce, and SaaS.",
  },
  {
    question: "Can you help migrate existing applications to the cloud?",
    answer:
      "Absolutely! We have extensive experience in cloud migration strategies and implementations.",
  },
  {
    question: "What is your development approach?",
    answer:
      "We follow agile methodologies with iterative development, continuous feedback, and regular deliverables.",
  },
  {
    question: "Do you offer consulting services?",
    answer:
      "Yes, we provide architecture reviews, technology assessments, and strategic consulting services.",
  },
  {
    question: "How do you ensure code quality?",
    answer:
      "We implement automated testing, code reviews, CI/CD pipelines, and follow industry best practices.",
  },
];

// --- FAQ Section data ---
export const faqSections: FaqSection[] = [
  {
    title: "Frequently Asked Questions",
    description:
      "Find answers to common questions about our cloud engineering services, development approach, and how we can help your business succeed.",
    faqs,
  },
];

const seed = async (prisma: PrismaClient) => {
  const seededFaqs = await prisma.faq.createManyAndReturn({
    data: faqs,
  });
  console.log(`✓ Seeded ${seededFaqs.length} FAQs`);
  return seededFaqs;
};

const seedSections = async (prisma: PrismaClient, faqs: SeededFAQs) => {
  const seededFaqSections = await Promise.all(
    faqSections.map((section) =>
      prisma.faqSection.create({
        data: {
          title: section.title,
          description: section.description,
          faqs: { connect: faqs.map((faq) => ({ id: faq.id })) },
        },
      }),
    ),
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
