
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.BASE_URL || "http://localhost:3000", // include the production url from enviroment variables
    generateRobotsTxt: true, // generate robots.txt, allowing for indexing.
    exclude: ['/server-sitemap.xml'], // exclude the dynamic sitemap from the static-sitemapping.
    robotsTxtOptions: {
      additionalSitemaps: [
        `${process.env.BASE_URL}/server-sitemap.xml`, // include the sitemap url in robots.txt
      ],
    },
  }