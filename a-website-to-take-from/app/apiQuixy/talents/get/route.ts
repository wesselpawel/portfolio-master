import { getDocuments } from "@/common/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const pseudo = req.nextUrl.searchParams.get("pseudo");
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json("not found", { status: 404 });
  }
  const users = await getDocuments("users");
  const slugData = users.find((user) => user?.pseudo === pseudo) || {};

  return NextResponse.json({
    ...slugData,
    email: "hidden",
  });
}
