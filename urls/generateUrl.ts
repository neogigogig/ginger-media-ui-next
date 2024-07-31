import knex from "knex";
import { config } from "./connection";
import { MediaDetails } from "./MediaDetails";
import { serviceTables } from "./serviceTables";
import { paramMap } from './paramsMap';

const knexInstance = knex(config);
const mediaDetails = new MediaDetails(knexInstance)

const baseUrl = process.env.BASE_URL

function generateCombinations(params: { [key: string]: string }) {
    const combinations = [{}];

    for (const key in params) {
        const currentCombinations = [];
        const values = params[key];


        for (const combination of combinations) {
            for (const value of values) {
                const newCombination = { ...combination, [key]: value };
                currentCombinations.push(newCombination);
            }
        }

        combinations.push(...currentCombinations);
    }

    const uniqueCombinations = Array.from(new Set(combinations.map(combination => JSON.stringify(combination))))
                                    .map(combination => JSON.parse(combination));

    return uniqueCombinations.filter(combination => Object.keys(combination).length > 0);
}

async function checkDatabase(queryParams: { [key: string]: string }, serviceTable: string) {
    try {
        const query = mediaDetails.knexInstance(serviceTable);
        
        Object.keys(queryParams).forEach(key => {
            query.where(key, queryParams[key]);
        });
        
        const result = await query;
        return result.length > 0;
    } catch (error) {
        console.error(`Error querying the database:`, error);
        return false;
    }
}

export async function generateFilterUrls(params: { [key: string]: string }, serviceId: string) {
    const validURLs = [];

    const combinations = generateCombinations(params);

    for (const combination of combinations) {
        const isValid = await checkDatabase(combination, serviceTables[serviceId]);
        if (isValid) {
            const params : { [key: string]: string } = {}
            for(const value in combination){
                params[paramMap[value]] = combination[value]
            }
            const queryParams = new URLSearchParams(params).toString();
            const url = `${baseUrl}?${queryParams}`;
            const formattedUrl = url.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            validURLs.push(formattedUrl);
        }
    }

    return validURLs;
}

const formatStringToUrl = (input: string) => {
    return input
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

function formatToUrl(value: string){
    return value.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}

export async function generatePageUrls(serviceId: string){
    const validURLs = [];
    const entries = await knexInstance(serviceTables[serviceId])
    .select('medium', 'area', 'city', 'gmgAssetCode')

    for(const entry of entries){
        const url = `${baseUrl}/${formatToUrl(entry?.medium)}-${formatStringToUrl(entry?.area)}-${formatStringToUrl(entry?.city)}/${String(entry?.gmgAssetCode).toLowerCase()}`;
        validURLs.push(url)
    }

    return validURLs
}