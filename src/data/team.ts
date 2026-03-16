export interface TeamMember {
  name: string;
  title: string;
  image: string;
  bio?: string;
  fabricated?: boolean;
}

export const staff: TeamMember[] = [
  {
    name: "Army Armstead",
    title: "Founder & Executive Director",
    image: "/images/team/placeholder-1.jpg",
    bio: "Army founded Emergent Works in 2020 with a vision to break cycles of incarceration through technology and creativity. A formerly incarcerated individual himself, he transformed his own experience into a mission to empower others. Under his leadership, EW has graduated over 260 individuals with a near-zero recidivism rate.",
    fabricated: true,
  },
  {
    name: "Tine Reinert",
    title: "Program Director",
    image: "/images/team/placeholder-2.jpg",
    bio: "Tine oversees the design and delivery of all EW programs, ensuring each cohort delivers meaningful outcomes. With a background in education and workforce development, she brings a deep commitment to creating transformative learning experiences for system-impacted communities.",
    fabricated: true,
  },
  {
    name: "LaQuan DuBose",
    title: "Program Manager",
    image: "/images/team/placeholder-3.jpg",
    bio: "LaQuan manages the day-to-day operations of EW's programs, coordinating between mentors, participants, and partners. As a program alumnus, he brings firsthand understanding of the challenges participants face and the support they need to succeed.",
    fabricated: true,
  },
  {
    name: "Nasiar Denobrega",
    title: "Program Associate",
    image: "/images/team/placeholder-4.jpg",
    bio: "Nasiar supports program participants through onboarding, mentorship coordination, and community building. His energy and dedication to the EW mission help create a welcoming environment where participants feel supported from day one.",
    fabricated: true,
  },
  {
    name: "Angie Agosta",
    title: "Program Intern",
    image: "/images/team/placeholder-1.jpg",
    bio: "Angie manages all communication, social media, and design for Emergent Works, ensuring weekly marketing that highlights the organization's programs, participant achievements, and overall impact. Her creativity and dedication help showcase the important work EW does in the community.",
  },
];

export const boardOfDirectors: TeamMember[] = [
  {
    name: "Rosalind Zavros",
    title: "Board Chair",
    image: "/images/team/placeholder-2.jpg",
    bio: "Rosalind brings decades of experience in organizational leadership and strategic planning. As Board Chair, she guides EW's governance and long-term vision.",
    fabricated: true,
  },
  {
    name: "Dion Ridley",
    title: "Board Member",
    image: "/images/team/placeholder-3.jpg",
    bio: "Dion is a technologist and creative professional who contributes technical expertise and strategic perspective to EW's board.",
    fabricated: true,
  },
  {
    name: "Ashley Chen",
    title: "Board Member",
    image: "/images/team/placeholder-4.jpg",
    bio: "Ashley brings a background in community development and policy advocacy, helping EW navigate the intersection of technology and social justice.",
    fabricated: true,
  },
  {
    name: "Jerone Hsu",
    title: "Board Member",
    image: "/images/team/placeholder-1.jpg",
    bio: "Jerone contributes financial and operational expertise to the board, supporting EW's sustainable growth and fiscal responsibility.",
    fabricated: true,
  },
  {
    name: "Monti Hill",
    title: "Board Member",
    image: "/images/team/placeholder-2.jpg",
    bio: "Monti brings experience in workforce development and education, helping shape EW's programs to maximize participant outcomes.",
    fabricated: true,
  },
];

export const advisoryBoard: TeamMember[] = [
  {
    name: "Nikki Nikkhoui",
    title: "Advisory Board Member",
    image: "/images/team/placeholder-3.jpg",
    bio: "Nikki advises on program design and community engagement strategy, drawing on her experience in social impact organizations.",
    fabricated: true,
  },
  {
    name: "Jonathan Hinds",
    title: "Advisory Board Member",
    image: "/images/team/placeholder-4.jpg",
    bio: "Jonathan provides guidance on technology partnerships and corporate engagement, helping EW expand its network of supporters.",
    fabricated: true,
  },
  {
    name: "Meagan Cook",
    title: "Advisory Board Member",
    image: "/images/team/placeholder-1.jpg",
    bio: "Meagan advises on fundraising strategy and donor relations, bringing expertise in nonprofit development to EW's growth.",
    fabricated: true,
  },
];

export const allTeam = [...staff, ...boardOfDirectors, ...advisoryBoard];
