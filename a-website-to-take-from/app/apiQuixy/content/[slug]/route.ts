import { getDocument } from "@/common/firebase";
import { NextResponse } from "next/server";
import { polishToEnglish } from "../../../../utils/polishToEnglish";

export async function GET(params: any, req: any) {
  const { slug } = await req.params;
  const content = await getDocument("content", slug);
  if (!content) {
    return NextResponse.json({}, { status: 404 });
  }
  return NextResponse.json(content);
}
