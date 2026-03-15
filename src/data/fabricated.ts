/**
 * Fabricated content extensions for design variations.
 * ALL content in this file is fabricated for design purposes.
 * Every item has fabricated: true.
 */

export interface AlumniStory {
  name: string;
  image?: string;
  program: string;
  beforeSummary: string;
  journey: string;
  outcome: string;
  currentRole?: string;
  quote: string;
  fabricated: true;
}

export const alumniStories: AlumniStory[] = [
  {
    name: "Marcus Thompson",
    program: "Technical Mentorship",
    beforeSummary:
      "After eight years of incarceration, Marcus returned to a world that had transformed digitally. He couldn't navigate basic smartphone apps, let alone think about a career in technology.",
    journey:
      "Paired with a senior developer mentor, Marcus spent 12 weeks learning HTML, CSS, and JavaScript fundamentals. He built a portfolio website, then a small business inventory app as his capstone project.",
    outcome:
      "Marcus was hired as a junior frontend developer at a NYC-based startup within two months of graduating. He now mentors new EW participants on weekends.",
    currentRole: "Junior Frontend Developer",
    quote:
      "My mentor didn't just teach me to code — she taught me that my past doesn't define my potential.",
    fabricated: true,
  },
  {
    name: "Aisha Williams",
    program: "T.RAP",
    beforeSummary:
      "At 18, Aisha was involved with the justice system and felt like she had no voice. She loved music but had never been inside a real recording studio.",
    journey:
      "Through T.RAP, Aisha learned audio engineering, songwriting structure, and music production using industry-standard tools. She found that writing lyrics was a powerful form of emotional processing.",
    outcome:
      "Aisha now freelances as a music producer and audio engineer, working with independent artists across NYC. She's also started teaching music production workshops at her local community center.",
    currentRole: "Freelance Music Producer & Audio Engineer",
    quote:
      "T.RAP gave me a voice when I felt like nobody was listening. The studio became my safe space.",
    fabricated: true,
  },
  {
    name: "Terrence Jackson",
    program: "Technical Mentorship",
    beforeSummary:
      "Terrence spent 12 years incarcerated. When he was released, smartphones, cloud computing, and social media were all new to him. He felt overwhelmed and behind.",
    journey:
      "His EW mentor helped him start with digital literacy basics, then move into web development. Terrence built his first website during the program — a portfolio showcasing his journey and skills.",
    outcome:
      "Terrence now freelances full-time as a web developer, building sites for small businesses in his community. His children are proud of his transformation.",
    currentRole: "Freelance Web Developer",
    quote:
      "EW didn't just catch me up — they put me ahead. My kids are proud of me, and honestly, I'm proud of me too.",
    fabricated: true,
  },
  {
    name: "DeShawn Carter",
    program: "TECK",
    beforeSummary:
      "DeShawn had basic computer skills but couldn't navigate the digital tools needed for modern professional work. His job search was stalling because of it.",
    journey:
      "The TECK program taught him Google Workspace, Canva, basic web building, and AI tools. He went from struggling with spreadsheets to managing digital workflows.",
    outcome:
      "DeShawn was hired to manage digital operations for a community nonprofit, handling their social media, newsletters, and data tracking.",
    currentRole: "Digital Operations Coordinator",
    quote:
      "I went from not knowing how to create a spreadsheet to managing digital operations for a nonprofit. The confidence is what really changed my life.",
    fabricated: true,
  },
];

export interface MentorProfile {
  name: string;
  company: string;
  role: string;
  specialty: string;
  yearsWithEW: number;
  quote: string;
  image?: string;
  fabricated: true;
}

export const mentorProfiles: MentorProfile[] = [
  {
    name: "Priya Sharma",
    company: "Google",
    role: "Senior Software Engineer",
    specialty: "Frontend Development & React",
    yearsWithEW: 3,
    quote:
      "I thought I was just teaching someone to code. But my mentee taught me about resilience and finding purpose in the struggle. This experience has made me a better engineer and a better human.",
    fabricated: true,
  },
  {
    name: "James O'Brien",
    company: "Microsoft",
    role: "Product Manager",
    specialty: "UX Design & Product Strategy",
    yearsWithEW: 2,
    quote:
      "Mentoring at EW reminded me why I got into tech in the first place — to solve real problems for real people. The talent in this community is extraordinary.",
    fabricated: true,
  },
  {
    name: "Lisa Chen",
    company: "Spotify",
    role: "Data Analyst",
    specialty: "Data Literacy & Python",
    yearsWithEW: 1,
    quote:
      "Every week, I'm amazed by how quickly my mentee picks up new concepts. The hunger to learn is inspiring, and it pushes me to be a better teacher.",
    fabricated: true,
  },
  {
    name: "David Washington",
    company: "Freelance",
    role: "Full-Stack Developer",
    specialty: "JavaScript & Node.js",
    yearsWithEW: 4,
    quote:
      "I was formerly incarcerated myself and broke into tech through self-teaching. Being an EW mentor lets me give back in the most direct way possible.",
    fabricated: true,
  },
  {
    name: "Sarah Kim",
    company: "IBM",
    role: "Cloud Solutions Architect",
    specialty: "Cloud Computing & DevOps",
    yearsWithEW: 2,
    quote:
      "The EW community is unlike anything I've experienced in tech. It's genuine, it's supportive, and it produces real results. I learn as much as I teach.",
    fabricated: true,
  },
];

export interface FabricatedEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: "workshop" | "graduation" | "community" | "fundraiser";
  fabricated: true;
}

export const fabricatedEvents: FabricatedEvent[] = [
  {
    title: "TECK Digital Literacy Workshop",
    date: "March 15, 2026",
    time: "10:00 AM – 2:00 PM",
    location: "424 W 54th St., New York, NY",
    description:
      "Open workshop introducing Google Suite and digital literacy fundamentals. All are welcome.",
    type: "workshop",
    fabricated: true,
  },
  {
    title: "T.RAP Cohort 6 Showcase",
    date: "April 5, 2026",
    time: "6:00 PM – 9:00 PM",
    location: "SOBs, New York, NY",
    description:
      "Live performances and music presentations from our latest T.RAP cohort graduates.",
    type: "graduation",
    fabricated: true,
  },
  {
    title: "Technical Mentorship Graduation",
    date: "April 20, 2026",
    time: "5:00 PM – 7:00 PM",
    location: "424 W 54th St., New York, NY",
    description:
      "Celebrate our latest cohort of Technical Mentorship graduates as they present their portfolio projects.",
    type: "graduation",
    fabricated: true,
  },
  {
    title: "Community Code Night",
    date: "Every Tuesday",
    time: "6:00 PM – 8:00 PM",
    location: "Virtual (Zoom)",
    description:
      "Weekly open coding session for EW alumni and current participants. Bring your projects, questions, or just hang out.",
    type: "community",
    fabricated: true,
  },
  {
    title: "Annual Fundraiser Gala",
    date: "June 12, 2026",
    time: "7:00 PM – 10:00 PM",
    location: "The Edison Ballroom, New York, NY",
    description:
      "Join us for an evening celebrating five years of impact, featuring alumni speakers, live music from T.RAP participants, and a silent auction.",
    type: "fundraiser",
    fabricated: true,
  },
];

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
      "Monday: Songwriting & Lyric Workshop (3 hrs)",
      "Wednesday: Music Production Lab (3 hrs)",
      "Thursday: Recording Studio Session (3 hrs)",
      "Friday: Career Readiness & Civic Engagement (2 hrs)",
    ],
    curriculumOutline: [
      "Weeks 1-4: Foundations — songwriting basics, DAW introduction, studio etiquette",
      "Weeks 5-8: Production — beat making, arrangement, recording techniques",
      "Weeks 9-12: Refinement — mixing basics, project development, portfolio building",
      "Weeks 13-16: Showcase — final project recording, performance prep, career planning",
    ],
    toolsCovered: [
      "Ableton Live",
      "Logic Pro",
      "Pro Tools",
      "Canva",
      "Google Workspace",
    ],
    fabricated: true,
  },
  {
    programId: "technical-mentorship",
    weeklySchedule: [
      "1 hour weekly 1-on-1 mentor session (scheduled individually)",
      "Optional: Tuesday Community Code Night (2 hrs, virtual)",
      "Self-paced coursework between sessions",
    ],
    curriculumOutline: [
      "Weeks 1-3: Digital literacy foundations, development environment setup",
      "Weeks 4-6: Core skills (HTML/CSS/JS or chosen track)",
      "Weeks 7-9: Project development, portfolio building",
      "Weeks 10-12: Capstone project, job readiness, graduation prep",
    ],
    toolsCovered: [
      "VS Code",
      "Git & GitHub",
      "HTML/CSS/JavaScript",
      "React (advanced track)",
      "Figma (UX track)",
      "Google Workspace",
    ],
    fabricated: true,
  },
  {
    programId: "teck",
    weeklySchedule: [
      "Two 2-hour sessions per week (schedule varies by partner)",
      "Optional office hours for additional support",
    ],
    curriculumOutline: [
      "Module 1: Google Workspace mastery (Docs, Sheets, Slides, Drive)",
      "Module 2: Visual communication with Canva",
      "Module 3: AI tools for productivity",
      "Module 4: Basic website building",
      "Module 5: Professional digital presence",
    ],
    toolsCovered: [
      "Google Workspace",
      "Canva",
      "ChatGPT",
      "WordPress/Squarespace basics",
      "LinkedIn",
    ],
    fabricated: true,
  },
];
