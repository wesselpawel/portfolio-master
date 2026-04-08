import Hero from "@/components/hero/Hero";
import { ThemeProvider } from "@/common/context/ThemeContext";
import UserLayoutClient from "./UserLayoutClient";
export const dynamic = true;
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If you want to fetch user data on the server, do it here (e.g., from cookies/session)
  // const user = await getUserFromSession();

  return (
    <div className="w-screen bg-black/90 relative pt-[65px] lg:pt-[94px] pb-[50vh]">
      <div className="h-screen w-screen fixed left-0 top-0">
        <Hero />
      </div>
      <ThemeProvider>
        {/* Pass any server-fetched data as props if needed */}
        <UserLayoutClient>{children}</UserLayoutClient>
      </ThemeProvider>
    </div>
  );
}
