import { generateFilterUrls, generatePageUrls } from "./generateUrl"
import { MediaDetails } from "./MediaDetails"
import knex from "knex"
import { config } from "./connection"

const knexInstance = knex(config);
const mediaDetails = new MediaDetails(knexInstance)

async function generateUrlsByServiceId(serviceId: string) {
    try {
        const params = await mediaDetails.getServiceDetails(serviceId)
        const filterUrls = await generateFilterUrls(params, serviceId)
        const pageUrls = await generatePageUrls(serviceId)
        return [...filterUrls, ...pageUrls]
    } catch (e) {
        console.log(e)
        return []
    }
}

export default async function index(serviceId: string) {
    return await generateUrlsByServiceId(serviceId)
}
