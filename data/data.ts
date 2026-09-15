// Single source of truth for all seed content (EN + DE).
// Seed components import data from here instead of hardcoding inline.
// @ts-nocheck
import {
  AboutSection,
  AnalyticsData,
  ApproachData,
  BenefitSection,
  CertificationSection,
  CompositePageContentWithExtras,
  CTA,
  CtaSection,
  FaqSection,
  FAQ,
  Feature,
  FooterSections,
  HeroType,
  ImageConfig,
  ImageKeys,
  Language,
  MapSection,
  NavigationSection,
  NavigationSectionItem,
  TestimonialBadge,
  TestimonialItem,
  TestimonialSection,
} from "./types";

// ---------------------------------------------------------------------------
// Language helpers
// ---------------------------------------------------------------------------

export const english: Language = { label: "English", value: "en-US" };
export const german: Language = { label: "German", value: "de-DE" };

// ---------------------------------------------------------------------------
// Benefits (EN + DE)
// ---------------------------------------------------------------------------

export const benefitsSectionsData: BenefitSection[] = [
  {
    title: "Why small, mid-market, and enterprise businesses choose Nimbus Tech",
    language: english,
    benefits: [
      {
        icon: "RiMoneyEuroBoxFill",
        title: "Transparent Costs",
        description:
          "We design your AWS environment with cloud cost optimization in mind so that costs remain predictable and under control – no hidden surprises.",
        language: english,
      },
      {
        icon: "RiAwardFill",
        title: "AWS-Certified Experts",
        description:
          "You work directly with experienced, AWS-certified architects and engineers who design according to the AWS Well-Architected Framework – not a rotating team of juniors.",
        language: english,
      },
      {
        icon: "RiFlashlightFill",
        title: "Fast, Pragmatic Delivery",
        description:
          "We focus on lean, cloud-native solutions that can go live quickly, using serverless computing and managed services where they make sense, so your setup can evolve with your business.",
        language: english,
      },
    ],
  },
  {
    title: "Warum Unternehmen mit Nimbus Tech arbeiten",
    language: german,
    benefits: [
      {
        icon: "RiMoneyEuroBoxFill",
        title: "Klare Kosten",
        description:
          "Wir gestalten Ihre AWS-Umgebung mit Fokus auf Cloud-Kostenoptimierung, sodass Kosten planbar bleiben und Sie jederzeit den Überblick behalten – ohne böse Überraschungen.",
        language: german,
      },
      {
        icon: "RiAwardFill",
        title: "Zertifizierte AWS-Experten",
        description:
          "Sie arbeiten direkt mit erfahrenen, AWS-zertifizierten Architekt:innen und Engineer:innen, die nach dem AWS Well-Architected Framework entwerfen – nicht mit ständig wechselnden Junior-Teams.",
        language: german,
      },
      {
        icon: "RiFlashlightFill",
        title: "Schnelle, praxisnahe Umsetzung",
        description:
          "Wir setzen schlanke, cloud-native Lösungen um, die schnell live gehen – mit Serverless Computing und Managed Services, wo sie sinnvoll sind – und die mit Ihrem Geschäft mitwachsen.",
        language: german,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Features (EN + DE)
// ---------------------------------------------------------------------------

export const featuresData: Feature[] = [
  {
    featureId: 1,
    title: "AWS Cloud Consulting",
    description:
      "Strategic AWS guidance for small, mid-market, and enterprise businesses – from first cloud-native projects to mature, multi-account environments.",
    longDescription:
      "We help you define a clear AWS strategy, choose the right services, and design a cloud-native architecture that fits your business goals. Together, we create a roadmap based on the AWS Well-Architected Framework and a solid multi-account strategy, so your move to AWS becomes a secure cloud transformation that balances speed, risk, and budget.",
    visualization: "OrbitFeatureVisualization",
    language: english,
  },
  {
    featureId: 2,
    title: "AWS Migration & Modernization",
    description:
      "Securely move existing systems to AWS and modernize step by step as part of a secure cloud transformation – without disrupting your business.",
    longDescription:
      "Whether you are lifting and shifting, re-platforming, or re-architecting, we plan and execute your AWS migration with minimal downtime. We modernize where it adds value – using Infrastructure as Code (IaC), serverless computing, and managed services to reduce operational effort, improve security, and optimize costs over time.",
    visualization: "CloudFeatureVisualization",
    language: english,
  },
  {
    featureId: 3,
    title: "DevOps & Automation on AWS",
    description:
      "Reliable CI/CD pipelines, Infrastructure as Code (IaC), and monitoring tailored to your team and stack, built for secure multi-account AWS environments.",
    longDescription:
      "We set up or improve your deployment pipelines, Infrastructure as Code (Terraform/CDK), and observability so your team can ship changes safely and frequently. You get an automated, cloud-native AWS foundation aligned with the Well-Architected Framework, making secure cloud transformation and ongoing cost optimization part of your daily operations instead of one-off projects.",
    visualization: "ArchitectureFeatureVisualization",
    language: english,
  },
  {
    featureId: 1,
    title: "AWS-Cloud-Beratung",
    description:
      "Strategische AWS-Beratung für Unternehmen – von ersten cloud-native Projekten bis hin zu gewachsenen Multi-Account-Umgebungen.",
    longDescription:
      "Wir entwickeln gemeinsam mit Ihnen eine klare AWS-Strategie, wählen passende Services aus und entwerfen eine cloud-native Architektur, die zu Ihren Geschäftsanforderungen passt. Auf Basis des AWS Well-Architected Frameworks und einer soliden Multi-Account-Strategie entsteht so eine sichere Cloud-Transformation, die Geschwindigkeit, Risiko und Budget sinnvoll ausbalanciert.",
    visualization: "OrbitFeatureVisualization",
    language: german,
  },
  {
    featureId: 2,
    title: "AWS-Migration & Modernisierung",
    description:
      "Sichere Migration bestehender Systeme nach AWS und schrittweise Modernisierung im Rahmen einer sicheren Cloud-Transformation – ohne Betriebsunterbrechung.",
    longDescription:
      "Ob Lift-and-Shift, Re-Platforming oder Re-Architektur – wir planen und begleiten Ihre AWS-Migration mit minimaler Downtime. Wir modernisieren dort, wo es echten Mehrwert bringt – mit Infrastructure as Code (IaC), Serverless Computing und Managed Services, um Betriebsaufwand zu reduzieren, Sicherheit zu erhöhen und Kosten langfristig zu optimieren.",
    visualization: "CloudFeatureVisualization",
    language: german,
  },
  {
    featureId: 3,
    title: "DevOps & Automatisierung auf AWS",
    description:
      "Zuverlässige CI/CD-Pipelines, Infrastructure as Code (IaC) und Monitoring, abgestimmt auf Ihr Team und Multi-Account-AWS-Umgebungen.",
    longDescription:
      "Wir richten Deployment-Pipelines, Infrastructure as Code (z.B. Terraform/CDK) und Observability ein oder verbessern bestehende Lösungen, damit Ihr Team Änderungen häufiger und sicherer ausrollen kann. Sie erhalten ein automatisiertes, cloud-natives AWS-Fundament, das sich am Well-Architected Framework orientiert – so werden sichere Cloud-Transformation und laufende Kostenoptimierung Teil Ihres Tagesgeschäfts statt einmaliger Projekte.",
    visualization: "ArchitectureFeatureVisualization",
    language: german,
  },
];

// ---------------------------------------------------------------------------
// FAQs (EN + DE)
// ---------------------------------------------------------------------------

export const faqData: FAQ[] = [
  {
    question: "Who is Nimbus Tech a good fit for?",
    answer:
      "We primarily work with small and medium-sized businesses and startups that want to use AWS more effectively – for new products, migrations, or to stabilize and optimize existing setups.",
    language: english,
  },
  {
    question: "Do you only work with AWS?",
    answer:
      "Our clear focus is AWS. We may connect to other platforms or tools if needed, but our consulting, architecture, and operations work is centered on AWS.",
    language: english,
  },
  {
    question: "How does a typical engagement start?",
    answer:
      "We usually start with a free 15-minute call to understand your situation. After that, we can offer a short assessment or architecture review and then define a concrete project scope with timeline and budget.",
    language: english,
  },
  {
    question: "Can you help if we already use AWS?",
    answer:
      "Yes. Many clients come to us with an existing AWS setup that has grown over time. We review your environment using the AWS Well-Architected Framework, highlight risks and opportunities, and then help you clean up, secure, and optimize costs using best practices for multi-account strategies and Infrastructure as Code (IaC).",
    language: english,
  },
  {
    question: "How do you charge for your services?",
    answer:
      "We offer fixed-price packages for assessments and clearly scoped projects, and transparent day rates for ongoing support. Together we choose the model that fits your budget and decision process.",
    language: english,
  },
  {
    question: "Do you provide ongoing support after a project?",
    answer:
      "If you wish, we stay on as your AWS partner for monitoring, incident response, and continuous improvements. We can also train your internal team so they become more self-sufficient over time.",
    language: english,
  },
  {
    question: "Für welche Unternehmen ist Nimbus Tech geeignet?",
    answer:
      "Wir arbeiten vor allem mit kleinen und mittelständischen Unternehmen sowie Start-ups, die AWS gezielt einsetzen möchten – für neue Produkte, Migrationen oder die Stabilisierung bestehender Umgebungen.",
    language: german,
  },
  {
    question: "Arbeiten Sie ausschließlich mit AWS?",
    answer:
      "Unser klarer Schwerpunkt ist AWS. Wo nötig binden wir andere Plattformen oder Tools an, aber unsere Beratung, Architektur und der Betrieb sind auf AWS ausgerichtet.",
    language: german,
  },
  {
    question: "Wie startet eine Zusammenarbeit typischerweise?",
    answer:
      "In der Regel beginnen wir mit einem kostenlosen 15-minütigen Gespräch, um Ihre Situation zu verstehen. Darauf folgt bei Bedarf ein kompaktes Assessment oder Architektur-Review, aus dem wir ein konkretes Projektangebot mit Umfang, Zeitplan und Budget ableiten.",
    language: german,
  },
  {
    question: "Unterstützen Sie auch bestehende AWS-Setups?",
    answer:
      "Ja. Viele Kund:innen kommen mit einer bestehenden AWS-Umgebung zu uns, die über die Zeit gewachsen ist. Wir überprüfen Ihre Umgebung mit dem AWS Well-Architected Framework, zeigen Risiken und Chancen auf und helfen Ihnen anschließend, mit einer passenden Multi-Account-Strategie sowie Infrastructure as Code (IaC) Sicherheit und Kosten zu optimieren.",
    language: german,
  },
  {
    question: "Wie berechnen Sie Ihre Leistungen?",
    answer:
      "Für Assessments und klar umrissene Projekte bieten wir Festpreise an, für laufende Unterstützung transparente Tagessätze. Gemeinsam wählen wir das Modell, das zu Ihrem Budget und Entscheidungsprozess passt.",
    language: german,
  },
  {
    question: "Bieten Sie laufende Betreuung an?",
    answer:
      "Auf Wunsch bleiben wir als AWS-Partner an Ihrer Seite – für Monitoring, Incident-Response und kontinuierliche Verbesserungen. Außerdem können wir Ihr internes Team gezielt weiterbilden.",
    language: german,
  },
];

export const faqSectionsData: FaqSection[] = [
  {
    title: "Frequently Asked Questions",
    description:
      "Find answers to common questions about our AWS cloud consulting, migration projects, and how we work with small, mid-market, and enterprise businesses.",
    faqs: faqData.filter((faq) => faq.language.value === "en-US"),
    language: english,
  },
  {
    title: "Häufige Fragen",
    description:
      "Antworten auf typische Fragen zu unserer AWS-Cloud-Beratung, Migrationsprojekten und der Zusammenarbeit mit Unternehmen.",
    faqs: faqData.filter((faq) => faq.language.value === "de-DE"),
    language: german,
  },
];

// ---------------------------------------------------------------------------
// Approaches (EN + DE)
// ---------------------------------------------------------------------------

export const approachesData: ApproachData[] = [
  {
    title: "Our Approach: From Vision to Value",
    description:
      "We follow a structured yet flexible approach to ensure your AWS projects deliver clear business value – from first conversation to long-term operation.",
    language: english,
    steps: [
      {
        id: 1,
        type: "done",
        title: "Discovery: Listen & Learn",
        description:
          "We start by understanding your goals, challenges, and current AWS or on-premise setup.",
        activityTime: "Step 1",
        language: english,
      },
      {
        id: 2,
        type: "done",
        title: "Planning: Architect for Success",
        description:
          "We design a scalable, secure AWS architecture and define a realistic roadmap.",
        activityTime: "Step 2",
        language: english,
      },
      {
        id: 3,
        type: "done",
        title: "Development: Build with Quality",
        description:
          "We implement infrastructure, automation, and applications using best practices.",
        activityTime: "Step 3",
        language: english,
      },
      {
        id: 4,
        type: "in progress",
        title: "Deployment: Launch & Deliver",
        description:
          "We deploy your solution securely and coordinate a smooth go-live.",
        activityTime: "Step 4",
        language: english,
      },
      {
        id: 5,
        type: "open",
        title: "Support: Optimize & Grow",
        description:
          "We provide ongoing support, optimization, and knowledge transfer for your team.",
        activityTime: "Step 5",
        language: english,
      },
    ],
  },
  {
    title: "Unser Vorgehen: Von der Idee zum Nutzen",
    description:
      "Unser strukturierter, aber flexibler Ansatz stellt sicher, dass Ihre AWS-Projekte echten Geschäftsnutzen liefern – vom ersten Gespräch bis zum laufenden Betrieb.",
    language: german,
    steps: [
      {
        id: 1,
        type: "done",
        title: "Verstehen: Ziele & Ist-Situation",
        description:
          "Wir starten mit Ihren Zielen, Herausforderungen und Ihrer aktuellen AWS- oder On-Premise-Landschaft.",
        activityTime: "Schritt 1",
        language: german,
      },
      {
        id: 2,
        type: "done",
        title: "Planen: Architektur & Roadmap",
        description:
          "Wir entwerfen eine skalierbare, sichere AWS-Architektur und definieren eine realistische Roadmap.",
        activityTime: "Schritt 2",
        language: german,
      },
      {
        id: 3,
        type: "done",
        title: "Umsetzen: Bauen mit Qualität",
        description:
          "Wir implementieren Infrastruktur, Automatisierung und Anwendungen nach Best Practices.",
        activityTime: "Schritt 3",
        language: german,
      },
      {
        id: 4,
        type: "in progress",
        title: "Go-Live: Sicher starten",
        description:
          "Wir koordinieren einen sicheren Go-Live und begleiten die Inbetriebnahme.",
        activityTime: "Schritt 4",
        language: german,
      },
      {
        id: 5,
        type: "open",
        title: "Betreiben: Optimieren & Wachsen",
        description:
          "Wir unterstützen Sie beim laufenden Betrieb, bei Optimierungen und beim Wissenstransfer in Ihr Team.",
        activityTime: "Schritt 5",
        language: german,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// About (EN + DE)
// ---------------------------------------------------------------------------

export const aboutData: AboutSection[] = [
  {
    heading: "About Nimbus Tech",
    intro:
      "Nimbus Tech is an AWS-focused cloud consulting and software engineering company based in Germany. With more than 14 years of experience in software development and architecture, we help small, mid-market, and enterprise businesses in the DACH region design, migrate, and operate reliable systems on AWS – always with clear communication and business value in mind.",
    valuesTitle: "Our Values",
    values: [
      {
        label: "Excellence",
        description:
          "Technical excellence and continuous improvement in every project.",
        icon: "RiAwardFill",
      },
      {
        label: "Transparency",
        description:
          "Open communication and honest advice at every stage of the collaboration.",
        icon: "RiMoneyEuroBoxFill",
      },
      {
        label: "Collaboration",
        description:
          "Building the best solutions together with our clients and partners.",
        icon: "RiFlashlightFill",
      },
      {
        label: "Reliability",
        description:
          "Consistent delivery, measurable outcomes, and long-term support.",
        icon: "RiShieldCheckFill",
      },
      {
        label: "Innovation",
        description:
          "Embracing emerging technologies and bold ideas to create lasting impact.",
        icon: "RiLightbulbFill",
      },
    ],
    closing:
      "At Nimbus Tech, we combine deep AWS expertise with a practical, no-nonsense approach so your cloud projects stay understandable, transparent, and aligned with your business goals.",
    language: english,
  },
  {
    heading: "Über Nimbus Tech",
    intro:
      "Nimbus Tech ist ein auf AWS spezialisiertes Cloud-Beratungs- und Software-Engineering-Unternehmen mit Sitz in Deutschland. Mit über 14 Jahren Erfahrung in Entwicklung und Architektur unterstützen wir alle Unternehmen in der DACH-Region dabei, zuverlässige Systeme auf AWS zu planen, zu migrieren und zu betreiben – mit klarer Kommunikation und echtem Geschäftsnutzen.",
    valuesTitle: "Unsere Werte",
    values: [
      {
        label: "Exzellenz",
        description:
          "Technische Exzellenz und kontinuierliche Verbesserung in jedem Projekt.",
        icon: "RiAwardFill",
      },
      {
        label: "Transparenz",
        description:
          "Offene Kommunikation und ehrliche Beratung in jeder Phase der Zusammenarbeit.",
        icon: "RiMoneyEuroBoxFill",
      },
      {
        label: "Zusammenarbeit",
        description:
          "Die besten Lösungen entstehen im engen Schulterschluss mit unseren Kund:innen.",
        icon: "RiFlashlightFill",
      },
      {
        label: "Zuverlässigkeit",
        description:
          "Verlässliche Lieferung, überprüfbare Ergebnisse und langfristige Betreuung.",
        icon: "RiShieldCheckFill",
      },
      {
        label: "Innovation",
        description:
          "Neue Technologien und mutige Ideen gezielt einsetzen, um nachhaltigen Mehrwert zu schaffen.",
        icon: "RiLightbulbFill",
      },
    ],
    closing:
      "Bei Nimbus Tech verbinden wir tiefes AWS-Know-how mit einem pragmatischen Ansatz, damit Ihre Cloud-Projekte verständlich, transparent und eng an Ihren Geschäftszielen ausgerichtet bleiben.",
    language: german,
  },
];

// ---------------------------------------------------------------------------
// Maps (EN + DE)
// ---------------------------------------------------------------------------

export const mapData: MapSection[] = [
  {
    title: "Global AWS Reach, Local Expertise",
    subheading: "Cloud-native AWS architectures for businesses of all sizes.",
    description:
      "We design and operate secure, cost-optimized AWS environments using multi-account strategies, Infrastructure as Code (IaC), and automation – wherever your team is based.",
    language: english,
  },
  {
    title: "Globale AWS-Reichweite, lokale Expertise",
    subheading: "Cloud-native AWS-Architekturen für Unternehmen jeder Größe.",
    description:
      "Wir entwerfen und betreiben sichere, kostenoptimierte AWS-Umgebungen mit Multi-Account-Strategien, Infrastructure as Code (IaC) und Automatisierung – ganz gleich, wo Ihr Team ansässig ist.",
    language: german,
  },
];

// ---------------------------------------------------------------------------
// Analytics (EN + DE) + tableHeadingValueMap
// ---------------------------------------------------------------------------

export const analyticsSeedData: AnalyticsData[] = [
  {
    heading: "Typical Project Outcomes",
    subheading:
      "Examples of how structured AWS consulting can improve reliability, speed, and cost efficiency.",
    stats: {
      totalDeployments: "305",
      deploymentChange: "+25 deployments",
      deploymentChangePercent: "8.9",
      changePeriod: "Last quarter",
      language: english,
    },
    tableHeadings: [
      "Project",
      "Deployments",
      "Uptime",
      "Client Sat.",
      "Efficiency",
      "Revenue Growth",
    ],
    summary: [
      {
        name: "Project Nimbus",
        deployments: "120",
        uptime: "99.9%",
        clientSatisfaction: "+4.8",
        efficiency: "+7.2%",
        revenueGrowth: "+12.5%",
        bgColor: "bg-blue-500",
        changeType: "positive",
        language: english,
      },
      {
        name: "Cloud Migration",
        deployments: "85",
        uptime: "99.7%",
        clientSatisfaction: "+3.9",
        efficiency: "+5.4%",
        revenueGrowth: "+8.3%",
        bgColor: "bg-green-500",
        changeType: "positive",
        language: english,
      },
    ],
    language: english,
  },
  {
    heading: "Typische Projektergebnisse",
    subheading:
      "Beispiele dafür, wie strukturierte AWS-Beratung Zuverlässigkeit, Geschwindigkeit und Kosteneffizienz verbessert.",
    stats: {
      totalDeployments: "305",
      deploymentChange: "+25 Deployments",
      deploymentChangePercent: "8.9",
      changePeriod: "Letztes Quartal",
      language: german,
    },
    tableHeadings: [
      "Projekt",
      "Deployments",
      "Betriebszeit",
      "Kundenzufriedenheit",
      "Effizienz",
      "Umsatzwachstum",
    ],
    summary: [
      {
        name: "Projekt Nimbus",
        deployments: "120",
        uptime: "99.9%",
        clientSatisfaction: "+4.8",
        efficiency: "+7.2%",
        revenueGrowth: "+12.5%",
        bgColor: "bg-blue-500",
        changeType: "positive",
        language: german,
      },
      {
        name: "Cloud-Migration",
        deployments: "85",
        uptime: "99.7%",
        clientSatisfaction: "+3.9",
        efficiency: "+5.4%",
        revenueGrowth: "+8.3%",
        bgColor: "bg-green-500",
        changeType: "positive",
        language: german,
      },
    ],
    language: german,
  },
];

export const tableHeadingValueMap: Record<string, string> = {
  Project: "project",
  Deployments: "deployments",
  Uptime: "uptime",
  "Client Sat.": "clientSatisfaction",
  Efficiency: "efficiency",
  "Revenue Growth": "revenueGrowth",
  Projekt: "project",
  Betriebszeit: "uptime",
  Kundenzufriedenheit: "clientSatisfaction",
  Effizienz: "efficiency",
  Umsatzwachstum: "revenueGrowth",
};

// ---------------------------------------------------------------------------
// Heroes (EN + DE)
// ---------------------------------------------------------------------------

export const heroesData: HeroType[] = [
  {
    title: "AWS Cloud Consulting for SMEs & Startups",
    description:
      "AWS expertise in cloud-native architecture, secure cloud transformation, and cost-optimized infrastructures for your business.",
    language: english,
    hero: {
      subHeading: "AWS expertise for cloud-native, secure, and cost-optimized infrastructures.",
      banner: {
        label: "News",
        href: "https://nimbustechgmbh.substack.com/p/nimbus-tech-gmbh-is-launching-soon",
        external: true,
        additional: {
          icon: "RiArrowRightUpLine",
          text: "Nimbus Tech is launching soon!",
        },
      },
    },
  },
  {
    title: "Nimbus Tech",
    description:
      "Nimbus Tech unterstützt kleine und mittelständische Unternehmen sowie Start-ups in der DACH-Region dabei, AWS optimal zu nutzen – mit cloud-native Architekturen und einer durchdachten Multi-Account-Strategie. Wir planen, bauen und optimieren Ihre Cloud-Umgebung mit Infrastructure as Code (IaC), setzen Serverless Computing dort ein, wo es sinnvoll ist, und nutzen bewährte Methoden zur Kostenoptimierung.",
    language: german,
    hero: {
      subHeading: "AWS-Expertise für cloud-native, sichere und kostenoptimierte Infrastrukturen.",
      banner: {
        label: "Aktuelles",
        href: "https://nimbustechgmbh.substack.com/p/nimbus-tech-gmbh-is-launching-soon",
        external: true,
        additional: {
          icon: "RiArrowRightUpLine",
          text: "Nimbus Tech startet bald!",
        },
      },
    },
  },
];

// ---------------------------------------------------------------------------
// Certifications (EN + DE)
// ---------------------------------------------------------------------------

export const certificationSectionsData: CertificationSection[] = [
  {
    title: "Our Certifications",
    description:
      "Nimbus Tech is certified in AWS and software architecture, ensuring high quality and reliable AWS cloud solutions.",
    language: english,
    certifications: [
      {
        title:
          "iSAQB® Certified Professional for Software Architecture - Advanced Level (CPSA-A)",
        description:
          "Advanced expertise in software architecture principles and practices.",
        image: {
          certIsaQbAdvanced: {
            src: "https://d1ljophloyhryl.cloudfront.net/assets/certifications/cpsa.a.png",
            alt: "CPSA-A certification badge",
            width: 200,
            height: 200,
          },
        },
        link: "https://d1ljophloyhryl.cloudfront.net/assets/certifications/2402-CPSAAL-003-EN.pdf",
        key: "certIsaQbAdvanced",
        language: english,
      },
      {
        title:
          "iSAQB® Certified Professional for Software Architecture - Foundation Level (CPSA-F)",
        description:
          "Fundamental knowledge of software architecture concepts and methodologies.",
        image: {
          certIsaQbFoundation: {
            src: "https://app.skillsclub.com/participants/115738/credentials/217564-2301-CPSAFL-223971-EN.png?ngsw-bypass=true&v=1716371214&Expires=1837082997&Signature=duhUg5dapPCYABZlu903zk~WlmPt75Sap-7sFkFgk0Cxd51gSm7lf4XBuR4SM8fU5ephShR50oFamcrsxF23t9E5yuCjSYC0FL1Oeujv7z1BkujgoVK37pdYCYPPlfeW7DepRSYJeAlIYejTrjxq2gsHYHHpOpqBhekyMCVbJ0HPov6B0FNuQtJ9Jr8eH9kAyxwxuAV5AWtT3T5Xfhw33V6zVU55sGWvYEW5i70T24kEodo2FZgVVMOgWsJK4QgjhdlVzMAwVCKrOJshKA33CY48kdPe6DQy26PnbFIoV-j9k6124QIBwLC4X66Gw3R9pMpBLVn6ym3nppBozizmnw__&Key-Pair-Id=APKAJGVOLYFJFHV5FSSQ",
            alt: "CPSA-F certification badge",
            width: 200,
            height: 200,
          },
        },
        link: "https://app.skillsclub.com/credential/28340-f57d08ae92c30e28a0c2850516e8fec9616ac7473feba42e7c4a2e62585c44c0?locale=en&badge=true",
        key: "certIsaQbFoundation",
        language: english,
      },
      {
        title: "Apollo Certified Graph Developer - Professional",
        description:
          "Certified skills in GraphQL development and Apollo client/server technologies.",
        image: {
          certApolloProfessional: {
            src: "https://res.cloudinary.com/apollographql/image/upload/v1654200365/odyssey/certifications/graph_professional_badge.svg",
            alt: "Apollo Graph Professional certification badge",
            width: 200,
            height: 200,
          },
        },
        link: "https://www.apollographql.com/tutorials/certifications/d5356f71-0760-4701-ae67-8b56c425c89a",
        key: "certApolloProfessional",
        language: english,
      },
      {
        title: "Apollo Certified Graph Developer - Associate",
        description:
          "Certified skills in GraphQL development and Apollo client/server technologies.",
        image: {
          certApolloAssociate: {
            src: "https://res.cloudinary.com/apollographql/image/upload/v1632844693/badge_sfsiin.svg",
            alt: "Apollo Graph Associate certification badge",
            width: 200,
            height: 200,
          },
        },
        link: "https://www.apollographql.com/tutorials/certifications/3ad7e4dd-4b29-46f2-8e65-6e5706e0c067",
        key: "certApolloAssociate",
        language: english,
      },
      {
        title: "Git Certified Specialist by GitKraken",
        description:
          "Expertise in Git version control and collaboration workflows.",
        image: {
          certGitKraken: {
            src: "https://d1ljophloyhryl.cloudfront.net/assets/certifications/gitkraken.svg",
            alt: "GitKraken Git certification badge",
            width: 200,
            height: 200,
          },
        },
        link: "https://d1ljophloyhryl.cloudfront.net/assets/certifications/foundations.git.kraken.2022.10.11.pdf",
        key: "certGitKraken",
        language: english,
      },
      {
        title: "AWS Certified Developer - Associate",
        description:
          "Demonstrates proficiency in developing and maintaining applications on AWS.",
        image: {
          certAwsDeveloper: {
            src: "https://d1.awsstatic.com/certification/badges/AWS-Certified-Developer-Associate_badge_150x150.a8973e238efb2d1b0b24f5282e1ad87eb554e6ef.png",
            alt: "AWS Certified Developer badge",
            width: 200,
            height: 200,
          },
        },
        key: "certAwsDeveloper",
        language: english,
      },
      {
        title: "AWS Certified Solutions Architect - Professional",
        description:
          "Demonstrates proficiency in architecting applications on AWS.",
        image: {
          certAwsSap: {
            src: "https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
            alt: "AWS Solutions Architect Professional badge",
            width: 200,
            height: 200,
          },
        },
        key: "certAwsSap",
        language: english,
      },
    ],
  },
  {
    title: "Unsere Zertifizierungen",
    description:
      "Nimbus Tech ist in AWS und Software-Architektur zertifiziert – für hochwertige und verlässliche AWS-Cloud-Lösungen.",
    language: german,
    certifications: [
      {
        title:
          "iSAQB® Certified Professional for Software Architecture - Advanced Level (CPSA-A)",
        description:
          "Fortgeschrittene Expertise in Softwarearchitektur-Prinzipien und -Praktiken.",
        image: {
          certIsaQbAdvanced: {
            src: "https://d1ljophloyhryl.cloudfront.net/assets/certifications/cpsa.a.png",
            alt: "CPSA-A certification badge",
            width: 200,
            height: 200,
          },
        },
        key: "certIsaQbAdvanced",
        language: german,
      },
      {
        title:
          "iSAQB® Certified Professional for Software Architecture - Foundation Level (CPSA-F)",
        description:
          "Grundlegendes Wissen über Konzepte und Methoden der Softwarearchitektur.",
        image: {
          certIsaQbFoundation: {
            src: "https://app.skillsclub.com/participants/115738/credentials/217564-2301-CPSAFL-223971-EN.png?ngsw-bypass=true&v=1716371214&Expires=1837082997&Signature=duhUg5dapPCYABZlu903zk~WlmPt75Sap-7sFkFgk0Cxd51gSm7lf4XBuR4SM8fU5ephShR50oFamcrsxF23t9E5yuCjSYC0FL1Oeujv7z1BkujgoVK37pdYCYPPlfeW7DepRSYJeAlIYejTrjxq2gsHYHHpOpqBhekyMCVbJ0HPov6B0FNuQtJ9Jr8eH9kAyxwxuAV5AWtT3T5Xfhw33V6zVU55sGWvYEW5i70T24kEodo2FZgVVMOgWsJK4QgjhdlVzMAwVCKrOJshKA33CY48kdPe6DQy26PnbFIoV-j9k6124QIBwLC4X66Gw3R9pMpBLVn6ym3nppBozizmnw__&Key-Pair-Id=APKAJGVOLYFJFHV5FSSQ",
            alt: "CPSA-F certification badge",
            width: 200,
            height: 200,
          },
        },
        key: "certIsaQbFoundation",
        language: german,
      },
      {
        title: "Apollo Certified Graph Developer - Professional",
        description:
          "Zertifizierte Fähigkeiten in der GraphQL-Entwicklung und Apollo-Client/Server-Technologien.",
        image: {
          certApolloProfessional: {
            src: "https://res.cloudinary.com/apollographql/image/upload/v1654200365/odyssey/certifications/graph_professional_badge.svg",
            alt: "Apollo Graph Professional certification badge",
            width: 200,
            height: 200,
          },
        },
        key: "certApolloProfessional",
        language: german,
      },
      {
        title: "Apollo Certified Graph Developer - Associate",
        description:
          "Zertifizierte Fähigkeiten in der GraphQL-Entwicklung und Apollo-Client/Server-Technologien.",
        image: {
          certApolloAssociate: {
            src: "https://res.cloudinary.com/apollographql/image/upload/v1632844693/badge_sfsiin.svg",
            alt: "Apollo Graph Associate certification badge",
            width: 200,
            height: 200,
          },
        },
        key: "certApolloAssociate",
        language: german,
      },
      {
        title: "Git Certified Specialist by GitKraken",
        description: "Expertise in Git-Versionskontrolle und Kollaborations-Workflows.",
        image: {
          certGitKraken: {
            src: "https://d1ljophloyhryl.cloudfront.net/assets/certifications/gitkraken.svg",
            alt: "GitKraken Git certification badge",
            width: 200,
            height: 200,
          },
        },
        key: "certGitKraken",
        language: german,
      },
      {
        title: "AWS Certified Developer - Associate",
        description: "Zeigt Fachwissen in der Entwicklung und Wartung von Anwendungen auf AWS.",
        image: {
          certAwsDeveloper: {
            src: "https://d1.awsstatic.com/certification/badges/AWS-Certified-Developer-Associate_badge_150x150.a8973e238efb2d1b0b24f5282e1ad87eb554e6ef.png",
            alt: "AWS Certified Developer badge",
            width: 200,
            height: 200,
          },
        },
        key: "certAwsDeveloper",
        link: "https://www.aws.training/certification/aws-certified-developer-associate",
        language: german,
      },
      {
        title: "AWS Certified Solutions Architect - Professional",
        description: "Zeigt Fachwissen in der Architektur von Anwendungen auf AWS.",
        image: {
          certAwsSap: {
            src: "https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
            alt: "AWS Solutions Architect Professional badge",
            width: 200,
            height: 200,
          },
        },
        key: "certAwsSap",
        language: german,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Testimonials (EN + DE)
// ---------------------------------------------------------------------------

export const testimonialBadges: TestimonialBadge[] = [
  {
    icon: "RiTimeLine",
    label: "Coming Soon",
    language: english,
  },
  {
    icon: "RiTimeLine",
    label: "Bald verfügbar",
    language: german,
  },
];

export const testimonialItems: TestimonialItem[] = [
  {
    rating: 5.0,
    badge: testimonialBadges.find(
      (badge) => badge.language.value === english.value,
    ),
    name: "The Nimbus Tech Team",
    role: "AWS Cloud & Software Experts, Germany",
    company: "Nimbus Tech",
    content:
      "As Nimbus Tech launches, we look forward to partnering with small, mid-market, and enterprise businesses to deliver clear, effective AWS cloud solutions. Your feedback could be featured here!",
    imageKey: "testimonialLogo",
    language: english,
  },
  {
    rating: 5.0,
    badge: testimonialBadges.find(
      (badge) => badge.language.value === german.value,
    ),
    name: "Das Nimbus Tech Team",
    role: "AWS-Cloud- & Software-Expert:innen, Deutschland",
    company: "Nimbus Tech",
    content:
      "Zum Start von Nimbus Tech freuen wir uns darauf, gemeinsam mit Unternehmen klare, wirksame AWS-Cloud-Lösungen umzusetzen. Ihr Feedback könnte hier erscheinen!",
    imageKey: "testimonialLogo",
    language: german,
  },
];

export const testimonialSections: TestimonialSection[] = [
  {
    title: "Client Success Stories",
    backgroundImageKeys: ["testimonialField", "testimonialDrone"],
    fallbackIndex: 0,
    language: english,
  },
  {
    title: "Kundenerfahrungen",
    backgroundImageKeys: ["testimonialField", "testimonialDrone"],
    fallbackIndex: 0,
    language: german,
  },
];

// ---------------------------------------------------------------------------
// Navigation (EN + DE)
// ---------------------------------------------------------------------------

export const navigationLinksByLanguage: Partial<Record<
  Language["value"],
  NavigationSectionItem[]
>> = {
  "en-US": [
    {
      label: "Services",
      href: "#features",
      language: english,
      type: "navigation",
    },
    {
      label: "About Us",
      href: "#about-us",
      language: english,
      type: "navigation",
    },
    {
      label: "Blog",
      href: "https://nimbustechgmbh.substack.com",
      external: true,
      language: english,
      type: "navigation",
    },
    {
      label: "Contact",
      href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
      language: english,
      type: "navigation",
    },
  ],
  "de-DE": [
    {
      label: "Leistungen",
      href: "#features",
      language: german,
      type: "navigation",
    },
    {
      label: "Über uns",
      href: "#about-us",
      language: german,
      type: "navigation",
    },
    {
      label: "Blog",
      href: "https://nimbustechgmbh.substack.com",
      external: true,
      language: german,
      type: "navigation",
    },
    {
      label: "Kontakt",
      href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
      language: german,
      type: "navigation",
    },
  ],
};

export const navigationSections: NavigationSection[] = [
  {
    title: "Nimbus Tech",
    description:
      "Nimbus Tech is an AWS-focused cloud consulting and software engineering company. We help small, mid-market, and enterprise businesses design, migrate, and operate scalable, secure systems on AWS without unnecessary complexity.",
    image: {
      src: "https://d1ljophloyhryl.cloudfront.net/assets/nimbus.logo.svg",
      alt: "Nimbus Tech Navbar Logo",
      width: 50,
      height: 50,
    },
    cta: {
      label: "Contact Us",
      href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
      language: english,
      type: "navigation",
    },
    language: english,
    items: navigationLinksByLanguage["en-US"]!,
  },
  {
    title: "Nimbus Tech",
    description:
      "Nimbus Tech ist ein auf AWS fokussiertes Cloud-Beratungs- und Software-Engineering-Unternehmen. Wir helfen Unternehmen, skalierbare und sichere Systeme auf AWS zu entwerfen, zu migrieren und zu betreiben – ohne unnötige Komplexität.",
    image: {
      src: "https://d1ljophloyhryl.cloudfront.net/assets/nimbus.logo.svg",
      alt: "Nimbus Tech Navbar Logo",
      width: 50,
      height: 50,
      type: "navigation",
    },
    cta: {
      label: "Erstgespräch",
      href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
      language: german,
      type: "navigation",
    },
    language: german,
    items: navigationLinksByLanguage["de-DE"]!,
  },
];

// ---------------------------------------------------------------------------
// Footer (EN + DE)
// ---------------------------------------------------------------------------

export const footerData: CompositePageContentWithExtras<{
  sections: FooterSections;
  language: Language;
}>[] = [
  {
    title: "Footer",
    sections: {
      services: {
        title: "services",
        items: [
          {
            label: "AWS Cloud Consulting",
            href: "#features",
            language: english,
            type: "footer",
            sectionKey: "services",
          },
          {
            label: "AWS Migration & Modernization",
            href: "#features",
            language: english,
            type: "footer",
            sectionKey: "services",
          },
          {
            label: "DevOps & Automation on AWS",
            href: "#features",
            language: english,
            type: "footer",
            sectionKey: "services",
          },
        ],
      },
      resources: {
        title: "resources",
        items: [
          {
            label: "Contact",
            href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
            language: english,
            type: "footer",
            sectionKey: "resources",
          },
          {
            label: "Support",
            href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
            language: english,
            type: "footer",
            sectionKey: "resources",
          },
          {
            label: "Privacy Policy",
            href: "/privacy-policy",
            language: english,
            type: "footer",
            sectionKey: "resources",
          },
          {
            label: "Terms of Service",
            href: "/terms",
            language: english,
            type: "footer",
            sectionKey: "resources",
          },
        ],
      },
      social: {
        title: "social",
        items: [
          {
            label: "LinkedIn",
            href: "#",
            external: true,
            icon: "RiLinkedinBoxFill",
            language: english,
            type: "footer",
            sectionKey: "social",
          },
          {
            label: "GitHub",
            href: "https://github.com/Nimbus-Tech-GmbH",
            external: true,
            icon: "RiGithubFill",
            language: english,
            type: "footer",
            sectionKey: "social",
          },
          {
            label: "Blog",
            href: "https://nimbustechgmbh.substack.com",
            external: true,
            icon: "RiArticleFill",
            language: english,
            type: "footer",
            sectionKey: "social",
          },
        ],
      },
    },
    language: english,
  },
  {
    title: "Footer - DE",
    sections: {
      services: {
        title: "services",
        items: [
          {
            label: "AWS-Cloud-Beratung",
            href: "#features",
            language: german,
            type: "footer",
            sectionKey: "services",
          },
          {
            label: "AWS-Migration & Modernisierung",
            href: "#features",
            language: german,
            type: "footer",
            sectionKey: "services",
          },
          {
            label: "DevOps & Automatisierung auf AWS",
            href: "#features",
            language: german,
            type: "footer",
            sectionKey: "services",
          },
        ],
      },
      resources: {
        title: "resources",
        items: [
          {
            label: "Kontakt",
            href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
            language: german,
            type: "footer",
            sectionKey: "resources",
          },
          {
            label: "Datenschutzerklärung",
            href: "/privacy-policy",
            language: german,
            type: "footer",
            sectionKey: "resources",
          },
          {
            label: "Impressum",
            href: "/terms",
            language: german,
            type: "footer",
            sectionKey: "resources",
          },
        ],
      },
      social: {
        title: "social",
        items: [
          {
            label: "LinkedIn",
            href: "#",
            external: true,
            icon: "RiLinkedinBoxFill",
            language: german,
            type: "footer",
            sectionKey: "social",
          },
          {
            label: "GitHub",
            href: "https://github.com/Nimbus-Tech-GmbH",
            external: true,
            icon: "RiGithubFill",
            language: german,
            type: "footer",
            sectionKey: "social",
          },
          {
            label: "Blog",
            href: "https://nimbustechgmbh.substack.com",
            external: true,
            icon: "RiArticleFill",
            language: german,
            type: "footer",
            sectionKey: "social",
          },
        ],
      },
    },
    language: german,
  },
];

// ---------------------------------------------------------------------------
// CTAs (EN + DE) + sections + backgrounds
// ---------------------------------------------------------------------------

export const ctaBackgrounds: ImageConfig[] = [
  {
    src: "/images/farm-footer.webp",
    alt: "Farm with vehicles blurred",
    width: 1000,
    height: 1000,
  },
  {
    src: "/images/farm-footer.webp",
    alt: "Farm with vehicles",
    width: 1000,
    height: 1000,
  },
];

export const ctasData: CTA[] = [
  // English CTAs
  {
    label: "Book a free consultation",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
    type: "cta",
    language: english,
  },
  {
    label: "Request an AWS assessment",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
    type: "cta",
    language: english,
  },
  {
    label: "Let's Talk",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
    type: "certification",
    language: english,
  },
  {
    label: "Free 15-minute consultation",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
    type: "main",
    language: english,
  },
  {
    label: "News",
    href: "https://nimbustechgmbh.substack.com/p/nimbus-tech-gmbh-is-launching-soon",
    external: true,
    type: "hero",
    language: english,
  },
  {
    label: "Contact Us",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    language: english,
    type: "navigation",
  },
  // German CTAs
  {
    label: "Kostenloses Erstgespräch buchen",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
    type: "cta",
    language: german,
  },
  {
    label: "AWS-Assessment anfragen",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
    type: "cta",
    language: german,
  },
  {
    label: "Lass uns sprechen",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
    type: "certification",
    language: german,
  },
  {
    label: "Kostenloses Erstgespräch",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    external: false,
    type: "main",
    language: german,
  },
  {
    label: "Aktuelles",
    href: "https://nimbustechgmbh.substack.com/p/nimbus-tech-gmbh-is-launching-soon",
    external: true,
    type: "hero",
    language: german,
  },
  {
    label: "Erstgespräch",
    href: "mailto:r.khanduri@nimbus-tech.de,f.zeidler@nimbus-tech.de",
    language: german,
    type: "navigation",
  },
];

export const ctaSectionsData: CtaSection[] = [
  {
    title: "Ready to get started?",
    description:
      "We help you build digital products that your users will love. Let's talk about your project.",
    language: english,
    ctas: ctasData.filter((cta) => cta.language.value === "en-US"),
    backgrounds: ctaBackgrounds,
  },
  {
    title: "Bereit loszulegen?",
    description:
      "Wir helfen Ihnen, digitale Produkte zu entwickeln, die Ihre Nutzer lieben werden. Lassen Sie uns über Ihr Projekt sprechen.",
    language: german,
    ctas: ctasData.filter((cta) => cta.language.value === "de-DE"),
    backgrounds: ctaBackgrounds,
  },
];

// ---------------------------------------------------------------------------
// Image seed data
// ---------------------------------------------------------------------------

export const imageSeedData: Record<ImageKeys, ImageConfig> = {
  certIsaQbAdvanced: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/certifications/cpsa.a.png",
    alt: "CPSA-A certification badge",
    width: 200,
    height: 200,
    type: "certification",
    key: "certIsaQbAdvanced",
  },
  certIsaQbFoundation: {
    src: "https://app.skillsclub.com/participants/115738/credentials/217564-2301-CPSAFL-223971-EN.png?ngsw-bypass=true&v=1716371214&Expires=1837082997&Signature=duhUg5dapPCYABZlu903zk~WlmPt75Sap-7sFkFgk0Cxd51gSm7lf4XBuR4SM8fU5ephShR50oFamcrsxF23t9E5yuCjSYC0FL1Oeujv7z1BkujgoVK37pdYCYPPlfeW7DepRSYJeAlIYejTrjxq2gsHYHHpOpqBhekyMCVbJ0HPov6B0FNuQtJ9Jr8eH9kAyxwxuAV5AWtT3T5Xfhw33V6zVU55sGWvYEW5i70T24kEodo2FZgVVMOgWsJK4QgjhdlVzMAwVCKrOJshKA33CY48kdPe6DQy26PnbFIoV-j9k6124QIBwLC4X66Gw3R9pMpBLVn6ym3nppBozizmnw__&Key-Pair-Id=APKAJGVOLYFJFHV5FSSQ",
    alt: "CPSA-F certification badge",
    width: 200,
    height: 200,
    type: "certification",
    key: "certIsaQbFoundation",
  },
  certApolloProfessional: {
    src: "https://res.cloudinary.com/apollographql/image/upload/v1654200365/odyssey/certifications/graph_professional_badge.svg",
    alt: "Apollo Graph Professional certification badge",
    width: 200,
    height: 200,
    type: "certification",
    key: "certApolloProfessional",
  },
  certApolloAssociate: {
    src: "https://res.cloudinary.com/apollographql/image/upload/v1632844693/badge_sfsiin.svg",
    alt: "Apollo Graph Associate certification badge",
    width: 200,
    height: 200,
    type: "certification",
    key: "certApolloAssociate",
  },
  certGitKraken: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/certifications/gitkraken.svg",
    alt: "GitKraken Git certification badge",
    width: 200,
    height: 200,
    type: "certification",
    key: "certGitKraken",
  },
  certAwsDeveloper: {
    src: "https://d1.awsstatic.com/certification/badges/AWS-Certified-Developer-Associate_badge_150x150.a8973e238efb2d1b0b24f5282e1ad87eb554e6ef.png",
    alt: "AWS Certified Developer badge",
    width: 200,
    height: 200,
    type: "certification",
    key: "certAwsDeveloper",
  },
  certAwsSap: {
    src: "https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
    alt: "AWS Solutions Architect Professional badge",
    width: 200,
    height: 200,
    type: "certification",
    key: "certAwsSap",
  },
  ctaForeground: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/images/farm-footer.webp",
    alt: "Farm with vehicles",
    width: 1000,
    height: 1000,
    type: "cta",
  },
  navigationPrimary: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/nimbus.logo.svg",
    alt: "Nimbus Tech Navbar Logo",
    width: 50,
    height: 50,
    type: "navigation",
  },
  testimonialField: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/images/field.png",
    alt: "clouds background",
    fill: true,
    type: "testimonial",
  },
  testimonialDrone: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/images/drone.png",
    alt: "clouds background",
    width: 1583,
    height: 554,
    type: "testimonial",
  },
  testimonialLogo: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/nimbus.svg",
    alt: "Nimbus Tech logo",
    width: 50,
    height: 50,
    type: "testimonial",
  },
  resumePhotoFlori: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/images/flori.JPG",
    alt: "Resume Avatar",
    width: 150,
    height: 150,
    type: "resume",
  },
  resumePhoto: {
    src: "https://d1ljophloyhryl.cloudfront.net/assets/images/rohit.JPG",
    alt: "Resume Photo",
    width: 150,
    height: 150,
    type: "resume",
  },
};

// ---------------------------------------------------------------------------
// Main page content (kept for pageContents.ts)
// ---------------------------------------------------------------------------

export const mainPageContent = {
  title: "Nimbus Tech",
  subheading: "Cloud-native AWS architectures for businesses of all sizes.",
  description:
    "AWS cloud consulting and cloud-native solutions for small, mid-market, and enterprise businesses. We design, implement, and optimize your AWS environment using Infrastructure as Code (IaC), serverless computing, and a secure cloud transformation approach so your business can grow safely and cost-effectively.",
};

export const CURRENT_YEAR = new Date().getFullYear();
