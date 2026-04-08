import { NextRequest, NextResponse } from "next/server";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import { getDocuments } from "@/common/firebase";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const job = req.nextUrl.searchParams.get("job");

  if (!tubylytylkofigi || tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
  if (!job) {
    return NextResponse.json({ error: "no content" });
  }
  try {
    const res = await getDocuments("content");
    const content = res.find((doc) => polishToEnglish(doc.title) === job);
    if (!content) {
      return NextResponse.json({ error: "no content" });
    } else {
      return NextResponse.json(content);
    }
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
