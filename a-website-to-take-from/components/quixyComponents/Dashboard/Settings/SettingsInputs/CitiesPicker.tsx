import { useState } from "react";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";

export default function CitiesPicker({
  user,
  handleReduxUserState,
  setChangesWereMade,
  light,
}: {
  user: any;
  handleReduxUserState: any;
  setChangesWereMade: any;
  light: any;
}) {
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
      const cities = await response.json();
      setCities(cities);
    }
    setLoading(false);
  }
  const [inputCity, setInputCity] = useState<any>("");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:mt-3">
      <div className="flex flex-col mt-3 sm:mt-0">
        <label className="font-bold">Województwo</label>
        <select
          value={user?.region}
          onChange={(e) => {
            handleReduxUserState(e.target.value, "region");
            openCitySelector(e.target.value);
            setChangesWereMade(true);
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
      {user?.region && (
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="cities">
            Miasto
          </label>
          <input
            disabled={loading}
            list="cities"
            className={`${
              light ? "bg-white text-black" : "bg-gray-700 text-white"
            } duration-300 rounded-md disabled:bg-primary/50 disabled:cursor-not-allowed disabled:font-bold disabled:text-white border border-primaryStart/70 p-2`}
            value={inputCity === "" ? user?.city : inputCity}
            onClick={() => {
              if (!cities.length && user?.region) {
                handleReduxUserState("", "city");
                openCitySelector(user?.region);
              }
            }}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                handleReduxUserState("", "city");
                setInputCity("");
              } else if (cities.find((city: any) => city.Name === value)) {
                handleReduxUserState(value, "city");
                setInputCity(value);
                setChangesWereMade(true);
              } else {
                setInputCity(value);
              }
            }}
            placeholder={`${loading ? "Wczytywanie..." : "Wpisz miasto..."}`}
          />
          <datalist id="cities">
            {cities.map((city: any, i: number) => (
              <option key={i} value={city.Name} />
            ))}
          </datalist>
        </div>
      )}
    </div>
  );
}
