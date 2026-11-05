/**
 * All of the website's words, prices and links live in this file.
 * Edit the text between the quotes, save, and the site updates.
 * You should not need to touch any other file to change the content.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

/** A service package, as served by the admin panel's API. */
export type Service = {
  /** The web address: /services/your-slug */
  slug: string;
  name: string;
  forWho: string;
  /** Price in pounds, as a plain number. */
  price: number;
  priceSuffix?: string | null;
  /** Only for monthly services. Tells search engines the price is per month. */
  billedMonthly?: boolean;
  timeLabel: string;
  time: string;
  includes: string[];
  /** The rest is used on the service's own page. */
  heading: string;
  intro: string;
  story: string[];
  idealFor: string[];
  faq: FaqItem[];
  /** Case studies to link to, using each project's slug. */
  relatedProjects: string[];
  /** For search engines. The admin panel fills gaps from the heading, intro and name. */
  seo: { title: string; description: string; keywords: string[] };
  /** Last edited in the admin panel (YYYY-MM-DD), for the sitemap. */
  updatedAt?: string | null;
};

/** A case study, as served by the admin panel's API. */
export type Project = {
  slug: string;
  title: string;
  /** true shows a visible "Demo project" label. Set to false for real client work. */
  isDemo: boolean;
  category: string;
  /** The year the project was made. */
  year: string;
  /** The service this project links to, using the service's slug. */
  relatedService?: string | null;
  /** The three short lines on the home page card. */
  problem: string;
  solution: string;
  result: string;
  /** Used on the case study page. */
  overview: string;
  clientProblem: string;
  built: string[];
  tech: string[];
  results: string[];
  cover: { src: string; alt: string };
  screenshots: { src: string; alt: string; caption: string }[];
  /** For search engines. The admin panel fills gaps from the title, overview and tech used. */
  seo: { title: string; description: string; keywords: string[] };
  /** Last edited in the admin panel (YYYY-MM-DD), for the sitemap. */
  updatedAt?: string | null;
};

/** A client testimonial, as served by the admin panel's API. */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Optional star rating out of 5, only if the client actually gave one. */
  rating?: number | null;
  /** Full address of an uploaded photo, or null to show initials. */
  photo?: string | null;
};

/** A job in the Experience section, as served by the admin panel's API. */
export type Job = {
  role: string;
  company: string;
  companyUrl?: string | null;
  /** For example "Full-time", "Part-time", "Contract" or "Freelance". */
  type: string;
  location?: string | null;
  /** For example "Jan 2024". */
  start: string;
  /** Empty for the current job, which then shows as "Present". */
  end?: string | null;
  summary: string;
  highlights: string[];
  tech: string[];
};

/** A technology in the Tech stack section, as served by the admin panel's API. */
export type TechItem = {
  name: string;
  /** Full address of the uploaded logo, or null to show the first two letters. */
  logo: string | null;
};

export const site = {
  name: "Shykat Roy",
  initials: "SR",
  url: "https://shykatroy.com",
  // Only used if the admin panel can't be reached. Everywhere else the email comes from
  // Site settings → Person → Email in the admin panel.
  email: "shykatroy1@gmail.com",
  // WhatsApp number in international format, digits only (e.g. "8801712345678").
  // The floating WhatsApp button stays hidden until this is filled in.
  whatsapp: {
    number: "8801317120335",
    message: "Hi Shykat, I found your website and would like to talk about a project.",
    label: "Chat on WhatsApp",
  },
  backToTop: "Back to top",
  jobTitle: "Full-Stack Web Developer",
  // Used when the admin panel has no description or current job set.
  bio: "Shykat Roy is a full-stack web developer based in Dhaka, Bangladesh, with over three years of professional experience in PHP, Laravel, React, Next.js and Node.js.",
  worksFor: { name: "PFEC Global", url: null },
  // Shown to search engines as the skills you are known for.
  skills: [
    "Full-stack web development",
    "Web application development",
    "Mobile app development",
    "PHP",
    "Laravel",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "MySQL",
    "REST APIs",
    "Technical SEO",
    "Website performance optimisation",
  ],
  languages: ["English", "Bengali"],
  // Change this date when you make big content changes. Search engines read it.
  lastUpdated: "2026-11-01",
  location: { city: "Dhaka", country: "Bangladesh", countryCode: "BD" },

  seo: {
    title: "Full-Stack Developer – Laravel, React & Next.js | Shykat Roy",
    description:
      "Freelance full-stack developer (Laravel, React, Next.js, Node.js) building fast, SEO-friendly websites, web apps and mobile apps for businesses worldwide.",
  },

  links: {
    linkedin: "https://www.linkedin.com/in/shykat-roy/",
    github: "https://github.com/shykat199",
    // Paste your Calendly or Cal.com link here. While it is empty, every
    // booking button takes visitors to the contact form instead.
    booking: "",
  },

  nav: [
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/#work" },
    { label: "Process", href: "/#process" },
    { label: "Experience", href: "/#experience" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],

  cta: {
    header: "Book a free call",
    hero: "Book a free 15-min call",
    work: "See my work",
  },

  hero: {
    // The line above the headline. The words are typed out one at a time.
    eyebrow: {
      prefix: "I build",
      words: ["websites", "web apps", "mobile apps", "booking systems", "APIs & back ends"],
    },
    // The page's main heading (H1). Google reads it first, so it leads with the
    // main search phrase and stays unique to this page.
    headline: "Full-stack web developer for fast, SEO-friendly websites that win more customers.",
    // These words of the headline appear in colour. They must match exactly.
    headlineHighlight: "more customers",
    supporting:
      "I'm Shykat Roy, a full-stack web developer who designs and builds custom websites, web applications and mobile apps that turn visitors into calls, bookings and enquiries. Fixed price, no surprises.",
    signature: "Shykat Roy, working with you directly from start to finish",
    // The code panel beside the headline. Keep each value short so it fits on phones.
    code: {
      fileName: "your-website.ts",
      comment: "Built around your business",
      description:
        "A code editor showing a project that can be a website, web app or mobile app, described as fast on phones, made for your brand, with an optimised database, clean and scalable code, search-engine friendly, with AI chat and automation, with the goal of more customers.",
      entries: [
        { key: "build", value: "web & mobile apps" },
        { key: "speed", value: "fast on phones" },
        { key: "design", value: "made for your brand" },
        { key: "database", value: "optimised for speed" },
        { key: "approach", value: "clean, scalable code" },
        { key: "seo", value: "search-engine friendly" },
        { key: "ai", value: "AI chat & automation" },
        { key: "goal", value: "more customers" },
      ],
      status: "Ready to launch",
    },
  },

  trust: [
    { title: "3+ years", text: "of professional web development" },
    { title: "Always available", text: "support whenever you need it, any time zone" },
    { title: "Fixed prices", text: "agreed up front, with no surprises" },
    { title: "Full-stack", text: "React & Next.js front end, PHP Laravel & Node.js back end" },
  ],

  services: {
    eyebrow: "Services",
    title: "Web development services with clear prices",
    intro:
      "From business website design to custom booking systems and ongoing website maintenance, every package is built for more customers and less admin. Pick the one that fits, and I will confirm a fixed price before any work begins.",
    note: "Prices are starting points. Your fixed quote depends on the size of your project.",
    linkLabel: "See full details",
    fromLabel: "From",
    // The service packages themselves are managed in the admin panel.
  },

  work: {
    eyebrow: "Selected work",
    title: "Web design and development projects",
    intro:
      "Demo website projects that show how I approach a brief, from design to development. Each one is clearly labelled.",
    demoLabel: "Demo project",
    linkLabel: "Read the case study",
    labels: { problem: "Problem", solution: "Solution", result: "Result" },
    // The projects themselves are managed in the admin panel.
  },

  // The tech stack section. Items are spread across three rows that scroll
  // sideways in alternating directions.
  stack: {
    eyebrow: "Tech stack",
    title: "My full-stack development tech stack",
    intro: "Modern, proven technology for the front end and back end, from React and Next.js to PHP, Laravel and Node.js, chosen to keep your website fast, secure, SEO-friendly and easy to grow.",
    // The technologies themselves are managed in the admin panel (name and logo).
  },

  process: {
    eyebrow: "Process",
    title: "Four simple steps",
    intro: "A clear web development process: you will always know what is happening, what comes next and what it costs.",
    steps: [
      {
        title: "Free call",
        text: "We have a relaxed 15-minute chat about your business and what you need.",
      },
      {
        title: "Plan & fixed quote",
        text: "I send a clear plan and one fixed price, so you know exactly what you are getting.",
      },
      {
        title: "Build with weekly updates",
        text: "I build your website and show you the progress every week. Your feedback shapes it.",
      },
      {
        title: "Launch & support",
        text: "We go live together, and I stay on hand to make sure everything runs smoothly.",
      },
    ],
  },

  about: {
    eyebrow: "About",
    title: "Hello, I'm Shykat",
    photo: {
      src: "/images/shykat-roy-portrait.jpg",
      alt: "Portrait of Shykat Roy, wearing glasses and a dark blazer",
      width: 660,
      height: 626,
    },
    story: [
      "I'm a full-stack web developer with more than 3 years of professional experience building websites and web applications with PHP, Laravel, React, Next.js and Node.js. I'm based in Dhaka, Bangladesh, and I work remotely with businesses all over the world, fitting around your time zone.",
      "I started freelancing because small businesses deserve fast, secure, search-engine-friendly websites as good as the big names have, without agency prices or confusing jargon.",
    ],
    reasonsTitle: "Why you can rely on me",
    reasons: [
      "You work directly with me, from the first call to launch and beyond",
      "You get one fixed price before any work begins",
      "You see progress every week, so there are no surprises",
      "I reply during your working day, wherever you are",
    ],
    more: "More about me",
  },

  // The About page (/about). Your name, job, story, jobs, skills and links
  // come from the admin panel, so they match the rest of the site.
  aboutPage: {
    eyebrow: "About me",
    facts: {
      role: "Role",
      company: "Currently at",
      location: "Based in",
      experience: "Experience",
      languages: "Languages",
      email: "Email",
    },
    // "{years}" is replaced with the years since your first job in Experience.
    experienceYears: "{years}+ years",
    story: "My story",
    skills: "Skills",
    profiles: "Find me online",
    resume: "Download my résumé",
    ctaTitle: "Want to work together?",
    ctaText: "Book a free 15-minute call and tell me about your project.",
  },

  // The QR code on the About page and in the Contact section. Scanning it saves
  // your website, email and phone (from the admin panel) as a phone contact.
  contactQr: {
    title: "Scan to save my contact",
    save: "Save contact",
    share: "Share QR code",
    shareShort: "Share",
    // "{name}" is replaced with your name from the admin panel.
    shareTitle: "{name} – contact QR code",
    shareText: "Scan this QR code to save {name}'s website, email and phone number.",
  },

  career: {
    eyebrow: "Experience",
    title: "Full-stack developer experience",
    intro: "My professional journey so far, with my current role first.",
    present: "Present",
    current: "Now",
    // The jobs themselves are managed in the admin panel. This section stays
    // hidden until at least one job is shown there.
  },

  testimonials: {
    eyebrow: "Testimonials",
    title: "What clients say",
    intro: "Feedback from businesses I have built websites and apps for.",
    // The testimonials themselves are managed in the admin panel. The section
    // stays hidden on the live site until at least one is shown there.
  },

  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    intro: "Quick answers about pricing, timelines, technology and working together.",
    askTitle: "Still have a question?",
    askText: "Send me a message and I will reply within one working day.",
    askLabel: "Ask me directly",
    // The questions themselves are managed in the admin panel.
  },

  contact: {
    eyebrow: "Get in touch",
    title: "Ready for more customers?",
    text: "Book a free 15-minute call, or send me a message and I will reply within one working day.",
    emailPrompt: "Prefer email?",
    formTitle: "Send me a message",
    fields: {
      name: "Your name",
      email: "Email address",
      business: "Business name",
      website: "Website (optional)",
      message: "How can I help?",
    },
    // Example text shown inside each empty field.
    placeholders: {
      name: "e.g. Sarah Thompson",
      email: "e.g. sarah@yourbusiness.com",
      business: "e.g. Thompson Plumbing",
      website: "e.g. yourbusiness.com",
      message: "Tell me a little about your business and what you need, e.g. a new website, online booking or help with an existing site.",
    },
    submit: "Send message",
    sending: "Sending...",
    // Shown in a toast after sending; the form is cleared for another message.
    successTitle: "Message sent",
    success: "Thank you. Your message is on its way, and I will reply within one working day.",
    closeToast: "Close",
    invalid: "Please check the highlighted fields and try again.",
    failure: "Sorry, your message could not be sent. Please email me directly at",
    privacyNote: "I only use your details to reply to your enquiry. Read the",
    privacyLink: "privacy policy",
  },

  caseStudy: {
    yearLabel: "Year",
    relatedService: "Related service",
    overview: "Overview",
    problem: "The client's problem",
    built: "What I built",
    tech: "Tech used",
    results: "Results",
    screenshots: "Screenshots",
    ctaTitle: "Want something like this for your business?",
    ctaText: "Book a free 15-minute call and we can talk through what you need.",
  },

  breadcrumbs: {
    label: "Breadcrumb",
    home: "Home",
    services: "Services",
    work: "Work",
    blog: "Blog",
    about: "About",
  },

  servicePage: {
    whoFor: "Who it's for",
    included: "What's included",
    price: "Price",
    priceNote: "One fixed price, agreed before any work begins.",
    process: "How it works",
    related: "Related work",
    faq: "Frequently asked questions",
    other: "Other services",
    ctaTitle: "Let's talk about your business",
    ctaText: "Book a free 15-minute call, with no pressure and no jargon.",
  },

  privacy: {
    title: "Privacy policy",
    description:
      "How shykatroy.com uses the information you send through the contact form, and how to ask for it to be deleted.",
    updated: "1 November 2026",
    sections: [
      {
        title: "Who I am",
        body: [
          "This website is run by Shykat Roy, a freelance web developer based in Dhaka, Bangladesh. I am responsible for the personal information you share through this website.",
        ],
      },
      {
        title: "What the contact form collects",
        body: [
          "When you send a message, the form collects your name, email address, business name, your website (if you give it) and your message.",
        ],
      },
      {
        title: "Why I collect it",
        body: [
          "I use your details only to reply to your enquiry and to talk with you about your project. My lawful basis under data protection laws such as the GDPR is legitimate interests, because you have asked me to get in touch. I never sell your details or add you to a mailing list.",
        ],
      },
      {
        title: "Who handles it",
        body: [
          "Form messages are delivered by Resend, an email service, and this website is hosted by Vercel. I use Vercel Web Analytics to count page visits. It does not use cookies or identify individual visitors. These companies may process data in other countries, including the United States, under their own data protection safeguards. I read and store your messages from Bangladesh.",
        ],
      },
      {
        title: "How long I keep it",
        body: [
          "I keep enquiries for up to 12 months, unless we go on to work together. If we do, I keep the records I need for that work and for my accounts.",
        ],
      },
      {
        title: "Your rights and data deletion",
        body: [
          "You can ask to see, correct or delete your information at any time. Email {email} with the subject line \"Data request\" and I will respond within one month.",
          "If you are unhappy with how your data has been handled, please contact me first. You also have the right to complain to the data protection authority in your country.",
        ],
      },
      {
        title: "Cookies",
        body: [
          "This website does not use cookies for advertising, tracking or analytics, so there is no cookie banner.",
        ],
      },
    ],
  },

  notFound: {
    eyebrow: "Error 404",
    title: "Sorry, that page isn't here",
    text: "It may have moved, or the link may be wrong. Here are some good places to carry on.",
    link: "Back to the home page",
    contact: "Tell me what you were looking for",
    // The small code window next to the big "404".
    code: {
      fileName: "request.log",
      description: "A request for this page that came back with 404 Not Found",
      request: "GET /this-page",
      response: "404 Not Found",
      comment: "Nothing here, but the rest of the site is fine.",
      status: "Try one of the links below",
    },
    suggestions: "You might be looking for",
    // Links to home page sections are left out while that section is switched off in the admin panel.
    links: [
      { label: "Services", href: "/#services", text: "Websites, web apps and SEO, each at one fixed price." },
      { label: "Work", href: "/#work", text: "Case studies of projects I've built for clients." },
      { label: "About me", href: "/about", text: "My background, experience, skills and résumé." },
      { label: "Blog", href: "/blog", text: "Practical guides on websites, speed and search." },
      { label: "FAQ", href: "/#faq", text: "Answers to what clients usually ask first." },
      { label: "Contact", href: "/#contact", text: "Send me a message about your project." },
    ],
  },

  footer: {
    tagline: "Websites for businesses worldwide.",
    servicesLabel: "Services",
    privacy: "Privacy policy",
    rights: "All rights reserved.",
  },
};
