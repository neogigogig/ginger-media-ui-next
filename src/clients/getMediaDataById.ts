import { BaseUrl } from "./BaseUrl";

export async function getMediaDataById(service: string, mediaId: string) {
  const response = await fetch(
    `${BaseUrl}/getMediaDataById?service=${service}&gmgAssetCode=${mediaId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch media details");
  }

  return response.json();
}
