import { fetchUsers } from "@/common/firebase/quixy";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json("not found", { status: 404 });
  }
  const users = await fetchUsers();
  const filteredUsers = users.map((u: any) => u.email);
  return NextResponse.json(filteredUsers);
}
