import { useState } from "react";

interface Option {
  id: number;
  name: string;
  value: string;
}

const OptionList: Option[] = [
  { id: 1, name: "ems server1", value: "ems server1" },
  { id: 2, name: "ems server2", value: "ems server2" },
  { id: 3, name: "ems server3", value: "ems server3" },
  { id: 4, name: "ems server4", value: "ems server4" },
];

const SimpleDropdown = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [dropdownMenu, setDropdownMenu] = useState(false);

  //   선택한 서버에 대한 변수
  const selectedServerNames = selectedOptions.map((option) => option.name);
  const selectedServerCount = selectedOptions.length;

  const handleSelectOption = (option: Option) => {
    const isSelected = selectedOptions.some(
      (selected) => selected.id === option.id
    );
    if (isSelected) {
      setSelectedOptions(
        selectedOptions.filter((selected) => selected.id !== option.id)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  // 데이터 확인용 alert 추가
  const handleConfirm = () => {
    if (selectedServerCount > 0) {
      alert(
        `서버 ${selectedServerCount}건을 선택했습니다. 선택한 서버: ${selectedServerNames.join(
          ", "
        )}`
      );
    } else {
      alert("No servers selected");
    }
    setDropdownMenu(false);
  };

  const handleDropdownVisible = () => {
    setDropdownMenu(!dropdownMenu);
  };

  return (
    <>
      <div>
        {/* === 입력 창 === */}
        <div
          onClick={handleDropdownVisible}
          style={{ backgroundColor: "white", width: 200, cursor: "pointer" }}
        >
          {selectedOptions.length > 0
            ? `${selectedServerNames[0]}외
             ${selectedOptions.length}건 `
            : "ems server 선택"}
        </div>
        <div>
          <div>
            {dropdownMenu ? (
              <div>
                {/* === 드롭 다운 메뉴 === */}
                {OptionList.map((option) => (
                  <div key={option.value}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedOptions.some(
                          (selected) => selected.id === option.id
                        )}
                        onChange={() => handleSelectOption(option)}
                      />
                      {option.name}
                    </label>
                  </div>
                ))}
                {/* === 확인/취소 버튼 === */}
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
                    onClick={() => setSelectedOptions([])}
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
