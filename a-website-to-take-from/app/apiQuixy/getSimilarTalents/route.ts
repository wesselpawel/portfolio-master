import { fetchUsers, getDocument } from "@/common/firebase/quixy";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const id = req.nextUrl.searchParams.get("id");
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json("not found", { status: 404 });
  }
  const talent = await getDocument("users", id);
  const users = await fetchUsers();
  const talents = users
    .filter(
      (user) =>
        user?.seek === true &&
        user?.seek !== "ask" &&
        user?.emailVerified &&
        user?.pseudo &&
        user?.configured &&
        user?.name &&
        user?.access &&
        user?.tags?.some((tag: any) =>
          talent?.tags?.some(
            (talentTag: any) =>
              talentTag?.slugUrl === tag?.slugUrl ||
              tag?.url === talentTag?.url ||
              tag?.categoryUrl === talentTag?.categoryUrl
          )
        )
    )
    .map((user: any) => ({
      ...user,
      email: "hidden",
    }));
  return NextResponse.json(talents);
}
