import jobs from "../../../public/14.09.2024.json";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json(jobs);
}
