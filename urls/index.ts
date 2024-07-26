import { generateFilterUrls, generatePageUrls } from "./generateUrl"
import { MediaDetails } from "./MediaDetails"
import knex from "knex"
import { config } from "./connection"
import { serviceTables } from "./serviceTables"

const knexInstance = knex(config);
const mediaDetails = new MediaDetails(knexInstance)
const urls: string[] = []

async function generateForEachService(serviceId: string) {
    try {
        const params = await mediaDetails.getServiceDetails(serviceId)
        const filterUrls = await generateFilterUrls(params, serviceId)
        const pageUrls = await generatePageUrls(serviceId)
        urls.push(...filterUrls)
        urls.push(...pageUrls)
    } catch (e) {
        return
    }
}

// function generateSitemapXML(urls) {
//     const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
//     const sitemapFooter = `</urlset>`;

//     const urlEntries = urls.map(url => {
//         const lastmod = new Date().toISOString().split('T')[0];
//         const changefreq = 'daily';
//         const priority = '0.8';

//         return `  <url>
//     <loc>${url}</loc>
//     <lastmod>${lastmod}</lastmod>
//     <changefreq>${changefreq}</changefreq>
//     <priority>${priority}</priority>
//   </url>`;
//     }).join('\n');

//     return `${sitemapHeader}${urlEntries}\n${sitemapFooter}`;
// }

export default async function index() {
    for (let i in serviceTables) {
        await generateForEachService(i)
    }
    return urls
}
