import { getDocuments } from "@/common/firebase/quixy";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tubylytylkofigi = request.nextUrl.searchParams.get("tubylytylkofigi");
  const users = await getDocuments("users");
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json("not found", { status: 404 });
  }
  const services = users.flatMap((user: any) =>
    user?.projects?.length > 0 ? user.projects : []
  );
  try {
    if (services.length > 0) {
      return NextResponse.json(services);
    } else {
      return NextResponse.json([]);
    }
  } catch (error) {
    // Handle any potential errors during the process
    return NextResponse.json("error", { status: 500 });
  }
}
