export interface Partner {
  name: string;
  logo: string;
  spotlightQuote?: string;
}

export const partners: Partner[] = [
  {
    name: "Camelback Ventures",
    logo: "/images/partners/logo-camelback-ventures.png",
  },
  {
    name: "Center for Community Alternatives",
    logo: "/images/partners/logo-cca.png",
    spotlightQuote:
      "Having Emergent Works as a part of our NextGen Network, our CCA reentry initiative, has been an immense reward. We truly value this partnership and the positive change it brings to our community. Your collaboration and commitment inspire us to keep building a brighter future for those we serve.",
  },
  {
    name: "WestRock",
    logo: "/images/partners/logo-westrock.png",
  },
  {
    name: "Pinkerton Foundation",
    logo: "/images/partners/logo-pinkerton.png",
  },
  {
    name: "CAF America",
    logo: "/images/partners/logo-caf-america.jpg",
  },
  {
    name: "Nike Foundation",
    logo: "/images/partners/logo-nike-foundation.png",
  },
  {
    name: "WSCF",
    logo: "/images/partners/logo-wscf.webp",
  },
  {
    name: "Workforce1",
    logo: "/images/partners/logo-workforce1.jpeg",
  },
  {
    name: "arbor RISING",
    logo: "/images/partners/logo-arbor-rising.jpeg",
  },
  {
    name: "CZ",
    logo: "/images/partners/logo-cz.png",
  },
  {
    name: "Centre for Justice Innovation",
    logo: "/images/partners/logo-centre-justice-innovation.png",
  },
  {
    name: "Prime Produce Limited",
    logo: "/images/partners/logo-prime-produce.png",
  },
  {
    name: "Partner Organization",
    logo: "/images/partners/logo-partner-13.webp",
  },
];

export interface PartnershipType {
  title: string;
  description: string;
}

export const partnershipTypes: PartnershipType[] = [
  {
    title: "Community & Nonprofit Partners",
    description:
      "Share resources, co-create programming, and refer participants to build stronger communities together.",
  },
  {
    title: "Program Partners",
    description:
      "Customized entrepreneurship, financial literacy, and workforce programs tailored to your community's needs.",
  },
  {
    title: "Funders & Philanthropy",
    description:
      "Support cohorts, initiatives, and program elements that create lasting impact.",
  },
  {
    title: "Corporate Sponsors",
    description:
      "Sponsor programs and events, provide mentorship opportunities, and engage in skills-based volunteering.",
  },
];
