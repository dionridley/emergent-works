export interface Program {
  id: string;
  title: string;
  type: "direct" | "partner";
  description: string;
  eligibility: string;
  duration: string;
  applyBy?: string;
  image: string;
  features: string[];
}

export const programs: Program[] = [
  {
    id: "trap",
    title: "T.RAP",
    type: "direct",
    description:
      "This free creative workforce program blends music production, songwriting, recording, civic engagement, and digital literacy with social-emotional learning and career readiness. Participants earn milestone-based stipends as they build practical skills, create original music, strengthen their confidence, and explore pathways to future education and employment.",
    eligibility:
      "NYC youth ages 16-24 who identify as Black, Brown and system-impacted",
    duration: "July – June",
    applyBy: "Ongoing",
    image: "/images/programs/trap-studio.jpg",
    features: [
      "Music production",
      "Songwriting",
      "Recording",
      "Civic engagement",
      "Digital literacy",
      "Social-emotional learning",
      "Career readiness",
      "Milestone-based stipends",
    ],
  },
  {
    id: "teck-direct",
    title: "TECK",
    type: "direct",
    description:
      "This free 12-week virtual and individual mentorship program connects participants with industry professionals who provide one-on-one support in digital literacy, coding, UI/UX, and tech career exploration. Participants meet with their mentor once a week to build real skills, complete portfolio-ready projects, and gain the confidence in the digital landscape.",
    eligibility:
      "System-impacted individuals 18+ residing in United States",
    duration: "12 weeks, all year round",
    applyBy: "Ongoing",
    image: "/images/programs/mentorship-library.jpg",
    features: [
      "1-on-1 mentorship",
      "Digital literacy",
      "Coding",
      "UI/UX",
      "Portfolio-ready projects",
      "Virtual and individual",
    ],
  },
  {
    id: "teck",
    title: "TECK",
    type: "partner",
    description:
      "Our TECK program offers flexible digital literacy training exclusively for partner organizations. Cohorts run 4, 8, or 12 weeks and provide participants with hands-on experience in Google Suite, AI tools, Canva, and basic website building. TECK helps organizations equip their communities with essential technical skills, confidence, and workforce readiness, all guided by Emergent Works' proven curriculum and instructors.",
    eligibility:
      "Cohorts designed for system-impacted communities from partner organizations",
    duration: "4, 8, or 12 weeks",
    image: "/images/programs/teck-library.jpg",
    features: [
      "Google Suite",
      "AI tools",
      "Canva",
      "Basic website building",
      "Digital literacy",
    ],
  },
  {
    id: "trap-partner",
    title: "T.RAP",
    type: "partner",
    description:
      "Our T.RAP program offers immersive social-emotional learning and creative skills training exclusively for partner organizations. Cohorts run 8-12+ weeks, guiding participants through therapeutic writing, music production, and leadership development. T.RAP helps organizations empower their communities with emotional resilience and creative expression, all led by Emergent Works' experienced instructors and alumni mentors.",
    eligibility: "System-impacted youth ages 16-24",
    duration: "8–12 weeks+",
    image: "/images/programs/mentorship-library.jpg",
    features: [
      "Therapeutic writing",
      "Music production",
      "Leadership development",
      "Social-emotional learning",
      "Creative expression",
    ],
  },
];

export interface ProgramApproach {
  title: string;
  description: string;
  image: string;
}

export const programApproach: ProgramApproach[] = [
  {
    title: "Digital Literacy Training",
    description:
      "Equipping our community with practical experience with industry accepted digital tools to complete professional tasks efficiently and effectively.",
    image: "/images/impact/digital-literacy.jpg",
  },
  {
    title: "Social Emotional Learning",
    description:
      "Amplifying voices & rewriting futures through music production, audio engineering, studio recordings and mental health sessions.",
    image: "/images/impact/sel.jpg",
  },
  {
    title: "Career Development",
    description:
      "Providing foundational technical and social skills to navigate today's workplace as well as opportunities to apply learnings and gain experience.",
    image: "/images/impact/career-development.jpg",
  },
  {
    title: "Community Engagement",
    description:
      "Equipping participants to collaborate and explore community issues whilst leading change through civic engagement and research.",
    image: "/images/impact/community-engagement.jpg",
  },
];

export const directPrograms = programs.filter((p) => p.type === "direct");
export const partnerPrograms = programs.filter((p) => p.type === "partner");

export interface ExpandedProgramDetail {
  programId: string;
  weeklySchedule?: string[];
  curriculumOutline?: string[];
  toolsCovered?: string[];
  fabricated: true;
}

export const expandedProgramDetails: ExpandedProgramDetail[] = [
  {
    programId: "trap",
    weeklySchedule: [
      "Mondays: Digital Literacy and Workreadiness (5 hours), Tuesdays: Therapeutic Song Writing and Workreadiness (5 hours), Wednesdays: Studio Recording and Workreadiness (5 hours), Thursdays: Certificate Training and Guest Speakers (5 hours)",
    ],
    curriculumOutline: [
      "Community Research & Participatory Action — Development of a community research project using a Participatory Action Research (PAR) methodology. Participants identify key issues impacting their communities, conduct research, gather and analyze data, and transform findings into informed insights that drive creative and social outcomes.",
      "Album Creation & Artistic Development — Development of a collaborative album featuring both solo and group songs rooted in the themes uncovered through research. Focus includes artistry development, songwriting, recording, performance skills, and message alignment.",
      "Digital & Career Development Projects — Creation of multiple professional digital assets including a personal website, resume, cover letter, LinkedIn profile, job tracker, and career dashboard. Participants build essential digital competencies such as Google Suite proficiency, website building, Canva design, and foundational project management skills.",
      "Social-Emotional Learning & Mental Wellness — Ongoing social-emotional development through music and arts-based workshops, complemented by dedicated mental health sessions with a licensed social worker to support reflection, resilience, and personal growth.",
      "Workforce & Education Pathways — Connection to job opportunities, certification programs, and educational pathways. Participants receive application support, interview preparation, and workforce readiness training to strengthen long-term employment outcomes.",
      "Culminating Showcase & Public Presentation — Preparation for a final showcase event featuring live performances of recorded album tracks and presentation of digital projects. Participants gain public exposure, confidence, and experience presenting their work to an audience of peers, partners, and community stakeholders.",
    ],
    toolsCovered: [
      "Pro Tools",
      "Bandcamp",
      "Google Suite",
      "Chat GPT/Gemini",
      "Canva",
    ],
    fabricated: true,
  },
  {
    programId: "teck-direct",
    weeklySchedule: [
      "Coordinate weekly virtual sessions with your mentor, ensuring a minimum of two hours of engagement each week.",
    ],
    curriculumOutline: [
      "Mentor Matching & Goal Setting — Participants are paired with an industry professional who provides one-on-one guidance. Together, they establish interest areas and goals for the mentorship, such as coding fundamentals, digital literacy, application support, or UI/UX design, creating a personalized learning roadmap.",
      "Weekly Mentorship Sessions — Participants meet virtually with their mentor once a week for a minimum of two hours, engaging in hands-on instruction, collaborative problem-solving, and career-focused guidance. These sessions build both technical skills and professional confidence.",
      "Project-Based Learning — Through mentorship, participants complete portfolio-ready projects that reflect their skills in digital & AI literacy, coding, UI/UX, and applied tech tools. Projects are designed to reinforce learning, demonstrate mastery, and create tangible outcomes for future employment or educational opportunities.",
      "Digital & AI Skills Development — Participants strengthen essential digital competencies, including Google Suite, Canva, website building, and foundational project management. These skills equip participants to navigate modern professional environments and manage digital workflows effectively.",
      "Mentor Relationship & Professional Growth — Ongoing one-on-one mentorship fosters a strong professional relationship, providing guidance, feedback, and insight into digital industry practices. Participants gain soft skills such as problem-solving, communication, and workplace readiness, building confidence for future opportunities.",
      "Portfolio Completion — At the conclusion of the program, participants compile their completed projects into a professional portfolio. This includes digital assets, work samples, and applied skills, providing a showcase of their growth and readiness for employment, education, or further technical training.",
    ],
    toolsCovered: [
      "Google Suite",
      "Chat GPT/Gemini",
      "Canva",
      "Figma",
      "The Odin Project",
      "Website Building Softwares",
    ],
    fabricated: true,
  },
  {
    programId: "teck",
    weeklySchedule: [
      "Coordinate weekly virtual sessions with your mentor, ensuring a minimum of two hours of engagement each week.",
    ],
    curriculumOutline: [
      "Mentor Matching & Goal Setting — Participants are paired with an industry professional who provides one-on-one guidance. Together, they establish interest areas and goals for the mentorship, such as coding fundamentals, digital literacy, application support, or UI/UX design, creating a personalized learning roadmap.",
      "Weekly Mentorship Sessions — Participants meet virtually with their mentor once a week for a minimum of two hours, engaging in hands-on instruction, collaborative problem-solving, and career-focused guidance. These sessions build both technical skills and professional confidence.",
      "Project-Based Learning — Through mentorship, participants complete portfolio-ready projects that reflect their skills in digital & AI literacy, coding, UI/UX, and applied tech tools. Projects are designed to reinforce learning, demonstrate mastery, and create tangible outcomes for future employment or educational opportunities.",
      "Digital & AI Skills Development — Participants strengthen essential digital competencies, including Google Suite, Canva, website building, and foundational project management. These skills equip participants to navigate modern professional environments and manage digital workflows effectively.",
      "Mentor Relationship & Professional Growth — Ongoing one-on-one mentorship fosters a strong professional relationship, providing guidance, feedback, and insight into digital industry practices. Participants gain soft skills such as problem-solving, communication, and workplace readiness, building confidence for future opportunities.",
      "Portfolio Completion — At the conclusion of the program, participants compile their completed projects into a professional portfolio. This includes digital assets, work samples, and applied skills, providing a showcase of their growth and readiness for employment, education, or further technical training.",
    ],
    toolsCovered: [
      "Google Suite",
      "Chat GPT/Gemini",
      "Canva",
      "Figma",
      "The Odin Project",
      "Website Building Softwares",
    ],
    fabricated: true,
  },
];
