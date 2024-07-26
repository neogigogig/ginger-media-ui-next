
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.BASE_URL || "http://localhost:3000",
    generateRobotsTxt: true,
    exclude: ['/server-sitemap.xml'],
    robotsTxtOptions: {
      additionalSitemaps: [
        `${process.env.BASE_URL}/server-sitemap.xml`,
      ],
    },
  }