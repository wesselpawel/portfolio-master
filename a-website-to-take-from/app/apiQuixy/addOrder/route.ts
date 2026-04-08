import { updateUserLeads } from "@/common/firebase/quixy";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { data } = await req.json();
  await updateUserLeads(data.uid, { ...data, type: "order" });
  return NextResponse.json({ success: true });
}
