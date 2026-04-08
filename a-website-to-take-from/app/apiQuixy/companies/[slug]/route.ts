import { fetchUsers } from "@/common/firebase/quixy";
import { NextResponse } from "next/server";

export async function GET(params: any, req: any) {
  const { slug } = await req.params;
  const users = await fetchUsers();
  const user = users?.find((user) => user?.pseudo === slug);
  return NextResponse.json({
    ...user,
    email: "hidden",
  });
}
