import { NextResponse, NextRequest } from "next/server";
import { addDocument } from "@/firebase";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

type ContactBody = {
  name?: string;
  phoneNumber?: string;
  message?: string;
  website?: string; // honeypot
};

/** Accept 9 digits only (Polish mobile). Expects normalized value from client. */
const isValidPhoneNumber = (phone: string) => /^[0-9]{9}$/.test(phone);

const COLLECTION = "contacts";

export async function POST(req: NextRequest) {
  let body: ContactBody | null = null;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Honeypot: pretend success to bots.
  if (body?.website && String(body.website).trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  const name = String(body?.name ?? "").trim();
  const phoneNumber = String(body?.phoneNumber ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || !phoneNumber || !message) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!isValidPhoneNumber(phoneNumber)) {
    return NextResponse.json(
      { success: false, message: "Invalid phone number" },
      { status: 400 }
    );
  }

  try {
    const id = `${Date.now()}-${randomUUID()}`;
    await addDocument(COLLECTION, id, {
      name,
      phoneNumber,
      message,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("contact save failed:", err);
    return NextResponse.json(
      { success: false, message: "Failed to save message" },
      { status: 500 }
    );
  }
}
