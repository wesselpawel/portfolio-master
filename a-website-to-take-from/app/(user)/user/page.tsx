import InitializeUser from "@/components/quixyComponents/InitializeUser";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const DashboardUnderMenu = dynamic(() => import("./DashboardUnderMenu"));

export const metadata: Metadata = {
  title: "Panel administracyjny",
};

export default async function Page() {
  return (
    <div className="font-sans w-full">
      <InitializeUser />
      <DashboardUnderMenu />
    </div>
  );
}
