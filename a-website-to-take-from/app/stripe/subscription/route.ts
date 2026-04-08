import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  try {
    const { email, successRedirect, totalPricePLN, meta } = await req.json();
    const channel = (meta?.channel || "google") as
      | "google"
      | "facebook"
      | "instagram";
    const productNameMap: Record<string, string> = {
      google: "Google Ads Setup",
      facebook: "Facebook Ads Setup",
      instagram: "Instagram Ads Setup",
    };
    const productDescMap: Record<string, string> = {
      google: "Konfiguracja kampanii Google Ads (pierwszy miesiąc)",
      facebook: "Konfiguracja kampanii Facebook Ads (pierwszy miesiąc)",
      instagram: "Konfiguracja kampanii Instagram Ads (pierwszy miesiąc)",
    };
    const unitAmount = Math.round(
      Math.max(0, Number(totalPricePLN || 0)) * 100
    );

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "pln",
            product_data: {
              name: productNameMap[channel] || productNameMap.google,
              description: productDescMap[channel] || productDescMap.google,
            },
            unit_amount: unitAmount || 10000, // fallback 100 PLN
          },
          quantity: 1,
        },
      ],
      metadata: {
        ...(meta || {}),
      },
      success_url: `${
        successRedirect || process.env.NEXT_PUBLIC_URL + "/success"
      }?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
    });

    return NextResponse.json({ success: true, url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error?.message || error);
    return NextResponse.json(
      { success: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
