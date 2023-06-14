import { useState } from "react";

type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  options: Option[];
};

const DropdownTest: React.FC<DropdownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionChange = (value: string) => {
    const selected = options.find((option) => option.value === value);
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
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownTest;
