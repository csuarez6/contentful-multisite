/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https://www.grupovanti.com',
    generateRobotsTxt: false, // (optional)
    sitemapSize: 5000,
};

module.exports = config;
