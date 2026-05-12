export interface Testimonial {
  name: string;
  image?: string;
  quote: string;
  extendedQuote?: string;
  sectionTitle?: string;
  program?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Dontay",
    image: "/images/people/graduates/dontay.png",
    quote:
      "This program reminded me that no matter what obstacles come my way, giving up can't be an option. There were moments where I doubted myself or felt like things were too hard, but being a part of this program showed me that persistence pays off. I learned that progress doesn't always happen overnight.",
  },
  {
    name: "Zeek",
    image: "/images/people/graduates/zeek.png",
    quote:
      "This program has truly impacted my life by giving me the confidence to grow, the skills to move forward, and the support of a community that encouraged me every step of the way.",
    sectionTitle: "The Skills To Move Forward",
  },
  {
    name: "Sheisty",
    image: "/images/people/graduates/sheisty.png",
    quote:
      "When I came into EW, I was honestly lost. I had just turned 19, and I didn't know where I was really going. But I learned so much here, from Biggz, from Nas, from Tine, even from arguing with my peers. I learned how to control my emotions, how to communicate, how to present myself, how to really approach life differently.",
  },
  {
    name: "Nashid",
    image: "/images/people/graduates/nashid.png",
    quote:
      "Emergent Works gave me the tools to successfully navigate the digital landscape of remote work, where success depends on communication, self-advocacy, and professional presence as much as the technical skills. The safe spaces that the team created to work through my own insecurities and anxieties, are things that can't be quantified.",
    extendedQuote:
      "Thank you Army & Emergent Works for truly caring about real solutions, just not the problems.",
  },
  {
    name: "Blueberry",
    image: "/images/people/graduates/blueberry.png",
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
    image: "/images/people/graduates/julius.png",
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
  // Real graduate testimonials — featured stories
  {
    name: "Terrence",
    image: "/images/people/graduates/terrence.png",
    program: "TECK",
    sectionTitle: "EW Gives You Constant Support",
    quote:
      "The EW experience was amazing, it gave me a complete connection of my technical skills, with being able to speak to teachers and mentors in real time. EW gives you constant support at every step of the process, all they ask if that you make the leg work to show you are committed to the process as well as yourself and making sure you are the best you can be to achieve your goals. I use my skills everyday currently. Today I work for a tech company as a junior software engineer thanks to EW, and am able to use my skills everyday at my work place as well as expand on my skills and knowledge. I've enjoyed it greatly and relish in the challenge of this new job. I'm forever grateful that when I do need help my mentor and EW family are in my corner.",
  },
  {
    name: "Kat",
    image: "/images/people/graduates/kat.png",
    program: "TECK",
    sectionTitle: "A Cornerstone in My Transition",
    quote:
      "Emergent Works has profoundly impacted my life, not only by equipping me with invaluable technical skills but also by boosting my confidence and connecting me with an incredible network of people. The hands-on experience with tools like Airtable and the successful completion of complex projects have empowered me to pursue a career in tech with renewed self-assurance. Beyond the skills, the mentorship and support I received have been transformative, helping me realize my potential and aspirations. The relationships I've built with my cohort members—an inspiring group of talented and wonderful individuals—have enriched my journey, providing both professional connections and personal friendships. This experience has been a cornerstone in my transition back to society, setting a solid foundation for my future endeavors. I literally tell everyone I know who has been justice-impacted about this cohort.",
  },
  {
    name: "Nas",
    program: "T.RAP",
    sectionTitle: "Life Has Been Transformational",
    quote:
      "Before Joining EW, I wasn't confident in myself and didn't know what to do career wise. But when I came here, and built with the team that were genuine and wanted to see me win, it made me believe in myself. Being in the program I gained significant growth and development as well as gained mentoring skills and learned how to do photography. EW gave me the opportunity to do my own documentary and apply my learned skills. Life after the program has been transformational, I see myself in places I never thought I would be. Now being a manager at my job as well as being a Peer Mentor for EW running the T.RAP program in Staten Island as well as starting a new cohort at our EW site and it all started with the confidence from being here.",
  },
  // Real graduate testimonials — carousel expansion
  {
    name: "Makeda",
    program: "TECK",
    image: "/images/people/graduates/makeda.png",
    sectionTitle: "EW's Support Was Crucial",
    quote:
      "EW's support was crucial in helping me persevere after a 9.5-year prison sentence. Today, I am proud to say I am a successful software engineer.",
  },
  {
    name: "Maria",
    program: "TECK",
    image: "/images/people/graduates/maria.png",
    sectionTitle: "Awesome Program",
    quote:
      "I gained confidence in coding at EW & as a result, I landed a full-time job w/ The Walt Disney Company. Awesome program!",
  },
  {
    name: "Wayne",
    program: "TECK",
    image: "/images/people/graduates/wayne.png",
    sectionTitle: "EW Gave Me The Confidence",
    quote:
      "EW gave me the confidence and tools needed to reach my dream of working with data in the tech industry!",
  },
  {
    name: "Crystal",
    program: "TECK",
    image: "/images/people/graduates/crystal.png",
    sectionTitle: "Changed My Life",
    quote:
      "Melissa was an amazing mentor, she encouraged me and allowed me to thoroughly process and then implement the learnings. We plan to keep in touch, the ability to meet a stranger who took an active role in empowering me has been a godsend.",
  },
  {
    name: "Rahiem",
    program: "T.RAP",
    image: "/images/people/graduates/rahiem.png",
    sectionTitle: "It Showed Me The Light",
    quote:
      "The program showed me the light that there's opportunity out there for us just have to go out and make it work put in the time effort dedication to what you want in life and it will be accessible.",
  },
  {
    name: "Kindel",
    program: "T.RAP",
    image: "/images/people/graduates/kindel.png",
    sectionTitle: "The Program Meant A Lot",
    quote:
      "The program meant a lot to me a place to begin greatness and with fellow mates couldn't ask for more it impacted me for the better just overall growing into man, father, artist etc.",
  },
];

// Real mentor testimonials
export const mentorTestimonials: Testimonial[] = [
  {
    name: "Meagan",
    image: "/images/people/mentors/meagan.png",
    program: "TECK",
    quote:
      "I've really enjoyed getting to know Lori. I'm SO impressed by her commitment to learning and how quickly she's picking up all these new skills. This is my second time mentoring for Digital Literacy Skills cohort and it's so different, in a good way. Now, the students benefit from class time with an instructor twice a week, and Lori and I meet weekly. Sometimes we go over exercises or we'll talk in greater depth about concepts she's learning in class. She is thoughtful about how she'll apply what she's learning to her career and I can't wait to see what she does next. She works hard and she is a star.",
  },
  {
    name: "Dawn",
    image: "/images/people/mentors/dawn.png",
    program: "TECK",
    quote:
      "It was a perfect pairing between me and Blueberry. It's been a pleasure to get to know Blueberry we have so much in common. Her mindset and outlook is so positive and has already accomplished so much. I see that she can manifest anything she puts her mind to. I am grateful to be a part of her journey and see her grow in design. She already had knowledge of CMS and is currently using her new skills designing for the user in refreshing her own website. I'm excited to see how everything turns out. In our sessions, we focus a lot on learning Figma and developing personas to better understand the user we are designing for. Blueberry is advancing her skills in Figma at an impressive pace.",
  },
  {
    name: "Melissa",
    image: "/images/people/mentors/melissa.png",
    program: "TECK",
    quote:
      "Mentoring Kat has been such a joy. She puts so much time in learning UX design that when it comes to our sessions, it feels more like conversations than teaching. It's become my favorite part of the week. Kat and I have been reviewing her portfolio and freelance websites. I love seeing Kat's progression in her website designs. She already has a good eye for design. So using her new skillsets has made her website better! My favorite part is watching her explore new opportunities that she didn't have prior to learning technical skills.",
  },
];
