/**
 * All blog posts live in this file. Add a new post to the top of `posts`.
 *
 * Writing a post:
 * - `body` is a list of blocks: "h2" (also listed in the table of contents),
 *   "h3", "p", "list" and "tip" (a highlighted box).
 * - Inside text you can write **bold** and [a link](/services/online-booking-websites).
 * - `faq` shows as a FAQ section at the end and is sent to Google as FAQ data.
 * - `service` links the post to one of your services (its slug in site.ts).
 * - `cover` is the banner image, saved in public/images/blog/ (1200 x 630).
 */

import type { FaqItem } from "./site";

export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "tip"; title?: string; text: string };

export type BlogPost = {
  /** The web address: /blog/your-slug */
  slug: string;
  title: string;
  /** Title shown in Google. Aim for under 60 characters. */
  seoTitle: string;
  /** Shown in Google and on the blog list. Aim for 120 to 160 characters. */
  description: string;
  category: string;
  tags: string[];
  /** Dates as YYYY-MM-DD. */
  published: string;
  updated?: string;
  body: BlogBlock[];
  faq: FaqItem[];
  service?: string;
  cover: { src: string; alt: string };
};

export const blog = {
  eyebrow: "Blog",
  title: "Web development insights for growing businesses",
  intro:
    "Practical guides on websites, web apps, mobile apps and SEO, written in plain English to help you make better decisions about your online presence.",
  seoTitle: "Web Development Blog: Websites, Apps & SEO Guides",
  description:
    "Practical guides from full-stack developer Shykat Roy on website costs, web apps, mobile apps, SEO and getting more customers online.",
  labels: {
    readMore: "Read article",
    minRead: "min read",
    published: "Published",
    updated: "Updated",
    by: "Written by",
    toc: "On this page",
    tags: "Topics",
    faq: "Frequently asked questions",
    share: "Share this article",
    related: "Keep reading",
    allPosts: "All articles",
    latest: "Latest article",
    serviceEyebrow: "Related service",
    authorBio:
      "Full-stack web developer with more than 3 years of experience building websites, web apps and mobile apps with Laravel, React, Next.js and Node.js for businesses worldwide.",
    ctaTitle: "Have a project in mind?",
    ctaText: "Book a free 15-minute call and get a clear plan with one fixed price.",
    homeTitle: "Latest from the blog",
    homeIntro: "Guides to help you plan, build and grow your website or app.",
  },

  posts: [
    {
      slug: "website-vs-web-app-vs-mobile-app",
      title: "Website, web app or mobile app: which does your business need?",
      seoTitle: "Website vs Web App vs Mobile App: Which Do You Need?",
      description:
        "Not sure whether your business needs a website, a web app or a mobile app? A plain-English guide to the differences, costs and when to choose each one.",
      category: "Planning",
      cover: {
        src: "/images/blog/website-vs-web-app-vs-mobile-app.svg",
        alt: "Illustration comparing a website in a browser, a web app dashboard and a mobile app on a phone",
      },
      tags: ["Web apps", "Mobile apps", "Websites", "Planning"],
      published: "2026-11-04",
      service: "online-booking-websites",
      body: [
        {
          type: "p",
          text: "When business owners contact me, one of the first questions is: **do I need a website, a web app or a mobile app?** The answer decides your budget, your timeline and how your customers will use what you build, so it is worth getting right before any work begins.",
        },
        {
          type: "p",
          text: "This guide explains the difference between the three in plain English, with simple rules to help you choose.",
        },
        { type: "h2", text: "What is the difference?" },
        { type: "h3", text: "A website" },
        {
          type: "p",
          text: "A website mainly **shares information**: who you are, what you offer, your prices and how to contact you. Visitors read it, and the goal is usually to turn them into calls, bookings or enquiries. Most small businesses start here.",
        },
        { type: "h3", text: "A web app" },
        {
          type: "p",
          text: "A web app runs in the browser like a website, but people **do things** in it: log in, book appointments, manage orders, upload files or see a dashboard. It has a database and accounts behind it. Online booking systems, customer portals and internal admin tools are all web apps.",
        },
        { type: "h3", text: "A mobile app" },
        {
          type: "p",
          text: "A mobile app is installed from the App Store or Google Play. It can use phone features such as push notifications, the camera and location, and it works best for things customers use often, such as ordering, loyalty schemes or tracking.",
        },
        { type: "h2", text: "When a website is enough" },
        {
          type: "list",
          items: [
            "You want new customers to find you on Google and get in touch",
            "Your services and prices change only now and then",
            "Customers contact you by phone, email or a simple form",
            "You want to look professional and trustworthy quickly",
          ],
        },
        {
          type: "p",
          text: "For most of these businesses, a fast, SEO-friendly website is the best first step. See my [business website package](/services/small-business-website-design) for what that includes.",
        },
        { type: "h2", text: "When you need a web app" },
        {
          type: "list",
          items: [
            "Customers need to book, order or pay online without calling you",
            "You or your staff need to log in and manage data",
            "You are spending hours on admin that software could do",
            "You need different access for customers, staff and managers",
          ],
        },
        {
          type: "p",
          text: "A common example is online booking: customers pick a service and time themselves, and you get confirmations and reminders automatically. Read more about [booking websites](/services/online-booking-websites).",
        },
        { type: "h2", text: "When a mobile app makes sense" },
        {
          type: "list",
          items: [
            "Customers will use it often, ideally every week",
            "Push notifications would bring them back, such as offers or order updates",
            "You need phone features like the camera, GPS or offline use",
            "You already have a website or web app that works well",
          ],
        },
        {
          type: "tip",
          title: "A good rule of thumb",
          text: "If customers will only visit a few times a year, they will not download an app. Start with a website or web app, and add a mobile app once you have regular users.",
        },
        { type: "h2", text: "How the costs and timelines compare" },
        {
          type: "p",
          text: "A business website is the quickest and most affordable option, usually live in 2 to 3 weeks. A web app takes longer because it needs accounts, a database and more testing; a booking website typically takes 4 to 5 weeks. A mobile app is usually the biggest investment, as it must be built and tested for both iPhone and Android and approved by the app stores.",
        },
        {
          type: "p",
          text: "The good news is that one well-built back end can power all three. If you start with a website or web app built on solid foundations such as Laravel or Node.js, adding a mobile app later is much easier and cheaper.",
        },
        { type: "h2", text: "My recommendation" },
        {
          type: "p",
          text: "Start with the simplest thing that solves your problem today, and build it so it can grow. For most businesses that means a fast website first, a web app when admin starts to slow you down, and a mobile app once customers use your service regularly.",
        },
        {
          type: "p",
          text: "Not sure which fits you? [Book a free call](/#contact) and I will give you an honest recommendation, even if it is the smaller option.",
        },
      ],
      faq: [
        {
          question: "Is a web app the same as a website?",
          answer:
            "Not quite. Both run in a browser, but a website mainly shares information, while a web app lets people log in and do things such as book, order or manage data.",
        },
        {
          question: "Can a web app work on phones?",
          answer:
            "Yes. A well-built web app works on phones, tablets and computers without being installed, which makes it a good first step before a mobile app.",
        },
        {
          question: "Can I add a mobile app later?",
          answer:
            "Yes. If your website or web app has a well-built back end, a mobile app can use the same data and accounts, so adding it later is much simpler.",
        },
        {
          question: "Which option is best for getting found on Google?",
          answer:
            "A website. Search engines read website pages easily, while content inside a mobile app is not shown in Google search results.",
        },
      ],
    },
    {
      slug: "small-business-website-cost",
      title: "How much does a small business website cost in 2026?",
      seoTitle: "How Much Does a Small Business Website Cost in 2026?",
      description:
        "A clear breakdown of what a small business website costs in 2026, what affects the price, the hidden costs to watch for and how to get a fixed quote.",
      category: "Pricing",
      cover: {
        src: "/images/blog/small-business-website-cost.svg",
        alt: "Illustration of a business website with a price tag reading from £695",
      },
      tags: ["Website cost", "Small business", "Pricing", "Websites"],
      published: "2026-11-04",
      service: "small-business-website-design",
      body: [
        {
          type: "p",
          text: "Ask ten web developers what a website costs and you will get ten different answers. That is frustrating when you are trying to plan a budget. This guide explains **what you actually pay for**, what changes the price and how to avoid surprise costs.",
        },
        { type: "h2", text: "Typical price ranges" },
        {
          type: "p",
          text: "Prices vary widely depending on who builds your website and how. As a rough guide:",
        },
        {
          type: "list",
          items: [
            "**DIY website builders**: low monthly fees, but you do all the work and often outgrow them",
            "**Freelance developer**: a custom website at a fixed price, with one person who knows your project",
            "**Agency**: usually the most expensive, with a larger team and more layers of management",
          ],
        },
        {
          type: "p",
          text: "For reference, my [business website package](/services/small-business-website-design) starts from £695 at a fixed price, and a [website with online booking](/services/online-booking-websites) starts from £1,295.",
        },
        { type: "h2", text: "What affects the price" },
        { type: "h3", text: "Number of pages" },
        {
          type: "p",
          text: "A five-page website (home, services, about, gallery and contact) costs less than a 30-page website with a page for every service and location. More pages means more design, writing and testing.",
        },
        { type: "h3", text: "Features" },
        {
          type: "p",
          text: "Contact forms are simple. Online booking, payments, customer accounts and connections to other software take more time, because they involve a database and careful testing.",
        },
        { type: "h3", text: "Design" },
        {
          type: "p",
          text: "A design made for your brand costs more than a template, but it helps you stand out and is built around what your customers need to see first.",
        },
        { type: "h3", text: "Content" },
        {
          type: "p",
          text: "If you supply your own text and photos, the cost is lower. Professional copywriting and photography add to the budget but often improve results.",
        },
        { type: "h2", text: "Hidden costs to watch for" },
        {
          type: "list",
          items: [
            "Domain name renewal each year",
            "Hosting, security updates and backups",
            "Paid plugins or themes that need yearly licences",
            "Charges for every small change after launch",
            "Being locked in, so you cannot move your website elsewhere",
          ],
        },
        {
          type: "tip",
          title: "Always ask who owns the website",
          text: "Make sure that once you have paid, the website, its code and its content belong to you. With me, they always do.",
        },
        { type: "h2", text: "Ongoing costs after launch" },
        {
          type: "p",
          text: "A website needs looking after, just like your premises. Budget for hosting, updates and the odd change. My [website care plan](/services/website-care-plans) covers this from £49 a month, with no long contract.",
        },
        { type: "h2", text: "How to get an accurate quote" },
        {
          type: "list",
          ordered: true,
          items: [
            "List the pages you need and the features that matter most",
            "Collect a few websites you like, and say what you like about them",
            "Decide whether you will supply the text and photos",
            "Ask for one fixed price in writing before any work begins",
          ],
        },
        {
          type: "p",
          text: "A good developer will give you a clear plan and a fixed price, not an hourly estimate that keeps growing. [Book a free call](/#contact) and I will send you exactly that.",
        },
      ],
      faq: [
        {
          question: "Why do website prices vary so much?",
          answer:
            "Because the work varies. The number of pages, the features, the design and who builds it all change the time involved. A fixed quote based on your actual needs is the only reliable price.",
        },
        {
          question: "Is a cheap website builder good enough?",
          answer:
            "It can be for a very simple start. But builders can be slow, harder to rank on Google and difficult to move away from, so many businesses switch to a custom website as they grow.",
        },
        {
          question: "Are there monthly costs after the website is built?",
          answer:
            "Usually yes: a domain name, hosting and maintenance. A care plan bundles these into one simple monthly price so nothing is forgotten.",
        },
        {
          question: "How long does it take to build a small business website?",
          answer:
            "A typical business website takes 2 to 3 weeks from the agreed plan to launch. Websites with online booking usually take 4 to 5 weeks.",
        },
      ],
    },
  ] as BlogPost[],
};
