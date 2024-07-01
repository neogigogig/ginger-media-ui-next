"use server";

import { getMediaDetailsByService } from "@/clients/getMediaDetailsByService";
import { Service } from "./types";

export async function fetchMedia(
  service: Service,
  offset: number,
  cities: string | undefined,
  mediaTypes: string | undefined,
  lighting: string | undefined,
) {
  const response: any = await getMediaDetailsByService(
    service,
    offset,
    cities,
    mediaTypes,
    lighting,
  );
  const mediaList = response.data;
  const nextOffset = response.nextOffset;
  if (!mediaList || mediaList.length === 0) {
    return null;
  }
  return {mediaList, nextOffset};
}
