import { getUsers } from "@/common/firebase/quixy";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const pseudo = req.nextUrl.searchParams.get("pseudo");
  const users = await getUsers();
  const user = users.find((user) => user?.pseudo === pseudo);
  if (!user) {
    return NextResponse.json({ available: true });
  } else {
    return NextResponse.json({ available: false });
  }
}
