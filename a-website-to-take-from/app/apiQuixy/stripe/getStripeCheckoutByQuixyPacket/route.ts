import { addOrder } from "@/common/firebase/quixy";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

export async function POST(req: NextRequest) {
  const id = uuidv4();
  const uid = req.nextUrl.searchParams.get("uid");
  const packet = req.nextUrl.searchParams.get("packet");
  if (!uid || !packet) {
    return NextResponse.json({ errorMsg: "brak danych" });
  }
  try {
    const getStripeData = (packet: string) => {
      switch (packet) {
        case "smallBusiness":
          return {
            name: "💎50 Quixies - Small Business",
            price: 4999,
            quantity: 50,
          };

        case "mediumBusiness":
          return {
            name: "💎125 Quixies - Medium Business",
            price: 9999,
            quantity: 125,
          };
        case "business":
          return {
            name: "💎330 Quixies - Business",
            price: 19999,
            quantity: 600,
          };
        case "bigBusiness":
          return {
            name: "💎1950 Quixies - Big Business",
            price: 49999,
            quantity: 1690,
          };
        default:
          return {
            name: "💎9999 Quixies",
            price: 99999,
            quantity: 9999,
          };
      }
    };
    await addOrder(id, {
      uid: uid,
      id: id,
      realized: false,
      quantity: getStripeData(packet).quantity,
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "p24", "blik"], // Add 'blik' and 'payu' for BLIK and PayU payments
      line_items: [
        {
          price_data: {
            currency: "pln",
            unit_amount: getStripeData(packet).price,
            product_data: {
              name: getStripeData(packet).name,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/${id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout/${id}`,
      locale: "pl",
      metadata: {
        quantity: getStripeData(packet).quantity,
        productName: getStripeData(packet).name,
        products: getStripeData(packet).name,
        id: id,
        uid: uid,
      },
    });

    return NextResponse.json({ ...session, error: false });
  } catch (error) {
    return NextResponse.json({ errorMsg: error });
  }
}
