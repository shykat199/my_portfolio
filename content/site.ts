/**
 * All of the website's words, prices and links live in this file.
 * Edit the text between the quotes, save, and the site updates.
 * You should not need to touch any other file to change the content.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export type Service = {
  /** The web address: /services/your-slug */
  slug: string;
  name: string;
  forWho: string;
  /** Price in pounds, as a plain number. */
  price: number;
  priceSuffix?: string;
  /** Only for monthly services. Tells search engines the price is per month. */
  billedMonthly?: boolean;
  timeLabel: string;
  time: string;
  includes: string[];
  /** The rest is used on the service's own page. */
  seoTitle: string;
  heading: string;
  /** Also used as the page's description in Google. Aim for 120 to 160 characters. */
  intro: string;
  story: string[];
  idealFor: string[];
  faq: FaqItem[];
  /** Case studies to link to, using each project's slug. */
  relatedProjects: string[];
};

export type Project = {
  slug: string;
  title: string;
  /** true shows a visible "Demo project" label. Set to false for real client work. */
  isDemo: boolean;
  category: string;
  /** The year the project was made. */
  year: string;
  /** The service this project links to, using the service's slug. */
  relatedService: string;
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
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Optional star rating out of 5, only if the client actually gave one. */
  rating?: number;
};

export type Job = {
  role: string;
  company: string;
  companyUrl?: string;
  /** For example "Full-time", "Part-time", "Contract" or "Freelance". */
  type: string;
  location?: string;
  /** For example "Jan 2024". */
  start: string;
  /** Leave this out for the job you are doing now. It then shows as "Present". */
  end?: string;
  summary: string;
  highlights: string[];
  tech: string[];
};

export const site = {
  name: "Shykat Roy",
  initials: "SR",
  url: "https://shykatroy.com",
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
    { label: "About", href: "/#about" },
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
    items: [
      {
        slug: "small-business-website-design",
        name: "Business website",
        forWho:
          "For businesses that need a professional website that wins trust and brings in enquiries.",
        price: 695,
        timeLabel: "Delivery",
        time: "2 to 3 weeks",
        includes: [
          "Up to 5 custom-designed pages",
          "Looks great on phones, tablets and computers",
          "Contact form and tap-to-call buttons",
          "Set up to be found on Google",
          "Two rounds of changes",
        ],
        seoTitle: "Small Business Website Design & Development",
        heading: "Website design for small businesses",
        intro:
          "Professional small business website design and development: fast, mobile-friendly and SEO-ready, built to bring in enquiries. Fixed price from £695.",
        story: [
          "Your website is often the first thing a new customer sees. If it is slow, out of date or hard to use on a phone, they leave and call someone else. I design and build websites that make a good first impression and make it easy for people to get in touch.",
          "You won't get a template with your logo dropped in. Each page is designed around what your customers need to know and the one thing you want them to do next, whether that is calling you, sending an enquiry or visiting you.",
        ],
        idealFor: [
          "Local businesses that do not have a website yet",
          "Businesses with an old website that looks poor on phones",
          "Clinics, salons, restaurants, trades and other service businesses",
          "Owners who want a clear price and one person to deal with",
        ],
        faq: [
          {
            question: "How much does a small business website cost?",
            answer:
              "A business website starts from £695. I will confirm one fixed price after our free call, based on the number of pages and what you need.",
          },
          {
            question: "Can you redesign my existing website?",
            answer:
              "Yes. I can rebuild your website and move your useful content across, so you keep what works and lose what doesn't.",
          },
          {
            question: "Will my website show up on Google?",
            answer:
              "I set up every website so Google can read it properly, with clear page titles and fast loading. Ranking takes time and no one can honestly promise first place, but you will have a strong foundation.",
          },
        ],
        relatedProjects: ["clinic-website", "trades-quotes"],
      },
      {
        slug: "online-booking-websites",
        name: "Website + online booking",
        forWho:
          "For businesses that take appointments and want to spend less time on the phone.",
        price: 1295,
        timeLabel: "Delivery",
        time: "4 to 5 weeks",
        includes: [
          "Everything in the Business website package",
          "Customers can book online, day or night",
          "Automatic email confirmations and reminders",
          "A simple page to manage your bookings",
          "A walkthrough showing you how it all works",
        ],
        seoTitle: "Online Booking Website Development",
        heading: "Booking websites for small businesses",
        intro:
          "A custom online booking website where customers book 24/7, with automatic confirmations and reminders. Less admin for you, at a fixed price from £1,295.",
        story: [
          "Every appointment taken by phone or message is time away from your customers, and every missed call may be a lost booking. An online booking website lets people choose a service and a time themselves, even when you are closed.",
          "Your customers get an instant confirmation and a reminder before they arrive, which helps reduce no-shows. You get one simple page showing what is coming up, so there is no need to pay for separate booking apps you don't fully use.",
        ],
        idealFor: [
          "Salons, barbers and beauty businesses",
          "Clinics, therapists and other health practices",
          "Restaurants and other businesses that take reservations",
          "Any business that spends too long arranging appointments",
        ],
        faq: [
          {
            question: "How much does a booking website cost?",
            answer:
              "A website with online booking starts from £1,295. Your fixed price depends on things like how many services and staff calendars you need.",
          },
          {
            question: "Can customers book from their phones?",
            answer:
              "Yes. The booking steps are designed for phones first, because that is where most of your customers will book.",
          },
          {
            question: "Will I be able to manage bookings myself?",
            answer:
              "Yes. You get a simple page to see and manage your bookings, and I will walk you through how it all works before launch.",
          },
        ],
        relatedProjects: ["salon-booking"],
      },
      {
        slug: "website-care-plans",
        name: "Monthly care plan",
        forWho:
          "For business owners who want their website looked after, so they never have to think about it.",
        price: 49,
        priceSuffix: "/month",
        billedMonthly: true,
        timeLabel: "Starts",
        time: "Straight after launch",
        includes: [
          "Reliable hosting",
          "Regular updates and security checks",
          "Up to 1 hour of small changes each month",
          "Help by email, whatever your time zone",
          "No long contract: cancel with 30 days' notice",
        ],
        seoTitle: "Website Maintenance & Care Plans",
        heading: "Website maintenance and care plans for small businesses",
        intro:
          "Website maintenance made simple: reliable hosting, security updates and small changes, all looked after from £49 a month. No long contract.",
        story: [
          "A website needs looking after, just like your premises. Without regular care, things go out of date, small problems grow and your opening hours or prices stop matching reality.",
          "The care plan takes all of that off your list. I keep your website online, up to date and secure, and when you need a change you just send me an email. You get a real person to talk to, not a support ticket.",
        ],
        idealFor: [
          "Owners who would rather not think about their website",
          "Businesses that often change prices, menus or opening hours",
          "Anyone who wants help on hand when they need it",
          "Clients who have had a website built by me",
        ],
        faq: [
          {
            question: "What counts as a small change?",
            answer:
              "Things like updating prices, adding photos, changing opening hours or editing text. The plan includes up to 1 hour of changes each month.",
          },
          {
            question: "Can I cancel my care plan?",
            answer:
              "Yes. There is no long contract, and you can cancel with 30 days' notice.",
          },
          {
            question: "Do you look after websites you didn't build?",
            answer:
              "Often, yes. Get in touch and tell me about your website, and I will take a look and let you know honestly if I can help.",
          },
        ],
        relatedProjects: ["clinic-website", "salon-booking"],
      },
    ] satisfies Service[],
  },

  work: {
    eyebrow: "Selected work",
    title: "Web design and development projects",
    intro:
      "Demo website projects that show how I approach a brief, from design to development. Each one is clearly labelled.",
    demoLabel: "Demo project",
    linkLabel: "Read the case study",
    labels: { problem: "Problem", solution: "Solution", result: "Result" },
    // These are placeholders. Replace them with your real projects, or set
    // isDemo to true on anything that is a concept rather than client work.
    projects: [
      {
        slug: "clinic-website",
        title: "Website for a local clinic",
        isDemo: true,
        category: "Clinic",
        year: "2026",
        relatedService: "small-business-website-design",
        problem:
          "Patients could not find opening times or treatments on their phones, so the front desk took the same calls all day.",
        solution:
          "A clear, phone-friendly website with treatments, prices and opening hours one tap away.",
        result:
          "Designed to answer common questions online and free up the front desk.",
        overview:
          "A concept website for a small, independent clinic. The brief was to look calm and trustworthy, and to help patients find what they need without picking up the phone.",
        clientProblem:
          "Many small clinics have websites built years ago, before most patients searched on their phones. Important details are buried, pages load slowly and staff answer the same questions again and again.",
        built: [
          "A home page that shows treatments, opening hours and contact details straight away",
          "A simple page for each treatment, written in plain English",
          "Tap-to-call and directions buttons on every page",
          "An enquiry form that sends messages directly to the clinic's inbox",
        ],
        tech: ["React", "Next.js"],
        results: [
          "This is a demo project, so it has no real-world results yet.",
          "It is designed to reduce repeat phone calls and make it easier for new patients to get in touch.",
        ],
        cover: {
          src: "/images/work/clinic-cover.webp",
          alt: "Demo clinic website shown in a browser window, with a calm green and cream design",
        },
        screenshots: [
          {
            src: "/images/work/clinic-cover.webp",
            alt: "Home page of the demo clinic website",
            caption: "The home page puts treatments and opening hours first.",
          },
          {
            src: "/images/work/clinic-detail.webp",
            alt: "Treatments page of the demo clinic website, with a grid of treatments",
            caption: "Treatments are easy to scan and compare.",
          },
        ],
      },
      {
        slug: "salon-booking",
        title: "Online booking for a hair salon",
        isDemo: true,
        category: "Salon",
        year: "2026",
        relatedService: "online-booking-websites",
        problem:
          "Bookings came in through phone calls and social media messages, which meant missed appointments and hours of admin.",
        solution:
          "A stylish website where customers choose a service and book a time themselves.",
        result:
          "Designed to take bookings around the clock and cut back on admin.",
        overview:
          "A concept website and booking system for a neighbourhood hair salon, designed to feel stylish and personal and to make booking take less than a minute.",
        clientProblem:
          "When bookings arrive through phone calls and direct messages, it is easy to miss one or double-book a chair. Staff stop what they are doing to reply, and customers who get no answer may go elsewhere.",
        built: [
          "A service menu with clear prices and appointment lengths",
          "A step-by-step booking flow that works well on phones",
          "Email confirmations and reminders to help reduce no-shows",
          "A simple page for the salon to see and manage upcoming bookings",
        ],
        tech: ["React", "Next.js"],
        results: [
          "This is a demo project, so it has no real-world results yet.",
          "It is designed to let customers book at any time and give the salon back time spent on messages.",
        ],
        cover: {
          src: "/images/work/salon-cover.webp",
          alt: "Demo hair salon website shown in a browser window, with a warm terracotta design",
        },
        screenshots: [
          {
            src: "/images/work/salon-cover.webp",
            alt: "Home page of the demo salon website",
            caption: "Booking is the main action on every page.",
          },
          {
            src: "/images/work/salon-detail.webp",
            alt: "Service menu of the demo salon website, shown as a grid",
            caption: "Customers can see services and prices at a glance.",
          },
        ],
      },
      {
        slug: "trades-quotes",
        title: "Quote requests for a local trade",
        isDemo: true,
        category: "Trades",
        year: "2026",
        relatedService: "small-business-website-design",
        problem:
          "A busy tradesperson was relying on word of mouth and had no easy way for new customers to ask for a quote.",
        solution:
          "A straightforward website with services, areas covered and a short quote request form.",
        result:
          "Designed to bring in better enquiries from the right local area.",
        overview:
          "A concept website for a local trades business. The brief was to look dependable, show where the business works and make asking for a quote quick from a phone.",
        clientProblem:
          "Good tradespeople often rely on recommendations alone. Without a proper website, new customers cannot check they are trustworthy, and enquiries arrive with too little detail to quote from.",
        built: [
          "Clear pages for each service and the areas covered",
          "A short quote form that asks for the details that matter",
          "A tap-to-call button that stays within reach on phones",
          "Set-up to help the business appear in local Google searches",
        ],
        tech: ["React", "Next.js"],
        results: [
          "This is a demo project, so it has no real-world results yet.",
          "It is designed to win trust quickly and bring in enquiries with the right details.",
        ],
        cover: {
          src: "/images/work/trades-cover.webp",
          alt: "Demo trades website shown in a browser window, with a strong navy and yellow design",
        },
        screenshots: [
          {
            src: "/images/work/trades-cover.webp",
            alt: "Home page of the demo trades website",
            caption: "The first screen says what the business does and where.",
          },
          {
            src: "/images/work/trades-detail.webp",
            alt: "Services page of the demo trades website, shown as a grid",
            caption: "Services are laid out clearly, each with a route to a quote.",
          },
        ],
      },
    ] satisfies Project[],
  },

  // The tech stack section. Each row scrolls sideways; rows alternate direction.
  // "color" is the brand colour shown on the small badge beside each name.
  stack: {
    eyebrow: "Tech stack",
    title: "My full-stack development tech stack",
    intro: "Modern, proven technology for the front end and back end, from React and Next.js to PHP, Laravel and Node.js, chosen to keep your website fast, secure, SEO-friendly and easy to grow.",
    rows: [
      [
        { name: "React", color: "#61dafb" },
        { name: "Next.js", color: "#ffffff" },
        { name: "TypeScript", color: "#3178c6" },
        { name: "JavaScript", color: "#f7df1e" },
        { name: "Tailwind CSS", color: "#38bdf8" },
        { name: "HTML5", color: "#e34f26" },
        { name: "CSS3", color: "#1572b6" },
        { name: "Framer Motion", color: "#ff4d8d" },
      ],
      [
        { name: "PHP", color: "#777bb4" },
        { name: "Laravel", color: "#ff2d20" },
        { name: "Node.js", color: "#5fa04e" },
        { name: "Express", color: "#cccccc" },
        { name: "REST APIs", color: "#5ee0ae" },
        { name: "MySQL", color: "#4479a1" },
        { name: "PostgreSQL", color: "#4169e1" },
        { name: "MongoDB", color: "#47a248" },
        { name: "Redis", color: "#ff4438" },
      ],
      [
        { name: "Git", color: "#f05032" },
        { name: "GitHub", color: "#ffffff" },
        { name: "Docker", color: "#2496ed" },
        { name: "Vercel", color: "#ffffff" },
        { name: "Linux", color: "#fcc624" },
        { name: "Nginx", color: "#009639" },
        { name: "OpenAI API", color: "#10a37f" },
        { name: "Figma", color: "#f24e1e" },
      ],
    ],
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
  },

  career: {
    eyebrow: "Experience",
    title: "Full-stack developer experience",
    intro: "My professional journey so far, with my current role first.",
    present: "Present",
    current: "Now",
    // This section stays hidden until you add at least one job here, newest first, like:
    // {
    //   role: "Full-Stack Developer",
    //   company: "Company name",
    //   companyUrl: "https://company.com",
    //   type: "Full-time",
    //   location: "Dhaka, Bangladesh",
    //   start: "Jan 2024",
    //   summary: "One or two sentences about what you do there.",
    //   highlights: ["Something you built or improved", "Another achievement"],
    //   tech: ["Laravel", "React", "MySQL"],
    // },
    jobs: [
      {
        role: "Full-Stack Developer",
        company: "PFEC Global",
        companyUrl: "https://www.pfecglobal.com",
        type: "Full-time",
        start: "2025",
        summary:
          "Building and maintaining the company's web applications across the front end and back end, from user-facing pages to APIs and databases.",
        highlights: [],
        tech: ["PHP", "Laravel", "Node.js", "React", "Next.js", "MySQL"],
      },
      {
        role: "Full-Stack Developer",
        company: "Appsinception",
        type: "Full-time",
        start: "2023",
        end: "2025",
        summary:
          "Developed web applications for clients, working on both the front end and the back end.",
        highlights: [],
        tech: ["PHP", "Laravel", "React", "MySQL"],
      },
    ] as Job[],
  },

  testimonials: {
    eyebrow: "Testimonials",
    title: "What clients say",
    intro: "Feedback from businesses I have built websites and apps for.",
    // This section stays hidden until you add a real testimonial here, like:
    // { quote: "Their words here.", name: "Their name", role: "Owner, Business name", rating: 5 },
    items: [] as Testimonial[],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    intro: "Quick answers about pricing, timelines, technology and working together.",
    askTitle: "Still have a question?",
    askText: "Send me a message and I will reply within one working day.",
    askLabel: "Ask me directly",
    items: [
      {
        question: "How do payments work?",
        answer:
          "You pay 50% up front to book your project and the remaining 50% when your website is ready to launch. All prices are fixed and agreed before any work begins.",
      },
      {
        question: "What about the time difference?",
        answer:
          "It won't affect you. I'm based in Dhaka, Bangladesh, and I work with clients across many time zones. I adjust my hours so you can reach me during your normal working day.",
      },
      {
        question: "Who owns the website and code?",
        answer:
          "You do. Once your final payment is made, the website, its code and its content all belong to you. You are never locked in.",
      },
      {
        question: "How long does a project take?",
        answer:
          "A business website usually takes 2 to 3 weeks, and a website with online booking usually takes 4 to 5 weeks. I will confirm your timeline in your quote.",
      },
      {
        question: "What technologies do you use?",
        answer:
          "I'm a full-stack developer. On the front end I use React, Next.js, TypeScript and Tailwind CSS. On the back end I use PHP, Laravel and Node.js, with databases such as MySQL and PostgreSQL. I pick the right tools for your project, not the other way round.",
      },
      {
        question: "Will my website be SEO-friendly?",
        answer:
          "Yes. Every website I build is fast, mobile-friendly and set up for search engines, with clean page structure, proper titles and descriptions, structured data and a sitemap, so Google can find and understand your business.",
      },
      {
        question: "Do you work with clients outside Bangladesh?",
        answer:
          "Yes. I work remotely with businesses all over the world, including the UK, Europe, North America and Australia. We talk by email, video call or WhatsApp at times that suit you.",
      },
      {
        question: "Do you build web apps and mobile apps?",
        answer:
          "Yes. As well as websites, I build custom web applications such as dashboards, booking systems and customer portals, and mobile apps for iPhone and Android. The same back end can power your website, web app and mobile app together.",
      },
      {
        question: "Can you add AI features to my website?",
        answer:
          "Yes. I can add AI-powered features such as a chat assistant that answers customer questions, or automation that saves you time on routine tasks.",
      },
      {
        question: "Do you offer support after launch?",
        answer:
          "Yes. I fix any problems with my work for 30 days after launch at no extra cost. After that, the monthly care plan covers hosting, updates and small changes.",
      },
    ],
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
    success: "Thank you. Your message is on its way, and I will reply within one working day.",
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
          "You can ask to see, correct or delete your information at any time. Email shykatroy1@gmail.com with the subject line \"Data request\" and I will respond within one month.",
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
    title: "Sorry, that page isn't here",
    text: "It may have moved, or the link may be wrong.",
    link: "Back to the home page",
    suggestions: "You might be looking for:",
    links: [
      { label: "Services", href: "/#services" },
      { label: "Work", href: "/#work" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/#contact" },
    ],
  },

  footer: {
    tagline: "Websites for businesses worldwide.",
    servicesLabel: "Services",
    privacy: "Privacy policy",
    rights: "All rights reserved.",
  },
};
