import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { NextRequest } from 'next/server'
import index from '@urls/index';
import { serviceTables } from '@urls/serviceTables';

export async function GET(request: NextRequest) {
    const serviceKey = request.url.split('/')[3].split('-')[0]
    if(!serviceKey || !serviceTables[serviceKey]){
        return Response.json("Not found", { status: 404 })
    }
    const urls = await index(serviceKey)
    const sitemap: ISitemapField[] = urls.map((url) => ({
        loc: url,
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 0.8
    }))

    return getServerSideSitemap(sitemap)
}