import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import Images, { ResumeImageKey, CertificationImageKey, ImageKeys } from "./images";

/**
 * Parses a date string in "MM-YYYY" format
 * and returns an ISO-8601 datetime string (UTC).
 * Example: "03-2025" -> "2025-03-01T00:00:00.000Z"
 */
export function parseDate(input: string): string {
  const [monthStr, yearStr] = input.split("-");

  if (!monthStr || !yearStr) {
    throw new Error(`Invalid date format: "${input}". Expected "MM-YYYY".`);
  }

  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  if (Number.isNaN(month) || Number.isNaN(year) || month < 1 || month > 12) {
    throw new Error(`Invalid month/year in "${input}".`);
  }

  // Day is fixed to 1 because input does not include a day
  const date = new Date(Date.UTC(year, month - 1, 1));

  return date.toISOString(); // e.g. "2025-03-01T00:00:00.000Z"
}



export const RESUME_DATA = [
  {
    // Resume Rohit Khanduri - English
    resume: {
      title: "Rohit Khanduri - AWS Cloud & Software Architect",
      language: "en-US", // Reference to Language.value
      createdAt: new Date().toISOString(),
    },
    certifications: ["certAwsSap", "certIsaQbFoundation", "certIsaQbAdvanced", "certApolloAssociate", "certApolloProfessional", "certGitKraken"],
    // Basic Information
    basicInformation: {
      name: "Rohit Khanduri",
      label: "AWS Cloud & Software Architect",
      email: "r.khanduri@nimbus-tech.de",
      url: "https://www.linkedin.com/in/rohit-khanduri-9098b84a/",
      summary: "I’m an AWS-focused Cloud Architect and software engineer with 14+ years of experience designing and delivering secure, scalable systems in the cloud. I specialize in AWS Well-Architected architectures, Infrastructure as Code, and cloud-native application development using Node.js, React, TypeScript, and modern DevOps practices. I help small, mid-market, and enterprise businesses plan and execute secure cloud transformations on AWS – from first migration steps to mature multi-account environments. My strength is combining hands-on engineering with clear communication so stakeholders understand trade-offs while teams ship fast, reliable software.",
      language: "en-US",
      resumePhotoKey: "resumePhoto",
    },
    // Location
    location: {
      address: "Frankfurt, Hesse, Germany",
      postalCode: "",
      city: "Frankfurt",
      countryCode: "DE",
      region: "Hessen",
      language: "en-US",
    },

    // Profiles
    profiles: [
      {
        network: "LinkedIn",
        username: "rohit-khanduri-9098b84a",
        url: "https://www.linkedin.com/in/rohit-khanduri-9098b84a/",
        language: "en-US",
      },
      {
        network: "GitHub",
        username: "rohit1901",
        url: "https://github.com/rohit1901",
        language: "en-US",
      },
      {
        network: "Other",
        username: "rohitkhanduri",
        url: "https://rohitkhanduri.substack.com/",
        language: "en-US",
      },
    ],

    // Work Experience
    work: [
      {
        name: "Miles & More GmbH (Lufthansa Group)",
        position: "Manager IT / Lead Architect – Mobile Platform",
        url: "https://www.miles-and-more.com/",
        startDate: parseDate("03-2025"),
        endDate: null,
        summary: `Lead architect for the Miles & More commercial mobile platform and customer communication architecture, responsible for technical direction, platform architecture, AI-driven improvements, and secure, reliable delivery of Flutter-based and AWS-backed services used by millions of Lufthansa Group customers.`,
        highlights: `Define and own the target architecture and technical roadmap for the Miles & More commercial mobile app across Flutter, native mobile integrations, REST and GraphQL APIs, BFF patterns, Apigee API Gateway, and an OpenShift-managed microservice landscape ✌🏻 Lead and coordinate a multi-vendor, outsourced development setup with architecture governance, coding standards, review gates, and ADRs to ensure consistent engineering quality across teams ✌🏻 Align architecture decisions with product, design, security, compliance, and Enterprise Architecture stakeholders to create scalable solution architectures for customer-facing mobile and communication services ✌🏻 Oversee CI/CD pipelines, release management, and production readiness using Jenkins, Azure DevOps, and Fastlane, including crash monitoring and observability through Firebase Crashlytics ✌🏻 Own and evolve the AWS SES architecture for daily large-scale customer communication, supported by CloudWatch, KMS, DynamoDB, and IAM, with strong focus on reliability, security, and GDPR-aligned operations ✌🏻 Drive AI adoption by running PoCs and building practical AI capabilities such as a Hybrid RAG-based internal knowledge assistant, engineering copilots, prompt evaluation workflows, Elastic-powered document search, chatbot solutions using models hosted on Azure with OpenWebUI, and workflow automation with n8n`,
        language: "en-US",
      },
      {
        name: "adesso SE",
        position: "Software Architect – AWS & Enterprise Systems",
        url: "https://www.adesso.de/",
        startDate: parseDate("08-2020"),
        endDate: parseDate("02-2025"),
        summary: `Software architect and consultant for large-scale banking and public-sector systems, designing cloud-hosted (AWS) microservice and micro-frontend architectures in regulated environments.`,
        highlights: `Led architectural assessments and AWS readiness reviews of existing production systems and proposed pragmatic modernization steps ✌🏻 Defined target architectures and 1–3 year technology roadmaps for AWS-based platforms, aligning with business and compliance requirements ✌🏻 Acted as primary architectural contact for client stakeholders and internal teams, translating business goals into technical decisions ✌🏻 Introduced coding guidelines, review processes, and quality standards to improve reliability and delivery speed across teams ✌🏻 Led frontend and platform teams (React, Angular, Flutter) on security- and compliance-sensitive projects in the banking and public sector`,
        language: "en-US",
      },
      {
        name: "Finatix GmbH / Peak Performance Apps GmbH / Appsfactory GmbH",
        position: "Software Developer (Working Student)",
        startDate: parseDate("12-2017"),
        endDate: parseDate("07-2020"),
        summary: `Working student developer across FinTech, market research, and consumer applications, building web and mobile frontends and contributing to full-stack and early AWS-based workloads.`,
        highlights: `Implemented features for financial dashboards, survey platforms, and consumer mobile apps using React, Vue.js, Angular, and React Native ✌🏻 Collaborated with backend teams on Node.js and Java services and helped integrate APIs deployed to cloud environments (incl. early AWS-based setups) ✌🏻 Worked on fraud-detection and data-driven features together with data science teams, focusing on data quality and performance ✌🏻 Contributed to modernization of existing codebases and UI designs and practiced agile delivery, code reviews, and CI/CD pipelines`,
        language: "en-US",
      },
      {
        name: "Iris Software Inc.",
        position: "Tech Lead / Software Engineer",
        url: "https://www.irissoftware.com/",
        startDate: parseDate("06-2016"),
        endDate: parseDate("09-2017"),
        summary: `Tech lead for telecom provisioning and enterprise web systems, leading a small team on Java-based services and integrations.`,
        highlights: `Led a team delivering Spring Boot microservices and REST APIs for telecom provisioning ✌🏻 Coordinated design, code reviews, and release readiness across a small cross-functional team`,
        language: "en-US",
      },
      {
        name: "Virtusa Corp.",
        position: "Tech Lead / Senior Engineer",
        url: "https://www.virtusa.com/",
        startDate: parseDate("08-2014"),
        endDate: parseDate("05-2016"),
        summary: `Tech lead on Java EE applications using Spring and Hibernate, responsible for key modules and mentoring junior engineers.`,
        highlights: `Owned design and implementation of core REST APIs and integrations on Spring/Hibernate ✌🏻 Mentored junior developers and guided coding standards and design patterns`,
        language: "en-US",
      },
      {
        name: "Genpact",
        position: "Software Engineer",
        url: "https://www.genpact.com/",
        startDate: parseDate("06-2013"),
        endDate: parseDate("07-2014"),
        summary: `Software engineer working on Calypso and Java-based enterprise applications in the financial domain.`,
        highlights: `Implemented and customized Calypso components and Java backend services ✌🏻 Collaborated with senior engineers and business analysts on requirements and production issues`,
        language: "en-US",
      },
      {
        name: "NEC",
        position: "Software Engineer",
        url: "https://www.nec.com/",
        startDate: parseDate("07-2012"),
        endDate: parseDate("05-2013"),
        summary: `Software engineer building Java-based backend components for enterprise clients.`,
        highlights: `Implemented backend features and integrations on Java/J2EE stacks ✌🏻 Worked closely with senior engineers on performance and reliability improvements`,
        language: "en-US",
      },
    ],
    // Volunteer
    volunteer: [
      {
        organization: "Open Source Community & Personal AI Projects",
        position: "Builder & Contributor",
        url: "https://github.com/rohit1901",
        startDate: parseDate("01-2018"),
        endDate: null,
        summary: "Actively building and experimenting with AI/LLM tooling, open-source libraries, and developer infrastructure, with a focus on local AI adoption, LLM integration, and AI-powered platform development.",
        highlights: `Building Skywink (skywink.nimbus-tech.de), an AI platform for LLM orchestration, prompt engineering, and AI workflow automation ✌🏻 Developed drama-llm, a local LLM chatbot using Ollama and shadcn/ui, exploring on-device AI inference ✌🏻 Built and contributed to Ollama JS and Python libraries, integrating local LLM model discovery via a FastAPI service ✌🏻 Working on an MCP (Model Context Protocol) Server for Databases, enabling AI agents to interact with structured data sources ✌🏻 Maintained open-source TypeScript and React libraries (intl-react, ts-raw-utils, mockable) used by the JavaScript/TypeScript community ✌🏻 Experimented with ML clustering and classification techniques in Python (scikit-learn) for data science use cases`,
        language: "en-US",
      },
      {
        organization: "Robinhood Army",
        position: "Volunteer",
        url: "https://robinhoodarmy.com/",
        startDate: parseDate("01-2015"),
        endDate: parseDate("07-2018"),
        summary: "Volunteered at Robinhood Army.",
        highlights: `Distributed food to the needy people ✌🏻 Conducted food distribution drives ✌🏻 Organized events and activities ✌🏻 Provided support to community members`,
        language: "en-US",
      },
    ],
    // Education
    education: [
      {
        institution: "Hochschule Mittweida - University of Applied Sciences",
        url: "https://www.hs-mittweida.de/",
        area: "Applied Mathematics for Network and Data Science",
        studyType: "Master of Science",
        startDate: parseDate("09-2017"),
        endDate: parseDate("09-2022"),
        language: "en-US",
      },
      {
        institution: "Uttar Pradesh Technical University",
        url: "https://www.aktu.ac.in/",
        area: "Information Technology",
        studyType: "Bachelor of Technology",
        startDate: parseDate("08-2007"),
        endDate: parseDate("06-2011"),
        language: "en-US",
      },
    ],
    // Awards
    awards: [
      {
        title: "Talent Pool",
        date: parseDate("12-2022"),
        awarder: "adesso SE",
        summary: "Selected for adesso's distinguished top talent program, recognized for exceptional work performance and strong work ethics, offering unique opportunities for networking and professional growth within the company.",
        language: "en-US",
      },
      {
        title: "First Runner-up – Innovation Challenge Hackathon #2",
        date: parseDate("11-2017"),
        awarder: "Hochschule Mittweida",
        summary: "Designed and built an Android application solo for Team 'EASY' in 48 hours and was awarded the first runner-up prize of €100.",
        language: "en-US",
      },
      {
        title: "Certificate of Appreciation",
        date: parseDate("07-2017"),
        awarder: "Iris Software Inc.",
        summary: "Awarded to employees who have worked exceptionally well and won accolades from the client.",
        language: "en-US",
      },
      {
        title: "Round of Applause",
        date: parseDate("07-2017"),
        awarder: "Iris Software Inc.",
        summary: "Awarded to employees who have worked exceptionally well in a particular month.",
        language: "en-US",
      },
      {
        title: "Top Talent",
        date: parseDate("08-2015"),
        awarder: "Polaris Financial Services (Associated with Virtusa)",
        summary: "Top Talent Award granted to employees who have worked exceptionally well and won accolades from the client.",
        language: "en-US",
      },
    ],
    // Publications
    publications: [
      {
        name: "Fraud Detection using Machine Learning",
        publisher: "Hochschule Mittweida - University of Applied Sciences",
        releaseDate: parseDate("06-2023"),
        url: "https://monami.hs-mittweida.de/frontdoor/index/index/year/2023/docId/13759",
        summary: "This paper presents a novel approach to fraud detection using machine learning techniques. We propose a hybrid model that combines supervised and unsupervised learning algorithms to identify fraudulent transactions with high accuracy. Our approach outperforms existing methods in terms of precision and recall.",
        language: "en-US",
      },
    ],
    // Skills
    skills: [
      {
        name: "AWS Cloud Architecture & Infrastructure",
        level: "Expert",
        keywords: "AWS Well-Architected Framework, Multi-Account Strategy (AWS Organizations, Control Tower), VPC Design, IAM & Security Policies, EC2, ECS, EKS, Lambda, API Gateway, S3, CloudFront, RDS, DynamoDB, SQS, SNS, EventBridge, Step Functions, ElastiCache, Route 53, ACM, Secrets Manager, Parameter Store, AWS CDK, CloudFormation, Terraform (IaC), Auto Scaling, Elastic Load Balancing, Cost Optimization, AWS Pricing Models, Reserved Instances, Savings Plans",
        language: "en-US",
      },
      {
        name: "AI, ML & LLM Integration",
        level: "Intermediate",
        keywords: "LLM Integration, Prompt Engineering, Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), Ollama, OpenAI API, Anthropic Claude API, AI Workflow Automation, AI PoC Design, Chatbot Development, Amazon Bedrock, Applied Mathematics, Statistics, Data Science, Clustering & Classification (scikit-learn), Feature Engineering, Model Evaluation, Fraud Detection (Machine Learning), Natural Language Processing, Vector Databases (Pinecone, Weaviate), TensorFlow.js, Hugging Face",
        language: "en-US",
      },
      {
        name: "DevOps, CI/CD & Automation",
        level: "Expert",
        keywords: "Infrastructure as Code (Terraform, AWS CDK, CloudFormation), CI/CD Pipelines (GitHub Actions, GitLab CI, Jenkins), Docker, Kubernetes, Helm, ArgoCD, GitOps, Trunk-Based Development, Monitoring & Observability (CloudWatch, Prometheus, Grafana), Logging (ELK Stack, CloudWatch Logs), Secrets Management, Automated Testing in Pipelines",
        language: "en-US",
      },
      {
        name: "Cloud Security & Compliance",
        level: "Advanced",
        keywords: "AWS IAM, AWS Security Hub, AWS GuardDuty, AWS Config, AWS CloudTrail, AWS KMS, Secrets Manager, OWASP Top 10, OAuth2.0, OpenID Connect, JWT, SAML",
        language: "en-US",
      },
      {
        name: "Architecture & System Design",
        level: "Expert",
        keywords: "AWS Well-Architected Framework (5 Pillars), Microservices Architecture, Event-Driven Architecture, Serverless Architecture, Domain-Driven Design (DDD), CQRS, Event Sourcing, Micro-frontends, Clean Architecture, Hexagonal Architecture, SOLID Principles, Circuit Breaker Pattern, API Gateway Pattern, High Availability, Fault Tolerance, Distributed Systems, Scalability, Cloud Migration Strategy (Lift & Shift, Re-platform, Re-architect)",
        language: "en-US",
      },
      {
        name: "Backend Development",
        level: "Advanced",
        keywords: "Node.js, NestJS, Express.js, GraphQL, Apollo Server, REST APIs, WebSockets, Prisma, TypeORM, RabbitMQ, Apache Kafka, Authentication (JWT, OAuth2, SAML), Java, Spring Boot, Python, FastAPI",
        language: "en-US",
      },
      {
        name: "Mobile Development",
        level: "Intermediate",
        keywords: "Flutter, React Native, Expo, Mobile App Architecture, Push Notifications, Deep Linking, App Store Deployment, Offline-First Architecture",
        language: "en-US",
      },
      {
        name: "Database & Data Management",
        level: "Intermediate",
        keywords: "PostgreSQL, MySQL, MongoDB, DynamoDB, Redis, Database Design, Query Optimization, Data Modeling, ACID Transactions, Database Migration, AWS RDS, AWS Aurora, AWS DynamoDB",
        language: "en-US",
      },
      {
        name: "Testing & Quality Assurance",
        level: "Intermediate",
        keywords: "Jest, Vitest, Testing Library, Cypress, Playwright, TDD, Unit Testing, Integration Testing, End-to-End Testing, Code Coverage, API Testing (Postman)",
        language: "en-US",
      },
      {
        name: "Agile & Technical Leadership",
        level: "Expert",
        keywords: "Agile, Scrum, Kanban, Sprint Planning, Backlog Grooming, Stakeholder Management, Technical Roadmaps, Architectural Assessments, AWS Well-Architected Reviews, Team Mentoring, Cross-functional Collaboration, Engineering Standards, Code Review Culture, Jira, Confluence, Notion",
        language: "en-US",
      },
    ],

    projects: [
      {
        name: "Miles & More Mobile Platform – Architecture & AI Transformation",
        startDate: parseDate("03-2025"),
        endDate: null,
        description: `Lead architect for the Miles & More commercial mobile platform and customer communication architecture, responsible for end-to-end target architecture, technical roadmap, AI-driven platform evolution, and production-grade delivery across Flutter-based mobile applications, OpenShift-managed microservices, and AWS-backed communication services used by millions of Lufthansa Group customers.`,
        highlights: `Define and own the target architecture and technical roadmap for the Miles & More commercial production app across Flutter, native iOS/Android integrations, REST and GraphQL interfaces, BFF architecture, Apigee API Gateway, and an OpenShift-managed microservice landscape ✌🏻 Establish architecture governance for a multi-vendor delivery setup through coding standards, ADRs, review gates, and cross-team alignment mechanisms to ensure maintainability, delivery consistency, and technical quality ✌🏻 Shape solution architectures together with Enterprise Architecture and align technical decisions across product, design, security, compliance, and platform stakeholders for customer-facing mobile and communication capabilities ✌🏻 Own production readiness across Jenkins, Azure DevOps, and Fastlane-based CI/CD pipelines, release management processes, and mobile observability with Firebase Crashlytics ✌🏻 Own and evolve the AWS SES-based communication architecture for daily high-volume customer messaging, supported by CloudWatch, KMS, DynamoDB, and IAM, with focus on secure delivery, operational reliability, and GDPR-compliant controls ✌🏻 Drive AI adoption through PoCs and applied solution design for Hybrid RAG-based internal knowledge assistants, engineering copilots, prompt evaluation workflows, Elastic-based document search, Azure-hosted chatbot solutions exposed via OpenWebUI, and workflow automation with n8n`,
        url: undefined,
        language: "en-US",
      },
      {
        name: "AWS Cloud Architecture & Migration – Banking & Public Sector",
        startDate: parseDate("08-2020"),
        endDate: parseDate("02-2025"),
        description: "Led cloud architecture and AWS migration initiatives for a major German bank and a federal public-sector client at adesso SE, covering both lift & shift migrations and greenfield AWS platform builds for large-scale microservice and micro-frontend systems in regulated environments.",
        highlights: `Designed and delivered a greenfield AWS platform for a major German bank using ECS Fargate, API Gateway, Lambda, Aurora, DynamoDB, SQS, SNS, and Cognito for authentication – built on a secure multi-account VPC architecture with IAM, Secrets Manager, ACM, and CloudTrail ✌🏻 Led a lift & shift cloud migration for a federal public-sector client, moving legacy on-premise workloads to AWS with minimal downtime and full operational handover ✌🏻 Defined target architectures and 1–3 year AWS roadmaps aligned with the AWS Well-Architected Framework across both engagements ✌🏻 Implemented observability and compliance pipelines using CloudWatch, CloudTrail, and Kinesis for real-time log aggregation and audit trails ✌🏻 Built content delivery and frontend infrastructure using S3, CloudFront, Amplify, and Route 53 for high-availability micro-frontend deployments ✌🏻 Conducted AWS Well-Architected Reviews and architectural assessments of existing production systems, proposing pragmatic modernization steps ✌🏻 Introduced Infrastructure as Code (Terraform, AWS CDK) and CI/CD pipelines to standardize deployments and enforce engineering quality across teams`,
        url: undefined,
        language: "en-US",
      },
      {
        name: "Skywink – Open-Source Privacy-First AI Chat Platform",
        startDate: parseDate("08-2025"),
        endDate: null,
        description: "Founder and lead engineer of Skywink, an open-source AI chat platform built by Nimbus Tech that gives users and enterprises full control over their AI conversations – run locally with Ollama for complete privacy or connect to cloud AI providers with no vendor lock-in.",
        highlights: `Architected a full-stack AI chat platform using Next.js 16, React 19, TypeScript, PostgreSQL, and Prisma ORM, deployed on Northflank with Docker multi-stage builds and production-ready CI/CD ✌🏻 Implemented a unified AI provider abstraction using the Vercel AI SDK supporting Ollama (local), OpenAI, Mistral AI, and OpenRouter – allowing seamless provider switching with user-owned API keys ✌🏻 Built secure API key storage with AES-256 and RSA encryption, CSRF protection, rate limiting, and role-based access control for an enterprise-ready security posture ✌🏻 Designed a guest mode with localStorage persistence, IP-based rate limiting, and auto-cleanup – enabling zero-signup onboarding for new users ✌🏻 Applied RAG and prompt engineering patterns and integrated streaming AI responses with real-time rendering, custom generation parameter controls, and conversation export ✌🏻 Structured the platform for horizontal scalability with stateless APIs, connection pooling, edge-compatible deployment, and CDN-ready static assets`,
        url: "https://skywink.nimbus-tech.de",
        language: "en-US",
      },
      {
        name: "Telecom & Banking Service Provisioning Platform",
        startDate: parseDate("06-2016"),
        endDate: parseDate("09-2017"),
        description: "Tech Lead on a Java-based service provisioning platform for a banking and telecom client at Iris Software Inc., responsible for backend microservices, REST API design, and team delivery.",
        highlights: `Led a small team delivering Spring Boot microservices and REST APIs for automated service provisioning and order management workflows ✌🏻 Designed and optimized Oracle database schemas and queries for high-volume transactional data ✌🏻 Built and maintained a Selenium and JUnit-based regression test suite, improving release confidence and reducing manual QA effort ✌🏻 Delivered features in two-week sprints with automated CI/CD pipelines and coordinated production readiness with cross-functional teams`,
        url: undefined,
        language: "en-US",
      },
      {
        name: "Enterprise Banking Application Modernization",
        startDate: parseDate("08-2014"),
        endDate: parseDate("05-2016"),
        description: "Tech Lead at Virtusa Corp. on the modernization of a legacy Java EE banking application for an enterprise financial client, migrating to a layered Spring MVC and Hibernate architecture.",
        highlights: `Led the re-architecture of a monolithic Java EE banking application into a maintainable Spring MVC and Hibernate layered system, improving long-term scalability and developer productivity ✌🏻 Designed and implemented RESTful API integrations enabling third-party banking system connectivity ✌🏻 Introduced coding standards, design patterns (Factory, Strategy, Observer), and code review processes across the team ✌🏻 Mentored junior developers on clean code principles and best practices in a regulated enterprise environment`,
        url: undefined,
        language: "en-US",
      },
      {
        name: "Calypso-Based Capital Markets & Reporting System",
        startDate: parseDate("06-2013"),
        endDate: parseDate("07-2014"),
        description: "Software engineer at Genpact working on a Calypso-based capital markets platform for a banking client, covering trade lifecycle management, position keeping, and financial reporting.",
        highlights: `Implemented and customized Calypso components for trade lifecycle management, position keeping, and risk reporting for a banking client ✌🏻 Built a Java-based reconciliation and reporting module integrated with Calypso data feeds for end-of-day financial processing ✌🏻 Collaborated with business analysts and senior engineers to translate financial domain requirements into technical solutions ✌🏻 Maintained and improved backend Java services supporting core banking workflows in a regulated financial environment`,
        url: undefined,
        language: "en-US",
      },
    ],
    // Interests
    interests: [
      {
        name: "Open Source",
        keywords: "Contributing to open-source projects, Building developer tools, Community engagement",
        language: "en-US",
      },
      {
        name: "Technology Trends",
        keywords: "AI/ML advancements, Cloud-native technologies.",
        language: "en-US",
      },
      {
        name: "Mathematics",
        keywords: "Data science, Statistical modeling, Algorithm optimization",
        language: "en-US",
      },
      {
        name: "Fitness & Wellness",
        keywords: "Running, Yoga, Meditation, Healthy lifestyle",
        language: "en-US",
      },
      {
        name: "Reading",
        keywords: "Technical books, Science fiction, Fiction, Philiosphy",
        language: "en-US",
      },
    ],
    // Languages
    languages: [
      {
        language: "English",
        fluency: "Native",
        uiLanguage: "en-US",
      },
      {
        language: "German",
        fluency: "Professional Working",
        uiLanguage: "de-DE",
      },
      {
        language: "Hindi",
        fluency: "Native",
        uiLanguage: "en-IN",
      },
    ],
  },
  {
    // Lebenslauf Rohit Khanduri - Deutsch
    resume: {
      title: "Rohit Khanduri - AWS Cloud- und Softwarearchitekt",
      language: "de-DE",
      createdAt: new Date().toISOString(),
    },
    certifications: ["certAwsSap", "certIsaQbFoundation", "certIsaQbAdvanced", "certApolloAssociate", "certApolloProfessional", "certGitKraken"],

    // Basisinformationen
    basicInformation: {
      name: "Rohit Khanduri",
      label: "AWS Cloud- und Softwarearchitekt",
      email: "r.khanduri@nimbus-tech.de",
      url: "https://www.linkedin.com/in/rohit-khanduri-9098b84a/",
      summary:
        "Ich bin ein auf AWS fokussierter Cloud-Architekt und Softwareingenieur mit über 14 Jahren Erfahrung in der Konzeption und Implementierung sicherer, skalierbarer Cloud-Systeme. Ich spezialisiere mich auf AWS-Well-Architected-Architekturen, Infrastructure as Code und cloud-native Anwendungsentwicklung mit Node.js, React, TypeScript und modernen DevOps-Praktiken. Ich unterstütze kleine, mittelständische und Enterprise-Unternehmen bei der Planung und Umsetzung sicherer Cloud-Transformationen auf AWS – von den ersten Migrationsschritten bis hin zu ausgereiften Multi-Account-Umgebungen. Meine Stärke liegt in der Kombination aus Hands-on-Engineering und klarer Kommunikation, sodass Stakeholder technische Trade-offs verstehen, während Teams schnell und zuverlässig Software ausliefern.",
      language: "de-DE",
      resumePhotoKey: "resumePhoto"
    },
    // Standort
    location: {
      address: "Frankfurt, Hessen, Deutschland",
      postalCode: "",
      city: "Frankfurt",
      countryCode: "DE",
      region: "Hessen",
      language: "de-DE"
    },

    // Profile
    profiles: [
      {
        network: "LinkedIn",
        username: "rohit-khanduri-9098b84a",
        url: "https://www.linkedin.com/in/rohit-khanduri-9098b84a/",
        language: "de-DE"
      },
      {
        network: "GitHub",
        username: "rohit1901",
        url: "https://github.com/rohit1901",
        language: "de-DE"
      },
      {
        network: "Other",
        username: "rohitkhanduri",
        url: "https://rohitkhanduri.substack.com/",
        language: "de-DE"
      }
    ],

    // Berufserfahrung
    work: [
      {
        name: "Miles & More GmbH (Lufthansa Group)",
        position: "Manager IT / Lead Architect – Mobile Platform",
        url: "https://www.miles-and-more.com/",
        startDate: parseDate("03-2025"),
        endDate: null,
        summary: `Lead Architect für die kommerzielle Miles & More Mobile-Plattform und die Customer-Communication-Architektur, verantwortlich für technische Ausrichtung, Plattformarchitektur, KI-getriebene Verbesserungen sowie die sichere und zuverlässige Bereitstellung Flutter-basierter und AWS-gestützter Services für Millionen von Lufthansa Group Kunden.`,
        highlights: `Definition und Verantwortung der Zielarchitektur sowie der technischen Roadmap für die kommerzielle Miles & More Produktiv-App über Flutter, native Mobile-Integrationen, REST- und GraphQL-APIs, BFF-Patterns, Apigee API Gateway und eine über OpenShift betriebene Microservice-Landschaft hinweg ✌🏻 Führung und Koordination eines Multi-Vendor-Outsourcing-Setups mit Architecture Governance, Coding-Standards, Review-Gates und ADRs zur Sicherstellung konsistenter Engineering-Qualität über mehrere Teams hinweg ✌🏻 Abstimmung von Architekturentscheidungen mit Stakeholdern aus Produkt, Design, Security, Compliance und Enterprise Architecture zur Erstellung skalierbarer Solution-Architekturen für kundenorientierte Mobile- und Kommunikationsservices ✌🏻 Verantwortung für CI/CD-Pipelines, Release-Management und Production Readiness mit Jenkins, Azure DevOps und Fastlane inklusive Crash-Monitoring und Observability über Firebase Crashlytics ✌🏻 Verantwortung für die Weiterentwicklung der AWS-SES-Architektur für tägliche Kundenkommunikation im großen Maßstab, unterstützt durch CloudWatch, KMS, DynamoDB und IAM, mit starkem Fokus auf Zuverlässigkeit, Sicherheit und DSGVO-konformen Betrieb ✌🏻 Vorantreiben der KI-Adoption durch PoCs und den Aufbau praxisnaher KI-Fähigkeiten wie eines Hybrid-RAG-basierten internen Wissensassistenten, Engineering-Copilots, Prompt-Evaluation-Workflows, Elastic-basierter Dokumentensuche, Chatbot-Lösungen mit auf Azure gehosteten Modellen über OpenWebUI sowie Workflow-Automatisierung mit n8n`,
        language: "de-DE"
      },
      {
        name: "adesso SE",
        position: "Softwarearchitekt – AWS & Enterprise-Systeme",
        url: "https://www.adesso.de/",
        startDate: parseDate("08-2020"),
        endDate: parseDate("02-2025"),
        summary:
          "Softwarearchitekt und Berater für großskalige Systeme im Banken- und Public-Sector-Umfeld, mit Fokus auf cloud-gehostete (AWS) Microservice- und Micro-Frontend-Architekturen in regulierten Umgebungen.",
        highlights:
          "Durchführung architektonischer Assessments und AWS-Readiness-Reviews bestehender Produktivsysteme und Ableitung pragmatischer Modernisierungsschritte ✌🏻 Definition von Zielarchitekturen und 1–3-Jahres-Technologieroadmaps für AWS-basierte Plattformen in Abstimmung mit Geschäfts- und Compliance-Anforderungen ✌🏻 Hauptansprechpartner für Architekturthemen gegenüber Kunden-Stakeholdern und internen Teams, Übersetzung von Business-Zielen in technische Entscheidungen ✌🏻 Einführung von Coding-Guidelines, Review-Prozessen und Qualitätsstandards zur Verbesserung von Zuverlässigkeit und Liefergeschwindigkeit über Teams hinweg ✌🏻 Leitung von Frontend- und Plattformteams (React, Angular, Flutter) in sicherheits- und compliancekritischen Projekten im Banken- und öffentlichen Sektor",
        language: "de-DE"
      },
      {
        name: "Finatix GmbH / Peak Performance Apps GmbH / Appsfactory GmbH",
        position: "Softwareentwickler (Werkstudent)",
        startDate: parseDate("12-2017"),
        endDate: parseDate("07-2020"),
        summary:
          "Werkstudententätigkeit in FinTech-, Marktforschungs- und Consumer-Apps-Projekten, Entwicklung von Web- und Mobile-Frontends sowie Mitarbeit an Full-Stack- und frühen AWS-basierten Workloads.",
        highlights:
          "Implementierung von Features für Finanz-Dashboards, Umfrageplattformen und Consumer-Mobile-Apps mit React, Vue.js, Angular und React Native ✌🏻 Zusammenarbeit mit Backend-Teams an Node.js- und Java-Services und Unterstützung bei der Integration von APIs in Cloud-Umgebungen (inkl. früher AWS-Setups) ✌🏻 Mitarbeit an Fraud-Detection- und datengetriebenen Features gemeinsam mit Data-Science-Teams mit Fokus auf Datenqualität und Performance ✌🏻 Beitrag zur Modernisierung bestehender Codebasen und UI-Designs sowie praktische Erfahrung mit agiler Lieferung, Code Reviews und CI/CD-Pipelines",
        language: "de-DE"
      },
      {
        name: "Iris Software Inc.",
        position: "Tech Lead / Software Engineer",
        url: "https://www.irissoftware.com/",
        startDate: parseDate("06-2016"),
        endDate: parseDate("09-2017"),
        summary:
          "Tech Lead für Telekom-Provisionierung und Enterprise-Websysteme, Führung eines kleinen Teams für Java-basierte Services und Integrationen.",
        highlights:
          "Leitung eines Teams zur Entwicklung von Spring-Boot-Microservices und REST-APIs für Telekom-Provisionierungsprozesse ✌🏻 Koordination von Design, Code Reviews und Release-Readiness in einem kleinen, cross-funktionalen Team",
        language: "de-DE"
      },
      {
        name: "Virtusa Corp.",
        position: "Tech Lead / Senior Engineer",
        url: "https://www.virtusa.com/",
        startDate: parseDate("08-2014"),
        endDate: parseDate("05-2016"),
        summary:
          "Tech Lead für Java-EE-Anwendungen mit Spring und Hibernate, verantwortlich für zentrale Module und Mentoring von Junior Engineers.",
        highlights:
          "Verantwortung für Design und Implementierung zentraler REST-APIs und Integrationen auf Basis von Spring/Hibernate ✌🏻 Mentoring von Juniorentwicklern sowie Etablierung von Coding-Standards und Design-Patterns",
        language: "de-DE"
      },
      {
        name: "Genpact",
        position: "Software Engineer",
        url: "https://www.genpact.com/",
        startDate: parseDate("06-2013"),
        endDate: parseDate("07-2014"),
        summary:
          "Softwareentwickler für Calypso- und Java-basierte Enterprise-Anwendungen im Finanzbereich.",
        highlights:
          "Implementierung und Anpassung von Calypso-Komponenten und Java-Backends ✌🏻 Enge Zusammenarbeit mit Senior Engineers und Business-Analysten bei Anforderungen und Produktionssupport",
        language: "de-DE"
      },
      {
        name: "NEC",
        position: "Software Engineer",
        url: "https://www.nec.com/",
        startDate: parseDate("07-2012"),
        endDate: parseDate("05-2013"),
        summary:
          "Softwareentwickler für Java-basierte Backend-Komponenten für Enterprise-Kunden.",
        highlights:
          "Implementierung von Backend-Funktionalitäten und Integrationen auf Java/J2EE-Stacks ✌🏻 Enge Zusammenarbeit mit Senior Engineers zur Verbesserung von Performance und Zuverlässigkeit",
        language: "de-DE"
      }
    ],

    // Ehrenamt
    volunteer: [
      {
        organization: "Open Source Community & persönliche KI-Projekte",
        position: "Builder & Contributor",
        url: "https://github.com/rohit1901",
        startDate: parseDate("01-2018"),
        endDate: null,
        summary:
          "Aktive Arbeit an und Experimentieren mit KI/LLM-Tooling, Open-Source-Bibliotheken und Developer-Infrastruktur mit Fokus auf lokale KI-Adoption, LLM-Integration und KI-gestützte Plattformentwicklung.",
        highlights:
          "Aufbau von Skywink (skywink.nimbus-tech.de), einer KI-Plattform für LLM-Orchestrierung, Prompt Engineering und KI-Workflow-Automatisierung ✌🏻 Entwicklung von drama-llm, einem lokalen LLM-Chatbot auf Basis von Ollama und shadcn/ui zur Erforschung von On-Device-AI-Inferenz ✌🏻 Erstellung und Beitrag zu Ollama-JS- und Python-Bibliotheken mit Integration lokaler LLM-Modell-Erkennung über einen FastAPI-Service ✌🏻 Entwicklung eines MCP-Servers (Model Context Protocol) für Datenbanken, der KI-Agenten den Zugriff auf strukturierte Datenquellen ermöglicht ✌🏻 Pflege von Open-Source-TypeScript- und React-Bibliotheken (intl-react, ts-raw-utils, mockable), die in der JavaScript/TypeScript-Community verwendet werden ✌🏻 Experimente mit ML-Clustering- und Klassifikationstechniken in Python (scikit-learn) für Data-Science-Anwendungsfälle",
        language: "de-DE"
      },
      {
        organization: "Robinhood Army",
        position: "Freiwilliger",
        url: "https://robinhoodarmy.com/",
        startDate: parseDate("01-2015"),
        endDate: parseDate("07-2018"),
        summary: "Ehrenamtlicher Einsatz bei der Robinhood Army.",
        highlights:
          "Verteilung von Lebensmitteln an bedürftige Menschen ✌🏻 Durchführung von Lebensmittelausgaben ✌🏻 Organisation von Veranstaltungen und Aktionen ✌🏻 Unterstützung von Mitgliedern der Gemeinschaft",
        language: "de-DE"
      }
    ],

    // Ausbildung
    education: [
      {
        institution: "Hochschule Mittweida - University of Applied Sciences",
        url: "https://www.hs-mittweida.de/",
        area: "Angewandte Mathematik für Netzwerk- und Data Science",
        studyType: "Master of Science",
        startDate: parseDate("09-2017"),
        endDate: parseDate("09-2022"),
        language: "de-DE"
      },
      {
        institution: "Uttar Pradesh Technical University",
        url: "https://www.aktu.ac.in/",
        area: "Informationstechnologie",
        studyType: "Bachelor of Technology",
        startDate: parseDate("08-2007"),
        endDate: parseDate("06-2011"),
        language: "de-DE"
      }
    ],

    // Auszeichnungen
    awards: [
      {
        title: "Talent Pool",
        date: parseDate("12-2022"),
        awarder: "adesso SE",
        summary:
          "Auswahl für das exklusive Top-Talent-Programm von adesso, ausgezeichnet für herausragende Arbeitsleistung und hohe Arbeitsethik, mit besonderen Möglichkeiten zum Networking und zur fachlichen Weiterentwicklung im Unternehmen.",
        language: "de-DE"
      },
      {
        title: "First Runner-up – Innovation Challenge Hackathon #2",
        date: parseDate("11-2017"),
        awarder: "Hochschule Mittweida",
        summary:
          "Konzeption und Entwicklung einer Android-App als Einzelentwickler für das Team „EASY“ innerhalb von 48 Stunden; ausgezeichnet mit dem zweiten Platz und einem Preisgeld von 100 €.",
        language: "de-DE"
      },
      {
        title: "Certificate of Appreciation",
        date: parseDate("07-2017"),
        awarder: "Iris Software Inc.",
        summary:
          "Auszeichnung für Mitarbeiter, die außergewöhnliche Leistungen erbracht und besonderes Kundenfeedback erhalten haben.",
        language: "de-DE"
      },
      {
        title: "Round of Applause",
        date: parseDate("07-2017"),
        awarder: "Iris Software Inc.",
        summary:
          "Auszeichnung für Mitarbeiter, die in einem bestimmten Monat außergewöhnlich gute Leistungen erbracht haben.",
        language: "de-DE"
      },
      {
        title: "Top Talent",
        date: parseDate("08-2015"),
        awarder: "Polaris Financial Services (assoziiert mit Virtusa)",
        summary:
          "Top-Talent-Auszeichnung für Mitarbeiter, die außergewöhnlich gute Leistungen erbracht und besonderes Kundenfeedback erhalten haben.",
        language: "de-DE"
      }
    ],

    // Veröffentlichungen
    publications: [
      {
        name: "Fraud Detection using Machine Learning",
        publisher: "Hochschule Mittweida - University of Applied Sciences",
        releaseDate: parseDate("06-2023"),
        url:
          "https://monami.hs-mittweida.de/frontdoor/index/index/year/2023/docId/13759",
        summary:
          "Diese Arbeit präsentiert einen neuartigen Ansatz zur Betrugserkennung mit Machine-Learning-Verfahren. Es wird ein hybrides Modell vorgestellt, das überwachte und unüberwachte Lernalgorithmen kombiniert, um betrügerische Transaktionen mit hoher Genauigkeit zu identifizieren. Der Ansatz übertrifft bestehende Methoden hinsichtlich Präzision und Recall.",
        language: "de-DE"
      }
    ],

    // Fähigkeiten
    skills: [
      {
        name: "AWS Cloud-Architektur & Infrastruktur",
        level: "Expert",
        keywords:
          "AWS Well-Architected Framework, Multi-Account-Strategie (AWS Organizations, Control Tower), VPC-Design, IAM & Security Policies, EC2, ECS, EKS, Lambda, API Gateway, S3, CloudFront, RDS, DynamoDB, SQS, SNS, EventBridge, Step Functions, ElastiCache, Route 53, ACM, Secrets Manager, Parameter Store, AWS CDK, CloudFormation, Terraform (IaC), Auto Scaling, Elastic Load Balancing, Kostenoptimierung, AWS-Preismodelle, Reserved Instances, Savings Plans",
        language: "de-DE"
      },
      {
        name: "KI, ML & LLM-Integration",
        level: "Intermediate",
        keywords:
          "LLM-Integration, Prompt Engineering, Retrieval-Augmented Generation (RAG), Model Context Protocol (MCP), Ollama, OpenAI API, Anthropic Claude API, KI-Workflow-Automatisierung, AI-PoC-Design, Chatbot-Entwicklung, Amazon Bedrock, Angewandte Mathematik, Statistik, Data Science, Clustering & Klassifikation (scikit-learn), Feature Engineering, Modellevaluation, Fraud Detection (Machine Learning), Natural Language Processing, Vektordatenbanken (Pinecone, Weaviate), TensorFlow.js, Hugging Face",
        language: "de-DE"
      },
      {
        name: "DevOps, CI/CD & Automatisierung",
        level: "Expert",
        keywords:
          "Infrastructure as Code (Terraform, AWS CDK, CloudFormation), CI/CD-Pipelines (GitHub Actions, GitLab CI, Jenkins), Docker, Kubernetes, Helm, ArgoCD, GitOps, Trunk-Based Development, Monitoring & Observability (CloudWatch, Prometheus, Grafana), Logging (ELK-Stack, CloudWatch Logs), Secrets Management, automatisiertes Testen in Pipelines",
        language: "de-DE"
      },
      {
        name: "Cloud-Sicherheit & Compliance",
        level: "Advanced",
        keywords:
          "AWS IAM, AWS Security Hub, AWS GuardDuty, AWS Config, AWS CloudTrail, AWS KMS, Secrets Manager, OWASP Top 10, OAuth2.0, OpenID Connect, JWT, SAML",
        language: "de-DE"
      },
      {
        name: "Architektur & Systemdesign",
        level: "Expert",
        keywords:
          "AWS Well-Architected Framework (5 Säulen), Microservices-Architektur, Event-getriebene Architektur, Serverless-Architektur, Domain-Driven Design (DDD), CQRS, Event Sourcing, Micro-Frontends, Clean Architecture, Hexagonale Architektur, SOLID-Prinzipien, Circuit-Breaker-Pattern, API-Gateway-Pattern, Hochverfügbarkeit, Fehlertoleranz, Verteilte Systeme, Skalierbarkeit, Cloud-Migrationsstrategie (Lift & Shift, Re-Platform, Re-Architect)",
        language: "de-DE"
      },
      {
        name: "Backend-Entwicklung",
        level: "Advanced",
        keywords:
          "Node.js, NestJS, Express.js, GraphQL, Apollo Server, REST-APIs, WebSockets, Prisma, TypeORM, RabbitMQ, Apache Kafka, Authentifizierung (JWT, OAuth2, SAML), Java, Spring Boot, Python, FastAPI",
        language: "de-DE"
      },
      {
        name: "Mobile Entwicklung",
        level: "Intermediate",
        keywords:
          "Flutter, React Native, Expo, Mobile App Architecture, Push-Benachrichtigungen, Deep Linking, App-Store-Deployment, Offline-First-Architektur",
        language: "de-DE"
      },
      {
        name: "Datenbanken & Datenmanagement",
        level: "Intermediate",
        keywords:
          "PostgreSQL, MySQL, MongoDB, DynamoDB, Redis, Datenbankdesign, Query-Optimierung, Datenmodellierung, ACID-Transaktionen, Datenbankmigration, AWS RDS, AWS Aurora, AWS DynamoDB",
        language: "de-DE"
      },
      {
        name: "Testing & Qualitätssicherung",
        level: "Intermediate",
        keywords:
          "Jest, Vitest, Testing Library, Cypress, Playwright, TDD, Unit Testing, Integrationstests, End-to-End-Tests, Code Coverage, API-Tests (Postman)",
        language: "de-DE"
      },
      {
        name: "Agile & technische Führung",
        level: "Expert",
        keywords:
          "Agile, Scrum, Kanban, Sprint Planning, Backlog Grooming, Stakeholder-Management, Technische Roadmaps, Architektonische Assessments, AWS Well-Architected Reviews, Team-Mentoring, Cross-funktionale Zusammenarbeit, Engineering-Standards, Code-Review-Kultur, Jira, Confluence, Notion",
        language: "de-DE"
      }
    ],

    projects: [
      {
        name: "Miles & More Mobile Platform – Architektur & KI-Transformation",
        startDate: parseDate("03-2025"),
        endDate: null,
        description: `Lead Architect für die kommerzielle Miles & More Mobile-Plattform und die Customer-Communication-Architektur, verantwortlich für Zielarchitektur, technische Roadmap, KI-getriebene Weiterentwicklung der Plattform sowie produktionsreife Bereitstellung über Flutter-basierte Mobile-Anwendungen, OpenShift-betriebene Microservices und AWS-gestützte Kommunikationsservices für Millionen von Lufthansa Group Kunden.`,
        highlights: `Definition und Verantwortung der Zielarchitektur sowie der technischen Roadmap für die Miles & More Produktiv-App über Flutter, native iOS-/Android-Integrationen, REST- und GraphQL-Schnittstellen, BFF-Architektur, Apigee API Gateway und eine über OpenShift betriebene Microservice-Landschaft hinweg ✌🏻 Etablierung architektonischer Governance in einem Multi-Vendor-Setup durch Coding-Standards, ADRs, Review-Gates und teamübergreifende Abstimmungsmechanismen zur Sicherstellung von Wartbarkeit, Delivery-Konsistenz und technischer Qualität ✌🏻 Gestaltung von Solution-Architekturen gemeinsam mit Enterprise Architecture sowie Abstimmung technischer Entscheidungen mit Stakeholdern aus Produkt, Design, Security, Compliance und Plattform für kundenorientierte Mobile- und Kommunikationsfähigkeiten ✌🏻 Verantwortung für Production Readiness über Jenkins-, Azure-DevOps- und Fastlane-basierte CI/CD-Pipelines, Release-Management-Prozesse sowie Mobile-Observability mit Firebase Crashlytics ✌🏻 Verantwortung für die Weiterentwicklung der AWS-SES-basierten Kommunikationsarchitektur für tägliche hochvolumige Kundenkommunikation, unterstützt durch CloudWatch, KMS, DynamoDB und IAM, mit Fokus auf sichere Zustellung, operative Zuverlässigkeit und DSGVO-konforme Kontrollmechanismen ✌🏻 Vorantreiben der KI-Adoption durch PoCs und anwendungsnahe Lösungsarchitektur für Hybrid-RAG-basierte interne Wissensassistenten, Engineering-Copilots, Prompt-Evaluation-Workflows, Elastic-basierte Dokumentensuche, auf Azure gehostete Chatbot-Lösungen über OpenWebUI sowie Workflow-Automatisierung mit n8n`,
        url: null,
        language: "de-DE"
      },
      {
        name: "AWS Cloud-Architektur & Migration – Banken & öffentlicher Sektor",
        startDate: parseDate("08-2020"),
        endDate: parseDate("02-2025"),
        description:
          "Leitung von Cloud-Architektur- und AWS-Migrationsinitiativen für eine große deutsche Bank und einen Bundesbehördenkunden bei adesso SE, inklusive Lift-&-Shift-Migrationen und Greenfield-AWS-Plattformaufbauten für großskalige Microservice- und Micro-Frontend-Systeme in regulierten Umgebungen.",
        highlights:
          "Konzeption und Aufbau einer Greenfield-AWS-Plattform für eine große deutsche Bank mit ECS Fargate, API Gateway, Lambda, Aurora, DynamoDB, SQS, SNS und Cognito für Authentifizierung – auf einer sicheren Multi-Account-VPC-Architektur mit IAM, Secrets Manager, ACM und CloudTrail ✌🏻 Leitung einer Lift-&-Shift-Cloud-Migration für einen Bundesbehördenkunden mit minimalen Ausfallzeiten und vollständiger operativer Übergabe ✌🏻 Definition von Zielarchitekturen und 1–3-Jahres-AWS-Roadmaps gemäß AWS Well-Architected Framework in beiden Engagements ✌🏻 Implementierung von Observability- und Compliance-Pipelines mit CloudWatch, CloudTrail und Kinesis für Echtzeit-Logaggregation und Audit Trails ✌🏻 Aufbau von Content-Delivery- und Frontend-Infrastruktur mit S3, CloudFront, Amplify und Route 53 für hochverfügbare Micro-Frontend-Deployments ✌🏻 Durchführung von AWS Well-Architected Reviews und Architekturbewertungen bestehender Produktivsysteme mit pragmatischen Modernisierungsempfehlungen ✌🏻 Einführung von Infrastructure as Code (Terraform, AWS CDK) und CI/CD-Pipelines zur Standardisierung von Deployments und Sicherung von Engineering-Qualität",
        url: null,
        language: "de-DE"
      },
      {
        name: "Skywink – Open-Source, datenschutzfreundliche KI-Chat-Plattform",
        startDate: parseDate("08-2025"),
        endDate: null,
        description:
          "Gründer und Lead Engineer von Skywink, einer Open-Source-KI-Chat-Plattform von Nimbus Tech, die Nutzern und Unternehmen volle Kontrolle über ihre KI-Unterhaltungen gibt – lokal mit Ollama für vollständige Privatsphäre oder mit angebundenen Cloud-AI-Providern ohne Vendor Lock-in.",
        highlights:
          "Architektur einer Full-Stack-KI-Chat-Plattform mit Next.js 16, React 19, TypeScript, PostgreSQL und Prisma ORM, Deployment auf Northflank mit Docker-Multi-Stage-Builds und produktionsreifem CI/CD ✌🏻 Implementierung einer einheitlichen AI-Provider-Abstraktion mit dem Vercel AI SDK für Ollama (lokal), OpenAI, Mistral AI und OpenRouter – nahtloser Providerwechsel mit nutzereigenen API-Schlüsseln ✌🏻 Aufbau sicherer API-Key-Speicherung mit AES-256- und RSA-Verschlüsselung, CSRF-Schutz, Rate Limiting und rollenbasierter Zugriffskontrolle für Enterprise-taugliche Sicherheit ✌🏻 Konzeption eines Gastmodus mit localStorage-Persistenz, IP-basiertem Rate Limiting und automatischer Bereinigung für Zero-Signup-Onboarding ✌🏻 Einsatz von RAG- und Prompt-Engineering-Patterns und Integration gestreamter KI-Antworten mit Echtzeit-Rendering, konfigurierbaren Generierungsparametern und Konversations-Export ✌🏻 Architektur für horizontale Skalierung mit zustandslosen APIs, Connection Pooling, Edge-kompatiblem Deployment und CDN-fähigen statischen Assets",
        url: "https://skywink.nimbus-tech.de",
        language: "de-DE"
      },
      {
        name: "Telekom- & Banking-Service-Provisioning-Plattform",
        startDate: parseDate("06-2016"),
        endDate: parseDate("09-2017"),
        description:
          "Tech Lead einer Java-basierten Service-Provisioning-Plattform für einen Banking- und Telekomkunden bei Iris Software Inc., verantwortlich für Backend-Microservices, REST-API-Design und Team-Delivery.",
        highlights:
          "Leitung eines kleinen Teams zur Entwicklung von Spring-Boot-Microservices und REST-APIs für automatisierte Service-Provisionierung und Order-Management-Workflows ✌🏻 Design und Optimierung von Oracle-Datenbankschemata und -Abfragen für hochvolumige Transaktionsdaten ✌🏻 Aufbau und Pflege einer Selenium- und JUnit-basierten Regressionstest-Suite, Erhöhung der Release-Sicherheit und Reduktion manueller QA-Aufwände ✌🏻 Lieferung von Features in zweiwöchigen Sprints mit automatisierten CI/CD-Pipelines und abgestimmter Production Readiness mit cross-funktionalen Teams",
        url: null,
        language: "de-DE"
      },
      {
        name: "Modernisierung von Enterprise-Banking-Anwendungen",
        startDate: parseDate("08-2014"),
        endDate: parseDate("05-2016"),
        description:
          "Tech Lead bei Virtusa Corp. für die Modernisierung einer Legacy-Java-EE-Banking-Anwendung für einen Enterprise-Finanzkunden, Migration zu einer geschichteten Spring-MVC- und Hibernate-Architektur.",
        highlights:
          "Leitung der Re-Architektur einer monolithischen Java-EE-Banking-Anwendung hin zu einem wartbaren Spring-MVC- und Hibernate-System zur Verbesserung von Skalierbarkeit und Entwicklerproduktivität ✌🏻 Design und Implementierung REST-basierter API-Integrationen für Drittsystem-Anbindung ✌🏻 Einführung von Coding-Standards, Design-Patterns (Factory, Strategy, Observer) und Code-Review-Prozessen im Team ✌🏻 Mentoring von Juniorentwicklern zu Clean-Code-Prinzipien und Best Practices in einem regulierten Enterprise-Umfeld",
        url: null,
        language: "de-DE"
      },
      {
        name: "Calypso-basierte Kapitalmarkt- & Reportingsysteme",
        startDate: parseDate("06-2013"),
        endDate: parseDate("07-2014"),
        description:
          "Softwareentwickler bei Genpact auf einer Calypso-basierten Kapitalmarktplattform für einen Bankkunden, mit Fokus auf Trade-Lifecycle-Management, Positionsführung und Finanzreporting.",
        highlights:
          "Implementierung und Anpassung von Calypso-Komponenten für Trade-Lifecycle-Management, Positionsführung und Risikoreporting für einen Bankkunden ✌🏻 Aufbau eines Java-basierten Reconciliation- und Reporting-Moduls, integriert mit Calypso-Datenfeeds für End-of-Day-Finanzprozesse ✌🏻 Zusammenarbeit mit Business-Analysten und Senior Engineers zur Übersetzung fachlicher Anforderungen in technische Lösungen ✌🏻 Pflege und Weiterentwicklung von Java-Backends zur Unterstützung zentraler Banking-Workflows in einem regulierten Finanzumfeld",
        url: null,
        language: "de-DE"
      }
    ],

    // Interessen
    interests: [
      {
        name: "Open Source",
        keywords:
          "Beitrag zu Open-Source-Projekten, Aufbau von Developer-Tools, Community-Engagement",
        language: "de-DE"
      },
      {
        name: "Technologietrends",
        keywords: "Fortschritte in KI/ML, Cloud-native Technologien",
        language: "de-DE"
      },
      {
        name: "Mathematik",
        keywords:
          "Data Science, statistische Modellierung, Algorithmus-Optimierung",
        language: "de-DE"
      },
      {
        name: "Fitness & Wellness",
        keywords: "Laufen, Yoga, Meditation, gesunder Lebensstil",
        language: "de-DE"
      },
      {
        name: "Lesen",
        keywords: "Fachbücher, Science-Fiction, Belletristik, Philosophie",
        language: "de-DE"
      }
    ],

    // Sprachen
    languages: [
      {
        language: "Englisch",
        fluency: "Muttersprache",
        uiLanguage: "en-US"
      },
      {
        language: "Deutsch",
        fluency: "Professionelle Berufspraxis",
        uiLanguage: "de-DE"
      },
      {
        language: "Hindi",
        fluency: "Muttersprache",
        uiLanguage: "en-IN"
      }
    ]
  },
  {
    // Resume Florian Zeidler - English
    resume: {
      title: "Florian Zeidler - Cloud Architect and Engineer Resume",
      language: "en-US", // Reference to Language.value
      createdAt: new Date().toISOString(),
    },
    certifications: ["certAwsSap", "certAwsDeveloper"],

    // Basic Information
    basicInformation: {
      name: "Florian Zeidler",
      label: "Cloud Architect",
      email: "f.zeidler@nimbus-tech.de",
      url: "https://www.linkedin.com/in/florian-zeidler-945b3a242/",
      summary: "",
      language: "en-US",
      resumePhotoKey: "resumePhotoFlori",
    },

    // Location
    location: {
      address: "Leipzig, Saxony, Germany",
      postalCode: "04179",
      city: "Leipzig",
      countryCode: "DE",
      region: "Saxony",
      language: "en-US",
    },

    // Profiles
    profiles: [
      {
        network: "LinkedIn",
        username: "florian-zeidler-945b3a242",
        url: "https://www.linkedin.com/in/florian-zeidler-945b3a242/",
        language: "en-US",
      },
      {
        network: "GitHub",
        username: "Lunev1",
        url: "https://github.com/Lunev1",
        language: "en-US",
      },
    ],

    // Work Experience
    work: [
      {
        name: "Finatix GmbH",
        position: "Cloud Developer / Solutions Architect / DevOps Engineer",
        url: "",
        startDate: parseDate("07-2019"),
        endDate: null,
        summary: `Cloud Engineer and Solutions Architect for cloud environments.`,
        highlights: `Worked on projects with a focus on backend and cloud development ✌🏻 Tech lead for AWS cloud architecture ✌🏻 Implemented standardized processes for the development team and supported their deployment workflows`,
        language: "en-US",
      },
    ],

    // Volunteer
    volunteer: [],

    // Education
    education: [
      {
        institution: "Universität Leipzig",
        url: "https://www.uni-leipzig.de/",
        area: "Business and Computer Science",
        studyType: "Master of Science",
        startDate: parseDate("10-2015"),
        endDate: parseDate("11-2021"),
        language: "en-US",
      },
      {
        institution: "Universität Leipzig",
        url: "https://www.uni-leipzig.de/",
        area: "Business and Computer Science",
        studyType: "Bachelor of Science",
        startDate: parseDate("10-2010"),
        endDate: parseDate("10-2015"),
        language: "en-US",
      },
    ],

    // Awards
    awards: [],

    // Publications
    publications: [],

    // Skills
    skills: [
      {
        name: "Backend Development",
        level: "Expert",
        keywords: "Node.js, GraphQL, REST APIs, gRPC, WebSockets, Message Queues, RabbitMQ, Apache Kafka, Authentication (JWT, OAuth2, SAML), API Design, Rate Limiting, Caching Strategies, open-api",
        language: "en-US",
      },
      {
        name: "Cloud & DevOps",
        level: "Advanced",
        keywords: "AWS (EC2, ECS, EKS, Lambda, S3, CloudFront, RDS, DynamoDB, SQS, SNS, API Gateway, CloudWatch), Azure, Google Cloud Platform, Docker, Kubernetes, Helm, ArgoCD, CI/CD Pipelines, GitHub Actions, GitLab CI, Jenkins, CircleCI, Terraform, Infrastructure as Code, Ansible, Nginx, Load Balancing, Auto Scaling, Monitoring (Prometheus, Grafana, Datadog, New Relic), Logging (ELK Stack, CloudWatch Logs), CDN Configuration",
        language: "en-US",
      },
      {
        name: "Database & Data Management",
        level: "Advanced",
        keywords: "PostgreSQL, MongoDB, MySQL, Redis, DynamoDB, Elasticsearch, Database Design, Query Optimization, Indexing Strategies, Replication, Sharding, Database Migration, Data Modeling, NoSQL vs SQL, ACID Transactions, CAP Theorem, Database Security, Backup and Recovery",
        language: "en-US",
      },
      {
        name: "Architecture & System Design",
        level: "Expert",
        keywords: "Microservices Architecture, Event-Driven Architecture, Domain-Driven Design (DDD), CQRS, Event Sourcing, API Gateway Pattern, Clean Architecture, Hexagonal Architecture, SOLID Principles, Design Patterns (Factory, Strategy, Observer, Singleton), High Availability, Fault Tolerance, Circuit Breaker Pattern, Saga Pattern, Distributed Systems, Scalability, Performance Optimization, Security Best Practices, Load Balancing Strategies",
        language: "en-US",
      },
      {
        name: "Testing & Quality Assurance",
        level: "Advanced",
        keywords: "Jest, Testing Library, Cypress, Selenium, Test-Driven Development (TDD), Behavior-Driven Development (BDD), Unit Testing, Integration Testing, End-to-End Testing, Performance Testing, Load Testing, Code Coverage, Contract Testing (Pact), API Testing (Postman, Insomnia)",
        language: "en-US",
      }
    ],
    projects: [
      {
        name: "Development of a scalable cloud data platform for financial data",
        startDate: parseDate("10-2021"),
        endDate: undefined,
        description: "Architecture and Development of a multi-account scalable cloud data platform for financial data.",
        highlights: "Built, deployed, and operated a multi-microservice application on Kubernetes and AWS ECS on Fargate ✌🏻 Configured and integrated the Datadog observability SaaS platform and implemented comprehensive logging, alerting, and incident management processes for the application layer ✌🏻 Architected high-performance processing of millions of financial transaction records with a sub-second response time requirement ✌🏻 Led development of proof of concepts for new components\n",
        url: undefined,
        language: "en-US",
      },
      {
        name: "Platform for credit cards and payment processing",
        startDate: parseDate("07-2019"),
        endDate: parseDate("09-2020"),
        description: "Architected and developed a multi-tenant platform for prepaid credit cards.",
        highlights: "Designed multi-tenant architecture with migration from a legacy monolithic application, with a focus on supporting hundreds of credit card tenants and millions of users ✌🏻 Designed and implemented a cloud environment for dedicated load tests and simulation of user behavior ✌🏻 Integration of a compliance and fraud detection service in accordance with legal requirements",
        url: undefined,
        language: "en-US",
      },
      {
        name: "Development of support tools for the analysis of financial data",
        startDate: parseDate("03-2015"),
        endDate: parseDate("08-2017"),
        description: "Development of a solution for the automated collection, processing, and storage of customer transactional data (ETL process). Development of a data schema for the long-term archiving of tax data and provision of data via internal company servers.",
        highlights: "Reduced data collection and provisioning time from 10 minutes (manual Excel processing) to seconds. Approximately 98% of structured data could be processed with the new solution.",
        url: undefined,
        language: "en-US",
      }
    ],

    // Interests
    interests: [
      {
        name: "Business and People Management",
        keywords: "Advancing business models, new work environments, agile frameworks at scale, the evolution of HR and AI",
        language: "en-US",
      },
      {
        name: "Technology Trends",
        keywords: "AI/ML advancements, Cloud-native technologies, Web3 and blockchain, Serverless",
        language: "en-US",
      },
      {
        name: "Fitness & Wellness",
        keywords: "Running, Yoga, healthy nutrition",
        language: "en-US",
      }
    ],

    // Languages
    languages: [
      {
        language: "German",
        fluency: "Native",
        uiLanguage: "de-DE",
      },
      {
        language: "English",
        fluency: "Professional Working",
        uiLanguage: "en-US",
      },
    ],
  },
  {
    // Resume Florian Zeidler - German
    resume: {
      title: "Florian Zeidler - Lebenslauf Cloud-Architekt und Engineer",
      language: "de-DE", // Reference to Language.value
      createdAt: new Date().toISOString(),
    },
    certifications: ["certAwsSap", "certAwsDeveloper"],
    // Basic Information
    basicInformation: {
      name: "Florian Zeidler",
      label: "Cloud-Architekt",
      email: "f.zeidler@nimbus-tech.de",
      url: "https://www.linkedin.com/in/florian-zeidler-945b3a242/",
      summary: "Ich bin Cloud-Architekt mit über 8 Jahren Erfahrung in der Planung, Konzeption und Umsetzung moderner Cloud-Lösungen. Mein Schwerpunkt liegt auf der Entwicklung skalierbarer, sicherer und wirtschaftlicher Cloud-Architekturen mit einem Fokus auf AWS. Ich begleite Unternehmen bei Cloud-Migrationen und Transformationsprojekten – von der strategischen Architekturplanung über die Konzeption neuer Plattformen bis hin zur Einführung moderner Cloud-Betriebsmodelle. Dabei lege ich besonderen Wert auf nachhaltige Architekturentscheidungen, die langfristige Wartbarkeit und Flexibilität ermöglichen. Meine Kernkompetenzen liegen in der Entwicklung cloud-nativer und 'serverless' Architekturen sowie in der Optimierung von Cloud-Kosten, Performance und Betrieb. Durch die Verbindung von technischem Architektur-Know-how und pragmatischer Umsetzung unterstütze ich Unternehmen dabei, ihre Cloud-Plattformen effizient, zukunftssicher und wirtschaftlich zu gestalten.",
      language: "de-DE",
      resumePhotoKey: "resumePhotoFlori",
    },

    // Location
    location: {
      address: "Leipzig, Sachsen, Deutschland",
      postalCode: "04179",
      city: "Leipzig",
      countryCode: "DE",
      region: "Sachsen",
      language: "de-DE",
    },

    // Profiles
    profiles: [
      {
        network: "LinkedIn",
        username: "florian-zeidler-945b3a242",
        url: "https://www.linkedin.com/in/florian-zeidler-945b3a242/",
        language: "de-DE",
      },
      {
        network: "GitHub",
        username: "Lunev1",
        url: "https://github.com/Lunev1",
        language: "de-DE",
      },
    ],

    // Work Experience
    work: [
      {
        name: "Finatix GmbH",
        position: "Cloud Developer / Solutions Architect / DevOps Engineer",
        url: "https://www.finatix.de/",
        startDate: parseDate("07-2019"),
        endDate: null,
        summary: `Cloud Engineer und Solutions Architect für Cloud-Umgebungen. Lead-Architect und Berater in Kundenprojekten für Komponenten bzw. verantwortlich für proof of concepts.`,
        highlights: `Arbeit an Projekten mit Fokus auf Backend- und Cloud-Entwicklung ✌🏻 Tech Lead für AWS Cloud-Architektur ✌🏻 Implementierung standardisierter Prozesse für das Entwicklungsteam und Unterstützung der Deployment-Workflows`,
        language: "de-DE",
      },
    ],

    // Volunteer
    volunteer: [],

    // Education
    education: [
      {
        institution: "Universität Leipzig",
        url: "https://www.uni-leipzig.de/",
        area: "Wirtschaftsinformatik",
        studyType: "Master of Science",
        startDate: parseDate("10-2015"),
        endDate: parseDate("11-2021"),
        language: "de-DE",
      },
      {
        institution: "Universität Leipzig",
        url: "https://www.uni-leipzig.de/",
        area: "Wirtschaftsinformatik",
        studyType: "Bachelor of Science",
        startDate: parseDate("10-2010"),
        endDate: parseDate("10-2015"),
        language: "de-DE",
      },
    ],

    // Awards
    awards: [],

    // Publications
    publications: [],

    // Skills
    skills: [
      {
        name: "Backend-Entwicklung",
        level: "Advanced",
        keywords: "Node.js, GraphQL, REST APIs, gRPC, WebSockets, Message Queues, RabbitMQ, Apache Kafka, Authentication (JWT, OAuth2, SAML), API Design, Rate Limiting, Caching Strategies, open-api",
        language: "de-DE",
      },
      {
        name: "Cloud & DevOps",
        level: "Expert",
        keywords: "AWS (EC2, ECS, EKS, Lambda, S3, CloudFront, RDS, DynamoDB, SQS, SNS, API Gateway, CloudWatch), Azure, Google Cloud Platform, Docker, Kubernetes, Helm, ArgoCD, CI/CD Pipelines, GitHub Actions, GitLab CI, Jenkins, CircleCI, Terraform, Infrastructure as Code, Ansible, Nginx, Load Balancing, Auto Scaling, Monitoring (Prometheus, Grafana, Datadog, New Relic), Logging (ELK Stack, CloudWatch Logs), CDN Configuration",
        language: "de-DE",
      },
      {
        name: "Datenbank- & Datenmanagement",
        level: "Advanced",
        keywords: "PostgreSQL, MongoDB, MySQL, Redis, DynamoDB, Elasticsearch, Database Design, Query Optimization, Indexing Strategies, Replication, Sharding, Database Migration, Data Modeling, NoSQL vs SQL, ACID Transactions, CAP Theorem, Database Security, Backup and Recovery",
        language: "de-DE",
      },
      {
        name: "Architektur & Systemdesign",
        level: "Expert",
        keywords: "Microservices Architecture, Event-Driven Architecture, Domain-Driven Design (DDD), CQRS, Event Sourcing, API Gateway Pattern, Clean Architecture, Hexagonal Architecture, SOLID Principles, Design Patterns (Factory, Strategy, Observer, Singleton), High Availability, Fault Tolerance, Circuit Breaker Pattern, Saga Pattern, Distributed Systems, Scalability, Performance Optimization, Security Best Practices, Load Balancing Strategies",
        language: "de-DE",
      },
      {
        name: "Testing & Qualitätssicherung",
        level: "Advanced",
        keywords: "Jest, Testing Library, Cypress, Selenium, Test-Driven Development (TDD), Behavior-Driven Development (BDD), Unit Testing, Integration Testing, End-to-End Testing, Performance Testing, Load Testing, Code Coverage, Contract Testing (Pact), API Testing (Postman, Insomnia)",
        language: "de-DE",
      },
    ],
    projects: [
      {
        name: "Bereitstellung einer skalierbaren Container-Plattform in Stackit",
        startDate: parseDate("03-2026"),
        endDate: parseDate("06-2026"),
        description: "Architektur, Entwicklung und Betrieb einer skalierbaren Containerplattform mit Kubernetes für Softwareteams.",
        highlights: "Recherchieren der wesentlichen Unterschiede vom AWS zum Stackit Provider und Bereitstellung einer Kubernetes Containerplattform für Entwicklerteams. Zertifizierung in der Stackit Plattform als Certified Cloud Engineer.",
        url: undefined,
        language: "de-DE",
      },
      {
        name: "Entwicklung einer skalierbaren Cloud-Datenplattform für Finanzdaten",
        startDate: parseDate("10-2020"),
        endDate: undefined,
        description: "Architektur, Entwicklung und Betrieb einer skalierbaren Multi-Account Cloud-Datenplattform für tägliche Prozessierung von Millionen von kundenrelevanten Finanzdaten.",
        highlights: "Aufbau, Bereitstellung und Betrieb einer Multi-Microservice-Anwendung in Kubernetes (Openshift, AWS EKS) und später in AWS ECS auf Fargate ✌🏻 Konfiguration und Integration der Datadog Observability SaaS-Plattform sowie Implementierung umfassender Logging-, Alerting- und Incident-Management-Prozesse für die Anwendungsebene ✌🏻 Architektur für die Hochleistungsverarbeitung von Millionen von Finanztransaktionsdatensätzen mit der Anforderung im Sekundenbereich zu verarbeiten ✌🏻 Leitung der Entwicklung von Proof of Concepts für neue Komponenten ✌🏻 Implementierung von technischen und organisatorischen Sicherheitskonzepten (Mend, AWS Guard Duty, WAF, Config, Security Hub) ✌🏻 Einführung und Schulung von Stakeholdern",
        url: undefined,
        language: "de-DE",
      },
      {
        name: "Plattform für Kreditkarten und Zahlungsabwicklung",
        startDate: parseDate("07-2019"),
        endDate: parseDate("09-2020"),
        description: "Architektur und Entwicklung einer mandantenfähigen Plattform für Prepaid-Kreditkarten und Transaktionsmanagement.",
        highlights: "Entwurf einer mandantenfähigen Architektur in AWS mit Migration von einer bestehenden monolithischen Anwendung, mit Fokus auf die Unterstützung von hunderten Kreditkarten-Mandanten und potenziell Millionen von Nutzern ✌🏻 Konzeption und Implementierung einer Cloud-Umgebung für dedizierte Lasttests und Simulation von Nutzerverhalten in AWS ✌🏻 Integration eines Services in Spring-Boot zur Compliance- und Betrugserkennung gemäß den gesetzlichen Vorgaben ✌🏻 Entwicklung einer Authentifizierungskomponente mit AWS Lambda und Cognito",
        url: undefined,
        language: "de-DE",
      },
      {
        name: "Entwicklung von Support-Tools für die Analyse von Finanzdaten",
        startDate: parseDate("03-2015"),
        endDate: parseDate("08-2017"),
        description: "Entwicklung einer Lösung zur automatisierten Erfassung, Verarbeitung und Speicherung von Kundentransaktionsdaten (ETL-Prozess). Entwicklung eines Datenschemas für die Langzeitarchivierung von Steuerdaten und Bereitstellung der Daten über unternehmensinterne Server.",
        highlights: "Reduzierung der Zeit für Datenerfassung und -bereitstellung von 10 Minuten (manuelle Excel-Verarbeitung) zu wenigen Sekunden. Etwa 98 % der strukturierten Daten konnten mit der neuen Lösung verarbeitet werden.",
        url: undefined,
        language: "de-DE",
      }
    ],

    // Interests
    interests: [
      {
        name: "Unternehmensführung und Personalmanagement",
        keywords: "Weiterentwicklung von Geschäftsmodellen, new work, agile Frameworks at scale, moderne HR und KI",
        language: "de-DE",
      },
      {
        name: "Technologietrends",
        keywords: "Entwicklung in KI/ML, Cloud-native Technologien, Web3 und Blockchain, Serverless",
        language: "de-DE",
      },
      {
        name: "Fitness & Wellness",
        keywords: "Kraftsport, Yoga, gesunde Ernährung",
        language: "de-DE",
      }
    ],

    // Languages
    languages: [
      {
        language: "Deutsch",
        fluency: "Muttersprache",
        uiLanguage: "de-DE",
      },
      {
        language: "Englisch",
        fluency: "verhandlungssicher",
        uiLanguage: "de-DE",
      },
    ],
  }
];

// ── Helper: seed resume languages ────────────────────────────────────────────
const seedResumeLanguages = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[],
  resumeId: number
) => {
  const existingLanguages = await prisma.resumeLanguage.findMany({
    where: {
      language: { in: resumeData.languages.map((l) => l.language) },
      resumeId,
    },
  });

  const existingLanguageNames = new Set(existingLanguages.map((l) => l.language));

  const languagesToCreate = resumeData.languages.filter(
    (lang) => !existingLanguageNames.has(lang.language)
  );

  let newLanguages = [];
  if (languagesToCreate.length > 0) {
    newLanguages = await prisma.resumeLanguage.createManyAndReturn({
      data: languagesToCreate.map((lang) => ({
        language: lang.language,
        fluency: lang.fluency,
        uiLanguageId: allLanguages.find((l) => l.value === lang.uiLanguage)?.id,
        resumeId,
      })),
    });
    console.log(`✓ Created ${newLanguages.length} new resume languages`);
  } else {
    console.log(`✓ All resume languages already exist, skipping creation`);
  }

  const languages = await prisma.resumeLanguage.findMany({
    where: {
      language: { in: resumeData.languages.map((l) => l.language) },
      resumeId,
    },
  });

  console.log(`✓ Total resume languages: ${languages.length}`);
  return languages;
};

// ── Helper: seed publications ─────────────────────────────────────────────────
const seedResumePublications = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[],
  resumeId: number
) => {
  const existingPublications = await prisma.resumePublication.findMany({
    where: {
      name: { in: resumeData.publications.map((p) => p.name) },
      resumeId,
    },
  });

  const existingPublicationNames = new Set(existingPublications.map((p) => p.name));

  const publicationsToCreate = resumeData.publications.filter(
    (pub) => !existingPublicationNames.has(pub.name)
  );

  let newPublications = [];
  if (publicationsToCreate.length > 0) {
    newPublications = await prisma.resumePublication.createManyAndReturn({
      data: publicationsToCreate.map((pub) => ({
        ...pub,
        languageId: allLanguages.find((l) => l.value === pub.language)?.id,
        language: undefined,
        resumeId,
      })),
    });
    console.log(`✓ Created ${newPublications.length} new resume publications`);
  } else {
    console.log(`✓ All resume publications already exist, skipping creation`);
  }

  const allPublications = await prisma.resumePublication.findMany({
    where: {
      name: { in: resumeData.publications.map((p) => p.name) },
      resumeId,
    },
  });

  console.log(`✓ Total resume publications: ${allPublications.length}`);
  return allPublications;
};

// ── Helper: seed awards ───────────────────────────────────────────────────────
const seedAwards = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[],
  resumeId: number
) => {
  const existingAwards = await prisma.resumeAward.findMany({
    where: {
      title: { in: resumeData.awards.map((a) => a.title) },
      resumeId,
    },
  });

  const existingAwardTitles = new Set(existingAwards.map((a) => a.title));

  const awardsToCreate = resumeData.awards.filter(
    (award) => !existingAwardTitles.has(award.title)
  );

  let newAwards = [];
  if (awardsToCreate.length > 0) {
    newAwards = await prisma.resumeAward.createManyAndReturn({
      data: awardsToCreate.map((award) => ({
        ...award,
        languageId: allLanguages.find((l) => l.value === award.language)?.id,
        language: undefined,
        resumeId,
      })),
    });
    console.log(`✓ Created ${newAwards.length} new resume awards`);
  } else {
    console.log(`✓ All resume awards already exist, skipping creation`);
  }

  const allAwards = await prisma.resumeAward.findMany({
    where: {
      title: { in: resumeData.awards.map((a) => a.title) },
      resumeId,
    },
  });

  console.log(`✓ Total resume awards: ${allAwards.length}`);
  return allAwards;
};

// ── Helper: seed education ────────────────────────────────────────────────────
const seedResumeEducation = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[],
  resumeId: number
) => {
  const existingEducation = await prisma.resumeEducation.findMany({
    where: {
      institution: { in: resumeData.education.map((e) => e.institution) },
      resumeId,
    },
  });

  const existingEducationKeys = new Set(
    existingEducation.map((e) => `${e.institution}-${e.studyType}`)
  );

  const educationToCreate = resumeData.education.filter(
    (edu) => !existingEducationKeys.has(`${edu.institution}-${edu.studyType}`)
  );

  let newEducation = [];
  if (educationToCreate.length > 0) {
    newEducation = await prisma.resumeEducation.createManyAndReturn({
      data: educationToCreate.map((edu) => ({
        ...edu,
        languageId: allLanguages.find((l) => l.value === edu.language)?.id,
        language: undefined,
        resumeId,
      })),
    });
    console.log(`✓ Created ${newEducation.length} new resume education records`);
  } else {
    console.log(`✓ All resume education records already exist, skipping creation`);
  }

  const allEducation = await prisma.resumeEducation.findMany({
    where: {
      institution: { in: resumeData.education.map((e) => e.institution) },
      resumeId,
    },
  });

  console.log(`✓ Total resume education records: ${allEducation.length}`);
  return allEducation;
};

// ── Helper: seed volunteer ────────────────────────────────────────────────────
const seedVolunteer = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[],
  resumeId: number
) => {
  const existingVolunteer = await prisma.resumeVolunteer.findMany({
    where: {
      organization: { in: resumeData.volunteer.map((v) => v.organization) },
      resumeId,
    },
  });

  const existingVolunteerKeys = new Set(
    existingVolunteer.map((v) => `${v.organization}-${v.position}`)
  );

  const volunteerToCreate = resumeData.volunteer.filter(
    (vol) => !existingVolunteerKeys.has(`${vol.organization}-${vol.position}`)
  );

  let newVolunteer = [];
  if (volunteerToCreate.length > 0) {
    newVolunteer = await prisma.resumeVolunteer.createManyAndReturn({
      data: volunteerToCreate.map((vol) => ({
        ...vol,
        languageId: allLanguages.find((l) => l.value === vol.language)?.id,
        language: undefined,
        resumeId,
      })),
    });
    console.log(`✓ Created ${newVolunteer.length} new resume volunteer records`);
  } else {
    console.log(`✓ All resume volunteer records already exist, skipping creation`);
  }

  const allVolunteer = await prisma.resumeVolunteer.findMany({
    where: {
      organization: { in: resumeData.volunteer.map((v) => v.organization) },
      resumeId,
    },
  });

  console.log(`✓ Total resume volunteer records: ${allVolunteer.length}`);
  return allVolunteer;
};

// ── Helper: seed work experience ──────────────────────────────────────────────
const seedResumeExperience = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[],
  resumeId: number
) => {
  const existingWork = await prisma.resumeWork.findMany({
    where: {
      name: { in: resumeData.work.map((w) => w.name) },
      resumeId,
    },
  });

  const existingWorkKeys = new Set(existingWork.map((w) => `${w.name}-${w.position}`));

  const allExperience: { id: number }[] = [];

  for (const exp of resumeData.work) {
    const key = `${exp.name}-${exp.position}`;
    if (existingWorkKeys.has(key)) {
      const existing = existingWork.find(
        (w) => w.name === exp.name && w.position === exp.position
      );
      if (existing) allExperience.push(existing);
      continue;
    }

    const languageId = allLanguages.find((l) => l.value === exp.language)?.id;

    // Parse highlights into individual ResumeHighlight records
    const highlightStrings = exp.highlights
      ? exp.highlights.split("✌🏻").map((h: string) => h.trim()).filter(Boolean)
      : [];

    const work = await prisma.resumeWork.create({
      data: {
        name: exp.name,
        position: exp.position,
        url: exp.url ?? "",
        startDate: exp.startDate ? new Date(exp.startDate) : "",
        endDate: exp.endDate ? new Date(exp.endDate) : null,
        summary: exp.summary ?? null,
        languageId,
        resumeId,
        highlights: {
          create: highlightStrings.map((value: string) => ({ value })),
        },
      },
    });

    allExperience.push(work);
  }

  console.log(`✓ Total resume work experience: ${allExperience.length}`);
  return allExperience;
};

// ── Helper: seed profiles ─────────────────────────────────────────────────────
const seedResumeProfiles = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[],
  resumeId: number
) => {
  const profileLanguageId = allLanguages.find(
    (l) => l.value === resumeData.resume.language
  )?.id;

  const existingProfiles = await prisma.resumeProfile.findMany({
    where: {
      network: { in: resumeData.profiles.map((p) => p.network) },
      languageId: profileLanguageId,   // ← no resumeId, scope by language
    },
  });

  const existingProfileKeys = new Set(
    existingProfiles.map((p) => `${p.network}-${p.username}`)
  );

  const profilesToCreate = resumeData.profiles.filter(
    (profile) => !existingProfileKeys.has(`${profile.network}-${profile.username}`)
  );

  let newProfiles = [];
  if (profilesToCreate.length > 0) {
    newProfiles = await prisma.resumeProfile.createManyAndReturn({
      data: profilesToCreate.map((profile) => ({
        network: profile.network,      // explicit fields only, no spread
        username: profile.username,
        url: profile.url,
        languageId: allLanguages.find((l) => l.value === profile.language)?.id,
      })),
    });
    console.log(`✓ Created ${newProfiles.length} new resume profiles`);
  } else {
    console.log(`✓ All resume profiles already exist, skipping creation`);
  }

  const allProfiles = await prisma.resumeProfile.findMany({
    where: {
      network: { in: resumeData.profiles.map((p) => p.network) },
      languageId: profileLanguageId,   // ← no resumeId here either
    },
  });

  console.log(`✓ Total resume profiles: ${allProfiles.length}`);
  return allProfiles;
};


// ── Helper: seed skills ───────────────────────────────────────────────────────
const seedResumeSkills = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[],
  resumeId: number
) => {
  const existingSkills = await prisma.resumeSkill.findMany({
    where: {
      name: { in: resumeData.skills.map((s) => s.name) },
      resumeId,
    },
  });

  const existingSkillKeys = new Set(existingSkills.map((s) => `${s.name}-${s.languageId}`));

  const skillsToCreate = resumeData.skills.filter((skill) => {
    const languageId = allLanguages.find((l) => l.value === skill.language)?.id;
    return !existingSkillKeys.has(`${skill.name}-${languageId}`);
  });

  let newSkills = [];
  if (skillsToCreate.length > 0) {
    newSkills = await prisma.resumeSkill.createManyAndReturn({
      data: skillsToCreate.map((skill) => ({
        ...skill,
        languageId: allLanguages.find((l) => l.value === skill.language)?.id,
        language: undefined,
        resumeId,
      })),
    });
    console.log(`✓ Created ${newSkills.length} new resume skills`);
  } else {
    console.log(`✓ All resume skills already exist, skipping creation`);
  }

  const allSkills = await prisma.resumeSkill.findMany({
    where: {
      name: { in: resumeData.skills.map((s) => s.name) },
      resumeId,
    },
  });

  console.log(`✓ Total resume skills: ${allSkills.length}`);
  return allSkills;
};

// ── Helper: seed interests ────────────────────────────────────────────────────
const seedResumeInterests = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[],
  resumeId: number
) => {
  const existingInterests = await prisma.resumeInterest.findMany({
    where: {
      name: { in: resumeData.interests.map((i) => i.name) },
      resumeId,
    },
  });

  const existingInterestKeys = new Set(existingInterests.map((i) => `${i.name}-${i.languageId}`));

  const interestsToCreate = resumeData.interests.filter((interest) => {
    const languageId = allLanguages.find((l) => l.value === interest.language)?.id;
    return !existingInterestKeys.has(`${interest.name}-${languageId}`);
  });

  let newInterests = [];
  if (interestsToCreate.length > 0) {
    newInterests = await prisma.resumeInterest.createManyAndReturn({
      data: interestsToCreate.map((interest) => ({
        ...interest,
        languageId: allLanguages.find((l) => l.value === interest.language)?.id,
        language: undefined,
        resumeId,
      })),
    });
    console.log(`✓ Created ${newInterests.length} new resume interests`);
  } else {
    console.log(`✓ All resume interests already exist, skipping creation`);
  }

  const allInterests = await prisma.resumeInterest.findMany({
    where: {
      name: { in: resumeData.interests.map((i) => i.name) },
      resumeId,
    },
  });

  console.log(`✓ Total resume interests: ${allInterests.length}`);
  return allInterests;
};

// ── Helper: seed locations ────────────────────────────────────────────────────
const seedResumeLocations = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[],
  resumeId: number
) => {
  const location = resumeData.location;
  const languageId = allLanguages.find((l) => l.value === location.language)?.id;

  const existingLocation = await prisma.resumeLocation.findFirst({
    where: {
      city: location.city,
      countryCode: location.countryCode,
      languageId,
    },
  });

  if (existingLocation) {
    console.log(
      `✓ Resume location already exists (id: ${existingLocation.id}), skipping creation`
    );
    return existingLocation;
  }

  const newLocation = await prisma.resumeLocation.create({
    data: {
      address: location.address,
      postalCode: location.postalCode,
      city: location.city,
      countryCode: location.countryCode,
      region: location.region,
      languageId,
    },
  });

  console.log(`✓ Created resume location (id: ${newLocation.id})`);
  return newLocation;
};

// ── Helper: seed basic information ────────────────────────────────────────────
const seedResumeBasicInfo = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[],
  resumeId: number
) => {
  const basicInfo = resumeData.basicInformation;
  const languageId = allLanguages.find((l) => l.value === basicInfo.language)?.id;

  const existingBasicInfo = await prisma.resumeBasicInformation.findFirst({
    where: {
      email: basicInfo.email,
      languageId,
    },
  });

  if (existingBasicInfo) {
    console.log(
      `✓ Resume basic information already exists (id: ${existingBasicInfo.id}), skipping creation`
    );
    return existingBasicInfo;
  }

  // Seed location first so we can link it
  const location = await seedResumeLocations(prisma, resumeData, allLanguages, resumeId);

  // Resolve photo image if provided
  const photoKey = basicInfo.resumePhotoKey as ResumeImageKey | undefined;
  const photoImage = photoKey ? Images.data[photoKey] : undefined;
  let imageId: number | undefined;

  if (photoImage) {
    const existingImage = await prisma.image.findFirst({
      where: { src: photoImage.src },
    });
    imageId = existingImage?.id;
  }

  const newBasicInfo = await prisma.resumeBasicInformation.create({
    data: {
      name: basicInfo.name,
      label: basicInfo.label,
      email: basicInfo.email,
      url: basicInfo.url ?? null,
      summary: basicInfo.summary ?? null,
      language: { connect: { id: languageId } },
      location: { connect: { id: location.id } },
      image: { connect: { id: imageId } },
      resume: { connect: { id: resumeId } },
    },
  });

  console.log(`✓ Created resume basic information (id: ${newBasicInfo.id})`);
  return newBasicInfo;
};

// ── Helper: seed projects ─────────────────────────────────────────────────────
const seedResumeProjects = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[],
  resumeId: number
) => {
  const existingProjects = await prisma.resumeProject.findMany({
    where: {
      name: { in: resumeData.projects.map((p) => p.name) },
      resumeId,
    },
  });

  const existingProjectKeys = new Set(
    existingProjects.map((p) => `${p.name}-${p.languageId}`)
  );

  const projectsToCreate = resumeData.projects.filter((project) => {
    const languageId = allLanguages.find((l) => l.value === project.language)?.id;
    return !existingProjectKeys.has(`${project.name}-${languageId}`);
  });

  let newProjects = [];
  if (projectsToCreate.length > 0) {
    newProjects = await prisma.resumeProject.createManyAndReturn({
      data: projectsToCreate.map((project) => ({
        ...project,
        languageId: allLanguages.find((l) => l.value === project.language)?.id,
        language: undefined,
        resumeId,
        url: project.url ?? "",
      })),
    });
    console.log(`✓ Created ${newProjects.length} new resume projects`);
  } else {
    console.log(`✓ All resume projects already exist, skipping creation`);
  }

  const allProjects = await prisma.resumeProject.findMany({
    where: {
      name: { in: resumeData.projects.map((p) => p.name) },
      resumeId,
    },
  });

  console.log(`✓ Total resume projects: ${allProjects.length}`);
  return allProjects;
};

// ── Main seed function ────────────────────────────────────────────────────────
const seedResume = async (prisma: PrismaClient) => {
  console.log("Seeding resumes...");

  const allLanguages = await prisma.language.findMany();
  if (!allLanguages || allLanguages.length === 0) {
    throw new Error("Languages not found - please seed languages first");
  }

  const createdResumes = [];

  for (const resumeData of RESUME_DATA) {
    const resumeLanguageId = allLanguages.find(
      (language) => language.value === resumeData.resume.language
    )?.id;

    if (!resumeLanguageId) {
      console.error(
        `Language ${resumeData.resume.language} not found, skipping resume: ${resumeData.resume.title}`
      );
      continue;
    }

    // ── Step 1: Create the Resume shell first so we have its id ──────────────
    let resume = await prisma.resume.findFirst({
      where: {
        title: resumeData.resume.title,
        languageId: resumeLanguageId,
      },
    });

    if (resume) {
      console.log(`✓ Resume already exists (id: ${resume.id}), skipping`);
      createdResumes.push(resume);
      continue;
    }

    resume = await prisma.resume.create({
      data: {
        title: resumeData.resume.title,
        languageId: resumeLanguageId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(`✓ Created resume shell: ${resume.title} (id: ${resume.id})`);
    const resumeId = resume.id;

    // ── Step 2: Seed all components with resumeId set at creation time ────────
    const resumeLanguages = await seedResumeLanguages(prisma, resumeData, allLanguages, resumeId);
    const allPublications = await seedResumePublications(prisma, resumeData, allLanguages, resumeId);
    const allAwards = await seedAwards(prisma, resumeData, allLanguages, resumeId);
    const allEducation = await seedResumeEducation(prisma, resumeData, allLanguages, resumeId);
    const allVolunteer = await seedVolunteer(prisma, resumeData, allLanguages, resumeId);
    const allExperience = await seedResumeExperience(prisma, resumeData, allLanguages, resumeId);
    const allProfiles = await seedResumeProfiles(prisma, resumeData, allLanguages, resumeId);
    const allSkills = await seedResumeSkills(prisma, resumeData, allLanguages, resumeId);
    const allInterests = await seedResumeInterests(prisma, resumeData, allLanguages, resumeId);
    const allProjects = await seedResumeProjects(prisma, resumeData, allLanguages, resumeId);
    const basicInfo = await seedResumeBasicInfo(prisma, resumeData, allLanguages, resumeId);

    // Fetch certifications based on the certification keys in resumeData
    let allCertifications: { id: number }[] = [];

    if (resumeData.certifications && resumeData.certifications.length > 0) {
      // Get certification images from the certification keys
      const certificationImageIds: number[] = [];

      for (const certKey of resumeData.certifications as CertificationImageKey[]) {
        const certConfig = Images.data[certKey as ImageKeys];

        if (certConfig?.src) {
          const certImage = await prisma.image.findFirst({
            where: { src: certConfig.src },
          });

          if (certImage) {
            certificationImageIds.push(certImage.id);
          } else {
            console.log(`! Certification image not found for key: ${certKey}`);
          }
        }
      }

      // Fetch certifications by image IDs and language
      if (certificationImageIds.length > 0) {
        allCertifications = await prisma.certification.findMany({
          where: {
            imageId: { in: certificationImageIds },
            languageId: resumeLanguageId,
          },
        });
      }
    }

    // ── Step 3: Update Resume to connect all components ───────────────────────
    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: {
        basicInformation: { connect: { id: basicInfo.id } },
        work: { connect: allExperience.map((w) => ({ id: w.id })) },
        volunteer: { connect: allVolunteer.map((v) => ({ id: v.id })) },
        education: { connect: allEducation.map((e) => ({ id: e.id })) },
        publications: { connect: allPublications.map((p) => ({ id: p.id })) },
        awards: { connect: allAwards.map((a) => ({ id: a.id })) },
        certificates: { connect: allCertifications.map((c) => ({ id: c.id })) },
        skills: { connect: allSkills.map((s) => ({ id: s.id })) },
        resumeLanguages: { connect: resumeLanguages.map((l) => ({ id: l.id })) },
        interests: { connect: allInterests.map((i) => ({ id: i.id })) },
        projects: { connect: allProjects.map((p) => ({ id: p.id })) },
      },
    });

    console.log(`✓ Fully seeded resume: ${updatedResume.title} (id: ${updatedResume.id})`);
    createdResumes.push(updatedResume);
  }

  console.log(`✓ Seeding complete. Total resumes: ${createdResumes.length}`);
  return createdResumes;
};

// ── Clear function ────────────────────────────────────────────────────────────
const clearResumeData = async (prisma: PrismaClient) => {
  console.log("Clearing all resume data...");

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

  console.log("✓ Cleared all resume-related data.");
};

const Resume = {
  data: RESUME_DATA,
  seed: seedResume,
  clear: clearResumeData,
};

export default Resume;
