export interface Testimonial {
  name: string;
  image?: string;
  quote: string;
  extendedQuote?: string;
  sectionTitle?: string;
  program?: string;
  fabricated?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    name: "Dontay",
    image: "/images/testimonial/dontay.png",
    quote:
      "This program reminded me that no matter what obstacles come my way, giving up can't be an option. There were moments where I doubted myself or felt like things were too hard, but being a part of this program showed me that persistence pays off. I learned that progress doesn't always happen overnight.",
  },
  {
    name: "Zeek",
    image: "/images/testimonial/zeek.png",
    quote:
      "This program has truly impacted my life by giving me the confidence to grow, the skills to move forward, and the support of a community that encouraged me every step of the way.",
    sectionTitle: "The Skills To Move Forward",
  },
  {
    name: "Sheisty",
    image: "/images/testimonial/sheisty.png",
    quote:
      "When I came into EW, I was honestly lost. I had just turned 19, and I didn't know where I was really going. But I learned so much here, from Biggz, from Nas, from Tine, even from arguing with my peers. I learned how to control my emotions, how to communicate, how to present myself, how to really approach life differently.",
  },
  {
    name: "Nashid",
    image: "/images/testimonial/nashid.png",
    quote:
      "Emergent Works gave me the tools to successfully navigate the digital landscape of remote work, where success depends on communication, self-advocacy, and professional presence as much as the technical skills. The safe spaces that the team created to work through my own insecurities and anxieties, are things that can't be quantified.",
    extendedQuote:
      "Thank you Army & Emergent Works for truly caring about real solutions, just not the problems.",
  },
  {
    name: "Blueberry",
    quote:
      "Overall, the Program at Emergent Works has been a life-changing experience, equipping me with the skills, knowledge, and support needed to advance my career and personal growth.",
  },
  {
    name: "Lakresha",
    sectionTitle: "Stepping Out Of My Comfort Zone",
    quote:
      "This program motivated me to step out of my comfort zone in so many ways, and I gained useful knowledge and skill in Digital literacy that I did not have before.",
  },
  {
    name: "Julius",
    sectionTitle: "Break Down Any Barriers",
    quote:
      "Before joining Emergent Works I was pretty stagnant with my music career. But when I joined the program I saw how I can use my creative side to open the doors to places I have never been to. The highlight of being in the program was learning how I can apply my artistry in a studio session and it really set foot in me. It created a confidence in me to break down any barriers and just go for it.",
    program: "T.RAP",
  },
  {
    name: "CCA",
    quote:
      "Having Emergent Works as a part of our NextGen Network, our CCA reentry initiative, has been an immense reward. We truly value this partnership and the positive change it brings to our community. Your collaboration and commitment inspire us to keep building a brighter future for those we serve.",
  },
];

// Fabricated testimonials for richer designs
export const fabricatedTestimonials: Testimonial[] = [
  {
    name: "Marcus",
    quote:
      "I came home after eight years and didn't know how to use a smartphone properly. My mentor at EW didn't just teach me to code — she taught me that my past doesn't define my potential. Now I'm a junior developer at a tech startup, and I wake up every day knowing I'm building something real.",
    program: "TECK",
    fabricated: true,
  },
  {
    name: "Aisha",
    quote:
      "T.RAP gave me a voice when I felt like nobody was listening. Writing lyrics became my therapy, and the studio became my safe space. I never thought I'd be producing tracks for other artists, but here I am.",
    program: "T.RAP",
    fabricated: true,
  },
  {
    name: "DeShawn",
    quote:
      "The TECK program changed everything for me. I went from not knowing how to create a spreadsheet to managing digital operations for a nonprofit. The skills are important, but the confidence is what really changed my life.",
    program: "TECK",
    fabricated: true,
  },
  {
    name: "Priya",
    sectionTitle: "More Than Just Skills",
    quote:
      "As a mentor at Emergent Works, I thought I was just teaching someone to code. But my mentee taught me about resilience, about showing up when things are hard, about finding purpose in the struggle. This experience has made me a better engineer and a better human.",
    fabricated: true,
  },
  {
    name: "Terrence",
    quote:
      "I spent 12 years inside, and when I got out the whole world had changed. EW didn't just catch me up — they put me ahead. I built my first website in the program, and now I freelance full-time doing web development. My kids are proud of me, and honestly, I'm proud of me too.",
    program: "TECK",
    fabricated: true,
  },
  {
    name: "Sofia",
    sectionTitle: "Finding Community",
    quote:
      "What makes EW different is the community. Everyone here has a story, and everyone here is writing a new chapter. I found my people here — people who understand where I've been and believe in where I'm going.",
    fabricated: true,
  },
];

export const allTestimonials = [...testimonials, ...fabricatedTestimonials];
