import { notFound } from "next/navigation";
import { BaseUrl } from "./BaseUrl";

export async function getMediaDetailsByService(
  service: string,
  offset: number,
  cities: string | undefined,
  mediaTypes: string | undefined,
  lighting: string | undefined,
) {
  const params = new URLSearchParams({
    service,
    offset: `${offset}`,
    ...(cities ? { cities } : {}), // cities could be undefined
    ...(mediaTypes ? { mediaTypes } : {}), // mediaType could be undefined
    ...(lighting ? {lighting} : {}),
  });

  const url = `${BaseUrl}/getMediaDetailsByService?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    notFound()
  }

  return response.json();
}
