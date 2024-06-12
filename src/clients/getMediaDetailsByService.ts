import { BaseUrl } from "./BaseUrl";

export async function getMediaDetailsByService(service: string, pageSize?: number) {

    const url = pageSize
    ? `${BaseUrl}/getMediaDetailsByService?service=${service}&pageSize=${pageSize}`
    : `${BaseUrl}/getMediaDetailsByService?service=${service}`;

    const response = await fetch(url, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch media details');
    }

    return response.json();
}