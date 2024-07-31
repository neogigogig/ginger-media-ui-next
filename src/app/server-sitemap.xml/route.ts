import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import index from '../../../urls/index';

export async function GET(request: Request) {
    const urls = await index()
    const sitemap: ISitemapField[] = urls.map((url) => ({
        loc: url,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 0.8
    }))

    return getServerSideSitemap(sitemap)
}