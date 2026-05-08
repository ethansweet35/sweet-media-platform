"use client";

import { useEffect } from "react";

import { DEFAULT_OG_IMAGE } from "@/lib/ogDefaults";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://addictioninterventions.com";

export { DEFAULT_OG_IMAGE } from "@/lib/ogDefaults";

interface SeoProps {
  title: string;
  description: string;
  keywords?: string;
  /** Absolute path e.g. "/blog/my-post". Omit on noindex pages — no canonical will be set. */
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  noindex?: boolean;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  lastModified?: string;
}

export default function Seo({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogType = "website",
  ogImage,
  twitterCard = "summary_large_image",
  noindex = false,
  schema,
  lastModified,
}: SeoProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta helpers
    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    if (lastModified) setMeta("last-modified", lastModified);

    // Resolve final OG image — always has a value
    const resolvedOgImage = ogImage || DEFAULT_OG_IMAGE;

    // Open Graph core
    setMeta("og:title", ogTitle || title, "property");
    setMeta("og:description", ogDescription || description, "property");
    setMeta("og:type", ogType, "property");
    // og:url is set in sync with canonical below
    setMeta("og:site_name", "Addiction Interventions", "property");
    setMeta("og:locale", "en_US", "property");

    // OG image — full set for maximum platform compatibility
    setMeta("og:image", resolvedOgImage, "property");
    setMeta("og:image:secure_url", resolvedOgImage, "property");
    setMeta("og:image:type", "image/jpeg", "property");
    setMeta("og:image:width", "1200", "property");
    setMeta("og:image:height", "630", "property");
    setMeta("og:image:alt", ogTitle || title, "property");

    // Twitter card — full set
    setMeta("twitter:card", twitterCard);
    setMeta("twitter:site", "@sweetmedia");
    setMeta("twitter:title", ogTitle || title);
    setMeta("twitter:description", ogDescription || description);
    setMeta("twitter:image", resolvedOgImage);
    setMeta("twitter:image:alt", ogTitle || title);

    // Canonical — always keep the <link rel="canonical"> in the DOM (set in index.html as fallback).
    // We only update href, never remove the element — avoids a missing-canonical window during
    // route transitions that crawlers and speed-test tools can catch.
    const getOrCreateCanonical = (): Element => {
      let el = document.querySelector('link[rel="canonical"]');
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        document.head.appendChild(el);
      }
      return el;
    };

    if (canonical && !noindex) {
      // Normalise: strip www, force https, resolve relative paths
      let fullCanonical = canonical.startsWith("http")
        ? canonical
        : `${SITE_URL}${canonical === "/" ? "" : canonical}`;
      // Ensure no trailing slash except for root
      if (fullCanonical !== SITE_URL && fullCanonical.endsWith("/")) {
        fullCanonical = fullCanonical.slice(0, -1);
      }
      // Strip www if present
      fullCanonical = fullCanonical.replace(/^https?:\/\/www\./, "https://");
      const canonicalEl = getOrCreateCanonical();
      canonicalEl.setAttribute("href", fullCanonical);
      setMeta("og:url", fullCanonical, "property");
    } else if (noindex) {
      // On noindex pages point canonical at itself (still valid) rather than removing it
      const fallback = `${SITE_URL}${window.location.pathname}`;
      getOrCreateCanonical().setAttribute("href", fallback);
    }

    // Robots
    if (noindex) {
      setMeta("robots", "noindex, nofollow");
    } else {
      const robotsEl = document.querySelector('meta[name="robots"]');
      if (robotsEl) robotsEl.remove();
    }

    // Schema.org JSON-LD
    const existingScripts = document.querySelectorAll('script[data-seo-schema="true"]');
    existingScripts.forEach((s) => s.remove());

    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      schemas.forEach((s) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-schema", "true");
        script.textContent = JSON.stringify(s);
        document.head.appendChild(script);
      });
    }

    return () => {
      const scripts = document.querySelectorAll('script[data-seo-schema="true"]');
      scripts.forEach((s) => s.remove());
      // Do NOT remove canonical on unmount — index.html provides the fallback value
      // so there is never a window where the tag is absent between route changes
    };
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogType, ogImage, twitterCard, noindex, schema, lastModified]);

  return null;
}

// Schema builders
export function buildOrganizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Addiction Interventions",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Boutique digital marketing agency exclusively serving behavioral health treatment centers.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "129 W Wilson St #200",
      addressLocality: "Costa Mesa",
      addressRegion: "CA",
      postalCode: "92627",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-714-300-5115",
      contactType: "sales",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.linkedin.com/company/sweetmedia",
      "https://twitter.com/sweetmedia",
    ],
  };
}

export function buildWebPageSchema(
  path: string,
  title: string,
  description: string,
  lastModified?: string,
  pageType: string = "WebPage"
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": pageType,
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    ...(lastModified && { dateModified: lastModified }),
    publisher: {
      "@type": "Organization",
      name: "Addiction Interventions",
      url: SITE_URL,
    },
  };
}

export function buildServiceSchema(
  path: string,
  name: string,
  description: string,
  provider = "Addiction Interventions"
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: SITE_URL,
    },
    url: `${SITE_URL}${path}`,
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  };
}

export function buildArticleSchema(
  path: string,
  title: string,
  description: string,
  author: string,
  datePublished: string,
  dateModified: string,
  image: string,
  tags: string[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}${path}`,
    image,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Addiction Interventions",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished,
    dateModified,
    keywords: tags.join(", "),
    articleSection: "Blog",
    inLanguage: "en",
  };
}

export function buildBlogSchema(path: string, title: string, description: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    publisher: {
      "@type": "Organization",
      name: "Addiction Interventions",
      url: SITE_URL,
    },
  };
}

export function buildFAQSchema(questions: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

export function buildContactPageSchema(
  path: string,
  title: string,
  description: string,
  lastModified?: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    ...(lastModified && { dateModified: lastModified }),
    publisher: {
      "@type": "Organization",
      name: "Addiction Interventions",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "Organization",
      name: "Addiction Interventions",
      url: SITE_URL,
      telephone: "+1-714-300-5115",
      address: {
        "@type": "PostalAddress",
        streetAddress: "129 W Wilson St #200",
        addressLocality: "Costa Mesa",
        addressRegion: "CA",
        postalCode: "92627",
        addressCountry: "US",
      },
    },
  };
}

export function buildAboutPageSchema(
  path: string,
  title: string,
  description: string,
  lastModified?: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    ...(lastModified && { dateModified: lastModified }),
    publisher: {
      "@type": "Organization",
      name: "Addiction Interventions",
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "Organization",
      name: "Addiction Interventions",
      description: "Boutique digital marketing agency exclusively serving behavioral health treatment centers.",
      url: SITE_URL,
      founder: {
        "@type": "Person",
        name: "Ethan Sweet",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "129 W Wilson St #200",
        addressLocality: "Costa Mesa",
        addressRegion: "CA",
        postalCode: "92627",
        addressCountry: "US",
      },
    },
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function buildItemListSchema(
  path: string,
  title: string,
  description: string,
  items: { name: string; description: string; url?: string }[],
  lastModified?: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    ...(lastModified && { dateModified: lastModified }),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      description: item.description,
      ...(item.url && { url: `${SITE_URL}${item.url}` }),
    })),
  };
}