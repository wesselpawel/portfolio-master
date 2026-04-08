"use client";
import MultiStepVerification from "@/components/quixyComponents/Dashboard/Settings/SettingsInputs/MultiStepVerification";
import { useState } from "react";
import { useSelector } from "react-redux";
import DashboardUserInfo from "./DashboardUserInfo";
import AccountHistory from "@/components/quixyComponents/Dashboard/ImageGenerator/dashboard/AccountHistory";

export default function DashboardUnderMenu() {
  const { user } = useSelector((state: any) => state.user);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="flex flex-col group w-full">
      <div className="flex items-start justify-between h-max relative w-full">
        <div className={`flex flex-col-reverse w-full`}>
          <div className="w-full">
            <DashboardUserInfo />
            <div>
              <MultiStepVerification
                seek={user?.seek}
                pseudo={user?.pseudo}
                name={user?.name}
                title={user?.title}
                configured={user?.configured}
                user={user}
                setIsAnimating={setIsAnimating}
                isAnimating={isAnimating}
              />
            </div>
            <AccountHistory />
          </div>
        </div>
      </div>
    </div>
  );
}

// USER STATISTICS
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Bar,
//   BarChart,
// } from "recharts";
// <div className="my-4 bg-blue-100 p-4 rounded-xl">
//                 <ResponsiveContainer width="100%" height={350}>
//                   <LineChart
//                     data={generateLeadsChartData(user?.leads, "leady")}
//                     margin={{
//                       top: 5,
//                       right: 0,
//                       left: 0,
//                       bottom: 5,
//                     }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="miesiac" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Line type="monotone" dataKey="leady" stroke="blue" />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
// function generateLeadsChartData(data: any, key: string) {
//   // Find unique month names from leads
//   const uniqueMonths = new Set(
//     data?.map((lead: any) => moment(lead.createdAt)?.format("MM.YYYY"))
//   );
//   const uniqueMonthNames = Array?.from(uniqueMonths).sort();

//   // {'czerwiec 2024', 'maj 2024'}
//   const chartData = uniqueMonthNames?.map((month: any) => ({
//     miesiac: month,
//     [key]: data?.filter(
//       (lead: any) => moment(lead.createdAt).format("MM.YYYY") === month
//     )?.length,
//   }));

//   return chartData;
// }
