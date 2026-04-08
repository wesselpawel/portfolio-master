import data from "polskie-miejscowosci";
import { NextRequest, NextResponse } from "next/server";
import { polishToEnglish } from "../../../../utils/polishToEnglish";

export async function GET(req: NextRequest) {
  const cityMapData = data?.reduce((acc, curr) => {
    const city = polishToEnglish(curr.Name);
    acc.set(city, {
      lat: curr.Latitude,
      lng: curr.Longitude,
    });
    return acc;
  }, new Map<string, { lat: number; lng: number }>());
  return NextResponse.json(Object.fromEntries(cityMapData));
}
