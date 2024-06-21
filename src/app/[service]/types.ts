export interface MediaDetail {
  id: string;
  mediaType: string;
  imageUrl: string;
  location: string;
  city: string;
  price: number;
  areaInSqFeet: number;
  area: string;
}

export type Service =
  | "outdoor"
  | "hoarding"
  | "busShelter"
  | "poleKiosk"
  | "gantry"
  | "skyWalk"
  | "unipole";
