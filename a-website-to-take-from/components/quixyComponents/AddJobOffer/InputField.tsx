interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  isTextArea?: boolean;
  options?: { value: string; label: string }[];
  type?: string;
  placeholder: string;
  light: boolean;
  text?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  isTextArea = false,
  options,
  type = "text",
  placeholder,
  light,
  text,
}) => {
  return (
    <div className="flex flex-col w-full sm:w-[300px]">
      <label
        className="font-extrabold drop-shadow-lg mt-3 text-lg"
        htmlFor={id}
      >
        {label}
      </label>
      {text && (
        <div className={`text-sm ${light ? "text-gray-700" : "text-gray-200"}`}>
          {text}
        </div>
      )}
      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${
            light ? "bg-white text-black" : "bg-gray-700 text-white"
          } duration-300 border border-primaryStart/70 rounded-md p-2`}
        />
      ) : options ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`${
            light ? "bg-white text-black" : "bg-gray-700 text-white"
          } duration-300 border border-primaryStart/70 rounded-md p-2`}
        >
          <option value="">Wybierz</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${
            light ? "bg-white text-black" : "bg-gray-700 text-white"
          } duration-300 border border-primaryStart/70 rounded-md p-2`}
        />
      )}
    </div>
  );
};
