"use client";

import Script from "next/script";

type Props = {
  siteUrl: string;
};

export function SEOJsonLd({ siteUrl }: Props) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Samuel Indra Bastian",
    url: siteUrl,
    sameAs: [
      "https://github.com/devwebxyn",
      "https://www.linkedin.com/in/samuel-indra-bastian/",
      "https://www.instagram.com/xynoos/"
    ],
    jobTitle: "Fullstack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Independent"
    }
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Samuel Indra Bastian",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Script
        id="ld-person"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <Script
        id="ld-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
