import { getDocuments } from "@/common/firebase/quixy";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const posts = await getDocuments("products");
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json("not found", { status: 404 });
  }
  return NextResponse.json(posts);
}
