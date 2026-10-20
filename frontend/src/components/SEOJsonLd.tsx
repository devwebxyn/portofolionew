// Server component: renders Schema.org JSON-LD as literal <script> tags so the
// structured data lands in the initial server-rendered HTML (where crawlers and
// rich-result parsers read it). No client interaction, so no "use client".
type Props = {
  siteUrl: string;
};

const org = {
  "@context": "https://schema.org",
  "@type": "Person",
  givenName: "Samuel",
  familyName: "Indra Bastian",
  alternateName: "Samuel Bastian",
  name: "Samuel Indra Bastian",
  email: "contact@samuelindrabastian.my.id",
  birthDate: "2008-07-02",
  nationality: "Indonesia",
  knowsLanguage: ["Indonesian", "English"],
  description:
    "Fullstack developer and IoT engineering student (TEI, SMK PGRI 3 Malang) building end-to-end digital products.",
  jobTitle: "Fullstack Developer",
  sameAs: [
    "https://github.com/devwebxyn",
    "https://www.linkedin.com/in/samuel-indra-bastian/",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Independent",
  },
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Samuel Indra Bastian",
  inLanguage: "id",
};

export function SEOJsonLd({ siteUrl }: Props) {
  // url always reflects the deployed domain passed by the layout (NEXT_PUBLIC_SITE_URL).
  const person = { ...org, url: siteUrl };
  const site = { ...website, url: siteUrl };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />
    </>
  );
}
