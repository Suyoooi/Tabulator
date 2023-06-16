import React, { useState, ChangeEvent } from "react";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
}

const DropdownTest: React.FC<DropdownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleOptionChange = (value: string) => {
    const selected = options.find((option) => option.value === value);
    setSelectedOption(selected || null);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (value: string) => {
    const selected = options.find((option) => option.value === value);
    if (selected) {
      if (selectedOption?.value === value) {
        setSelectedOption(null);
      } else {
        setSelectedOption(selected);
      }
    }
  };

  return (
    <div style={{ marginBottom: 20, marginLeft: 20, marginTop: 20 }}>
      <div>
        <select
          value={selectedOption?.value || ""}
          onChange={(e) => handleOptionChange(e.target.value)}
        >
          <option value="" disabled hidden>
            ==ems==
          </option>
          {options
            .filter((option) =>
              option.label.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      </div>
      {/* 검색 기능 */}
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="checkbox"
              checked={selectedOption?.value === option.value}
              onChange={() => handleCheckboxChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DropdownTest;
