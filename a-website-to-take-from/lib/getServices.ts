"use server";
export async function getServices() {
  const services = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/apiQuixy/services?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      next: {
        revalidate: 600,
      },
    }
  ).then((res: any) => res.json());
  return services;
}
