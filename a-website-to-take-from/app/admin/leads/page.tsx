"use client";
import { app, auth } from "@/common/firebase";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import "moment/locale/pl";
import { FaArrowRight } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import { useAuthState } from "react-firebase-hooks/auth";
interface AdminPageProps {
  courses: any[];
  leads: any[];
  applications: any[];
  secondLeads: any[];
}

export default function Admin() {
  moment.locale("pl");
  const [user, loading] = useAuthState(auth);
  const [data, setData] = useState<AdminPageProps>({
    courses: [],
    leads: [],
    applications: [],
    secondLeads: [],
  });
  useEffect(() => {
    const ref1 = collection(getFirestore(app), "leads");

    const unsub = onSnapshot(ref1, (querySnapshot: any) => {
      const snapshotData: any[] = querySnapshot.docs.map((doc: any) =>
        doc.data()
      );

      setData((prevData) => ({
        ...prevData,
        leads: snapshotData.filter((lead: any) => !lead.owner),
      }));
    });

    return () => {
      unsub();
    };
  }, []);

  function generateLeadsChartData(data: any, key: string) {
    // Find unique month names from leads
    const uniqueMonths = new Set(
      data.map((lead: any) => moment(lead.createdAt).format("MM.YYYY"))
    );
    const uniqueMonthNames = Array.from(uniqueMonths).sort();

    // {'czerwiec 2024', 'maj 2024'}
    const chartData = uniqueMonthNames.map((month: any) => ({
      miesiac: month,
      [key]: data.filter(
        (lead: any) => moment(lead.createdAt).format("MM.YYYY") === month
      ).length,
    }));

    return chartData;
  }
  const light = false;
  return (
    <div
      className={`min-h-screen grid lg:grid-cols-2 -ml-4 -mt-4 p-6 font-sans`}
    >
      {
        <div className="flex flex-col">
          <div
            className={`${
              light
                ? "text-zinc-800 bg-white"
                : "text-white bg-zinc-800 duration-300"
            } flex flex-col p-6 h-max ml-4 mt-4 rounded-md`}
          >
            <h2
              className={`text-3xl font-bold font-sans ${
                light ? "text-zinc-800" : "text-white"
              }`}
            >
              <Link href="/admin/leads/leads" className="flex items-center">
                Strony internetowe <FaArrowRight className="ml-2" />
              </Link>
            </h2>
            <div
              className={`mt-4 p-4 font-bold rounded-xl ${
                light
                  ? `text-white ${
                      user?.email === "admin@quixy.pl"
                        ? "bg-[green]"
                        : "bg-[blue]"
                    }`
                  : "text-white bg-zinc-600"
              }`}
            >
              <p className="text-xl">Wszystkie Leady: {data.leads.length}</p>
              <p className="text-xl">
                Nowe Leady:{" "}
                {
                  data.leads.filter(
                    (lead: any) => !lead.isFinished && !lead.isTrash
                  )?.length
                }{" "}
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
