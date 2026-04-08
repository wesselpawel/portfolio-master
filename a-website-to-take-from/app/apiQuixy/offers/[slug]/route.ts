import { NextRequest, NextResponse } from "next/server";
import { getDocuments } from "@/common/firebase";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const slug = req.nextUrl.searchParams.get("slug");
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json("not found", { status: 404 });
  }
  try {
    const req: any = await getDocuments("offers");
    if (slug) {
      const jobOffers = req.filter(
        (jobOffer: any) => polishToEnglish(jobOffer?.job) === slug
      );
      return NextResponse.json(jobOffers);
    } else {
      return NextResponse.json({ error: "No Slug Provided" });
    }
  } catch (error) {
    // Handle any potential errors during the process
    return NextResponse.json("-", { status: 500 });
  }
}
