import { useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";

const TechnologySelector = ({
  technologies,
  formData,
  setFormData,
  light,
}: {
  technologies: any;
  formData: any;
  setFormData: any;
  light: any;
}) => {
  const [technologyInput, setTechnologyInput] = useState("");
  const [isListVisible, setIsListVisible] = useState(false);

  const handleInputChange = (e: any) => {
    setTechnologyInput(e.target.value);
  };

  const handleSearchClick = () => {
    setIsListVisible(true);
  };

  const filteredTechnologies = technologies?.filter((technology: any) =>
    technology?.toLowerCase().includes(technologyInput?.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="font-extrabold">Technologie</div>
        <p className="text-xs mt-px">(Wybierz ile chcesz, opcjonalnie)</p>
      </div>

      {/* Selected technologies */}
      <div className="mb-2">
        <div className="flex flex-wrap gap-1">
          {formData?.technologies?.length > 0 ? (
            formData?.technologies?.map((technology: any) => (
              <div
                key={technology}
                className="flex items-center bg-primaryStart text-white text-sm rounded-md shadow-sm"
              >
                <span className="px-2">{technology}</span>
                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      technologies: formData?.technologies?.filter(
                        (t: any) => t !== technology
                      ),
                    })
                  }
                  className="px-2 py-1 text-white hover:bg-primaryEnd rounded-r-md transition duration-200"
                >
                  <FaCircleXmark className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <span className="text-gray-500 text-sm">
              Brak wybranych technologii
            </span>
          )}
        </div>
      </div>

      {/* Search input */}
      <div className="mb-4 flex flex-col">
        <input
          type="text"
          value={technologyInput}
          onSelect={handleSearchClick}
          onChange={handleInputChange}
          className={`${
            light ? "bg-white text-black" : "bg-gray-700 text-white"
          } duration-300 border border-primaryStart/70 rounded-md p-2`}
          placeholder="Wyszukaj technologie..."
        />
      </div>

      {/* Available technologies */}
      {isListVisible && (
        <div
          className={`${
            light ? "bg-white text-black" : "bg-gray-700 text-white"
          } duration-300 border border-primaryStart/70 rounded-md p-3 max-h-48 overflow-y-auto space-y-2`}
          tabIndex={-1} // Makes the div focusable for onBlur to work
        >
          {filteredTechnologies?.length === 0 && "Brak wyników"}
          {filteredTechnologies?.map((technology: any) => (
            <label
              key={technology}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={technology}
                checked={formData?.technologies?.includes(technology)}
                onChange={(e) => {
                  const selectedTechnology = e.target.value;
                  setFormData((prevState: any) => ({
                    ...prevState,
                    technologies: prevState.technologies.includes(
                      selectedTechnology
                    )
                      ? prevState.technologies.filter(
                          (t: any) => t !== selectedTechnology
                        )
                      : [...prevState.technologies, selectedTechnology],
                  }));
                }}
                className={`${
                  light ? "bg-white text-black" : "bg-gray-700 text-white"
                } duration-300 border border-primaryStart/70 rounded-md p-2`}
              />
              <span>{technology}</span>
            </label>
          ))}
        </div>
      )}
      {isListVisible && (
        <button
          onClick={() => setIsListVisible(false)}
          className="mt-2 p-2 w-full bg-primaryStart text-white rounded-md"
        >
          Zakończ wyszukiwanie
        </button>
      )}
    </div>
  );
};

export default TechnologySelector;
