import "dotenv/config";
import { PrismaClient } from "@prisma/client";

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
      endDate: parseDate("03-2025"), // Current position
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
      language: "en-US",
    },
    {
      institution: "Gautam Buddh Technical University",
      url: "https://aktu.ac.in/",
      area: "Computer Science",
      studyType: "Bachelor",
      startDate: parseDate("08-2008"),
      endDate: parseDate("06-2012"),
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
      language: "en-US",
    },
    {
      title: "Certificate of Appreciation",
      date: parseDate("07-2017"),
      awarder: "SSA Infosystems Pvt. Ltd.",
      summary: `Certificate of Appreciation is an award that is granted to employees
                who've worked exceptionally well and have won accolades from the client.`,
      language: "en-US",
    },
    {
      title: "Round of Applause",
      date: parseDate("07-2017"),
      awarder: "SSA Infosystems Pvt. Ltd.",
      summary: "Round of Applause is an award that is granted to employees who've worked exceptionally well in a particular month.",
      language: "en-US",
    },
    {
      title: "Top Talent",
      date: parseDate("08-2015"),
      awarder: "Virtusa Corp.",
      summary: "Top Talent for the successful completion of the project.",
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
      uiLanguage: "de-DE",
    },
    {
      language: "Hindi",
      fluency: "Native",
      uiLanguage: "en-IN",
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

const seedResumeLanguages = async (prisma: PrismaClient) => {
  const allLanguages = await prisma.language.createManyAndReturn({
    data: RESUME_DATA.languages.map(lang => ({ value: lang.uiLanguage, label: lang.language })),
    skipDuplicates: true,
  });

  // Check for existing resume languages
  const existingLanguages = await prisma.resumeLanguage.findMany({
    where: {
      language: { in: RESUME_DATA.languages.map(l => l.language) },
    },
  });

  const existingLanguageNames = new Set(existingLanguages.map(l => l.language));

  const languagesToCreate = RESUME_DATA.languages.filter(
    lang => !existingLanguageNames.has(lang.language)
  );

  let newLanguages = [];
  if (languagesToCreate.length > 0) {
    newLanguages = await prisma.resumeLanguage.createManyAndReturn({
      data: languagesToCreate.map((language) => ({
        language: language.language,
        fluency: language.fluency,
        uiLanguageId: allLanguages.find(l => l.value === language.uiLanguage)?.id,
      })),
    });
    console.log(`✓ Created ${newLanguages.length} new resume languages`);
  } else {
    console.log(`✓ All resume languages already exist, skipping creation`);
  }

  // Return all languages (existing + newly created)
  const languages = await prisma.resumeLanguage.findMany({
    where: {
      language: { in: RESUME_DATA.languages.map(l => l.language) },
    },
  });

  console.log(`✓ Total resume languages: ${languages.length}`);
  return languages;
};

const seedResumePublications = async (prisma: PrismaClient, allLanguages: {
  id: number;
  label: string;
  value: string;
}[]) => {
  // Check for existing publications
  const existingPublications = await prisma.resumePublication.findMany({
    where: {
      name: { in: RESUME_DATA.publications.map(p => p.name) },
    },
  });

  const existingPublicationNames = new Set(existingPublications.map(p => p.name));

  const publicationsToCreate = RESUME_DATA.publications.filter(
    pub => !existingPublicationNames.has(pub.name)
  );

  let newPublications = [];
  if (publicationsToCreate.length > 0) {
    newPublications = await prisma.resumePublication.createManyAndReturn({
      data: publicationsToCreate.map(pub => ({
        ...pub, languageId: allLanguages.find(l => l.value === pub.language)?.id, language: undefined
      })),
    });
    console.log(`✓ Created ${newPublications.length} new resume publications`);
  } else {
    console.log(`✓ All resume publications already exist, skipping creation`);
  }

  // Return all publications (existing + newly created)
  const allPublications = await prisma.resumePublication.findMany({
    where: {
      name: { in: RESUME_DATA.publications.map(p => p.name) },
    },
  });

  console.log(`✓ Total resume publications: ${allPublications.length}`);
  return allPublications;
};

const seedAwards = async (prisma: PrismaClient, allLanguages: {
  id: number;
  label: string;
  value: string;
}[]) => {
  // Check for existing awards
  const existingAwards = await prisma.resumeAward.findMany({
    where: {
      title: { in: RESUME_DATA.awards.map(a => a.title) },
    },
  });

  const existingAwardTitles = new Set(existingAwards.map(a => a.title));

  const awardsToCreate = RESUME_DATA.awards.filter(
    award => !existingAwardTitles.has(award.title)
  );

  let newAwards = [];
  if (awardsToCreate.length > 0) {
    newAwards = await prisma.resumeAward.createManyAndReturn({
      data: awardsToCreate.map(award => ({
        ...award, languageId: allLanguages.find(l => l.value === award.language)?.id, language: undefined
      })),
    });
    console.log(`✓ Created ${newAwards.length} new resume awards`);
  } else {
    console.log(`✓ All resume awards already exist, skipping creation`);
  }

  // Return all awards (existing + newly created)
  const allAwards = await prisma.resumeAward.findMany({
    where: {
      title: { in: RESUME_DATA.awards.map(a => a.title) },
    },
  });

  console.log(`✓ Total resume awards: ${allAwards.length}`);
  return allAwards;
};


const seedResumeEducation = async (prisma: PrismaClient, allLanguages: {
  id: number;
  label: string;
  value: string;
}[]) => {
  // Check for existing education records
  const existingEducation = await prisma.resumeEducation.findMany({
    where: {
      institution: { in: RESUME_DATA.education.map(e => e.institution) },
    },
  });

  const existingEducationKeys = new Set(
    existingEducation.map(e => `${e.institution}-${e.area}`)
  );

  const educationToCreate = RESUME_DATA.education.filter(
    edu => !existingEducationKeys.has(`${edu.institution}-${edu.area}`)
  );

  let newEducation = [];
  if (educationToCreate.length > 0) {
    newEducation = await prisma.resumeEducation.createManyAndReturn({
      data: educationToCreate.map(edu => ({
        ...edu, languageId: allLanguages.find(l => l.value === edu.language)?.id, language: undefined
      })),
    });
    console.log(`✓ Created ${newEducation.length} new resume education records`);
  } else {
    console.log(`✓ All resume education records already exist, skipping creation`);
  }

  // Return all education (existing + newly created)
  const allEducation = await prisma.resumeEducation.findMany({
    where: {
      institution: { in: RESUME_DATA.education.map(e => e.institution) },
    },
  });

  console.log(`✓ Total resume education records: ${allEducation.length}`);
  return allEducation;
};

const seedVolunteer = async (prisma: PrismaClient, allLanguages: {
  id: number;
  label: string;
  value: string;
}[]) => {
  // Check for existing volunteer records
  const existingVolunteer = await prisma.resumeVolunteer.findMany({
    where: {
      organization: { in: RESUME_DATA.volunteer.map(v => v.organization) },
    },
  });

  const existingVolunteerKeys = new Set(
    existingVolunteer.map(v => `${v.organization}-${v.position}`)
  );

  const volunteerToCreate = RESUME_DATA.volunteer.filter(
    vol => !existingVolunteerKeys.has(`${vol.organization}-${vol.position}`)
  );

  let newVolunteer = [];
  if (volunteerToCreate.length > 0) {
    newVolunteer = await prisma.resumeVolunteer.createManyAndReturn({
      data: volunteerToCreate.map(vol => ({
        ...vol, languageId: allLanguages.find(l => l.value === vol.language)?.id, language: undefined
      })),
    });
    console.log(`✓ Created ${newVolunteer.length} new resume volunteer records`);
  } else {
    console.log(`✓ All resume volunteer records already exist, skipping creation`);
  }

  // Return all volunteer records (existing + newly created)
  const allVolunteer = await prisma.resumeVolunteer.findMany({
    where: {
      organization: { in: RESUME_DATA.volunteer.map(v => v.organization) },
    },
  });

  console.log(`✓ Total resume volunteer records: ${allVolunteer.length}`);
  return allVolunteer;
};

const seedResumeExperience = async (prisma: PrismaClient, allLanguages: {
  id: number;
  label: string;
  value: string;
}[]) => {
  // Check for existing work experience
  const existingWork = await prisma.resumeWork.findMany({
    where: {
      name: { in: RESUME_DATA.work.map(w => w.name) },
    },
  });

  const existingWorkKeys = new Set(
    existingWork.map(w => `${w.name}-${w.position}`)
  );

  const allExperience: { id: number }[] = [];

  for (const exp of RESUME_DATA.work) {
    const key = `${exp.name}-${exp.position}`;

    // Check if this work experience already exists
    const existing = existingWork.find(
      w => w.name === exp.name && w.position === exp.position
    );

    if (existing) {
      console.log(`✓ Work experience at ${exp.name} already exists (id: ${existing.id}), skipping`);
      allExperience.push(existing);
      continue;
    }

    const languageId = allLanguages.find(l => l.value === exp.language)?.id;
    const highlightValues = (exp.highlights || "")
      .split("\n")
      .map(h => h.trim())
      .filter(Boolean);

    const created = await prisma.resumeWork.create({
      data: {
        name: exp.name,
        position: exp.position,
        url: exp.url,
        startDate: exp.startDate,
        endDate: exp.endDate,
        summary: exp.summary,
        language: undefined,
        languageId,
        highlights: {
          create: highlightValues.map(value => ({ value })),
        },
      },
    });

    console.log(`✓ Created work experience at ${exp.name} (id: ${created.id})`);
    allExperience.push(created);
  }

  console.log(`✓ Total resume work experience records: ${allExperience.length}`);
  return allExperience;
};

const seedResumeProfiles = async (prisma: PrismaClient, allLanguages: {
  id: number;
  label: string;
  value: string;
}[]) => {
  // Check for existing profiles
  const existingProfiles = await prisma.resumeProfile.findMany({
    where: {
      network: { in: RESUME_DATA.profiles.map(p => p.network) },
    },
  });

  const existingProfileKeys = new Set(
    existingProfiles.map(p => `${p.network}-${p.username}`)
  );

  const profilesToCreate = RESUME_DATA.profiles.filter(
    profile => !existingProfileKeys.has(`${profile.network}-${profile.username}`)
  );

  let newProfiles = [];
  if (profilesToCreate.length > 0) {
    newProfiles = await prisma.resumeProfile.createManyAndReturn({
      data: profilesToCreate.map(profile => ({
        ...profile, languageId: allLanguages.find(l => l.value === profile.language)?.id, language: undefined
      })),
    });
    console.log(`✓ Created ${newProfiles.length} new resume profiles`);
  } else {
    console.log(`✓ All resume profiles already exist, skipping creation`);
  }

  // Return all profiles (existing + newly created)
  const allProfiles = await prisma.resumeProfile.findMany({
    where: {
      network: { in: RESUME_DATA.profiles.map(p => p.network) },
    },
  });

  console.log(`✓ Total resume profiles: ${allProfiles.length}`);
  return allProfiles;
};

const seedResumeLocations = async (prisma: PrismaClient, allLanguages: {
  id: number;
  label: string;
  value: string;
}[]) => {
  // Check for existing location
  const existingLocation = await prisma.resumeLocation.findFirst({
    where: {
      city: RESUME_DATA.location.city,
      countryCode: RESUME_DATA.location.countryCode,
    },
  });

  if (existingLocation) {
    console.log(`✓ Resume location already exists (id: ${existingLocation.id}), skipping`);
    return existingLocation;
  }

  const allLocations = await prisma.resumeLocation.create({
    data: {
      ...RESUME_DATA.location,
      languageId: allLanguages.find(l => l.value === RESUME_DATA.location.language)?.id,
      language: undefined
    }
  });

  console.log(`✓ Created resume location (id: ${allLocations.id})`);
  return allLocations;
};

const seedResumeBasicInfo = async (prisma: PrismaClient, allLanguages: {
  id: number;
  label: string;
  value: string;
}[]) => {
  const languageId = allLanguages.find(l => l.value === RESUME_DATA.basicInformation.language)?.id;

  // Check for existing basic information
  const existingBasicInfo = await prisma.resumeBasicInformation.findFirst({
    where: {
      email: RESUME_DATA.basicInformation.email,
      languageId: languageId,
    },
  });

  if (existingBasicInfo) {
    console.log(`✓ Resume basic information already exists (id: ${existingBasicInfo.id}), skipping`);
    return existingBasicInfo;
  }

  const allLocations = await prisma.resumeLocation.findFirstOrThrow();
  const resumeProfiles = await prisma.resumeProfile.findMany();
  const slug = await prisma.type.findFirstOrThrow({ where: { label: "resume" } });
  const allImages = await prisma.image.findMany();
  const resumeImage = allImages.filter(image => image.typeId === slug.id).find(image => image.alt.includes("Avatar"));

  const allBasicInfo = await prisma.resumeBasicInformation.create({
    data: {
      ...RESUME_DATA.basicInformation,
      languageId: languageId,
      language: undefined,
      locationId: allLocations.id,
      location: undefined,
      profiles: {
        connect: resumeProfiles.map(profile => ({ id: profile.id }))
      },
      imageId: resumeImage?.id,
      image: undefined
    }
  });

  console.log(`✓ Created resume basic information (id: ${allBasicInfo.id})`);
  return allBasicInfo;
};

const seedResume = async (prisma: PrismaClient) => {
  console.log("Seeding resume...");

  const allLanguages = await prisma.language.findMany();
  const resumeLanguageId = allLanguages.find(language => language.value === RESUME_DATA.resume.language)?.id;
  if (!allLanguages) throw new Error("Languages not found");

  // Check if resume already exists
  const existingResume = await prisma.resume.findFirst({
    where: {
      title: RESUME_DATA.resume.title,
      languageId: resumeLanguageId,
    },
  });

  if (existingResume) {
    console.log(`✓ Resume already exists (id: ${existingResume.id}), skipping`);
    return existingResume;
  }

  const resumeLanguages = await seedResumeLanguages(prisma);
  const allPublications = await seedResumePublications(prisma, allLanguages);
  const allAwards = await seedAwards(prisma, allLanguages);
  const allEducation = await seedResumeEducation(prisma, allLanguages);
  const allVolunteer = await seedVolunteer(prisma, allLanguages);
  const allExperience = await seedResumeExperience(prisma, allLanguages);
  const allProfiles = await seedResumeProfiles(prisma, allLanguages);
  const allLocations = await seedResumeLocations(prisma, allLanguages);
  const allCertifications = await prisma.certification.findMany();
  const allBasicInfo = await seedResumeBasicInfo(prisma, allLanguages);

  const allResumes = await prisma.resume.create({
    data: {
      ...RESUME_DATA.resume,
      language: {
        connect: { id: resumeLanguageId }
      },
      resumeLanguages: {
        connect: resumeLanguages.map(language => ({ id: language.id }))
      },
      work: {
        connect: allExperience.map(work => ({ id: work.id }))
      },
      volunteer: {
        connect: allVolunteer.map(volunteer => ({ id: volunteer.id }))
      },
      education: {
        connect: allEducation.map(education => ({ id: education.id }))
      },
      publications: {
        connect: allPublications.map(publication => ({ id: publication.id }))
      },
      awards: {
        connect: allAwards.map(award => ({ id: award.id }))
      },
      certificates: {
        connect: allCertifications.filter(certification => certification.languageId === resumeLanguageId).map(certification => ({ id: certification.id }))
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      basicInformation: {
        connect: { id: allBasicInfo.id }
      }
    }
  });

  console.log(`✓ Created resume (id: ${allResumes.id})`);
  return allResumes;
};

const clearResumeData = async (prisma: PrismaClient) => {
  console.log("Clearing all resume data...");

  // Delete all resume-related records in correct order (respecting foreign keys)
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
