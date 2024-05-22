import { BaseUrl } from "./BaseUrl";

export async function getMediaDetailsByService(service: string) {
    const response = await fetch(`${BaseUrl}/getMediaDetailsByService?service=${service}`, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch media details');
    }

    return response.json();
}