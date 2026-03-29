import { NextRequest, NextResponse } from "next/server";
import { getFeaturedCompanyProfiles } from "@/data/companyProfiles";
import { getQuixyCompanyProfiles } from "@/lib/quixyCompanies";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const currentSlug = request.nextUrl.searchParams.get("currentSlug") ?? undefined;
  const limitParam = Number(request.nextUrl.searchParams.get("limit") ?? "3");
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : 3;

  try {
    const companies = await getQuixyCompanyProfiles(currentSlug, limit);

    if (companies.length) {
      return NextResponse.json(companies);
    }
  } catch (error) {
    console.error("Failed to load companies from Quixy", error);
  }

  return NextResponse.json(getFeaturedCompanyProfiles(currentSlug, limit));
}
