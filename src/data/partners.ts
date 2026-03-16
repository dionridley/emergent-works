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

export interface PartnerTestimonial {
  organization: string;
  quote: string;
}

export const partnerTestimonials: PartnerTestimonial[] = [
  {
    organization: "Workforce 1 Harlem",
    quote:
      "Through our collaboration, I have seen firsthand the transformative power of your work. Your commitment to providing resources, support, and education to those who need it most has created positive change in the lives of many. Your unwavering collaboration and commitment to social equity inspire us to keep striving to build a brighter future. We look forward to continuing this impactful partnership and creating even more opportunities for the community. Thank you again for all the work you do. We are honored to work alongside you in making a meaningful difference.",
  },
  {
    organization: "Center for Community Alternatives",
    quote:
      "Having Emergent Works as a part of our NextGen Network, our CCA reentry initiative, has been an immense reward. We truly value this partnership and the positive change it brings to our community. Your collaboration and commitment inspire us to keep building a brighter future for those we serve. Thank you for being an integral part of this journey. We look forward to continuing our work together and achieving even greater milestones.",
  },
  {
    organization: "Staten Island Justice Center",
    quote:
      "Emergent Works helped us provide invaluable music programming to the youth on Staten Island. It is because of this partnership that we were able to create a safe space for youth to embrace their talents and dreams. We could not have done this without their dedicated team.",
  },
];

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
