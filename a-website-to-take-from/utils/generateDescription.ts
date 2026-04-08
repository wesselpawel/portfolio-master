"use server";
export async function generateDescription(position: any) {
  const req = await fetch(
    `${
      process.env.NEXT_PUBLIC_URL
    }/api/generateDescription?position=${JSON.stringify(
      position
    )}&tubylytylkofigi=${process.env.API_SECRET_KEY}`,
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
