import { FaStar } from "react-icons/fa";

const opinions = [
  {
    name: "Anna N.",
    opinion:
      "Strona wykonana szybko i profesjonalnie. Kontakt z zespołem był bardzo dobry. Polecam każdemu, kto chce mieć nowoczesną stronę!",
    rating: "5",
  },
  {
    name: "Marek Z.",
    opinion:
      "Bardzo sprawna realizacja, wszystko zgodnie z ustaleniami. Strona wygląda świetnie i działa bez zarzutu.",
    rating: "5",
  },
  {
    name: "Katarzyna W.",
    opinion:
      "Nie musiałam się na niczym znać – wystarczyło opisać, czego potrzebuję. Efekt przeszedł moje oczekiwania!",
    rating: "5",
  },
  {
    name: "Tomasz L.",
    opinion: "Świetna obsługa i wsparcie po wdrożeniu strony. Polecam!",
    rating: "5",
  },
];

export default function Opinions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 font-gotham">
      {opinions.map((opinion, index) => (
        <div
          data-aos="fade-up"
          aos-duration="300"
          className={`flex flex-col justify-center border-t border-green-500 p-6 relative`}
          key={index}
        >
          <div className="rounded-full w-10 h-10 text-white font-bold flex items-center justify-center text-2xl">
            {opinion.name.charAt(0).toUpperCase()}
          </div>
          <span className="font-bold text-2xl">{opinion.name}</span>
          <p className="mt-4 text-base font-light">{opinion.opinion}</p>
          <div className="flex flex-row items-center text-yellow-400 mt-2">
            <FaStar className="h-4 w-4" />
            <FaStar className="h-4 w-4" />
            <FaStar className="h-4 w-4" />
            <FaStar className="h-4 w-4" />
            <FaStar className="h-4 w-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
