import { NextResponse, NextRequest } from "next/server";
import { addDocument } from "@/firebase";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

type CalculatorPayload = {
  source: "hero-kalkulator-kosztow";
  kind: "www" | "sklep";
  packageId: string;
  packageName: string;
  addonIds: string[];
  addons: { id: string; label: string; pricePln: number }[];
  basePln: number | null;
  addonSum: number;
  totalPln: number | null;
};

type LeadBody = {
  name?: string;
  phoneNumber?: string;
  website?: string;
  calculator?: CalculatorPayload;
};

const COLLECTION = "leads";

/** Accept 9 digits only (Polish mobile). Expects normalized value from client. */
const isValidPhoneNumber = (phone: string) => /^[0-9]{9}$/.test(phone);

function isCalculatorPayload(v: unknown): v is CalculatorPayload {
  if (!v || typeof v !== "object") return false;
  const c = v as Record<string, unknown>;
  if (c.source !== "hero-kalkulator-kosztow") return false;
  if (c.kind !== "www" && c.kind !== "sklep") return false;
  if (typeof c.packageId !== "string" || !c.packageId) return false;
  if (typeof c.packageName !== "string") return false;
  if (!Array.isArray(c.addonIds) || !c.addonIds.every((x) => typeof x === "string"))
    return false;
  if (!Array.isArray(c.addons)) return false;
  for (const a of c.addons) {
    if (!a || typeof a !== "object") return false;
    const ad = a as Record<string, unknown>;
    if (typeof ad.id !== "string" || typeof ad.label !== "string" || typeof ad.pricePln !== "number")
      return false;
  }
  if (c.basePln !== null && typeof c.basePln !== "number") return false;
  if (typeof c.addonSum !== "number") return false;
  if (c.totalPln !== null && typeof c.totalPln !== "number") return false;
  return true;
}

export async function POST(req: NextRequest) {
  let body: LeadBody | null = null;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (body?.website && String(body.website).trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  const name = String(body?.name ?? "").trim();
  const phoneNumber = String(body?.phoneNumber ?? "").trim();
  const calculator = body?.calculator;

  if (!name || !phoneNumber) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 },
    );
  }

  if (!isValidPhoneNumber(phoneNumber)) {
    return NextResponse.json(
      { success: false, message: "Invalid phone number" },
      { status: 400 },
    );
  }

  if (!isCalculatorPayload(calculator)) {
    return NextResponse.json(
      { success: false, message: "Invalid calculator data" },
      { status: 400 },
    );
  }

  try {
    const id = `${Date.now()}-${randomUUID()}`;
    await addDocument(COLLECTION, id, {
      name,
      phoneNumber,
      calculator,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("leads save failed:", err);
    return NextResponse.json(
      { success: false, message: "Failed to save lead" },
      { status: 500 },
    );
  }
}
