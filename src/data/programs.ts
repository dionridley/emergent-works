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
  fabricated?: boolean;
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
    duration: "July 2025 – June 2026",
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
    id: "technical-mentorship",
    title: "Technical Mentorship",
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
