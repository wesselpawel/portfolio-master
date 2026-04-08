import { NextRequest, NextResponse } from "next/server";
import { getDocuments } from "@/common/firebase";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import moment from "moment";

export async function GET(request: NextRequest) {
  const tubylytylkofigi = request.nextUrl.searchParams.get("tubylytylkofigi");
  const category = request.nextUrl.searchParams.get("category");
  const users = await getDocuments("users");
  // Validate API secret key
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json("not found", { status: 404 });
  }
  //get all users
  const allJobOffers = users.flatMap((user: any) => user.job_offers);
  //check moment(creationTime).add(job.days, 'days') is before now and create array with those offers
  const activeJobOffers = allJobOffers.filter((jobOffer: any) =>
    moment().isBefore(
      moment(jobOffer?.creationTime).add(jobOffer?.days, "days")
    )
  );
  try {
    if (category) {
      const jobOffers = activeJobOffers.filter(
        (jobOffer: any) => polishToEnglish(jobOffer?.job) === category
      );
      return NextResponse.json(jobOffers);
    } else {
      return NextResponse.json({ error: "no category provided" });
    }
  } catch (error) {
    // Handle any potential errors during the process
    return NextResponse.json("-", { status: 500 });
  }
}
