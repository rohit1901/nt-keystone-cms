// Helper function to convert date strings to ISO format
const parseDate = (dateStr: string): string => {
  const [month, year] = dateStr.split('-');
  return new Date(parseInt(year), parseInt(month) - 1).toISOString();
};

export const RESUME_DATA = {
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
    phone: null, // Add if available
    url: "https://www.rohit.khanduri.de",
    summary: `As a seasoned software architect with over a decade of experience in software development,
    I bring a wealth of expertise in crafting innovative solutions that bridge the gap between technical and creative aspects of software design.
    With a strong foundation in mathematics and a proven track record of successful project delivery,
    I am well-versed in agile methodologies and have honed my skills in leading diverse software teams across international borders.
    My passion for problem-solving and creativity has allowed me to excel in my career,
    and I am always eager to take on new challenges and collaborate with like-minded professionals.
    When I'm not working on the latest software solution, you can find me reading, doodling math problems or moving my body.
    Let's connect and explore how we can work together to drive the evolution of the tech landscape!`,
    language: "en-US",
    // Relationships to be created:
    // image: Reference to Image { src: '/portfolio/about.pic.jpg', alt: 'Rohit Khanduri' }
    // location: Reference to ResumeLocation
    // profiles: References to ResumeProfile[]
  },

  // Location
  location: {
    address: "Frankfurt am Main, Germany",
    postalCode: "60326",
    city: "Frankfurt am Main",
    countryCode: "DE",
    region: "Hessen",
    language: "en-US",
  },

  // Profiles
  profiles: [
    {
      network: "LinkedIn",
      username: "rohit-khanduri-9098b84a", // Extracted from URL
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
      network: "Twitter",
      username: "JohnnyD78310768",
      url: "https://twitter.com/JohnnyD78310768",
      language: "en-US",
    },
    {
      network: "Instagram",
      username: "johnny.drama.chase",
      url: "https://www.instagram.com/johnny.drama.chase/",
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
      name: "Adesso SE",
      position: "Software Architect",
      url: "https://www.adesso.de/",
      startDate: parseDate("08-2020"),
      endDate: null, // Current position
      summary: `As a Software Architect and a Consultant, I am responsible for the design and implementation of Software Solutions for our clients. I am also responsible for the technical leadership of the development team and occassionally review the architecture of the existing systems.`,
      highlights: `A part of the Adesso Talent Pool as a high potential employee
Successfully led the development of new microservice architectures for clients
Mentored junior developers and interns
Conducted workshops and training sessions for the various teams`,
      language: "en-US",
      // image: Reference to Image { src: '/portfolio/assets/adesso.png', alt: 'Adesso SE' }
    },
    {
      name: "Finatix GmbH",
      position: "Software Engineer (Working Student)",
      url: "https://www.finatix.de/",
      startDate: parseDate("09-2019"),
      endDate: parseDate("07-2020"),
      summary: `As a Software Engineer, I was responsible for the development of new features for the existing software solutions. I was also responsible for the maintenance of the existing software solutions.`,
      highlights: `Developed new features for the existing software solutions
Maintained the existing software solutions`,
      language: "en-US",
      // image: Reference to Image { src: '/portfolio/assets/finatix.png', alt: 'Finatix GmbH' }
    },
    {
      name: "Peak Performance Apps GmbH",
      position: "Software Engineer (Working Student)",
      url: "https://appsfactory.de/",
      startDate: parseDate("05-2019"),
      endDate: parseDate("08-2019"),
      summary: `As a Software Engineer, I was responsible for the development of new features for the existing software solutions. I was also responsible for the maintenance of the existing software solutions.`,
      highlights: `Developed new features for the existing software solutions
Maintained the existing software solutions`,
      language: "en-US",
      // image: Reference to Image { src: '/portfolio/assets/ppa.png', alt: 'Peak Performance Apps GmbH' }
    },
    {
      name: "Appsfactory GmbH",
      position: "Software Engineer (Working Student)",
      url: "https://appsfactory.de/",
      startDate: parseDate("12-2017"),
      endDate: parseDate("04-2019"),
      summary: `As a Software Engineer, I was responsible for the development of new features for the existing software solutions. I was also responsible for the maintenance of the existing software solutions.`,
      highlights: `Developed new features for the existing software solutions
Maintained the existing software solutions`,
      language: "en-US",
      // image: Reference to Image { src: '/portfolio/assets/appsfactory.ico', alt: 'Appsfactory GmbH' }
    },
    {
      name: "Iris Software Inc.",
      position: "Team Lead/ Software Engineer",
      url: "https://www.ssa-infosystems.com/",
      startDate: parseDate("09-2016"),
      endDate: parseDate("10-2017"),
      summary: `As a Team Lead, I was responsible for the development of new features for the existing software solutions, mentoring junior developers and interns, conducting workshops and training sessions for the various teams. Conducted code reviews and was responsible for the technical leadership of the development team.`,
      highlights: `Frontend (UI) Team Lead for 11 frontend developers
Making technical decisions
Responsible for developing new features
Responsible for upgrading Angular version from 1 to 2
Conducting code reviews and quality checks
Regular and direct customer communication`,
      language: "en-US",
      // image: Reference to Image { src: '/portfolio/assets/iris.jpeg', alt: 'Iris Software Inc.' }
    },
    {
      name: "Virtusa Corp.",
      position: "Business Analyst/ Software Engineer",
      url: "https://www.virtusa.com/",
      startDate: parseDate("02-2015"),
      endDate: parseDate("08-2016"),
      summary: `As a Business Analyst, I was responsible for the requirement gathering, preparing the requirement documents, preparing the wireframes, preparing the user stories, preparing the acceptance criteria and conducting the UAT. As a Software Engineer, I was responsible for the development of new features for the existing software solutions.`,
      highlights: `Planning and execution of business and requirement analyses
Software development of new functionalities
Developing complete functionalities from Java REST endpoints to fully functional AngularJS components.`,
      language: "en-US",
      // image: Reference to Image { src: '/portfolio/assets/virtusa.jpeg', alt: 'Virtusa Corp.' }
    },
    {
      name: "Genpact",
      position: "Software Engineer",
      url: "https://www.genpact.com/",
      startDate: parseDate("11-2013"),
      endDate: parseDate("01-2015"),
      summary: `As a Software Engineer, I was responsible for the development of new features for the existing software solutions.`,
      highlights: `Developing new features for the existing software solutions
Developing new functionalities in Calypso`,
      language: "en-US",
      // image: Reference to Image { src: '/portfolio/assets/genpact.jpeg', alt: 'Genpact' }
    },
    {
      name: "NEC",
      position: "L3 Support Engineer/ Software Engineer",
      url: "https://in.nec.com/",
      startDate: parseDate("08-2012"),
      endDate: parseDate("10-2013"),
      summary: `As a L3 Support Engineer, I was responsible for the support of the existing software solutions. As a Software Engineer, I was responsible for the development of new features for the existing software solutions.`,
      highlights: `Supporting the existing software solutions
Developing new features for the existing software solutions`,
      language: "en-US",
      // image: Reference to Image { src: '/portfolio/assets/nec.png', alt: 'NEC' }
    },
  ],

  // Volunteer Experience
  volunteer: [
    {
      organization: "Robin Hood Army",
      position: "Volunteer",
      url: "https://robinhoodarmy.com/",
      startDate: parseDate("08-2014"),
      endDate: parseDate("07-2017"),
      summary: `As a Volunteer, I was responsible for the distribution of food to the needy people.`,
      highlights: `Distributed food to the needy people
Conducted food distribution drives`,
      language: "en-US",
    },
  ],

  // Education
  education: [
    {
      institution: "Hochschule Mittweida | University of Applied Sciences",
      url: "https://www.hs-mittweida.de/",
      area: "Applied Mathematics for Network and Data Science",
      studyType: "Master",
      startDate: parseDate("10-2017"),
      endDate: parseDate("09-2019"),
      score: null,
      courses: null,
      language: "en-US",
    },
    {
      institution: "Gautam Buddh Technical University",
      url: "https://aktu.ac.in/",
      area: "Computer Science",
      studyType: "Bachelor",
      startDate: parseDate("08-2008"),
      endDate: parseDate("06-2012"),
      score: null,
      courses: null,
      language: "en-US",
    },
  ],

  // Awards
  awards: [
    {
      title: "Adesso Talent Pool",
      date: parseDate("08-2020"),
      awarder: "Adesso SE",
      summary: `Adesso Talent Pool is an exclusive program designed to recognize and reward employees
                for their exceptional work performance and strong work ethics.
                This exclusive promotion initiative aimed to identify and appreciate individuals with
                the potential to propel the company forward, offering unique opportunities for networking and professional growth within adesso.`,
      url: null,
      language: "en-US",
    },
    {
      title: "Certificate of Appreciation",
      date: parseDate("07-2017"),
      awarder: "SSA Infosystems Pvt. Ltd.",
      summary: `Certificate of Appreciation is an award that is granted to employees
                who've worked exceptionally well and have won accolades from the client.`,
      url: null,
      language: "en-US",
    },
    {
      title: "Round of Applause",
      date: parseDate("07-2017"),
      awarder: "SSA Infosystems Pvt. Ltd.",
      summary: "Round of Applause is an award that is granted to employees who've worked exceptionally well in a particular month.",
      url: null,
      language: "en-US",
    },
    {
      title: "Top Talent",
      date: parseDate("08-2015"),
      awarder: "Virtusa Corp.",
      summary: "Top Talent for the successful completion of the project.",
      url: null,
      language: "en-US",
    },
  ],

  // Publications
  publications: [
    {
      name: "Fraud Detection using Machine Learning",
      publisher: "Hochschule Mittweida",
      releaseDate: parseDate("12-2018"),
      url: "https://monami.hs-mittweida.de/frontdoor/index/index/year/2023/docId/13759",
      summary: `Fraud detection is a critical issue in the financial sector.
                This paper presents a machine learning approach to detect fraud in the financial sector.`,
      language: "en-US",
    },
  ],

  // Languages
  languages: [
    {
      language: "English",
      fluency: "Professional Working",
      uiLanguage: "en-US",
    },
    {
      language: "German",
      fluency: "Elementary",
      uiLanguage: "en-US",
    },
    {
      language: "Hindi",
      fluency: "Native",
      uiLanguage: "en-US",
    },
  ],

  // Images to create first
  images: [
    {
      src: "/portfolio/about.pic.jpg",
      alt: "Rohit Khanduri",
      width: null,
      height: null,
      fill: false,
      type: "resume",
    },
    {
      src: "/portfolio/assets/adesso.png",
      alt: "Adesso SE",
      width: null,
      height: null,
      fill: false,
      type: "resume",
    },
    {
      src: "/portfolio/assets/finatix.png",
      alt: "Finatix GmbH",
      width: null,
      height: null,
      fill: false,
      type: "resume",
    },
    {
      src: "/portfolio/assets/ppa.png",
      alt: "Peak Performance Apps GmbH",
      width: null,
      height: null,
      fill: false,
      type: "resume",
    },
    {
      src: "/portfolio/assets/appsfactory.ico",
      alt: "Appsfactory GmbH",
      width: null,
      height: null,
      fill: false,
      type: "resume",
    },
    {
      src: "/portfolio/assets/iris.jpeg",
      alt: "Iris Software Inc.",
      width: null,
      height: null,
      fill: false,
      type: "resume",
    },
    {
      src: "/portfolio/assets/virtusa.jpeg",
      alt: "Virtusa Corp.",
      width: null,
      height: null,
      fill: false,
      type: "resume",
    },
    {
      src: "/portfolio/assets/genpact.jpeg",
      alt: "Genpact",
      width: null,
      height: null,
      fill: false,
      type: "resume",
    },
    {
      src: "/portfolio/assets/nec.png",
      alt: "NEC",
      width: null,
      height: null,
      fill: false,
      type: "resume",
    },
  ],
};
