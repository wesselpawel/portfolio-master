import data from "polskie-miejscowosci";
import { NextRequest, NextResponse } from "next/server";
import { polishToEnglish } from "../../../../utils/polishToEnglish";

export async function GET(req: NextRequest) {
  const province = req.nextUrl.searchParams.get("province");
  // Validate API secret key

  const provinceCities = data?.filter(
    (city) => polishToEnglish(city.Province) === province
  );
  return NextResponse.json(provinceCities);
}
