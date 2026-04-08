"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function CityPostsPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("");

  const generateAllPosts = async () => {
    setLoading(true);
    setStatus("Generowanie postów dla wszystkich miast...");

    try {
      const response = await fetch(
        "/api/generate-city-posts?action=generate-all",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              process.env.NEXT_PUBLIC_ADMIN_API_KEY || "demo-key"
            }`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(`Wygenerowano posty dla ${data.count} miast!`);
        setStatus(`✅ Sukces! Wygenerowano ${data.count} postów.`);
      } else {
        toast.error(data.error || "Błąd podczas generowania postów");
        setStatus(`❌ Błąd: ${data.error}`);
      }
    } catch (error) {
      console.error("Error generating posts:", error);
      toast.error("Błąd podczas generowania postów");
      setStatus(
        `❌ Błąd: ${error instanceof Error ? error.message : "Nieznany błąd"}`
      );
    } finally {
      setLoading(false);
    }
  };

  const generateSinglePost = async (city: string) => {
    setLoading(true);
    setStatus(`Generowanie posta dla ${city}...`);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/generate-city-posts?action=generate-single&city=${city}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              process.env.NEXT_PUBLIC_ADMIN_API_KEY || "demo-key"
            }`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setStatus(`✅ ${data.message}`);
      } else {
        toast.error(data.error || "Błąd podczas generowania posta");
        setStatus(`❌ Błąd: ${data.error}`);
      }
    } catch (error) {
      console.error("Error generating post:", error);
      toast.error("Błąd podczas generowania posta");
      setStatus(
        `❌ Błąd: ${error instanceof Error ? error.message : "Nieznany błąd"}`
      );
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/generate-city-posts?action=status`
      );
      const data = await response.json();

      if (data.success) {
        setStatus(
          `📊 Status: ${data.message}. Dostępnych miast: ${data.totalCities}`
        );
      }
    } catch (error) {
      console.error("Error checking status:", error);
      setStatus("❌ Błąd podczas sprawdzania statusu");
    }
  };

  return (
    <div className="p-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Zarządzanie Postami Miast
      </h1>

      <div className="bg-[#1a1f2e] rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Generator Postów dla Polskich Miast
        </h2>
        <p className="text-gray-300 mb-6">
          Ten panel pozwala na generowanie automatycznych postów dla polskich
          miast w formacie /oferta/strona-internetowa-{`{miasto}`}. Posty są
          zapisywane w bazie danych i używają gramatycznie poprawnych form
          polskich nazw miast.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={generateAllPosts}
            disabled={loading}
            className="bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] text-black font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Generowanie..." : "Generuj Wszystkie Posty"}
          </button>

          <button
            onClick={checkStatus}
            disabled={loading}
            className="bg-gray-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Sprawdź Status
          </button>
        </div>

        {status && (
          <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <p className="text-gray-200 whitespace-pre-line">{status}</p>
          </div>
        )}
      </div>

      <div className="bg-[#1a1f2e] rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">
          Przykładowe Miasta
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            "warszawa",
            "krakow",
            "gdansk",
            "wroclaw",
            "poznan",
            "lodz",
            "szczecin",
            "bydgoszcz",
          ].map((city) => (
            <div key={city} className="bg-gray-800 p-3 rounded-lg">
              <p className="text-white font-medium capitalize mb-2">
                {city.replace("-", " ")}
              </p>
              <button
                onClick={() => generateSinglePost(city)}
                disabled={loading}
                className="w-full bg-blue-600 text-white text-sm px-3 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Generuj
              </button>
              <a
                href={`/oferta/strona-internetowa-${city}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-green-600 text-white text-sm px-3 py-2 rounded mt-2 hover:bg-green-700 transition-colors"
              >
                Podgląd
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-[#1a1f2e] rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">
          Informacje Techniczne
        </h3>

        <div className="text-gray-300 space-y-2">
          <p>
            <strong>Format URL:</strong> /oferta/strona-internetowa-{`{miasto}`}
          </p>
          <p>
            <strong>Przykład:</strong> /oferta/strona-internetowa-czestochowa
          </p>
          <p>
            <strong>Gramatyka:</strong> Automatyczne odmiany przez przypadki
            polskie
          </p>
          <p>
            <strong>SEO:</strong> Unikalne title, description i keywords dla
            każdego miasta
          </p>
          <p>
            <strong>Sitemap:</strong> Automatyczne dodawanie do sitemap.xml
          </p>
        </div>
      </div>
    </div>
  );
}
