import Map from "@/components/Map";
import { MapMarker } from "@/types";
export default function ReachSection({
  markers,
  isLandingPage,
}: {
  markers: MapMarker[];
  isLandingPage?: boolean;
}) {
  return (
    <div className="mt-12">
      <div className="text-center">
        <span
          className={`block mb-6 text-3xl lg:text-4xl font-bold ${
            isLandingPage ? "text-white" : "text-zinc-800"
          }  drop-shadow-md shadow-black`}
        >
          Zasięg Działania
        </span>
        <p
          className={`text-lg ${
            isLandingPage ? "text-white" : "text-zinc-800"
          } text-gray-600 max-w-3xl mx-auto mb-6 font-gotham font-light`}
        >
          Realizujemy strony internetowe, platformy webowe oraz kampanie
          marketingowe (Google Ads, social media) dla klientów w całej Polsce.
          Pracujemy zdalnie, z pełnym wsparciem niezależnie od lokalizacji.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600">16</div>
            <div className="text-sm text-gray-600">Województw</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600">50+</div>
            <div className="text-sm text-gray-600">Miast</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-sm text-gray-600">Zdalnie</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-orange-600">24h</div>
            <div className="text-sm text-gray-600">Odpowiedź</div>
          </div>
        </div>
      </div>

      <div className="relative w-full mx-auto overflow-visible">
        <Map markers={markers} />
      </div>
    </div>
  );
}
