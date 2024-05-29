import { BaseUrl } from "./BaseUrl";

export async function getMediaDetailsByServiceAndFilter(service: string, searchParams: any) {
    const queryString = new URLSearchParams(searchParams).toString();

    const url = `${BaseUrl}/getMediaDetailsByService?service=${service}${queryString ? '&' + queryString : ''}`;

    const response = await fetch(url, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Failed to fetch media details');
    }

    return response.json();
}
