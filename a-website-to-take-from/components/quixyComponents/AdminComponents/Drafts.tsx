"use client";
import moment from "moment";
import "moment/locale/pl";
import { useEffect, useState } from "react";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { app, deleteMultipleDrafts } from "@/common/firebase/quixy";
import Products from "@/components/quixyComponents/AdminComponents/Products";

export default function Drafts({ source }: { source: string }) {
  moment.locale("pl");
  const [drafts, setDrafts] = useState<any[]>([]);
  useEffect(() => {
    const ref = collection(getFirestore(app), source);
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setDrafts(snapshotData);
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <div className="p-12">
      {" "}
      <h2 className="text-white font-bold text-3xl mb-6">Kopie robocze</h2>
      <p className="text-white font-light text-lg mb-3">
        Kiedy zaczynasz pracę nad nowym wpisem, wszystkie wprowadzone dane
        automatycznie zapisują się jako <b>kopia robocza</b>. Kopie robocze
        pozwalają Ci na przerwanie pracy w dowolnym momencie i kontynuowanie jej
        później - bez obawy, że stracisz postępy.
      </p>
      <p className="text-white font-light text-lg mb-3">
        Kopie robocze <b>nie są widoczne na stronie</b> do momentu, kiedy wpis
        zostanie w pełni dodany i opublikowany. Dzięki temu możesz wracać do
        pracy, dopracować szczegóły i publikować gotowe wpisy wtedy, gdy będą
        gotowe.
      </p>
      <p className="text-white font-light text-lg mb-6">
        <b>Bez stresu</b> - Twoje zmiany są zawsze zapisane!
      </p>
      <Products
        array={drafts}
        deleteRows={deleteMultipleDrafts}
        place="drafts"
      />
    </div>
  );
}
