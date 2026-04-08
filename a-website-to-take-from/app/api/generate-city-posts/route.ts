import { NextRequest, NextResponse } from "next/server";
import {
  generateAndSaveAllCityPosts,
  generateCityPostIfNeeded,
} from "@/lib/cityPostGenerator";
import { polishCities } from "@/lib/polishCities";

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const city = searchParams.get("city");

    switch (action) {
      case "generate-all":
        await generateAndSaveAllCityPosts();
        return NextResponse.json({
          success: true,
          message: `Generated posts for ${polishCities.length} cities`,
          count: polishCities.length,
        });

      case "generate-single":
        if (!city) {
          return NextResponse.json(
            { error: "City parameter is required for single generation" },
            { status: 400 }
          );
        }

        if (!polishCities.includes(city)) {
          return NextResponse.json(
            { error: "Invalid city slug provided" },
            { status: 400 }
          );
        }

        const post = await generateCityPostIfNeeded(city);
        return NextResponse.json({
          success: true,
          message: post
            ? `Generated new post for ${city}`
            : `Post for ${city} already exists`,
          generated: !!post,
        });

      case "list-cities":
        return NextResponse.json({
          success: true,
          cities: polishCities,
          count: polishCities.length,
        });

      default:
        return NextResponse.json(
          {
            error:
              "Invalid action. Use: generate-all, generate-single, or list-cities",
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error in generate-city-posts API:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action") || "list-cities";

  try {
    switch (action) {
      case "list-cities":
        return NextResponse.json({
          success: true,
          cities: polishCities.map((city) => ({
            slug: city,
            url: `/oferta/strona-internetowa-${city}`,
          })),
          count: polishCities.length,
        });

      case "status":
        return NextResponse.json({
          success: true,
          message: "City posts generator API is running",
          availableActions: ["generate-all", "generate-single", "list-cities"],
          totalCities: polishCities.length,
        });

      default:
        return NextResponse.json(
          {
            error: "Invalid action for GET request. Use: list-cities or status",
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error in generate-city-posts API (GET):", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
