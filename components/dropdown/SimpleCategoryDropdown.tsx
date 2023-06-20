import { useEffect, useRef, useState } from "react";

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
  {
    id: 11,
    name: "ems server11",
    value: "ems server11",
    category: "Category 5",
  },
  {
    id: 12,
    name: "ems server12",
    value: "ems server12",
    category: "Category 5",
  },
  {
    id: 13,
    name: "ems server13",
    value: "ems server13",
    category: "Category 5",
  },
];

const SimpleCategoryDropdown = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const selectedServerNames = selectedOptions.map((option) => option.name);
  const selectedServerCount = selectedOptions.length;

  // 드롭다운에 어떤 클릭 이벤트가 일어나야만 실행됨.
  // const handleDropdownBlur = () => {
  //   setDropdownMenu(false);
  // };

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

  console.log(selectedCategories);

  const handleSelectCategory = (category: string) => {
    if (category === "All") {
      return ["All"];
    } else {
      const updatedCategories = selectedCategories.includes("All")
        ? [category]
        : selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];

      if (updatedCategories.length === 0) {
        setSelectedCategories(["All"]);
      } else if (updatedCategories.length === 5) {
        // 이 부분은 카테고리 수에 따라 달라짐! api 작업 시 변수로 받아올 예정
        setSelectedCategories(["All"]);
      } else {
        setSelectedCategories(updatedCategories);
      }
    }
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

  const placeholder =
    selectedOptions.length > 0
      ? `${selectedServerNames[0]}외 ${selectedOptions.length - 1}건`
      : "=== EMS ===";

  const selectedOptionName =
    selectedOptions.length === 1 ? selectedOptions[0].name : "";

  // 외부 클릭했을 때 드롭다운 닫히도록 함.
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleOutsideClick = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div ref={dropdownRef as React.RefObject<HTMLDivElement>}>
        {/* === 입력 창 === */}
        <div
          onClick={handleDropdownVisible}
          style={{
            backgroundColor: "lightGrey",
            width: 150,
            height: 20,
            cursor: "pointer",
          }}
        >
          {selectedOptions.length === 1 ? selectedOptionName : placeholder}
        </div>
        <div
          // id="dropdown-container"
          // onBlur={handleDropdownBlur}
          style={{
            position: "absolute",
            backgroundColor: "#E5E5E5",
            width: 300,
            zIndex: 100,
          }}
        >
          {dropdownMenu ? (
            <div>
              <div>
                {/* === 드롭 다운 메뉴 === */}
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleSelectCategory(category)}
                    style={{
                      paddingLeft: 4,
                      paddingRight: 4,
                      backgroundColor: selectedCategories.includes(category)
                        ? "lightGrey"
                        : "white",
                      borderRadius: 10,
                      marginRight: 5,
                      width: 90,
                      height: 20,
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div>
                {OptionList.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      width: 300,
                      height: 150,
                      overflow: "scroll",
                      overflowX: "hidden",
                      flexWrap: "wrap",
                      alignContent: "start",
                    }}
                  >
                    {OptionList.filter(
                      (option) =>
                        selectedCategories.includes("All") ||
                        selectedCategories.includes(option.category)
                    ).map((option) => (
                      <div style={{ width: 120, height: 25 }} key={option.id}>
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
                  </div>
                ) : (
                  <div>Data가 존재하지 않습니다.</div>
                )}
              </div>
              {/* === 확인/취소 버튼 === */}
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
                    width: 70,
                  }}
                  onClick={() => {
                    setSelectedOptions(OptionList);
                  }}
                >
                  all apply
                </button>
                <button
                  style={{
                    backgroundColor: "lightGrey",
                    borderRadius: 10,
                    width: 60,
                  }}
                  onClick={() => {
                    setSelectedOptions([]);
                  }}
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
      <div>{confirmMessage}</div>
    </>
  );
};

export default SimpleCategoryDropdown;
