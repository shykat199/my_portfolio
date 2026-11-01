import type {
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
import { site, type FaqItem, type Project, type Service } from "@content/site";

const { url, about } = site;

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

const photo: ImageObject = {
  "@type": "ImageObject",
  "@id": schemaIds.photo,
  url: `${url}${about.photo.src}`,
  contentUrl: `${url}${about.photo.src}`,
  width: { "@type": "QuantitativeValue", value: about.photo.width, unitCode: "E37" },
  height: { "@type": "QuantitativeValue", value: about.photo.height, unitCode: "E37" },
  caption: about.photo.alt,
};

const logo: ImageObject = {
  "@type": "ImageObject",
  "@id": schemaIds.logo,
  url: `${url}${logoImage.path}`,
  contentUrl: `${url}${logoImage.path}`,
  width: { "@type": "QuantitativeValue", value: logoImage.size, unitCode: "E37" },
  height: { "@type": "QuantitativeValue", value: logoImage.size, unitCode: "E37" },
  caption: `${site.name} logo`,
};

const person: Person = {
  "@type": "Person",
  "@id": schemaIds.person,
  name: site.name,
  jobTitle: site.jobTitle,
  url: `${url}/`,
  email: site.email,
  image: { "@id": schemaIds.photo },
  sameAs: [site.links.linkedin, site.links.github],
  knowsAbout: site.skills,
  knowsLanguage: site.languages,
};

const catalog: OfferCatalog = {
  "@type": "OfferCatalog",
  "@id": schemaIds.catalog,
  name: site.services.title,
  itemListElement: site.services.items.map((service) => ({
    ...serviceOffer(service),
    itemOffered: { "@id": serviceId(service) },
  })),
};

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
  areaServed: { "@type": "Country", name: "United Kingdom" },
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
export const siteGraph: Thing[] = [person, photo, logo, business, catalog];

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
    description: service.intro,
    url: `${url}/services/${service.slug}`,
    provider: { "@id": schemaIds.business },
    areaServed: "GB",
    offers: serviceOffer(service),
  };
}

export function caseStudyNode(project: Project): CreativeWork {
  const page = `${url}/work/${project.slug}`;

  return {
    "@type": "CreativeWork",
    "@id": `${page}#casestudy`,
    name: project.title,
    description: project.overview,
    url: page,
    image: `${url}${project.cover.src}`,
    author: { "@id": schemaIds.person },
    dateCreated: project.year,
    keywords: project.tech.join(", "),
    ...(project.isDemo ? { creativeWorkStatus: "Demo" } : {}),
  };
}
