import { useState } from "react";

interface Option {
  id: number;
  name: string;
  value: string;
  category: string; // 카테고리 추가
}

const OptionList: Option[] = [
  { id: 1, name: "ems server1", value: "ems server1", category: "Category 1" },
  { id: 2, name: "ems server2", value: "ems server2", category: "Category 1" },
  { id: 3, name: "ems server3", value: "ems server3", category: "Category 2" },
  { id: 4, name: "ems server4", value: "ems server4", category: "Category 2" },
  { id: 5, name: "ems server5", value: "ems server5", category: "Category 3" },
  { id: 6, name: "ems server6", value: "ems server6", category: "Category 3" },
  { id: 7, name: "ems server7", value: "ems server7", category: "Category 4" },
  { id: 8, name: "ems server8", value: "ems server8", category: "Category 4" },
  { id: 9, name: "ems server9", value: "ems server9", category: "Category 5" },
  {
    id: 10,
    name: "ems server10",
    value: "ems server10",
    category: "Category 5",
  },
];

const SimpleCategoryDropdown = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All"); // 기본값 설정
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  // 선택한 서버에 대한 변수
  const selectedServerNames = selectedOptions.map((option) => option.name);
  const selectedServerCount = selectedOptions.length;

  // 카테고리 목록 생성
  const categories = [
    "All",
    ...Array.from(new Set(OptionList.map((option) => option.category))),
  ];

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

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

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

  const handleAllApply = () => {
    const categoryOptions =
      selectedCategory === "All"
        ? OptionList
        : OptionList.filter((option) => option.category === selectedCategory);
    setSelectedOptions(categoryOptions);
  };

  const placeholder =
    selectedOptions.length > 0
      ? `${selectedServerNames[0]}외 ${selectedOptions.length - 1}건`
      : "=== EMS ===";

  return (
    <>
      <div>
        <div
          onClick={handleDropdownVisible}
          style={{
            backgroundColor: "lightGrey",
            width: 150,
            height: 20,
            cursor: "pointer",
          }}
        >
          {placeholder}
        </div>
        <div>
          <div style={{ backgroundColor: "white" }}>
            {dropdownMenu ? (
              <div>
                {/* 카테고리 버튼 */}
                <div>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleSelectCategory(category)}
                      style={{
                        paddingLeft: 4,
                        paddingRight: 4,
                        backgroundColor:
                          selectedCategory === category ? "lightGrey" : "white",
                        borderRadius: 10,
                        marginRight: 5,
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                {/* 카테고리별로 옵션을 그룹화하여 출력 */}
                {OptionList.filter(
                  (option) =>
                    selectedCategory === "All" ||
                    option.category === selectedCategory
                ).map((option) => (
                  <div key={option.id}>
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
                <div>
                  <button
                    style={{
                      backgroundColor: "lightGrey",
                      borderRadius: 10,
                      width: 60,
                    }}
                    onClick={handleConfirm}
                  >
                    확인
                  </button>
                  <button
                    style={{
                      backgroundColor: "lightGrey",
                      borderRadius: 10,
                      width: 60,
                    }}
                    onClick={handleAllApply}
                  >
                    all apply
                  </button>
                  <button
                    style={{
                      backgroundColor: "lightGrey",
                      borderRadius: 10,
                      width: 60,
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
      <div>{confirmMessage}</div>
    </>
  );
};

export default SimpleCategoryDropdown;
