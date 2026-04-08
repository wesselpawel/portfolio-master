"use client";

import { app } from "@/common/firebase/quixy";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Content() {
  const [leads, setLeads] = useState<any>();
  useEffect(() => {
    const ref = collection(getFirestore(app), "content");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setLeads(snapshotData);
    });
  }, []);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Kontent na podstronach</h1>
    </div>
  );
}
