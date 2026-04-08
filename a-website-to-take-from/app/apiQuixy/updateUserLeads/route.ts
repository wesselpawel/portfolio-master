import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  console.log(req.body);

  return NextResponse.json({ success: true });
}
