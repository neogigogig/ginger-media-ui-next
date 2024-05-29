import { FilterCategory } from "../ServicePageComponents/FilterComponent";

export const filterOptions: { [key in FilterCategory]: { [key: string]: string } } = {
  cities: {
    mumbai: "Mumbai",
    delhi: "Delhi",
    bangalore: "Bangalore",
  },
  mediaTypes: {
    hoarding: "Hoarding",
    busShelter: "Bus Shelter",
    poleKiosk: "Pole Kiosk",
    gantry: "Gantry",
    skyWalk: "Sky Walk",
  },
  lighting: {
    backLit: "Back Lit",
    nonLit: "Non Lit",
    frontLit: "Front Lit",
    led: "LED",
  },
};


export const filterCategory:  { [key: string]: string } = {
  cities: "City",
  mediaTypes: "Media Type",
  lighting: "Lighting",
}