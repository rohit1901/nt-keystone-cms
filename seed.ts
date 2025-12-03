// seed.ts
//
// ⚠️ IMPORTANT: Before running this seed script, you MUST regenerate the Prisma Client:
//
//   1. Delete the old client cache:
//      rm -rf node_modules/.prisma  (or on Windows: rmdir /s /q node_modules\.prisma)
//
//   2. Regenerate Prisma Client:
//      npx prisma generate --schema=./schema.prisma
//
//   3. Restart your IDE/Editor to pick up new types
//
//   4. Then run this seed:
//      ts-node seed.ts  (or npm run seed)
//
// See PRISMA_REGENERATE.md for full details and troubleshooting.
//

import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper type for Prisma records with IDs
type WithId<T> = T & { id: string };

// ==================== SEED DATA ====================

// --- Images ---
const testimonialImages = [
  {
    src: "/images/field.png",
    alt: "clouds background",
    fill: true,
    className: "object-cover",
  },
  {
    src: "/images/drone.png",
    alt: "drone in the sky",
    width: 1583,
    height: 554,
    className: "animate-hover",
  },
  {
    src: "/nimbus.svg",
    alt: "Nimbus Tech logo",
    width: 50,
    height: 50,
    className:
      "rounded-full border-none bg-orange-50 p-3 shadow-lg ring-1 shadow-[#366A79]/20 ring-white/20 transition-transform duration-300 ease-in-out hover:scale-105",
  },
];

const ctaImages = [
  {
    src: "/images/cta-bg-1.png",
    alt: "CTA background",
    width: 800,
    height: 600,
    className: "object-cover",
  },
  {
    src: "/images/cta-bg-2.png",
    alt: "CTA background 2",
    width: 800,
    height: 600,
    className: "object-cover",
  },
];

// --- Benefits ---
const benefitsData = {
  title: "Your Benefits with Nimbus Tech",
  benefits: [
    {
      icon: "RiAwardFill",
      title: "Certified Experts",
      description: "We are experienced and certified AWS cloud specialists.",
    },
    {
      icon: "RiMoneyEuroBoxFill",
      title: "Full Cost Control",
      description:
        "We ensure transparent and predictable costs for your cloud project.",
    },
    {
      icon: "RiFlashlightFill",
      title: "Fast Implementation",
      description:
        "We implement your individual cloud project efficiently and quickly.",
    },
  ],
};

// --- Hero ---
const heroData = {
  subHeading: "Expert Software & Cloud Consulting, Wherever You Are",
  banner: {
    label: "🚀 Launch Your Cloud Journey",
    href: "#features",
    external: false,
    icon: "RiRocketFill",
    additional: {
      icon: "RiArrowRightSLine",
      text: "Get Started",
    },
  },
};

// --- Testimonials ---
const testimonialData = {
  title: "Client Success Stories",
  fallback: {
    rating: 5.0,
    badge: {
      icon: "RiTimeLine",
      label: "Coming Soon",
    },
    name: "The Nimbus Tech Team",
    role: "Software & Cloud Experts",
    company: "Nimbus Tech",
    content:
      "As Nimbus Tech launches, we look forward to partnering with innovative organizations and delivering exceptional software and cloud solutions. Your feedback could be featured here!",
  },
};

// --- Certifications ---
const certificationsData = {
  title: "Our Certifications",
  description:
    "Industry-recognized certifications demonstrating our expertise in software architecture and cloud technologies.",
  cta: {
    label: "View All Certifications",
    href: "#certifications",
    external: false,
  },
  certifications: [
    {
      certId: 1,
      title:
        "iSAQB® Certified Professional for Software Architecture - Advanced Level (CPSA-A)",
      description:
        "Advanced certification in software architecture methodology and practice.",
      image: "/images/certifications/isaqb-advanced.png",
      width: 200,
      height: 200,
    },
    {
      certId: 2,
      title: "AWS Certified Solutions Architect - Professional",
      description:
        "Expert-level certification for designing distributed systems on AWS.",
      image: "/images/certifications/aws-solutions-architect-pro.png",
      link: "https://aws.amazon.com/certification/certified-solutions-architect-professional/",
      width: 200,
      height: 200,
    },
    {
      certId: 3,
      title: "AWS Certified Developer - Associate",
      description:
        "Validates technical expertise in developing and maintaining AWS applications.",
      image: "/images/certifications/aws-developer-associate.png",
      link: "https://aws.amazon.com/certification/certified-developer-associate/",
      width: 200,
      height: 200,
    },
    {
      certId: 4,
      title: "Certified Kubernetes Administrator (CKA)",
      description:
        "Demonstrates skills in Kubernetes administration and deployment.",
      image: "/images/certifications/cka.png",
      link: "https://www.cncf.io/certification/cka/",
      width: 200,
      height: 200,
    },
    {
      certId: 5,
      title: "HashiCorp Certified: Terraform Associate",
      description:
        "Validates knowledge of Terraform and infrastructure as code practices.",
      image: "/images/certifications/terraform-associate.png",
      link: "https://www.hashicorp.com/certification/terraform-associate",
      width: 200,
      height: 200,
    },
    {
      certId: 6,
      title: "Certified ScrumMaster (CSM)",
      description:
        "Demonstrates understanding of Scrum framework and agile methodologies.",
      image: "/images/certifications/csm.png",
      width: 200,
      height: 200,
    },
  ],
};

// --- Features ---
const featuresData = [
  {
    featureId: 1,
    title: "Cloud Architecture",
    description: "Design and implement scalable, secure cloud solutions.",
    longDescription:
      "Our expert team designs robust cloud architectures tailored to your business needs, ensuring scalability, security, and cost-effectiveness.",
    visualization: "ArchitectureFeatureVisualization",
  },
  {
    featureId: 2,
    title: "DevOps & Automation",
    description: "Streamline your development and operations workflows.",
    longDescription:
      "We implement CI/CD pipelines, infrastructure as code, and automated testing to accelerate your delivery and improve reliability.",
    visualization: "CloudFeatureVisualization",
  },
  {
    featureId: 3,
    title: "Custom Software Development",
    description: "Build tailored solutions for your unique requirements.",
    longDescription:
      "From concept to deployment, we develop custom software applications using modern technologies and best practices.",
    visualization: "OrbitFeatureVisualization",
  },
];

// --- FAQs ---
const faqsData = [
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

// --- Approach Steps ---
const approachData = {
  title: "Our Approach",
  description:
    "We follow a proven methodology to deliver successful projects on time and within budget.",
  steps: [
    {
      stepId: 1,
      type: "done",
      title: "Discovery & Planning",
      description:
        "We analyze your requirements, define objectives, and create a detailed project roadmap.",
      activityTime: "Week 1-2",
    },
    {
      stepId: 2,
      type: "in progress",
      title: "Design & Architecture",
      description:
        "Our team designs the system architecture and creates technical specifications.",
      activityTime: "Week 2-4",
    },
    {
      stepId: 3,
      type: "open",
      title: "Development & Testing",
      description:
        "We build your solution using agile sprints with continuous testing and feedback.",
      activityTime: "Week 4-10",
    },
    {
      stepId: 4,
      type: "open",
      title: "Deployment & Launch",
      description:
        "We deploy to production with comprehensive monitoring and support.",
      activityTime: "Week 10-12",
    },
    {
      stepId: 5,
      type: "open",
      title: "Optimization & Support",
      description:
        "Ongoing maintenance, performance optimization, and feature enhancements.",
      activityTime: "Ongoing",
    },
  ],
};

// --- Navigation ---
const navigationData = {
  title: "Navigation",
  description: "Quick links to explore our services and get in touch.",
  image: "/images/nav-bg.png",
  imageAlt: "Navigation background",
  cta: {
    label: "Contact Us",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
  },
  items: [
    { label: "Services", href: "#features", external: false },
    { label: "About Us", href: "#about-us", external: false },
    {
      label: "Blog",
      href: "https://rohitkhanduri.substack.com",
      external: true,
    },
    {
      label: "Contact",
      href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
      external: false,
    },
  ],
};

// --- Footer ---
const footerData = {
  title: "Nimbus Tech",
  sections: [
    {
      title: "Services",
      items: [
        { label: "Cloud Architecture", href: "#features", external: false },
        { label: "Software Development", href: "#features", external: false },
        { label: "DevOps Consulting", href: "#features", external: false },
        { label: "Technical Training", href: "#features", external: false },
        { label: "Architecture Review", href: "#features", external: false },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About Us", href: "#about-us", external: false },
        {
          label: "Blog",
          href: "https://rohitkhanduri.substack.com",
          external: true,
        },
        { label: "Careers", href: "#careers", external: false },
        {
          label: "LinkedIn",
          href: "https://linkedin.com/company/nimbus-tech",
          external: true,
        },
      ],
    },
    {
      title: "Resources",
      items: [
        { label: "Documentation", href: "#docs", external: false },
        { label: "Case Studies", href: "#case-studies", external: false },
        { label: "FAQ", href: "#faq", external: false },
        { label: "Support", href: "#support", external: false },
      ],
    },
    {
      title: "Social",
      items: [
        {
          label: "GitHub",
          href: "https://github.com/nimbus-tech",
          external: true,
          icon: "RiGithubFill",
        },
        {
          label: "LinkedIn",
          href: "https://linkedin.com/company/nimbus-tech",
          external: true,
          icon: "RiLinkedinFill",
        },
        {
          label: "Twitter",
          href: "https://twitter.com/nimbustech",
          external: true,
          icon: "RiTwitterFill",
        },
      ],
    },
  ],
  languages: [
    { label: "English", value: "en-US" },
    { label: "German", value: "de-DE" },
  ],
};

// --- Analytics ---
const analyticsData = {
  heading: "Project Analytics",
  subheading:
    "Real-time insights into our project performance and client satisfaction metrics.",
  stats: {
    totalDeployments: "150+",
    deploymentChange: "+12",
    deploymentChangePercent: "8.5%",
    changePeriod: "vs last month",
  },
  tableHeadings: [
    "project",
    "deployments",
    "uptime",
    "clientSatisfaction",
    "efficiency",
    "revenueGrowth",
  ],
  summary: [
    {
      name: "E-Commerce Platform",
      deployments: "45",
      uptime: "99.9%",
      clientSatisfaction: "4.8/5",
      efficiency: "92%",
      revenueGrowth: "+15%",
      bgColor: "#F0F9FF",
      changeType: "positive",
    },
    {
      name: "Healthcare Portal",
      deployments: "38",
      uptime: "99.7%",
      clientSatisfaction: "4.9/5",
      efficiency: "89%",
      revenueGrowth: "+22%",
      bgColor: "#F0FDF4",
      changeType: "positive",
    },
    {
      name: "FinTech API",
      deployments: "67",
      uptime: "99.95%",
      clientSatisfaction: "4.7/5",
      efficiency: "94%",
      revenueGrowth: "+18%",
      bgColor: "#FEF3C7",
      changeType: "positive",
    },
  ],
};

// --- About ---
const aboutData = {
  heading: "About Nimbus Tech",
  intro:
    "We are a team of passionate software engineers and cloud architects dedicated to helping businesses leverage modern technology for growth and innovation.",
  valuesTitle: "Our Values",
  values: [
    {
      label: "Excellence",
      description:
        "We strive for excellence in everything we do, from code quality to client communication.",
      icon: "RiStarFill",
    },
    {
      label: "Innovation",
      description:
        "We embrace new technologies and methodologies to deliver cutting-edge solutions.",
      icon: "RiLightbulbFill",
    },
    {
      label: "Transparency",
      description:
        "We believe in open communication and honest relationships with our clients.",
      icon: "RiEyeFill",
    },
    {
      label: "Collaboration",
      description:
        "We work closely with our clients as partners to achieve shared goals.",
      icon: "RiTeamFill",
    },
    {
      label: "Reliability",
      description:
        "We deliver on our promises and build systems that our clients can depend on.",
      icon: "RiShieldCheckFill",
    },
  ],
  closing:
    "Ready to transform your business with cloud technology? Let's build something amazing together.",
};

// --- Map ---
const mapData = {
  title: "Where We Work",
  subheading: "Global Reach, Local Expertise",
  description:
    "Based in Germany, we serve clients worldwide with remote-first collaboration and on-site consulting when needed.",
};

// --- CTA ---
const ctaData = {
  title: "Ready to Start Your Project?",
  description:
    "Let's discuss how we can help you achieve your technology goals. Get in touch for a free consultation.",
  ctas: [
    {
      label: "Schedule a Call",
      href: "mailto:r.khanduri@nimbus-tech.de",
      external: false,
    },
    {
      label: "View Our Work",
      href: "#case-studies",
      external: false,
    },
  ],
};

// --- Page Content ---
const pageContentData = {
  slug: "home",
  title: "Nimbus Tech - Expert Software & Cloud Consulting",
  description:
    "Custom software development, cloud architecture, and scalable solutions for modern enterprises.",
  image: "/images/hero-bg.png",
  imageAlt: "Nimbus Tech hero background",
};

// ==================== SEED FUNCTIONS ====================

async function seedImages() {
  console.log("Seeding images...");
  const allImages = [...testimonialImages, ...ctaImages];
  const images = await prisma.image.createManyAndReturn({ data: allImages });
  console.log(`✓ Seeded ${images.length} images`);
  return images;
}

async function seedBackgrounds(
  images: WithId<(typeof testimonialImages)[0]>[],
) {
  console.log("Seeding backgrounds...");
  const backgrounds = await prisma.background.createManyAndReturn({
    data: [
      {
        imageId: images[0].id,
        outerClassName: "absolute inset-0 object-cover",
      },
      {
        imageId: images[1].id,
        outerClassName:
          "absolute top-[19rem] -right-14 w-[19rem] sm:top-[12rem] sm:right-3 sm:w-[23rem]",
      },
      {
        imageId: images[3].id,
        outerClassName: "cta-background-1",
      },
      {
        imageId: images[4].id,
        outerClassName: "cta-background-2",
      },
    ],
  });
  console.log(`✓ Seeded ${backgrounds.length} backgrounds`);
  return backgrounds;
}

async function seedBenefits() {
  console.log("Seeding benefits...");
  const benefits = await prisma.benefit.createManyAndReturn({
    data: benefitsData.benefits,
  });
  const benefitSection = await prisma.benefitSection.create({
    data: {
      title: benefitsData.title,
      benefits: {
        connect: benefits.map((b) => ({ id: b.id })),
      },
    },
  });
  console.log(`✓ Seeded benefits section with ${benefits.length} benefits`);
  return benefitSection.id;
}

async function seedHero() {
  console.log("Seeding hero section...");
  const additional = await prisma.heroBannerAdditional.create({
    data: heroData.banner.additional,
  });
  const banner = await prisma.heroBanner.create({
    data: {
      label: heroData.banner.label,
      href: heroData.banner.href,
      external: heroData.banner.external,

      additionalId: additional.id,
    },
  });
  const hero = await prisma.hero.create({
    data: {
      subHeading: heroData.subHeading,
      bannerId: banner.id,
    },
  });
  console.log(`✓ Seeded hero section`);
  return hero.id;
}

async function seedTestimonials(
  images: WithId<(typeof testimonialImages)[0]>[],
  backgrounds: any[],
) {
  console.log("Seeding testimonials...");
  const badge = await prisma.testimonialBadge.create({
    data: testimonialData.fallback.badge,
  });
  const fallbackItem = await prisma.testimonialItem.create({
    data: {
      badgeId: badge.id,
      name: testimonialData.fallback.name,
      role: testimonialData.fallback.role,
      company: testimonialData.fallback.company,
      imageId: images[2].id,
      content: testimonialData.fallback.content,
    },
  });
  const testimonialSection = await prisma.testimonialSection.create({
    data: {
      background: {
        connect: [{ id: backgrounds[0].id }, { id: backgrounds[1].id }],
      },
      fallbackId: fallbackItem.id,
    },
  });
  console.log(`✓ Seeded testimonial section`);
  return testimonialSection.id;
}

async function seedCertifications() {
  console.log("Seeding certifications...");
  const certifications = await prisma.certification.createManyAndReturn({
    data: certificationsData.certifications,
  });
  const ctaRecord = await prisma.cta.create({
    data: certificationsData.cta,
  });
  const certificationSection = await prisma.certificationSection.create({
    data: {
      title: certificationsData.title,
      description: certificationsData.description,
      cta: {
        connect: { id: ctaRecord.id },
      },
      certifications: {
        connect: certifications.map((c) => ({ id: c.id })),
      },
    },
  });
  console.log(
    `✓ Seeded certification section with ${certifications.length} certifications`,
  );
  return certificationSection.id;
}

async function seedFeatures() {
  console.log("Seeding features...");
  const features = await prisma.feature.createManyAndReturn({
    data: featuresData,
  });
  console.log(`✓ Seeded ${features.length} features`);
  return features.map((f) => f.id);
}

async function seedFaqs() {
  console.log("Seeding FAQs...");
  const faqs = await prisma.faq.createManyAndReturn({
    data: faqsData,
  });
  console.log(`✓ Seeded ${faqs.length} FAQs`);
  return faqs.map((f) => f.id);
}

async function seedApproach() {
  console.log("Seeding approach...");
  const steps = await prisma.approachStep.createManyAndReturn({
    data: approachData.steps.map((step) => ({
      ...step,
      aid: step.stepId,
    })),
  });
  const approach = await prisma.approach.create({
    data: {
      title: approachData.title,
      description: approachData.description,
      steps: { connect: steps.map((s) => ({ id: s.id })) },
    },
  });
  console.log(`✓ Seeded approach with ${steps.length} steps`);
  return approach.id;
}

async function seedNavigation() {
  console.log("Seeding navigation...");
  const navCta = await prisma.cta.create({
    data: navigationData.cta,
  });
  const navItems = await prisma.navigationLink.createManyAndReturn({
    data: navigationData.items,
  });
  const navigation = await prisma.navigation.create({
    data: {
      title: navigationData.title,
      description: navigationData.description,
      image: navigationData.image,
      imageAlt: navigationData.imageAlt,
      cta: {
        connect: { id: navCta.id },
      },
      items: { connect: navItems.map((i) => ({ id: i.id })) },
    },
  });
  console.log(`✓ Seeded navigation with ${navItems.length} items`);
  return navigation.id;
}

async function seedFooter() {
  console.log("Seeding footer...");
  const footerSections = await Promise.all(
    footerData.sections.map(async (section) => {
      const items = await prisma.navigationLink.createManyAndReturn({
        data: section.items,
      });
      return prisma.footerSection.create({
        data: {
          title: section.title,
          items: { connect: items.map((i) => ({ id: i.id })) },
        },
      });
    }),
  );
  const languages = await prisma.language.createManyAndReturn({
    data: footerData.languages,
  });
  const footer = await prisma.footer.create({
    data: {
      title: footerData.title,
      sections: { connect: footerSections.map((s) => ({ id: s.id })) },
      languages: { connect: languages.map((l) => ({ id: l.id })) },
    },
  });
  console.log(`✓ Seeded footer with ${footerSections.length} sections`);
  return footer.id;
}

async function seedAnalytics() {
  console.log("Seeding analytics...");
  const stats = await prisma.analyticsStat.create({
    data: analyticsData.stats,
  });
  const summaryItems = await prisma.analyticsSummaryItem.createManyAndReturn({
    data: analyticsData.summary,
  });
  const analytic = await prisma.analytic.create({
    data: {
      heading: analyticsData.heading,
      subheading: analyticsData.subheading,
      tableHeadings: JSON.stringify(analyticsData.tableHeadings),
      statsId: stats.id,
      summary: { connect: summaryItems.map((s) => ({ id: s.id })) },
    },
  });
  console.log(`✓ Seeded analytics`);
  return analytic.id;
}

async function seedAbout() {
  console.log("Seeding about section...");
  const values = await prisma.value.createManyAndReturn({
    data: aboutData.values,
  });
  const about = await prisma.about.create({
    data: {
      heading: aboutData.heading,
      intro: aboutData.intro,
      valuesTitle: aboutData.valuesTitle,
      closing: aboutData.closing,
      values: { connect: values.map((v) => ({ id: v.id })) },
    },
  });
  console.log(`✓ Seeded about section with ${values.length} values`);
  return about.id;
}

async function seedMap() {
  console.log("Seeding map section...");
  const map = await prisma.map.create({
    data: mapData,
  });
  console.log(`✓ Seeded map section`);
  return map.id;
}

async function seedCta(backgrounds: any[]) {
  console.log("Seeding CTA section...");
  const ctas = await prisma.cta.createManyAndReturn({
    data: ctaData.ctas,
  });
  const ctaSection = await prisma.ctaSection.create({
    data: {
      title: ctaData.title,
      description: ctaData.description,
      ctas: { connect: ctas.map((c) => ({ id: c.id })) },
      background: {
        connect: [{ id: backgrounds[2].id }, { id: backgrounds[3].id }],
      },
    },
  });
  console.log(`✓ Seeded CTA section`);
  return ctaSection.id;
}

async function seedSections(ids: {
  heroId: string;
  benefitsId: string;
  featuresIds: string[];
  faqsIds: string[];
  testimonialsId: string;
  certificationsId: string;
  approachId: string;
  navigationId: string;
  footerId: string;
  analyticsId: string;
  aboutId: string;
  mapId: string;
  ctaId: string;
}) {
  console.log("Creating page sections...");

  const sections = await Promise.all([
    prisma.section.create({
      data: {
        type: "hero",
        contentHeroId: ids.heroId,
      },
    }),
    prisma.section.create({
      data: {
        type: "benefits",
        contentBenefits: {
          connect: { id: ids.benefitsId },
        },
      },
    }),
    prisma.section.create({
      data: {
        type: "features",
        contentFeatures: { connect: ids.featuresIds.map((id) => ({ id })) },
      },
    }),
    prisma.section.create({
      data: {
        type: "certifications",
        contentCertifications: {
          connect: { id: ids.certificationsId },
        },
      },
    }),
    prisma.section.create({
      data: {
        type: "testimonials",
        contentTestimonialsId: ids.testimonialsId,
      },
    }),
    prisma.section.create({
      data: {
        type: "approach",
        contentApproach: {
          connect: { id: ids.approachId },
        },
      },
    }),
    prisma.section.create({
      data: {
        type: "analytics",
        contentAnalyticsId: ids.analyticsId,
      },
    }),
    prisma.section.create({
      data: {
        type: "about",
        contentAboutId: ids.aboutId,
      },
    }),
    prisma.section.create({
      data: {
        type: "faq",
        contentFaqs: { connect: ids.faqsIds.map((id) => ({ id })) },
      },
    }),
    prisma.section.create({
      data: {
        type: "cta",
        contentCtaId: ids.ctaId,
      },
    }),
    prisma.section.create({
      data: {
        type: "map",
        contentMapId: ids.mapId,
      },
    }),
    prisma.section.create({
      data: {
        type: "navigation",
        contentNavigationId: ids.navigationId,
      },
    }),
    prisma.section.create({
      data: {
        type: "footer",
        contentFooterId: ids.footerId,
      },
    }),
  ]);

  console.log(`✓ Created ${sections.length} page sections`);
  return sections.map((s) => s.id);
}

async function seedPageContent(sectionIds: string[]) {
  console.log("Seeding page content...");
  const cta = await prisma.cta.create({
    data: {
      label: "Get Started",
      href: "#features",
      external: false,
    },
  });
  const pageContent = await prisma.pageContent.create({
    data: {
      slug: pageContentData.slug,
      title: pageContentData.title,
      description: pageContentData.description,
      image: pageContentData.image,
      imageAlt: pageContentData.imageAlt,
      cta: {
        connect: { id: cta.id },
      },
      sections: {
        connect: sectionIds.map((id) => ({ id })),
      },
    },
  });
  console.log(`✓ Seeded page content: ${pageContent.slug}`);
  return pageContent.id;
}

// ==================== MAIN ====================

async function main() {
  console.log("\n🌱 Starting Keystone CMS database seed...\n");

  try {
    // Seed in order of dependencies
    const images = await seedImages();
    const backgrounds = await seedBackgrounds(images);
    const heroId = await seedHero();
    const benefitsId = await seedBenefits();
    const featuresIds = await seedFeatures();
    const faqsIds = await seedFaqs();
    const testimonialsId = await seedTestimonials(images, backgrounds);
    const certificationsId = await seedCertifications();
    const approachId = await seedApproach();
    const navigationId = await seedNavigation();
    const footerId = await seedFooter();
    const analyticsId = await seedAnalytics();
    const aboutId = await seedAbout();
    const mapId = await seedMap();
    const ctaId = await seedCta(backgrounds);

    const sectionIds = await seedSections({
      heroId,
      benefitsId,
      featuresIds,
      faqsIds,
      testimonialsId,
      certificationsId,
      approachId,
      navigationId,
      footerId,
      analyticsId,
      aboutId,
      mapId,
      ctaId,
    });

    await seedPageContent(sectionIds);

    console.log("\n✅ Seeding completed successfully!\n");
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
