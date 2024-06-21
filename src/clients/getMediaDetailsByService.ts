import { BaseUrl } from "./BaseUrl";

export async function getMediaDetailsByService(
  service: string,
  page: number,
  pageSize: number,
  cities: string | undefined,
  mediaTypes: string | undefined
) {
  const params = new URLSearchParams({
    service,
    page: `${page}`,
    pageSize: `${pageSize}`,
    ...(cities ? { cities } : {}), // cities could be undefined
    ...(mediaTypes ? { mediaTypes } : {}), // mediaType could be undefined
  });

  const url = `${BaseUrl}/getMediaDetailsByService?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch media details");
  }

  return response.json();
}
