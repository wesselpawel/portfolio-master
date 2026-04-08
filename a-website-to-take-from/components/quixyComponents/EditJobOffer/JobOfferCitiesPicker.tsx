import { useState } from "react";
import { polishToEnglish } from "../../../utils/polishToEnglish";

export default function JobOfferCitiesPicker({
  formData,
  setFormData,
  light,
}: {
  formData: any;
  setFormData: any;
  light: any;
}) {
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputCity, setInputCity] = useState<string>("");

  async function openCitySelector(province: any) {
    setLoading(true);
    if (province) {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_URL
        }/apiQuixy/cities/getCityByProvince?province=${polishToEnglish(
          province
        )}`
      );
      const fetchedCities = await response.json();
      setCities(fetchedCities);
    }
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:mt-3">
      {/* Province Selector */}
      <div className="flex flex-col mt-3 sm:mt-0">
        <label className="font-bold">Województwo</label>
        <select
          value={formData?.region}
          onChange={(e) => {
            const selectedRegion = e.target.value;
            setFormData({ ...formData, region: selectedRegion, city: "" });
            setInputCity("");
            openCitySelector(selectedRegion);
          }}
          className={`${
            light ? "bg-white text-black" : "bg-gray-700 text-white"
          } duration-300 border border-primaryStart/70 rounded-md p-2`}
        >
          <option value="">Wybierz</option>
          {[
            "Lubelskie",
            "Mazowieckie",
            "Podlaskie",
            "Świętokrzyskie",
            "Wielkopolskie",
            "Małopolskie",
            "Kujawsko-Pomorskie",
            "Łódzkie",
            "Śląskie",
            "Warmińsko-Mazurskie",
            "Pomorskie",
            "Podkarpackie",
            "Dolnośląskie",
            "Opolskie",
            "Zachodniopomorskie",
            "Lubuskie",
          ].map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {/* City Selector */}

      <div className="flex flex-col">
        <label className="font-bold" htmlFor="cities">
          Miasto
        </label>
        <input
          disabled={loading}
          list="cities3"
          className={`${
            light ? "bg-white text-black" : "bg-gray-700 text-white"
          } duration-300 rounded-md disabled:bg-primary/50 disabled:cursor-not-allowed disabled:font-bold disabled:text-white border border-primaryStart/70 p-2`}
          value={inputCity || formData?.city}
          onClick={() => {
            if (!cities.length && formData?.region) {
              openCitySelector(formData?.region);
            }
          }}
          onChange={(e) => {
            const value = e.target.value;
            setInputCity(value);

            // Update formData.city only if the value is valid
            const matchedCity = cities.find(
              (city: any) => city.Name.toLowerCase() === value.toLowerCase()
            );
            if (matchedCity) {
              setFormData({ ...formData, city: matchedCity.Name });
            } else {
              setFormData({ ...formData, city: "" });
            }
          }}
          placeholder={`${loading ? "Wczytywanie..." : "Wpisz miasto..."}`}
        />
        <datalist id="cities3">
          {cities.map((city: any, i: number) => (
            <option key={i} value={city.Name} />
          ))}
        </datalist>
      </div>
    </div>
  );
}
