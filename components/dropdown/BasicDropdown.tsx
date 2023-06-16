import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

const option = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const BasicDropdown = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionChange = (value: string) => {
    const selected = option.find((option) => option.value === value);
    setSelectedOption(selected || null);
  };

  return (
    <div>
      <select
        value={selectedOption?.value || ""}
        onChange={(e) => handleOptionChange(e.target.value)}
      >
        <option value="" disabled hidden>
          ==ems==
        </option>
        {option.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BasicDropdown;
