"use server";

import { getMediaDetailsByService } from "@/clients/getMediaDetailsByService";
import { Service } from "./types";

export async function fetchMedia(
  service: Service,
  page: number,
  pageSize: number,
  cities: string | undefined,
  mediaTypes: string | undefined
) {
  const response: any = await getMediaDetailsByService(
    service,
    page,
    pageSize,
    cities,
    mediaTypes
  );
  const mediaList = response.data;
  if (!mediaList || mediaList.length === 0) {
    return null;
  }
  return response.data;
}
