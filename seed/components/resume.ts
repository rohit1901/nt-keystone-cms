import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import Images, { ResumeImageKey } from "./images";

// Helper function to convert date strings to ISO format
const parseDate = (dateStr: string): string => {
  const [month, year] = dateStr.split('-');
  return new Date(parseInt(year), parseInt(month) - 1).toISOString();
};

export const RESUME_DATA = [
  {
    // Main Resume
    resume: {
      title: "Rohit Khanduri - Software Architect Resume",
      language: "en-US", // Reference to Language.value
      createdAt: new Date().toISOString(),
    },

    // Basic Information
    basicInformation: {
      name: "Rohit Khanduri",
      label: "Software Architect",
      email: "rohit.khanduri@hotmail.com",
      url: "https://www.linkedin.com/in/rohit-khanduri-9098b84a/",
      summary: "I'm a seasoned Software Architect with over a decade of expertise in Software Development, System Design, and Team Leadership. Specializing in building scalable, high-performance applications using modern technologies including Node.js, React, TypeScript, GraphQL, and cloud platforms. Passionate about solving complex problems, mentoring teams, and driving innovation through best practices in software architecture and design patterns.",
      language: "en-US",
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
        position: "Manager IT",
        url: "https://www.miles-and-more.com/",
        startDate: parseDate("03-2025"),
        endDate: null,
        summary: `IT Manager responsible for the architecture of the Miles & More Flutter mobile application and for leading an outsourced development team.`,
        highlights: `Own the technical direction and architecture of the Miles & More mobile app
Lead and coordinate an outsourced development team
Align architecture decisions with product and design stakeholders
Oversee CI/CD pipelines and production readiness
Ensure GDPR compliance, security, and risk management for the app`,
        language: "en-US",
      },
      {
        name: "adesso SE",
        position: "Software Architect",
        url: "https://www.adesso.de/",
        startDate: parseDate("08-2020"),
        endDate: parseDate("02-2025"),
        summary: `Software architect and consultant for large-scale banking and public-sector systems with microservice and micro-frontend architectures.`,
        highlights: `Led architectural assessments of existing production systems and proposed improvements
Defined target architectures and technology roadmaps for 1–3 years
Acted as primary architectural contact for clients and internal teams
Introduced coding guidelines, review processes, and quality standards
Led frontend teams on React, Angular, and Flutter projects in regulated environments`,
        language: "en-US",
      },
      {
        name: "Finatix GmbH",
        position: "Software Developer (Working Student)",
        url: "https://www.finatix.de/",
        startDate: parseDate("09-2019"),
        endDate: parseDate("07-2020"),
        summary: `Working student developer on a credit card dashboard and mobile app with payment services and fraud-related data science features.`,
        highlights: `Implemented new frontend features for a credit card dashboard
Contributed to end-to-end functionality from backend to frontend
Worked on fraud identification use cases with data science tooling
Upgraded the Angular codebase and refreshed the UI design`,
        language: "en-US",
      },
      {
        name: "Peak Performance Apps GmbH (Subsidiary of Appsfactory GmbH)",
        position: "Software Developer (Working Student)",
        url: "https://appsfactory.de/",
        startDate: parseDate("05-2019"),
        endDate: parseDate("08-2019"),
        summary: `Frontend developer for a survey and market research application delivered as both web and mobile app.`,
        highlights: `Developed responsive web UIs with Vue.js and modern JavaScript tooling
Contributed to a hybrid web and mobile survey platform
Collaborated with designers and backend engineers on feature delivery`,
        language: "en-US",
      },
      {
        name: "Appsfactory GmbH",
        position: "Software Developer (Working Student)",
        url: "https://appsfactory.de/",
        startDate: parseDate("12-2017"),
        endDate: parseDate("04-2019"),
        summary: `Full-stack developer for multiple client projects including React Native mobile apps and React-based web dashboards.`,
        highlights: `Built features for a German shopping and rewards app with React Native
Developed web-based dashboards using React and Redux
Contributed to backend services with Node.js and Express
Participated in agile ceremonies and sprint planning`,
        language: "en-US",
      },
      {
        name: "Iris Software Inc.",
        position: "Software Engineer",
        url: "https://www.irissoftware.com/",
        startDate: parseDate("06-2016"),
        endDate: parseDate("09-2017"),
        summary: `Software engineer on telecom provisioning systems and enterprise web applications.`,
        highlights: `Developed Java-based backend systems for telecom service provisioning
Built Spring Boot microservices and RESTful APIs
Worked on Oracle database design and query optimization
Collaborated with cross-functional teams in a distributed environment
Contributed to testing frameworks with Selenium and JUnit
Delivered features in two-week sprints with automated CI/CD`,
        language: "en-US",
      },
      {
        name: "Virtusa Corp.",
        position: "Senior Engineer",
        url: "https://www.virtusa.com/",
        startDate: parseDate("08-2014"),
        endDate: parseDate("05-2016"),
        summary: `Senior engineer focused on Java EE enterprise applications with Spring and Hibernate.`,
        highlights: `Designed and implemented RESTful APIs with Spring MVC
Integrated Hibernate for ORM and database interactions
Mentored junior developers on best practices and design patterns`,
        language: "en-US",
      },
      {
        name: "Genpact",
        position: "Module Lead",
        url: "https://www.genpact.com/",
        startDate: parseDate("06-2013"),
        endDate: parseDate("07-2014"),
        summary: `Module lead responsible for guiding a small team on web-based enterprise solutions.`,
        highlights: `Led a team of 3–4 developers on Java-based enterprise modules
Coordinated sprint planning and code reviews`,
        language: "en-US",
      },
      {
        name: "NEC",
        position: "Software Engineer",
        url: "https://www.nec.com/",
        startDate: parseDate("07-2012"),
        endDate: parseDate("05-2013"),
        summary: `Software engineer building Java-based backend systems for enterprise clients.`,
        highlights: `Developed enterprise applications with Java and J2EE
Worked on database integration and backend logic`,
        language: "en-US",
      },
    ],

    // Volunteer
    volunteer: [
      {
        organization: "Open Source Community",
        position: "Contributor",
        url: "https://github.com/rohit1901",
        startDate: parseDate("01-2018"),
        endDate: null,
        summary: "Active contributor to various open-source projects in the JavaScript and TypeScript ecosystem.",
        highlights: `Contributed to React and Node.js libraries
Maintained personal open-source projects`,
        language: "en-US",
      },
      {
        organization: "Robinhood Army",
        position: "Volunteer",
        url: "https://robinhoodarmy.com/",
        startDate: parseDate("01-2015"),
        endDate: parseDate("07-2018"),
        summary: "Volunteered at Robinhood Army.",
        highlights: `Distributed food to the needy people Conducted food distribution drives
Organized events and activities
Provided support to community members`,
        language: "en-US",
      }
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
        awarder: "Adesso SE",
        summary: "Recognized for exceptional performance and delivery of critical project milestones.",
        language: "en-US",
      },
      {
        title: "Best Performer Award",
        date: parseDate("12-2015"),
        awarder: "Virtusa Corp.",
        summary: "Recognized for exceptional performance and delivery of critical project milestones.",
        language: "en-US",
      },
      {
        title: "Innovation Award",
        date: parseDate("03-2014"),
        awarder: "Genpact",
        summary: "Awarded for innovative solution design that improved system efficiency by 30%.",
        language: "en-US",
      },
      {
        title: "Team Excellence Award",
        date: parseDate("11-2016"),
        awarder: "Iris Software Inc.",
        summary: "Team recognition for delivering a complex telecom provisioning system ahead of schedule.",
        language: "en-US",
      },
      {
        title: "Academic Excellence Scholarship",
        date: parseDate("09-2017"),
        awarder: "Université Paris-Saclay",
        summary: "Merit-based scholarship for outstanding academic performance in mathematics and computer science.",
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
        name: "Frontend Development",
        level: "Expert",
        keywords: "React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Styled Components, Material UI, Ant Design, Redux, Redux Toolkit, Zustand, React Query, SWR, Webpack, Vite, Remix, Astro, Web Components, Progressive Web Apps (PWA), Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR)",
        language: "en-US",
      },
      {
        name: "Backend Development",
        level: "Expert",
        keywords: "Node.js, Express.js, NestJS, Fastify, tRPC, GraphQL, Apollo Server, Prisma, TypeORM, Drizzle ORM, REST APIs, gRPC, WebSockets, Socket.io, Message Queues, RabbitMQ, Apache Kafka, Bull Queue, BullMQ, Authentication (JWT, OAuth2, SAML), API Design, Rate Limiting, Caching Strategies",
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
        keywords: "PostgreSQL, MongoDB, MySQL, Redis, DynamoDB, Elasticsearch, TimescaleDB, Database Design, Query Optimization, Indexing Strategies, Replication, Sharding, Database Migration, Data Modeling, NoSQL vs SQL, ACID Transactions, CAP Theorem, Database Security, Backup and Recovery",
        language: "en-US",
      },
      {
        name: "Architecture & System Design",
        level: "Expert",
        keywords: "Microservices Architecture, Event-Driven Architecture, Domain-Driven Design (DDD), CQRS, Event Sourcing, API Gateway Pattern, Service Mesh (Istio), Micro-frontends, Clean Architecture, Hexagonal Architecture, SOLID Principles, Design Patterns (Factory, Strategy, Observer, Singleton), High Availability, Fault Tolerance, Circuit Breaker Pattern, Saga Pattern, Distributed Systems, Scalability, Performance Optimization, Security Best Practices, Load Balancing Strategies",
        language: "en-US",
      },
      {
        name: "Testing & Quality Assurance",
        level: "Advanced",
        keywords: "Jest, Vitest, Testing Library, Cypress, Playwright, Selenium, Puppeteer, Test-Driven Development (TDD), Behavior-Driven Development (BDD), Unit Testing, Integration Testing, End-to-End Testing, Performance Testing, Load Testing (k6, Artillery), Mutation Testing, Code Coverage, Visual Regression Testing, Contract Testing (Pact), API Testing (Postman, Insomnia)",
        language: "en-US",
      },
      {
        name: "AI & Machine Learning",
        level: "Intermediate",
        keywords: "OpenAI API, Anthropic Claude API, LangChain, Vector Databases (Pinecone, Weaviate), RAG (Retrieval-Augmented Generation), Prompt Engineering, Natural Language Processing, Chatbot Development, AI Integration, TensorFlow.js, ML Model Deployment, Feature Engineering, Model Evaluation",
        language: "en-US",
      },
      {
        name: "Mobile Development",
        level: "Advanced",
        keywords: "React Native, Expo, Flutter, iOS Development, Android Development, Mobile App Architecture, Push Notifications, Deep Linking, App Store Deployment, Mobile Performance Optimization, Offline-First Architecture, Mobile Analytics, In-App Purchases",
        language: "en-US",
      },
      {
        name: "Developer Tools & Practices",
        level: "Expert",
        keywords: "Git, GitHub, GitLab, Bitbucket, VS Code, Git Flow, Trunk-Based Development, Code Review, Pull Requests, Pair Programming, ESLint, Prettier, Husky, Lint-Staged, Semantic Versioning, Changesets, Monorepo (Turborepo, Nx, Lerna), Package Management (npm, yarn, pnpm), Documentation (Storybook, JSDoc, OpenAPI/Swagger)",
        language: "en-US",
      },
      {
        name: "Web3 & Blockchain",
        level: "Beginner",
        keywords: "Ethereum, Solidity, Web3.js, Ethers.js, Smart Contracts, DApps, MetaMask Integration, IPFS, Blockchain Fundamentals",
        language: "en-US",
      },
      {
        name: "Agile & Project Management",
        level: "Expert",
        keywords: "Agile Methodologies, Scrum, Kanban, Sprint Planning, Story Estimation, Retrospectives, Daily Standups, Backlog Grooming, Jira, Linear, Confluence, Notion, Asana, Monday.com, Technical Leadership, Mentoring, Cross-functional Team Collaboration, Stakeholder Management",
        language: "en-US",
      },
      {
        name: "Security & Compliance",
        level: "Advanced",
        keywords: "OWASP Top 10, Authentication & Authorization, OAuth2.0, OpenID Connect, JWT, Security Headers, XSS Prevention, CSRF Protection, SQL Injection Prevention, Data Encryption, HTTPS/SSL/TLS, Secrets Management, Vulnerability Scanning, Penetration Testing, GDPR Compliance, SOC 2, Security Audits",
        language: "en-US",
      },
    ],
    projects: [
      {
        name: "Enterprise AI-Powered Customer Support Platform",
        startDate: parseDate("2023-01"),
        endDate: null,
        description: "Led the development of a scalable AI-powered customer support platform serving millions of users, integrating multiple AI models and real-time communication capabilities.",
        highlights: "Architected and implemented microservices-based backend using Node.js, NestJS, and GraphQL, processing 50M+ API requests daily\nIntegrated OpenAI GPT-4 and custom NLP models for intelligent query routing and automated response generation, improving resolution time by 65%\nBuilt real-time chat system using WebSockets and Redis Pub/Sub, supporting 100K+ concurrent connections\nImplemented comprehensive monitoring and observability with Prometheus, Grafana, and custom dashboards, achieving 99.9% uptime\nDesigned event-driven architecture using Apache Kafka for asynchronous processing of customer interactions",
        url: undefined,
        language: "en-US",
      },
      {
        name: "Retail Analytics & Inventory Management System",
        startDate: parseDate("2022-03"),
        endDate: parseDate("2023-12"),
        description: "Developed a comprehensive analytics and inventory management platform for large-scale retail operations, enabling real-time insights and automated inventory optimization.",
        highlights: "Built responsive React-based dashboard with real-time data visualization using D3.js and Recharts, serving 5000+ daily active users\nImplemented predictive analytics engine using Python and TensorFlow for inventory forecasting, reducing overstock by 30%\nArchitected high-performance data pipeline processing 500GB+ of transaction data daily using AWS Glue and Athena\nDeveloped REST and GraphQL APIs using Node.js and Express, integrated with 20+ third-party logistics systems\nOptimized PostgreSQL database queries and implemented caching with Redis, reducing response times from 3s to 200ms",
        url: undefined,
        language: "en-US",
      },
      {
        name: "Multi-Tenant SaaS Platform for Healthcare",
        startDate: parseDate("2021-06"),
        endDate: parseDate("2022-02"),
        description: "Architected and built a HIPAA-compliant multi-tenant SaaS platform for healthcare providers, enabling secure patient data management and telehealth capabilities.",
        highlights: "Designed multi-tenant architecture with row-level security in PostgreSQL, supporting 200+ healthcare organizations\nImplemented end-to-end encryption for patient data using AWS KMS and achieved HIPAA compliance certification\nBuilt video conferencing feature using WebRTC and Twilio, conducting 10K+ telehealth sessions monthly\nCreated CI/CD pipeline with GitHub Actions and AWS ECS, enabling 20+ deployments per week with zero downtime\nDeveloped comprehensive audit logging system for compliance tracking and security monitoring",
        url: undefined,
        language: "en-US",
      },
      {
        name: "Mobile-First E-commerce Platform",
        startDate: parseDate("2020-09"),
        endDate: parseDate("2021-05"),
        description: "Led development of a mobile-first e-commerce platform with advanced features including AR product preview, personalized recommendations, and seamless checkout experience.",
        highlights: "Built cross-platform mobile app using React Native and Expo, achieving 4.8★ rating with 500K+ downloads\nImplemented AR product visualization using ARKit and ARCore, increasing conversion rates by 45%\nIntegrated Stripe, PayPal, and Apple Pay for seamless payment processing with PCI DSS compliance\nDeveloped personalized recommendation engine using collaborative filtering, improving average order value by 35%\nOptimized app performance achieving <2s initial load time and 60fps animations on budget devices",
        url: undefined,
        language: "en-US",
      },
      {
        name: "Real-Time Collaboration Tool",
        startDate: parseDate("2020-01"),
        endDate: parseDate("2020-08"),
        description: "Developed a real-time collaborative workspace application enabling teams to work together on documents, whiteboards, and projects with live updates.",
        highlights: "Implemented operational transformation (OT) algorithm for conflict-free real-time collaboration on shared documents\nBuilt WebSocket infrastructure using Socket.io and Redis, supporting 50K+ concurrent collaborative sessions\nCreated rich text editor with collaborative editing using Slate.js and custom CRDT implementation\nDeveloped offline-first architecture with conflict resolution, ensuring data consistency across clients\nImplemented fine-grained access control and permissions system for enterprise security requirements",
        url: undefined,
        language: "en-US",
      },
      {
        name: "Headless CMS with Multi-Language Support",
        startDate: parseDate("2023-06"),
        endDate: null,
        description: "Built a modern headless CMS using Keystone.js with advanced features including multi-language support, custom field types, and GraphQL API.",
        highlights: "Architected scalable CMS using Keystone.js, Next.js, and PostgreSQL with Prisma ORM\nImplemented comprehensive multi-language support with content translation workflow\nCreated custom field types and UI components for enhanced content management capabilities\nBuilt automated content deployment pipeline with preview environments and rollback capabilities\nIntegrated image optimization and CDN delivery using Cloudflare and AWS CloudFront",
        url: undefined,
        language: "en-US",
      },
      {
        name: "Distributed Task Scheduler & Job Queue System",
        startDate: parseDate("2019-08"),
        endDate: parseDate("2019-12"),
        description: "Designed and implemented a distributed task scheduling system for processing millions of background jobs with reliability and fault tolerance.",
        highlights: "Built distributed job queue using Bull and Redis, processing 10M+ jobs daily with 99.99% reliability\nImplemented priority-based scheduling, retry mechanisms, and dead letter queues for failed jobs\nCreated monitoring dashboard for job queue metrics, latency tracking, and failure analysis\nOptimized worker processes for memory efficiency, reducing infrastructure costs by 40%\nDeveloped job chaining and workflow orchestration for complex multi-step processes",
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
        keywords: "AI/ML advancements, Cloud-native technologies, Web3 and blockchain",
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
        keywords: "Technical books, Science fiction, Philosophy",
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
    // Haupt-Lebenslauf (German Version)
    resume: {
      title: "Rohit Khanduri – Softwarearchitekt Lebenslauf",
      language: "de-DE",
      createdAt: new Date().toISOString(),
    },

    // Basisinformationen
    basicInformation: {
      name: "Rohit Khanduri",
      label: "Softwarearchitekt",
      email: "rohit.khanduri@hotmail.com",
      url: "https://www.rohit.khanduri.de",
      summary: `Softwarearchitekt mit über zehn Jahren Erfahrung in der Konzeption und Umsetzung von Microservice-basierten Systemen in den Bereichen Banking, öffentlicher Sektor und Kundenbindungsprogramme. Ich decke den gesamten Software-Entwicklungszyklus ab und arbeite praxisnah mit Cloud-nativen Architekturen, modernen Frontend-Stacks und event-getriebenen Backends. Mein Hintergrund umfasst die Leitung internationaler Teams in Europa und Asien, das Arbeiten in agilen Umgebungen und die Ausrichtung der Architektur an der Geschäftsstrategie. Mit einem Master-Abschluss in angewandter Mathematik für Netzwerk- und Datenwissenschaft und einem Bachelor in Informationstechnologie kombiniere ich analytisches Denken mit pragmatischer Entwicklung.`,
      language: "de-DE",
    },

    // Standort
    location: {
      address: "Frankfurt, Hessen, Deutschland",
      postalCode: "",
      city: "Frankfurt",
      countryCode: "DE",
      region: "Hessen",
      language: "de-DE",
    },

    // Profile
    profiles: [
      {
        network: "LinkedIn",
        username: "rohit-khanduri-9098b84a",
        url: "https://www.linkedin.com/in/rohit-khanduri-9098b84a/",
        language: "de-DE",
      },
      {
        network: "GitHub",
        username: "rohit1901",
        url: "https://github.com/rohit1901",
        language: "de-DE",
      },
      {
        network: "Other",
        username: "rohitkhanduri",
        url: "https://rohitkhanduri.substack.com/",
        language: "de-DE",
      },
    ],

    // Berufserfahrung
    work: [
      {
        name: "Miles & More GmbH (Lufthansa Group)",
        position: "Manager IT",
        url: "https://www.miles-and-more.com/",
        startDate: parseDate("03-2025"),
        endDate: null,
        summary: `IT-Manager verantwortlich für die Architektur der Miles & More Flutter-Mobile-App und für die Leitung eines ausgelagerten Entwicklungsteams.`,
        highlights: `Verantwortung für die technische Ausrichtung und Architektur der Miles & More Mobile-App
Leitung und Koordination eines ausgelagerten Entwicklungsteams
Abstimmung von Architekturentscheidungen mit Produkt- und Design-Stakeholdern
Überwachung von CI/CD-Pipelines und Produktionsreife
Sicherstellung von DSGVO-Konformität, Sicherheit und Risikomanagement für die App`,
        language: "de-DE",
      },
      {
        name: "adesso SE",
        position: "Softwarearchitekt",
        url: "https://www.adesso.de/",
        startDate: parseDate("08-2020"),
        endDate: parseDate("02-2025"),
        summary: `Softwarearchitekt und Berater für große Banking- und Behördensysteme mit Microservice- und Micro-Frontend-Architekturen.`,
        highlights: `Durchführung von Architektur-Assessments bestehender Produktionssysteme und Vorschläge für Verbesserungen
Definition von Zielarchitekturen und Technologie-Roadmaps für 1–3 Jahre
Hauptansprechpartner für Architektur gegenüber Kunden und internen Teams
Einführung von Coding-Richtlinien, Review-Prozessen und Qualitätsstandards
Leitung von Frontend-Teams bei React-, Angular- und Flutter-Projekten in regulierten Umgebungen`,
        language: "de-DE",
      },
      {
        name: "Finatix GmbH",
        position: "Software Developer (Werkstudent)",
        url: "https://www.finatix.de/",
        startDate: parseDate("09-2019"),
        endDate: parseDate("07-2020"),
        summary: `Werkstudent als Entwickler an einem Kreditkarten-Dashboard und einer Mobile-App mit Zahlungsdiensten und Betrugs-bezogenen Data-Science-Features.`,
        highlights: `Implementierung neuer Frontend-Features für ein Kreditkarten-Dashboard
Beitrag zu End-to-End-Funktionalität von Backend bis Frontend
Arbeit an Betrugserkennungs-Use-Cases mit Data-Science-Tools
Upgrade der Angular-Codebasis und Auffrischung des UI-Designs`,
        language: "de-DE",
      },
      {
        name: "Peak Performance Apps GmbH (Tochtergesellschaft der Appsfactory GmbH)",
        position: "Software Developer (Werkstudent)",
        url: "https://appsfactory.de/",
        startDate: parseDate("05-2019"),
        endDate: parseDate("08-2019"),
        summary: `Frontend-Entwickler für eine Umfrage- und Marktforschungsanwendung, die sowohl als Web- als auch als Mobile-App bereitgestellt wurde.`,
        highlights: `Entwicklung responsiver Web-UIs mit Vue.js und modernen JavaScript-Tools
Beitrag zu einer hybriden Web- und Mobile-Umfrageplattform
Zusammenarbeit mit Designern und Backend-Entwicklern bei der Feature-Auslieferung`,
        language: "de-DE",
      },
      {
        name: "Appsfactory GmbH",
        position: "Software Developer (Werkstudent)",
        url: "https://appsfactory.de/",
        startDate: parseDate("12-2017"),
        endDate: parseDate("04-2019"),
        summary: `Full-Stack-Entwickler für mehrere Kundenprojekte, darunter React-Native-Mobile-Apps und React-basierte Web-Dashboards.`,
        highlights: `Entwicklung von Features für eine deutsche Shopping- und Rewards-App mit React Native
Erstellung webbasierter Dashboards mit React und Redux
Beitrag zu Backend-Services mit Node.js und Express
Teilnahme an agilen Zeremonien und Sprint-Planung`,
        language: "de-DE",
      },
      {
        name: "Iris Software Inc.",
        position: "Software Engineer",
        url: "https://www.irissoftware.com/",
        startDate: parseDate("06-2016"),
        endDate: parseDate("09-2017"),
        summary: `Software-Engineer an Telekommunikations-Provisionierungssystemen und Unternehmens-Webanwendungen.`,
        highlights: `Entwicklung Java-basierter Backend-Systeme für Telekommunikationsdienst-Provisionierung
Aufbau von Spring-Boot-Microservices und RESTful-APIs
Arbeit an Oracle-Datenbank-Design und Query-Optimierung
Zusammenarbeit mit funktionsübergreifenden Teams in einer verteilten Umgebung
Beitrag zu Test-Frameworks mit Selenium und JUnit
Auslieferung von Features in zweiwöchigen Sprints mit automatisierter CI/CD`,
        language: "de-DE",
      },
      {
        name: "Virtusa Corp.",
        position: "Senior Engineer",
        url: "https://www.virtusa.com/",
        startDate: parseDate("08-2014"),
        endDate: parseDate("05-2016"),
        summary: `Senior-Engineer mit Fokus auf Java-EE-Unternehmensanwendungen mit Spring und Hibernate.`,
        highlights: `Design und Implementierung von RESTful-APIs mit Spring MVC
Integration von Hibernate für ORM und Datenbankinteraktionen
Mentoring von Junior-Entwicklern zu Best Practices und Design-Patterns`,
        language: "de-DE",
      },
      {
        name: "Genpact",
        position: "Module Lead",
        url: "https://www.genpact.com/",
        startDate: parseDate("06-2013"),
        endDate: parseDate("07-2014"),
        summary: `Modulleiter verantwortlich für die Führung eines kleinen Teams an webbasierten Unternehmenslösungen.`,
        highlights: `Leitung eines Teams von 3–4 Entwicklern bei Java-basierten Unternehmensmodulen
Koordination von Sprint-Planung und Code-Reviews`,
        language: "de-DE",
      },
      {
        name: "NEC",
        position: "Software Engineer",
        url: "https://www.nec.com/",
        startDate: parseDate("07-2012"),
        endDate: parseDate("05-2013"),
        summary: `Software-Engineer mit Entwicklung Java-basierter Backend-Systeme für Unternehmenskunden.`,
        highlights: `Entwicklung von Unternehmensanwendungen mit Java und J2EE
Arbeit an Datenbankintegration und Backend-Logik`,
        language: "de-DE",
      },
    ],

    // Ehrenamt
    volunteer: [
      {
        organization: "Open-Source-Community",
        position: "Mitwirkender",
        url: "https://github.com/rohit1901",
        startDate: parseDate("01-2018"),
        endDate: null,
        summary: "Aktiver Mitwirkender an verschiedenen Open-Source-Projekten im JavaScript- und TypeScript-Ökosystem.",
        highlights: `Beiträge zu React- und Node.js-Bibliotheken
Pflege persönlicher Open-Source-Projekte`,
        language: "de-DE",
      },
      {
        organization: "Robinhood Army",
        position: "Freiwilliger",
        url: "https://robinhoodarmy.com/",
        startDate: parseDate("01-2015"),
        endDate: parseDate("07-2018"),
        summary: "Freiwillige Tätigkeit bei Robinhood Army.",
        highlights: `Verteilung von Lebensmitteln an bedürftige Menschen
Organisation von Veranstaltungen und Aktivitäten
Unterstützung von Gemeindemitgliedern`,
        language: "de-DE",
      },
    ],

    // Ausbildung
    education: [
      {
        institution: "Hochschule Mittweida - University of Applied Sciences",
        url: "https://www.hs-mittweida.de/",
        area: "Angewandte Mathematik für Netzwerk- und Datenwissenschaft",
        studyType: "Master of Science",
        startDate: parseDate("09-2017"),
        endDate: parseDate("09-2022"),
        language: "de-DE",
      },
      {
        institution: "Uttar Pradesh Technical University",
        url: "https://www.aktu.ac.in/",
        area: "Informationstechnologie",
        studyType: "Bachelor of Technology",
        startDate: parseDate("08-2007"),
        endDate: parseDate("06-2011"),
        language: "de-DE",
      },
    ],

    // Auszeichnungen
    awards: [
      {
        title: "Talent Pool",
        date: parseDate("12-2022"),
        awarder: "Adesso SE",
        summary: "Auszeichnung für außergewöhnliche Leistung und Lieferung kritischer Projektmeilensteine.",
        language: "de-DE",
      },
      {
        title: "Best Performer Award",
        date: parseDate("12-2015"),
        awarder: "Virtusa Corp.",
        summary: "Auszeichnung für außergewöhnliche Leistung und Lieferung kritischer Projektmeilensteine.",
        language: "de-DE",
      },
      {
        title: "Innovationspreis",
        date: parseDate("03-2014"),
        awarder: "Genpact",
        summary: "Ausgezeichnet für innovatives Lösungsdesign, das die Systemeffizienz um 30% verbesserte.",
        language: "de-DE",
      },
      {
        title: "Team Excellence Award",
        date: parseDate("11-2016"),
        awarder: "Iris Software Inc.",
        summary: "Team-Anerkennung für die vorzeitige Auslieferung eines komplexen Telekommunikations-Provisionierungssystems.",
        language: "de-DE",
      },
      {
        title: "Stipendium für akademische Exzellenz",
        date: parseDate("09-2017"),
        awarder: "Université Paris-Saclay",
        summary: "Leistungsbasiertes Stipendium für herausragende akademische Leistungen in Mathematik und Informatik.",
        language: "de-DE",
      },
    ],

    // Veröffentlichungen
    publications: [
      {
        name: "Betrugserkennung mit maschinellem Lernen",
        publisher: "Hochschule Mittweida - University of Applied Sciences",
        releaseDate: parseDate("06-2023"),
        url: "https://monami.hs-mittweida.de/frontdoor/index/index/year/2023/docId/13759",
        summary: "Diese Arbeit präsentiert einen neuartigen Ansatz zur Betrugserkennung unter Verwendung von Techniken des maschinellen Lernens. Wir schlagen ein Hybridmodell vor, das überwachte und unüberwachte Lernalgorithmen kombiniert, um betrügerische Transaktionen mit hoher Genauigkeit zu identifizieren. Unser Ansatz übertrifft bestehende Methoden in Bezug auf Präzision und Recall.",
        language: "de-DE",
      },
    ],

    // Fähigkeiten
    skills: [
      {
        name: "Frontend-Entwicklung",
        level: "Expert",
        keywords: "React, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Styled Components, Material UI, Ant Design, Redux, Redux Toolkit, Zustand, React Query, SWR, Webpack, Vite, Remix, Astro, Web Components, Progressive Web Apps (PWA), Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR)",
        language: "de-DE",
      },
      {
        name: "Backend-Entwicklung",
        level: "Expert",
        keywords: "Node.js, Express.js, NestJS, Fastify, tRPC, GraphQL, Apollo Server, Prisma, TypeORM, Drizzle ORM, REST APIs, gRPC, WebSockets, Socket.io, Message Queues, RabbitMQ, Apache Kafka, Bull Queue, BullMQ, Authentifizierung (JWT, OAuth2, SAML), API-Design, Rate Limiting, Caching-Strategien",
        language: "de-DE",
      },
      {
        name: "Cloud & DevOps",
        level: "Advanced",
        keywords: "AWS (EC2, ECS, EKS, Lambda, S3, CloudFront, RDS, DynamoDB, SQS, SNS, API Gateway, CloudWatch), Azure, Google Cloud Platform, Docker, Kubernetes, Helm, ArgoCD, CI/CD-Pipelines, GitHub Actions, GitLab CI, Jenkins, CircleCI, Terraform, Infrastructure as Code, Ansible, Nginx, Load Balancing, Auto Scaling, Monitoring (Prometheus, Grafana, Datadog, New Relic), Logging (ELK Stack, CloudWatch Logs), CDN-Konfiguration",
        language: "de-DE",
      },
      {
        name: "Datenbank & Datenverwaltung",
        level: "Advanced",
        keywords: "PostgreSQL, MongoDB, MySQL, Redis, DynamoDB, Elasticsearch, TimescaleDB, Datenbankdesign, Query-Optimierung, Indexierungsstrategien, Replikation, Sharding, Datenbankmigration, Datenmodellierung, NoSQL vs SQL, ACID-Transaktionen, CAP-Theorem, Datenbanksicherheit, Backup und Recovery",
        language: "de-DE",
      },
      {
        name: "Architektur & Systemdesign",
        level: "Expert",
        keywords: "Microservices-Architektur, Event-Driven Architecture, Domain-Driven Design (DDD), CQRS, Event Sourcing, API Gateway Pattern, Service Mesh (Istio), Micro-frontends, Clean Architecture, Hexagonal Architecture, SOLID-Prinzipien, Design Patterns (Factory, Strategy, Observer, Singleton), High Availability, Fault Tolerance, Circuit Breaker Pattern, Saga Pattern, Verteilte Systeme, Skalierbarkeit, Performance-Optimierung, Security Best Practices, Load Balancing-Strategien",
        language: "de-DE",
      },
      {
        name: "Testing & Qualitätssicherung",
        level: "Advanced",
        keywords: "Jest, Vitest, Testing Library, Cypress, Playwright, Selenium, Puppeteer, Test-Driven Development (TDD), Behavior-Driven Development (BDD), Unit Testing, Integration Testing, End-to-End Testing, Performance Testing, Load Testing (k6, Artillery), Mutation Testing, Code Coverage, Visual Regression Testing, Contract Testing (Pact), API Testing (Postman, Insomnia)",
        language: "de-DE",
      },
      {
        name: "KI & Machine Learning",
        level: "Intermediate",
        keywords: "OpenAI API, Anthropic Claude API, LangChain, Vector Databases (Pinecone, Weaviate), RAG (Retrieval-Augmented Generation), Prompt Engineering, Natural Language Processing, Chatbot-Entwicklung, KI-Integration, TensorFlow.js, ML Model Deployment, Feature Engineering, Model Evaluation",
        language: "de-DE",
      },
      {
        name: "Mobile Entwicklung",
        level: "Advanced",
        keywords: "React Native, Expo, Flutter, iOS-Entwicklung, Android-Entwicklung, Mobile App-Architektur, Push-Benachrichtigungen, Deep Linking, App Store Deployment, Mobile Performance-Optimierung, Offline-First Architecture, Mobile Analytics, In-App-Käufe",
        language: "de-DE",
      },
      {
        name: "Entwicklertools & Praktiken",
        level: "Expert",
        keywords: "Git, GitHub, GitLab, Bitbucket, VS Code, Git Flow, Trunk-Based Development, Code Review, Pull Requests, Pair Programming, ESLint, Prettier, Husky, Lint-Staged, Semantic Versioning, Changesets, Monorepo (Turborepo, Nx, Lerna), Paketverwaltung (npm, yarn, pnpm), Dokumentation (Storybook, JSDoc, OpenAPI/Swagger)",
        language: "de-DE",
      },
      {
        name: "Web3 & Blockchain",
        level: "Beginner",
        keywords: "Ethereum, Solidity, Web3.js, Ethers.js, Smart Contracts, DApps, MetaMask Integration, IPFS, Blockchain-Grundlagen",
        language: "de-DE",
      },
      {
        name: "Agile & Projektmanagement",
        level: "Expert",
        keywords: "Agile Methoden, Scrum, Kanban, Sprint Planning, Story Estimation, Retrospektiven, Daily Standups, Backlog Grooming, Jira, Linear, Confluence, Notion, Asana, Monday.com, Technische Führung, Mentoring, Cross-funktionale Teamzusammenarbeit, Stakeholder Management",
        language: "de-DE",
      },
      {
        name: "Sicherheit & Compliance",
        level: "Advanced",
        keywords: "OWASP Top 10, Authentifizierung & Autorisierung, OAuth2.0, OpenID Connect, JWT, Security Headers, XSS-Prävention, CSRF-Schutz, SQL Injection-Prävention, Datenverschlüsselung, HTTPS/SSL/TLS, Secrets Management, Vulnerability Scanning, Penetration Testing, DSGVO-Konformität, SOC 2, Sicherheitsaudits",
        language: "de-DE",
      },
    ],
    projects: [
      {
        name: "Enterprise KI-gestützte Kundensupport-Plattform",
        startDate: parseDate("2023-01"),
        endDate: null,
        description: "Leitete die Entwicklung einer skalierbaren KI-gestützten Kundensupport-Plattform für Millionen von Nutzern mit Integration mehrerer KI-Modelle und Echtzeit-Kommunikationsfähigkeiten.",
        highlights: "Architektur und Implementierung eines Microservices-basierten Backends mit Node.js, NestJS und GraphQL, das täglich 50M+ API-Anfragen verarbeitet\nIntegration von OpenAI GPT-4 und benutzerdefinierten NLP-Modellen für intelligentes Query-Routing und automatisierte Antwortgenerierung, Verbesserung der Lösungszeit um 65%\nAufbau eines Echtzeit-Chat-Systems mit WebSockets und Redis Pub/Sub, das 100K+ gleichzeitige Verbindungen unterstützt\nImplementierung umfassender Überwachung und Observability mit Prometheus, Grafana und benutzerdefinierten Dashboards, Erreichung von 99,9% Uptime\nDesign einer Event-Driven Architecture mit Apache Kafka für asynchrone Verarbeitung von Kundeninteraktionen",
        url: undefined,
        language: "de-DE",
      },
      {
        name: "Retail Analytics & Bestandsverwaltungssystem",
        startDate: parseDate("2022-03"),
        endDate: parseDate("2023-12"),
        description: "Entwicklung einer umfassenden Analytics- und Bestandsverwaltungsplattform für großflächige Einzelhandelsoperationen mit Echtzeit-Einblicken und automatisierter Bestandsoptimierung.",
        highlights: "Aufbau eines responsiven React-basierten Dashboards mit Echtzeit-Datenvisualisierung unter Verwendung von D3.js und Recharts, das 5000+ täglich aktive Benutzer bedient\nImplementierung einer prädiktiven Analytics-Engine mit Python und TensorFlow für Bestandsprognosen, Reduzierung von Überbeständen um 30%\nArchitektur einer Hochleistungs-Datenpipeline, die täglich 500GB+ Transaktionsdaten mit AWS Glue und Athena verarbeitet\nEntwicklung von REST- und GraphQL-APIs mit Node.js und Express, integriert mit 20+ Drittanbieter-Logistiksystemen\nOptimierung von PostgreSQL-Datenbankabfragen und Implementierung von Caching mit Redis, Reduzierung der Antwortzeiten von 3s auf 200ms",
        url: undefined,
        language: "de-DE",
      },
      {
        name: "Multi-Tenant SaaS-Plattform für Gesundheitswesen",
        startDate: parseDate("2021-06"),
        endDate: parseDate("2022-02"),
        description: "Architektur und Aufbau einer HIPAA-konformen Multi-Tenant SaaS-Plattform für Gesundheitsdienstleister mit sicherer Patientendatenverwaltung und Telegesundheitsfunktionen.",
        highlights: "Design einer Multi-Tenant-Architektur mit Row-Level Security in PostgreSQL, die 200+ Gesundheitsorganisationen unterstützt\nImplementierung von End-to-End-Verschlüsselung für Patientendaten mit AWS KMS und Erlangung der HIPAA-Compliance-Zertifizierung\nAufbau einer Videokonferenzfunktion mit WebRTC und Twilio, Durchführung von 10K+ Telegesundheitssitzungen monatlich\nErstellung einer CI/CD-Pipeline mit GitHub Actions und AWS ECS, die 20+ Deployments pro Woche mit null Ausfallzeit ermöglicht\nEntwicklung eines umfassenden Audit-Logging-Systems für Compliance-Tracking und Sicherheitsüberwachung",
        url: undefined,
        language: "de-DE",
      },
      {
        name: "Mobile-First E-Commerce-Plattform",
        startDate: parseDate("2020-09"),
        endDate: parseDate("2021-05"),
        description: "Leitete die Entwicklung einer Mobile-First E-Commerce-Plattform mit erweiterten Funktionen wie AR-Produktvorschau, personalisierten Empfehlungen und nahtlosem Checkout-Erlebnis.",
        highlights: "Aufbau einer plattformübergreifenden mobilen App mit React Native und Expo, Erzielung einer 4,8★-Bewertung mit 500K+ Downloads\nImplementierung von AR-Produktvisualisierung mit ARKit und ARCore, Steigerung der Conversion-Raten um 45%\nIntegration von Stripe, PayPal und Apple Pay für nahtlose Zahlungsabwicklung mit PCI DSS-Konformität\nEntwicklung einer personalisierten Empfehlungsmaschine mit kollaborativem Filtern, Verbesserung des durchschnittlichen Bestellwerts um 35%\nOptimierung der App-Performance mit <2s initialer Ladezeit und 60fps-Animationen auf Budget-Geräten",
        url: undefined,
        language: "de-DE",
      },
      {
        name: "Echtzeit-Kollaborationstool",
        startDate: parseDate("2020-01"),
        endDate: parseDate("2020-08"),
        description: "Entwicklung einer Echtzeit-Kollaborations-Workspace-Anwendung, die Teams ermöglicht, gemeinsam an Dokumenten, Whiteboards und Projekten mit Live-Updates zu arbeiten.",
        highlights: "Implementierung des Operational Transformation (OT)-Algorithmus für konfliktfreie Echtzeit-Kollaboration an gemeinsamen Dokumenten\nAufbau einer WebSocket-Infrastruktur mit Socket.io und Redis, die 50K+ gleichzeitige Kollaborationssitzungen unterstützt\nErstellung eines Rich-Text-Editors mit kollaborativer Bearbeitung unter Verwendung von Slate.js und benutzerdefinierter CRDT-Implementierung\nEntwicklung einer Offline-First-Architektur mit Konfliktlösung, die Datenkonsistenz über Clients hinweg gewährleistet\nImplementierung eines fein abgestuften Zugriffskontroll- und Berechtigungssystems für Enterprise-Sicherheitsanforderungen",
        url: undefined,
        language: "de-DE",
      },
      {
        name: "Headless CMS mit Multi-Sprach-Unterstützung",
        startDate: parseDate("2023-06"),
        endDate: null,
        description: "Aufbau eines modernen Headless CMS mit Keystone.js mit erweiterten Funktionen wie Multi-Sprach-Unterstützung, benutzerdefinierten Feldtypen und GraphQL-API.",
        highlights: "Architektur eines skalierbaren CMS mit Keystone.js, Next.js und PostgreSQL mit Prisma ORM\nImplementierung umfassender Multi-Sprach-Unterstützung mit Content-Übersetzungs-Workflow\nErstellung benutzerdefinierter Feldtypen und UI-Komponenten für erweiterte Content-Management-Fähigkeiten\nAufbau einer automatisierten Content-Deployment-Pipeline mit Preview-Umgebungen und Rollback-Funktionen\nIntegration von Bildoptimierung und CDN-Auslieferung mit Cloudflare und AWS CloudFront",
        url: undefined,
        language: "de-DE",
      },
      {
        name: "Verteiltes Task-Scheduler & Job-Queue-System",
        startDate: parseDate("2019-08"),
        endDate: parseDate("2019-12"),
        description: "Design und Implementierung eines verteilten Task-Scheduling-Systems für die Verarbeitung von Millionen von Hintergrund-Jobs mit Zuverlässigkeit und Fehlertoleranz.",
        highlights: "Aufbau einer verteilten Job-Queue mit Bull und Redis, die täglich 10M+ Jobs mit 99,99% Zuverlässigkeit verarbeitet\nImplementierung von prioritätsbasiertem Scheduling, Wiederholungsmechanismen und Dead Letter Queues für fehlgeschlagene Jobs\nErstellung eines Monitoring-Dashboards für Job-Queue-Metriken, Latenz-Tracking und Fehleranalyse\nOptimierung von Worker-Prozessen für Speichereffizienz, Reduzierung der Infrastrukturkosten um 40%\nEntwicklung von Job-Chaining und Workflow-Orchestrierung für komplexe mehrstufige Prozesse",
        url: undefined,
        language: "de-DE",
      },
    ],

    // Interessen
    interests: [
      {
        name: "Open Source",
        keywords: "Beiträge zu Open-Source-Projekten, Entwicklung von Entwickler-Tools, Community-Engagement",
        language: "de-DE",
      },
      {
        name: "Technologie-Trends",
        keywords: "KI/ML-Entwicklungen, Cloud-native Technologien, Web3 und Blockchain",
        language: "de-DE",
      },
      {
        name: "Mathematik",
        keywords: "Data Science, Statistische Modellierung, Algorithmus-Optimierung",
        language: "de-DE",
      },
      {
        name: "Fitness & Wellness",
        keywords: "Laufen, Yoga, Meditation, Gesunder Lebensstil",
        language: "de-DE",
      },
      {
        name: "Lesen",
        keywords: "Fachbücher, Science-Fiction, Philosophie",
        language: "de-DE",
      },
    ],

    // Sprachen
    languages: [
      {
        language: "Englisch",
        fluency: "Native",
        uiLanguage: "en-US",
      },
      {
        language: "Deutsch",
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
        // Main Resume
        resume: {
            title: "Florian Zeidler - Cloud Architect and Engineer Resume",
            language: "en-US", // Reference to Language.value
            createdAt: new Date().toISOString(),
        },

        // Basic Information
        basicInformation: {
            name: "Florian Zeidler",
            label: "Cloud Architect",
            email: "f.zeidler@nimbus-tech.de",
            url: "https://www.linkedin.com/in/florian-zeidler-945b3a242/",
            summary: "",
            language: "en-US",
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
                highlights: `Worked on projects with a focus on backend and cloud development
Tech lead for AWS cloud architecture
Implemented standardized processes for the development team and supported their deployment workflows`,
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
                startDate: parseDate("2021-10"),
                endDate: undefined,
                description: "Architecture and Development of a multi-account scalable cloud data platform for financial data.",
                highlights: "Built, deployed, and operated a multi-microservice application on Kubernetes and AWS ECS on Fargate\n" +
                    "Configured and integrated the Datadog observability SaaS platform and implemented comprehensive logging, alerting, and incident management processes for the application layer\n" +
                    "Architected high-performance processing of millions of financial transaction records with a sub-second response time requirement\n" +
                    "Led development of proof of concepts for new components\n",
                url: undefined,
                language: "en-US",
            },
            {
                name: "Platform for credit cards and payment processing",
                startDate: parseDate("2019-07"),
                endDate: parseDate("2020-09"),
                description: "Architected and developed a multi-tenant platform for prepaid credit cards.",
                highlights: "Designed multi-tenant architecture with migration from a legacy monolithic application, with a focus on supporting hundreds of credit card tenants and millions of users\nDesigned and implemented a cloud environment for dedicated load tests and simulation of user behavior\nIntegration of a compliance and fraud detection service in accordance with legal requirements\n",
                url: undefined,
                language: "en-US",
            },
            {
                name: "Development of support tools for the analysis of financial data",
                startDate: parseDate("2015-03"),
                endDate: parseDate("2017-08"),
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
        // Main Resume
        resume: {
            title: "Florian Zeidler - Lebenslauf Cloud-Architekt und Engineer",
            language: "de-DE", // Reference to Language.value
            createdAt: new Date().toISOString(),
        },

        // Basic Information
        basicInformation: {
            name: "Florian Zeidler",
            label: "Cloud-Architekt",
            email: "f.zeidler@nimbus-tech.de",
            url: "https://www.linkedin.com/in/florian-zeidler-945b3a242/",
            summary: "",
            language: "de-DE",
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
                url: "",
                startDate: parseDate("07-2019"),
                endDate: null,
                summary: `Cloud Engineer und Solutions Architect für Cloud-Umgebungen.`,
                highlights: `Arbeit an Projekten mit Fokus auf Backend- und Cloud-Entwicklung
Tech Lead für AWS Cloud-Architektur
Implementierung standardisierter Prozesse für das Entwicklungsteam und Unterstützung deren Deployment-Workflows`,
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
                level: "Expert",
                keywords: "Node.js, GraphQL, REST APIs, gRPC, WebSockets, Message Queues, RabbitMQ, Apache Kafka, Authentication (JWT, OAuth2, SAML), API Design, Rate Limiting, Caching Strategies, open-api",
                language: "de-DE",
            },
            {
                name: "Cloud & DevOps",
                level: "Advanced",
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
                name: "Entwicklung einer skalierbaren Cloud-Datenplattform für Finanzdaten",
                startDate: parseDate("2021-10"),
                endDate: undefined,
                description: "Architektur und Entwicklung einer skalierbaren Multi-Account Cloud-Datenplattform für Finanzdaten.",
                highlights: "Aufbau, Bereitstellung und Betrieb einer Multi-Microservice-Anwendung in Kubernetes (AWS EKS) und später in AWS ECS auf Fargate\n" +
                    "Konfiguration und Integration der Datadog Observability SaaS-Plattform sowie Implementierung umfassender Logging-, Alerting- und Incident-Management-Prozesse für die Anwendungsebene\n" +
                    "Architektur für die Hochleistungsverarbeitung von Millionen von Finanztransaktionsdatensätzen mit der Anforderung im Sekundenbereich zu verarbeiten\n" +
                    "Leitung der Entwicklung von Proof of Concepts für neue Komponenten\n",
                url: undefined,
                language: "de-DE",
            },
            {
                name: "Plattform für Kreditkarten und Zahlungsabwicklung",
                startDate: parseDate("2019-07"),
                endDate: parseDate("2020-09"),
                description: "Architektur und Entwicklung einer mandantenfähigen Plattform für Prepaid-Kreditkarten.",
                highlights: "Entwurf einer mandantenfähigen Architektur mit Migration von einer bestehenden monolithischen Anwendung, mit Fokus auf die Unterstützung von hunderten Kreditkarten-Mandanten und potenziell Millionen von Nutzern\nKonzeption und Implementierung einer Cloud-Umgebung für dedizierte Lasttests und Simulation von Nutzerverhalten\nIntegration eines Services zur Compliance- und Betrugserkennung gemäß den gesetzlichen Vorgaben\n",
                url: undefined,
                language: "de-DE",
            },
            {
                name: "Entwicklung von Support-Tools für die Analyse von Finanzdaten",
                startDate: parseDate("2015-03"),
                endDate: parseDate("2017-08"),
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
                keywords: "Weiterentwicklung von Geschäftsmodellen, new work, agile Frameworks in at scale, Entwicklung von HR und KI",
                language: "de-DE",
            },
            {
                name: "Technologietrends",
                keywords: "Entwicklung in KI/ML, Cloud-native Technologien, Web3 und Blockchain, Serverless",
                language: "de-DE",
            },
            {
                name: "Fitness & Wellness",
                keywords: "Laufen, Yoga, gesunde Ernährung",
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

// Helper function to seed resume languages for a specific resume dataset
const seedResumeLanguages = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[]
) => {
  // Check for existing languages
  const existingLanguages = await prisma.resumeLanguage.findMany({
    where: {
      language: { in: resumeData.languages.map((l) => l.language) },
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
      })),
    });
    console.log(`✓ Created ${newLanguages.length} new resume languages`);
  } else {
    console.log(`✓ All resume languages already exist, skipping creation`);
  }

  // Return all languages (existing + newly created)
  const languages = await prisma.resumeLanguage.findMany({
    where: {
      language: { in: resumeData.languages.map((l) => l.language) },
    },
  });

  console.log(`✓ Total resume languages: ${languages.length}`);
  return languages;
};

// Helper function to seed publications for a specific resume dataset
const seedResumePublications = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[]
) => {
  console.log("Seeding resume publications...");

  // Check for existing publications
  const existingPublications = await prisma.resumePublication.findMany({
    where: {
      name: { in: resumeData.publications.map((p) => p.name) },
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
      })),
    });
    console.log(`✓ Created ${newPublications.length} new resume publications`);
  } else {
    console.log(`✓ All resume publications already exist, skipping creation`);
  }

  // Return all publications (existing + newly created)
  const allPublications = await prisma.resumePublication.findMany({
    where: {
      name: { in: resumeData.publications.map((p) => p.name) },
    },
  });

  console.log(`✓ Total resume publications: ${allPublications.length}`);
  return allPublications;
};

// Helper function to seed awards for a specific resume dataset
const seedAwards = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[]
) => {
  console.log("Seeding resume awards...");

  // Check for existing awards
  const existingAwards = await prisma.resumeAward.findMany({
    where: {
      title: { in: resumeData.awards.map((a) => a.title) },
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
      })),
    });
    console.log(`✓ Created ${newAwards.length} new resume awards`);
  } else {
    console.log(`✓ All resume awards already exist, skipping creation`);
  }

  // Return all awards (existing + newly created)
  const allAwards = await prisma.resumeAward.findMany({
    where: {
      title: { in: resumeData.awards.map((a) => a.title) },
    },
  });

  console.log(`✓ Total resume awards: ${allAwards.length}`);
  return allAwards;
};

// Helper function to seed education for a specific resume dataset
const seedResumeEducation = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[]
) => {
  console.log("Seeding resume education...");

  // Check for existing education
  const existingEducation = await prisma.resumeEducation.findMany({
    where: {
      institution: { in: resumeData.education.map((e) => e.institution) },
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
      })),
    });
    console.log(`✓ Created ${newEducation.length} new resume education records`);
  } else {
    console.log(`✓ All resume education records already exist, skipping creation`);
  }

  // Return all education (existing + newly created)
  const allEducation = await prisma.resumeEducation.findMany({
    where: {
      institution: { in: resumeData.education.map((e) => e.institution) },
    },
  });

  console.log(`✓ Total resume education records: ${allEducation.length}`);
  return allEducation;
};

// Helper function to seed volunteer for a specific resume dataset
const seedVolunteer = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[]
) => {
  console.log("Seeding resume volunteer...");

  // Check for existing volunteer
  const existingVolunteer = await prisma.resumeVolunteer.findMany({
    where: {
      organization: { in: resumeData.volunteer.map((v) => v.organization) },
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
      })),
    });
    console.log(`✓ Created ${newVolunteer.length} new resume volunteer records`);
  } else {
    console.log(`✓ All resume volunteer records already exist, skipping creation`);
  }

  // Return all volunteer (existing + newly created)
  const allVolunteer = await prisma.resumeVolunteer.findMany({
    where: {
      organization: { in: resumeData.volunteer.map((v) => v.organization) },
    },
  });

  console.log(`✓ Total resume volunteer records: ${allVolunteer.length}`);
  return allVolunteer;
};

// Helper function to seed work experience for a specific resume dataset
const seedResumeExperience = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[]
) => {
  console.log("Seeding resume work experience...");

  // Check for existing work experience
  const existingWork = await prisma.resumeWork.findMany({
    where: {
      name: { in: resumeData.work.map((w) => w.name) },
    },
  });

  const existingWorkKeys = new Set(existingWork.map((w) => `${w.name}-${w.position}`));

  const allExperience: { id: number }[] = [];

  for (const exp of resumeData.work) {
    const key = `${exp.name}-${exp.position}`;

    // Check if this work experience already exists
    const existing = existingWork.find(
      (w) => w.name === exp.name && w.position === exp.position
    );

    if (existing) {
      console.log(
        `✓ Work experience at ${exp.name} already exists (id: ${existing.id}), skipping`
      );
      allExperience.push(existing);
      continue;
    }

    const languageId = allLanguages.find((l) => l.value === exp.language)?.id;
    const highlightValues = (exp.highlights || "")
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean);

    const created = await prisma.resumeWork.create({
      data: {
        name: exp.name,
        position: exp.position,
        url: exp.url,
        startDate: exp.startDate,
        endDate: exp.endDate,
        summary: exp.summary,
        languageId,
        highlights: {
          create: highlightValues.map((value) => ({ value })),
        },
      },
    });

    console.log(`✓ Created work experience at ${exp.name} (id: ${created.id})`);
    allExperience.push(created);
  }

  console.log(`✓ Total resume work experience records: ${allExperience.length}`);
  return allExperience;
};

// Helper function to seed profiles for a specific resume dataset
const seedResumeProfiles = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[]
) => {
  console.log("Seeding resume profiles...");

  // Check for existing profiles
  const existingProfiles = await prisma.resumeProfile.findMany({
    where: {
      network: { in: resumeData.profiles.map((p) => p.network) },
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
        ...profile,
        languageId: allLanguages.find((l) => l.value === profile.language)?.id,
        language: undefined,
      })),
    });
    console.log(`✓ Created ${newProfiles.length} new resume profiles`);
  } else {
    console.log(`✓ All resume profiles already exist, skipping creation`);
  }

  // Return all profiles (existing + newly created)
  const allProfiles = await prisma.resumeProfile.findMany({
    where: {
      network: { in: resumeData.profiles.map((p) => p.network) },
    },
  });

  console.log(`✓ Total resume profiles: ${allProfiles.length}`);
  return allProfiles;
};

// Helper function to seed skills for a specific resume dataset
const seedResumeSkills = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[]
) => {
  console.log("Seeding resume skills...");

  // Check for existing skills
  const existingSkills = await prisma.resumeSkill.findMany({
    where: {
      name: { in: resumeData.skills.map((s) => s.name) },
    },
  });

  const existingSkillKeys = new Set(existingSkills.map((s) => `${s.name}-${s.languageId}`));

  const skillsToCreate = resumeData.skills.filter(
    (skill) => {
      const languageId = allLanguages.find((l) => l.value === skill.language)?.id;
      return !existingSkillKeys.has(`${skill.name}-${languageId}`);
    }
  );

  let newSkills = [];
  if (skillsToCreate.length > 0) {
    newSkills = await prisma.resumeSkill.createManyAndReturn({
      data: skillsToCreate.map((skill) => ({
        ...skill,
        languageId: allLanguages.find((l) => l.value === skill.language)?.id,
        language: undefined,
      })),
    });
    console.log(`✓ Created ${newSkills.length} new resume skills`);
  } else {
    console.log(`✓ All resume skills already exist, skipping creation`);
  }

  // Return all skills (existing + newly created)
  const allSkills = await prisma.resumeSkill.findMany({
    where: {
      name: { in: resumeData.skills.map((s) => s.name) },
    },
  });

  console.log(`✓ Total resume skills: ${allSkills.length}`);
  return allSkills;
};

// Helper function to seed interests for a specific resume dataset
const seedResumeInterests = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[]
) => {
  console.log("Seeding resume interests...");

  // Check for existing interests
  const existingInterests = await prisma.resumeInterest.findMany({
    where: {
      name: { in: resumeData.interests.map((i) => i.name) },
    },
  });

  const existingInterestKeys = new Set(existingInterests.map((i) => `${i.name}-${i.languageId}`));

  const interestsToCreate = resumeData.interests.filter(
    (interest) => {
      const languageId = allLanguages.find((l) => l.value === interest.language)?.id;
      return !existingInterestKeys.has(`${interest.name}-${languageId}`);
    }
  );

  let newInterests = [];
  if (interestsToCreate.length > 0) {
    newInterests = await prisma.resumeInterest.createManyAndReturn({
      data: interestsToCreate.map((interest) => ({
        ...interest,
        languageId: allLanguages.find((l) => l.value === interest.language)?.id,
        language: undefined,
      })),
    });
    console.log(`✓ Created ${newInterests.length} new resume interests`);
  } else {
    console.log(`✓ All resume interests already exist, skipping creation`);
  }

  // Return all interests (existing + newly created)
  const allInterests = await prisma.resumeInterest.findMany({
    where: {
      name: { in: resumeData.interests.map((i) => i.name) },
    },
  });

  console.log(`✓ Total resume interests: ${allInterests.length}`);
  return allInterests;
};

// Helper function to seed locations for a specific resume dataset
const seedResumeLocations = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[]
) => {
  console.log("Seeding resume location...");

  const location = resumeData.location;
  const languageId = allLanguages.find((l) => l.value === location.language)?.id;

  // Check for existing location
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

  const allLocations = await prisma.resumeLocation.create({
    data: {
      ...location,
      languageId: languageId,
      language: undefined,
    },
  });

  console.log(`✓ Created resume location (id: ${allLocations.id})`);
  return allLocations;
};

// Helper function to seed basic information for a specific resume dataset
const seedResumeBasicInfo = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[]
) => {
  console.log("Seeding resume basic information...");

  const basicInfo = resumeData.basicInformation;
  const languageId = allLanguages.find((l) => l.value === basicInfo.language)?.id;

  // Check for existing basic info
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

  // Get related data
  const allLocations = await seedResumeLocations(prisma, resumeData, allLanguages);
  const resumeProfiles = await seedResumeProfiles(prisma, resumeData, allLanguages);

  // Get the resume photo image using ResumeImageKey
  const resumePhotoKey: ResumeImageKey = "resumePhoto";
  const resumePhotoConfig = Images.data[resumePhotoKey];
  const resumeImage = await prisma.image.findFirst({
    where: {
      src: resumePhotoConfig.src
    },
  });

  const allBasicInfo = await prisma.resumeBasicInformation.create({
    data: {
      name: basicInfo.name,
      label: basicInfo.label,
      email: basicInfo.email,
      url: basicInfo.url,
      summary: basicInfo.summary,
      languageId,
      locationId: allLocations.id,
      profiles: {
        connect: resumeProfiles.map((p) => ({ id: p.id })),
      },
      imageId: resumeImage?.id || null,
    },
  });

  console.log(`✓ Created resume basic information (id: ${allBasicInfo.id})`);
  return allBasicInfo;
};

// Helper function to seed projects for a specific resume dataset
const seedResumeProjects = async (
  prisma: PrismaClient,
  resumeData: typeof RESUME_DATA[0],
  allLanguages: { id: number; label: string; value: string }[]
) => {
  console.log("Seeding resume projects...");

  if (!resumeData.projects || resumeData.projects.length === 0) {
    console.log("✓ No projects to seed, skipping");
    return [];
  }

  // Check for existing projects
  const existingProjects = await prisma.resumeProject.findMany({
    where: {
      name: { in: resumeData.projects.map((p) => p.name) },
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
      })),
    });
    console.log(`✓ Created ${newProjects.length} new resume projects`);
  } else {
    console.log(`✓ All resume projects already exist, skipping creation`);
  }

  // Return all projects (existing + newly created)
  const allProjects = await prisma.resumeProject.findMany({
    where: {
      name: { in: resumeData.projects.map((p) => p.name) },
    },
  });

  console.log(`✓ Total resume projects: ${allProjects.length}`);
  return allProjects;
};

// Main seed function for resumes
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

    // Check if resume already exists
    const existingResume = await prisma.resume.findFirst({
      where: {
        title: resumeData.resume.title,
        languageId: resumeLanguageId,
      },
    });

    if (existingResume) {
      console.log(`✓ Resume already exists (id: ${existingResume.id}), skipping`);
      createdResumes.push(existingResume);
      continue;
    }

    // Seed all related data for this resume
    const resumeLanguages = await seedResumeLanguages(prisma, resumeData, allLanguages);
    const allPublications = await seedResumePublications(
      prisma,
      resumeData,
      allLanguages
    );
    const allAwards = await seedAwards(prisma, resumeData, allLanguages);
    const allEducation = await seedResumeEducation(prisma, resumeData, allLanguages);
    const allVolunteer = await seedVolunteer(prisma, resumeData, allLanguages);
    const allExperience = await seedResumeExperience(prisma, resumeData, allLanguages);
    const allSkills = await seedResumeSkills(prisma, resumeData, allLanguages);
    const allInterests = await seedResumeInterests(prisma, resumeData, allLanguages);
    const allProjects = await seedResumeProjects(prisma, resumeData, allLanguages);
    const allBasicInfo = await seedResumeBasicInfo(prisma, resumeData, allLanguages);

    // Get certifications for this language
    const allCertifications = await prisma.certification.findMany({
      where: { languageId: resumeLanguageId },
    });

    // Create the resume
    const newResume = await prisma.resume.create({
      data: {
        title: resumeData.resume.title,
        languageId: resumeLanguageId,
        resumeLanguages: {
          connect: resumeLanguages.map((language) => ({ id: language.id })),
        },
        work: {
          connect: allExperience.map((work) => ({ id: work.id })),
        },
        volunteer: {
          connect: allVolunteer.map((volunteer) => ({ id: volunteer.id })),
        },
        education: {
          connect: allEducation.map((education) => ({ id: education.id })),
        },
        publications: {
          connect: allPublications.map((publication) => ({ id: publication.id })),
        },
        awards: {
          connect: allAwards.map((award) => ({ id: award.id })),
        },
        certificates: {
          connect: allCertifications.map((certification) => ({ id: certification.id })),
        },
        skills: {
          connect: allSkills.map((skill) => ({ id: skill.id })),
        },
        interests: {
          connect: allInterests.map((interest) => ({ id: interest.id })),
        },
        projects: {
          connect: allProjects.map((project) => ({ id: project.id })),
        },
        basicInformationId: allBasicInfo.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    console.log(`✓ Created resume: ${newResume.title} (id: ${newResume.id})`);
    createdResumes.push(newResume);
  }

  console.log(`✓ Seeding complete. Total resumes: ${createdResumes.length}`);
  return createdResumes;
};

// Clear function
const clearResumeData = async (prisma: PrismaClient) => {
  console.log("Clearing all resume data...");

  // Delete all resume-related records in correct order (respecting foreign keys)
  const resumeResult = await prisma.resume.deleteMany({});
  console.log(`Deleted ${resumeResult.count} resume(s).`);

  const basicInfoResult = await prisma.resumeBasicInformation.deleteMany({});
  console.log(
    `Deleted ${basicInfoResult.count} resume basic information record(s).`
  );

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
