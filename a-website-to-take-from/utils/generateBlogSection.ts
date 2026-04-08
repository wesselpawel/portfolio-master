"use server";
export async function generateBlogSection(title: any) {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/generateBlogPost?title=${JSON.stringify(
      title
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
