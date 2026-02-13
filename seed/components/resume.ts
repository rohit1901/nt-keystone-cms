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
      url: "https://www.rohit.khanduri.de",
      summary: `Software architect with more than a decade of experience designing and delivering microservice-based systems across banking, public sector, and loyalty programs. I cover the full software development lifecycle and work hands-on with cloud-native architectures, modern frontend stacks, and event-driven backends. My background includes leading international teams in Europe and Asia, operating in agile environments, and aligning architecture with business strategy. With a Master's degree in Applied Mathematics for Network and Data Science and a Bachelor's in Information Technology, I combine analytical thinking with pragmatic engineering.`,
      language: "en-US",
    },

    // Location
    location: {
      address: "Friedrichsdorf, Germany",
      postalCode: "",
      city: "Friedrichsdorf",
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
        endDate: parseDate("09-2019"),
        language: "en-US",
      },
      {
        institution: "Uttar Pradesh Technical University",
        url: "https://www.aktu.ac.in/",
        area: "Information Technology",
        studyType: "Bachelor of Technology",
        startDate: parseDate("08-2008"),
        endDate: parseDate("06-2012"),
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
        keywords: "React, Angular, Vue.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Material UI, Flutter",
        language: "en-US",
      },
      {
        name: "Backend Development",
        level: "Expert",
        keywords: "Node.js, Express, NestJS, Java, Spring Boot, Python, Django, FastAPI, REST APIs",
        language: "en-US",
      },
      {
        name: "Mobile Development",
        level: "Advanced",
        keywords: "Flutter, React Native, iOS, Android",
        language: "en-US",
      },
      {
        name: "Cloud & DevOps",
        level: "Advanced",
        keywords: "AWS, Azure, Google Cloud, Docker, Kubernetes, CI/CD, Jenkins, GitLab CI, GitHub Actions, Terraform, Ansible, Prometheus, Grafana, ELK Stack, ArgoCD, Helm",
        language: "en-US",
      },
      {
        name: "Architecture & Design",
        level: "Expert",
        keywords: "Microservices, Event-Driven Architecture, Domain-Driven Design, CQRS, API Gateway, Service Mesh, Micro-frontends, Design Patterns, Clean Architecture, Hexagonal Architecture, SOLID Principles, System Design, Scalability, Performance Optimization, Security Best Practices, Load Balancing, Caching Strategies",
        language: "en-US",
      },
      {
        name: "Databases",
        level: "Advanced",
        keywords: "PostgreSQL, MongoDB, MySQL, Redis, Elasticsearch",
        language: "en-US",
      },
      {
        name: "Testing",
        level: "Advanced",
        keywords: "Jest, Mocha, Chai, Cypress, Selenium, JUnit, Mockito, Test-Driven Development, Integration Testing",
        language: "en-US",
      },
      {
        name: "Methodologies",
        level: "Expert",
        keywords: "Agile, Scrum, Kanban, SAFe, Lean, DevOps, GitFlow, Trunk-Based Development, Code Review, Pair Programming, Continuous Integration, Continuous Deployment, Infrastructure as Code",
        language: "en-US",
      },
      {
        name: "Data Science & Analytics",
        level: "Intermediate",
        keywords: "Python, NumPy, Pandas, Scikit-learn, TensorFlow, Data Analysis, Machine Learning, Statistical Modeling, Data Visualization, Matplotlib",
        language: "en-US",
      },
      {
        name: "Project Management",
        level: "Advanced",
        keywords: "Jira, Confluence, Trello, Asana",
        language: "en-US",
      },
      {
        name: "Version Control",
        level: "Expert",
        keywords: "Git, GitHub, GitLab, Bitbucket, Branching Strategies, Code Review, Pull Requests, Merge Strategies, Git Hooks",
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
      address: "Friedrichsdorf, Deutschland",
      postalCode: "",
      city: "Friedrichsdorf",
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
        endDate: parseDate("09-2019"),
        language: "de-DE",
      },
      {
        institution: "Uttar Pradesh Technical University",
        url: "https://www.aktu.ac.in/",
        area: "Informationstechnologie",
        studyType: "Bachelor of Technology",
        startDate: parseDate("08-2008"),
        endDate: parseDate("06-2012"),
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
        keywords: "React, Angular, Vue.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Material UI, Flutter",
        language: "de-DE",
      },
      {
        name: "Backend-Entwicklung",
        level: "Expert",
        keywords: "Node.js, Express, NestJS, Java, Spring Boot, Python, Django, FastAPI, REST-APIs",
        language: "de-DE",
      },
      {
        name: "Mobile-Entwicklung",
        level: "Advanced",
        keywords: "Flutter, React Native, iOS, Android",
        language: "de-DE",
      },
      {
        name: "Cloud & DevOps",
        level: "Advanced",
        keywords: "AWS, Azure, Google Cloud, Docker, Kubernetes, CI/CD, Jenkins, GitLab CI, GitHub Actions, Terraform, Ansible, Prometheus, Grafana, ELK Stack, ArgoCD, Helm",
        language: "de-DE",
      },
      {
        name: "Architektur & Design",
        level: "Expert",
        keywords: "Microservices, Event-Driven Architecture, Domain-Driven Design, CQRS, API Gateway, Service Mesh, Micro-Frontends, Design-Patterns, Clean Architecture, Hexagonal Architecture, SOLID-Prinzipien, Systemdesign, Skalierbarkeit, Performance-Optimierung, Sicherheits-Best-Practices, Load Balancing, Caching-Strategien",
        language: "de-DE",
      },
      {
        name: "Datenbanken",
        level: "Advanced",
        keywords: "PostgreSQL, MongoDB, MySQL, Redis, Elasticsearch",
        language: "de-DE",
      },
      {
        name: "Testing",
        level: "Advanced",
        keywords: "Jest, Mocha, Chai, Cypress, Selenium, JUnit, Mockito, Test-Driven Development, Integrationstests",
        language: "de-DE",
      },
      {
        name: "Methoden",
        level: "Expert",
        keywords: "Agile, Scrum, Kanban, SAFe, Lean, DevOps, GitFlow, Trunk-Based Development, Code-Review, Pair Programming, Continuous Integration, Continuous Deployment, Infrastructure as Code",
        language: "de-DE",
      },
      {
        name: "Data Science & Analytics",
        level: "Intermediate",
        keywords: "Python, NumPy, Pandas, Scikit-learn, TensorFlow, Datenanalyse, Machine Learning, Statistische Modellierung, Datenvisualisierung, Matplotlib",
        language: "de-DE",
      },
      {
        name: "Projektmanagement",
        level: "Advanced",
        keywords: "Jira, Confluence, Trello, Asana",
        language: "de-DE",
      },
      {
        name: "Versionskontrolle",
        level: "Expert",
        keywords: "Git, GitHub, GitLab, Bitbucket, Branching-Strategien, Code-Review, Pull Requests, Merge-Strategien, Git Hooks",
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
