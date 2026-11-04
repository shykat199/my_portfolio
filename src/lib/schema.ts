import type {
  Blog,
  BlogPosting,
  BreadcrumbList,
  CreativeWork,
  FAQPage,
  ImageObject,
  OfferCatalog,
  Person,
  ProfessionalService,
  Service as ServiceSchema,
  Thing,
  WebPage,
  WebSite,
} from "schema-dts";
import type { BlogPostSummary } from "@content/blog";
import { site, type FaqItem, type Project, type Service } from "@content/site";
import type { SiteSettings } from "./settings";

const { url } = site;

export const schemaIds = {
  person: `${url}/#person`,
  business: `${url}/#business`,
  website: `${url}/#website`,
  photo: `${url}/#photo`,
  logo: `${url}/#logo`,
  catalog: `${url}/#catalog`,
};

export const logoImage = { path: "/icons/logo.png", size: 512 };

function pageUrl(path: string) {
  return path === "/" ? `${url}/` : `${url}${path}`;
}

function serviceId(service: Service) {
  return `${url}/services/${service.slug}#service`;
}

function serviceOffer(service: Service) {
  return {
    "@type": "Offer" as const,
    url: `${url}/services/${service.slug}`,
    price: service.price,
    priceCurrency: "GBP",
    ...(service.billedMonthly
      ? {
          priceSpecification: {
            "@type": "UnitPriceSpecification" as const,
            price: service.price,
            priceCurrency: "GBP",
            unitText: "MONTH",
          },
        }
      : {}),
  };
}

/** Turns a site path into a full address; leaves full addresses alone. */
function absolute(src: string) {
  return src.startsWith("http") ? src : `${url}${src}`;
}

function photoNode(settings: SiteSettings): ImageObject {
  const photo = settings.about.photo;
  return {
    "@type": "ImageObject",
    "@id": schemaIds.photo,
    ...(photo
      ? {
          url: absolute(photo.src),
          contentUrl: absolute(photo.src),
          width: { "@type": "QuantitativeValue", value: photo.width, unitCode: "E37" },
          height: { "@type": "QuantitativeValue", value: photo.height, unitCode: "E37" },
          caption: photo.alt,
        }
      : {}),
  };
}

function logoNode(settings: SiteSettings): ImageObject {
  const src = settings.logo ?? `${url}${logoImage.path}`;
  return {
    "@type": "ImageObject",
    "@id": schemaIds.logo,
    url: src,
    contentUrl: src,
    ...(settings.logo
      ? {}
      : {
          width: { "@type": "QuantitativeValue", value: logoImage.size, unitCode: "E37" },
          height: { "@type": "QuantitativeValue", value: logoImage.size, unitCode: "E37" },
        }),
    caption: `${site.name} logo`,
  };
}

function personNode(settings: SiteSettings): Person {
  return {
    "@type": "Person",
    "@id": schemaIds.person,
    name: site.name,
    jobTitle: site.jobTitle,
    url: `${url}/`,
    email: site.email,
    image: { "@id": schemaIds.photo },
    // Profiles set in the admin panel tell Google these accounts are yours.
    sameAs: Object.values(settings.social).filter((link): link is string => Boolean(link)),
    knowsAbout: site.skills,
    knowsLanguage: site.languages,
  };
}

function catalogNode(services: Service[]): OfferCatalog {
  return {
    "@type": "OfferCatalog",
    "@id": schemaIds.catalog,
    name: site.services.title,
    itemListElement: services.map((service) => ({
      ...serviceOffer(service),
      itemOffered: { "@id": serviceId(service) },
    })),
  };
}

const business: ProfessionalService = {
  "@type": "ProfessionalService",
  "@id": schemaIds.business,
  name: site.name,
  description: site.seo.description,
  url: `${url}/`,
  email: site.email,
  logo: { "@id": schemaIds.logo },
  image: { "@id": schemaIds.photo },
  founder: { "@id": schemaIds.person },
  areaServed: "Worldwide",
  priceRange: "££",
  contactPoint: {
    "@type": "ContactPoint",
    email: site.email,
    contactType: "customer service",
    availableLanguage: "English",
  },
  hasOfferCatalog: { "@id": schemaIds.catalog },
};

/** Connected to every page's graph through the @id references above. */
export function siteGraph(services: Service[], settings: SiteSettings): Thing[] {
  return [personNode(settings), photoNode(settings), logoNode(settings), business, catalogNode(services)];
}

export const websiteNode: WebSite = {
  "@type": "WebSite",
  "@id": schemaIds.website,
  name: site.name,
  url: `${url}/`,
  inLanguage: "en-GB",
  publisher: { "@id": schemaIds.person },
};

type WebPageOptions = {
  path: string;
  name: string;
  description: string;
  hasBreadcrumb?: boolean;
};

export function webPageNode({ path, name, description, hasBreadcrumb }: WebPageOptions): WebPage {
  const page = pageUrl(path);

  return {
    "@type": "WebPage",
    "@id": `${page}#webpage`,
    url: page,
    name,
    description,
    inLanguage: "en-GB",
    isPartOf: { "@id": schemaIds.website },
    ...(hasBreadcrumb ? { breadcrumb: { "@id": `${page}#breadcrumb` } } : {}),
  };
}

export function faqNode(path: string, items: FaqItem[]): FAQPage {
  const page = pageUrl(path);

  return {
    "@type": "FAQPage",
    "@id": `${page}#faq`,
    isPartOf: { "@id": `${page}#webpage` },
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export type Crumb = { label: string; href?: string };

export function breadcrumbNode(path: string, crumbs: Crumb[]): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl(path)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: pageUrl(crumb.href) } : {}),
    })),
  };
}

export function serviceNode(service: Service): ServiceSchema {
  return {
    "@type": "Service",
    "@id": serviceId(service),
    name: service.name,
    description: service.seo.description,
    url: `${url}/services/${service.slug}`,
    provider: { "@id": schemaIds.business },
    areaServed: "Worldwide",
    offers: serviceOffer(service),
  };
}

export function caseStudyNode(project: Project): CreativeWork {
  const page = `${url}/work/${project.slug}`;

  return {
    "@type": "CreativeWork",
    "@id": `${page}#casestudy`,
    name: project.title,
    description: project.seo.description,
    url: page,
    image: project.cover.src,
    author: { "@id": schemaIds.person },
    dateCreated: project.year,
    keywords: project.seo.keywords.join(", "),
    ...(project.isDemo ? { creativeWorkStatus: "Demo" } : {}),
  };
}

export function blogNode(path: string, name: string, description: string, items: BlogPostSummary[]): Blog {
  const page = pageUrl(path);

  return {
    "@type": "Blog",
    "@id": `${page}#blog`,
    name,
    description,
    url: page,
    inLanguage: "en-GB",
    publisher: { "@id": schemaIds.person },
    blogPost: items.map((post) => ({ "@id": `${url}/blog/${post.slug}#article` })),
  };
}

export function blogPostingNode(post: BlogPostSummary): BlogPosting {
  const page = `${url}/blog/${post.slug}`;

  return {
    "@type": "BlogPosting",
    "@id": `${page}#article`,
    headline: post.title,
    description: post.seo.description,
    url: page,
    mainEntityOfPage: { "@id": `${page}#webpage` },
    image: post.cover ? [post.cover.src, `${page}/opengraph-image`] : `${page}/opengraph-image`,
    datePublished: post.published,
    dateModified: post.updated ?? post.published,
    author: { "@id": schemaIds.person },
    publisher: { "@id": schemaIds.person },
    isPartOf: { "@id": `${url}/blog#blog` },
    articleSection: post.category,
    keywords: post.seo.keywords.join(", "),
    wordCount: post.wordCount,
    inLanguage: "en-GB",
  };
}
