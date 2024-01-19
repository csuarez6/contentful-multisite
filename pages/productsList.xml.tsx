import { getCommercelayerProduct } from "@/lib/services/commerce-layer.service";
import getProductsSlugs from "@/lib/services/products-slugs.query";
import { isAvailableGasAppliance, isAvailableVantilisto, isGasAppliance } from "@/utils/functions";
import { GetServerSideProps } from "next";

const domain = process.env.DEFAULT_DOMAIN;

// Default export to prevent next.js errors
const ProductListXML: React.FC = () => {
  return null;
};

const consolideEntriesWithLocales = async (entries: Array<any>) => {
  const consolidatedEntries = [];
  for (const index in entries) {
    try {
      const entry = entries[index];
      const productInfo = await getCommercelayerProduct(entry.sku, true);
      const price = isGasAppliance(entry.marketId) ? productInfo?._priceGasodomestico : productInfo?._priceVantiListo;
      if (productInfo && productInfo.name && price && entry.urlPaths && entry.promoImage) {
        const availability = isAvailableGasAppliance(entry?.marketId, productInfo?._priceGasodomestico, productInfo?.productsQuantityGasodomestico) ? true : isAvailableVantilisto(entry?.marketId, productInfo?._priceVantiListo, productInfo?.productsQuantityVantiListo) ? true : false;
          consolidatedEntries.push({
            'g:id': entry.sku,
            'g:title': escapeXml(productInfo.name),
            'g:description': escapeXml(productInfo.description),
            'g:link': escapeXml(domain + entry.urlPaths[0]),
            'g:image_link': escapeXml(entry.promoImage.url),
            'g:availability': availability ? 'in_stock' : 'out_of_stock',
            'g:price': price + ' ' + productInfo.currency_code,
            'g:brand': escapeXml(productInfo.brand),
            'g:identifier_exists': false
          });
      }
    } catch (error) {
      console.error("Error consolideEntriesWithLocales: ", error);
    }
  }
  return consolidatedEntries;
};

const buildProductListXML = (fields: Array<any>): string => {
  const content = fields
    .map((fieldData) => {
      const field = Object.entries(fieldData).map(([key, value]) => {
        if (!value) return "";
        return `<${key}>${value}</${key}>`;
      });

      return `<item>${field.join("")}</item>\n`;
    })
    .join("");

  return (
    `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl"?>\n` +
    `<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n` +
    `<channel>\n` +
    `<title>Grupo Vanti</title>\n` +
    `<link>${domain}</link>\n` +
    `<description>Listado de productos de Grupo Vanti</description>\n` +
    `${content}\n` +
    `</channel>\n` +
    `</rss>`
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pageEntries = await getProductsSlugs({ limit: 5000 }, false);
  const pageEntriesArr = await consolideEntriesWithLocales(pageEntries);
  const consolidatedEntries = [...pageEntriesArr];

  res.setHeader("Cache-Control", "s-maxage=84600, stale-while-revalidate");
  res.setHeader("Content-Type", "text/xml");
  res.write(buildProductListXML(consolidatedEntries));
  res.end();

  return {
    props: {},
  };
};

const escapeXml = (str: string): string => {
  if (str) {
    return str.replace(/[<>&'"]/g, (char) => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case "'": return '&apos;';
        case '"': return '&quot;';
        default: return char;
      }
    });
  }
  return str;
};

export default ProductListXML;