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

export default async function index() {
    for (let i in serviceTables) {
        await generateForEachService(i)
    }
    return urls
}
