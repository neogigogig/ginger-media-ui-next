import { notFound } from "next/navigation";
import { BaseUrl } from "./BaseUrl";

export async function getFilters(service: string) {
  const response = await fetch(
    `${BaseUrl}/getFilters?serviceId=${service}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    notFound()
  }

  return response.json();
}
