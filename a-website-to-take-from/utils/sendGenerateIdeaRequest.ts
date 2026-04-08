"use server";
export async function sendGenerateIdeaRequest(
  additional: any,
  place: string,
  product: string,
  investment: string
) {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/generateIdea?additional=${additional}&place=${place}&product=${product}&investment=${investment}&tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
    }
  );
  const data = req.json();

  return data;
}
