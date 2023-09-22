import { GetServerSideProps } from "next";
import getEntriesSlugs from "@/lib/services/entries-slugs.query";

// Default export to prevent next.js errors
const SitemapXML: React.FC = () => {
  return null;
};

const consolideEntriesWithLocales = (entries) => {
  const consolidatedEntries = [];
  const domain = process.env.DEFAULT_DOMAIN;
  for (const index in entries) {
    consolidatedEntries.push({
      loc: domain+entries[index].urlPaths[0],
      lastmod: entries[index].sys.publishedAt || undefined,
      priority: 0.7,
      changefreq: "weekly",
    });
  }
  return consolidatedEntries;
};

const buildSitemapXml = (fields): string => {
  const content = fields
    .map((fieldData) => {
      const field = Object.entries(fieldData).map(([key, value]) => {
        if (!value) return "";
        return `<${key}>${value}</${key}>`;
      });

      return `<url>${field.join("")}</url>\n`;
    })
    .join("");

  return (
    `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>\n` +
    `<urlset\n` +
    ` xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    ` xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n` +
    ` xmlns:xhtml="http://www.w3.org/1999/xhtml"\n` +
    ` xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"\n` +
    ` xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n` +
    ` xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${content}\n` +
    `</urlset>`
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pageEntries = await getEntriesSlugs({ limit: 10000 }, false);
  const pageEntriesArr = consolideEntriesWithLocales(pageEntries);
  const consolidatedEntries = [...pageEntriesArr];

  res.setHeader("Cache-Control", "s-maxage=84600, stale-while-revalidate");
  res.setHeader("Content-Type", "text/xml");
  res.write(buildSitemapXml(consolidatedEntries));

  res.end();
  return {
    props: {},
  };
};

export default SitemapXML;