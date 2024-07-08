export interface MediaDetail {
  gmgAssetCode: string;
  medium: string;
  imageUrl: string;
  location: string;
  city: string;
  displayCostPerMonth: number;
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
