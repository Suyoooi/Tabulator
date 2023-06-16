import { useState } from "react";

interface Option {
  id: number;
  name: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
}

const OptionList: Option[] = [
  { id: 1, name: "ems server1", value: "ems server1" },
  { id: 2, name: "ems server2", value: "ems server2" },
  { id: 3, name: "ems server3", value: "ems server3" },
  { id: 4, name: "ems server4", value: "ems server4" },
];

const SimpleDropdown: React.FC<DropdownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
  };

  const handleOptionChange = (value: string) => {
    const selected = options.find((option) => option.value === value);
    setSelectedOption(selected || null);
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

  const handleConfirm = () => {
    // 선택한 서버를 SelectBox에 표시하거나 다른 액션 수행
    const selectedServerName = selectedOption
      ? selectedOption.name
      : "No server selected";
    alert(`${selectedServerName}를 선택했습니다`);
    setDropdownMenu(false);
  };

  const handleDropdownVisible = () => {
    setDropdownMenu(!dropdownMenu);
  };

  return (
    <>
      <div>
        {/* <select
              value={selectedOption?.value || ""}
              onChange={(e) => handleOptionChange(e.target.value)}
              onClick={handleDropdownVisible}
            >
              <option value="" disabled hidden>
                ==ems==
              </option>
              {OptionList.map((option) => (
                <option disabled hidden key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select> */}
        <div
          onClick={handleDropdownVisible}
          style={{ backgroundColor: "white", width: 200, cursor: "pointer" }}
        >
          ems server를 선택해주세요
        </div>
        <div>
          <div>
            {dropdownMenu ? (
              <div>
                {OptionList.map((option) => (
                  <div key={option.value}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedOption?.id === option.id}
                        onChange={() => handleSelectOption(option)}
                      />
                      {option.name}
                    </label>
                  </div>
                ))}
                <div>
                  <button
                    style={{
                      backgroundColor: "pink",
                      borderRadius: 10,
                      width: 80,
                    }}
                    onClick={handleConfirm}
                  >
                    all apply
                  </button>
                  <button
                    style={{
                      backgroundColor: "pink",
                      borderRadius: 10,
                      width: 80,
                    }}
                    onClick={() => setSelectedOption(null)}
                  >
                    all reset
                  </button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleDropdown;
