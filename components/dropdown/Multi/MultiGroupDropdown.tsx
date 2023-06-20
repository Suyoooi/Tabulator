import React, { useEffect, useRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import { CellComponent, RowComponent } from "tabulator-tables";
import "react-tabulator/lib/styles.css";

interface TableDataItem {
  id: number;
  server: string;
  alias: string;
  value: string;
  category: string; // 카테고리 추가
}

const initialData: TableDataItem[] = [
  {
    id: 1,
    server: "Group1",
    alias: "ems-01",
    value: "Group1",
    category: "group1",
  },
  {
    id: 2,
    server: "Group2",
    alias: "ems-02",
    value: "Group2",
    category: "group1",
  },
  {
    id: 3,
    server: "Group3",
    alias: "ems-03",
    value: "Group3",
    category: "group2",
  },
  {
    id: 4,
    server: "Group4",
    alias: "ems-04",
    value: "Group4",
    category: "group2",
  },
  {
    id: 5,
    server: "Group5",
    alias: "ems-05",
    value: "Group5",
    category: "group3",
  },
  {
    id: 6,
    server: "Group5",
    alias: "ems-06",
    value: "Group5",
    category: "group3",
  },
  {
    id: 6,
    server: "Group6",
    alias: "ems-07",
    value: "Group6",
    category: "group3",
  },
];

const MultiGroupDropdown = () => {
  const tableRef = useRef<ReactTabulator | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedData, setSelectedData] = useState<TableDataItem[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);

  const selectedServerNames = selectedData.map((option) => option.alias);
  const selectedServerCount = selectedData.length;

  const columns = [
    {
      title: "",
      width: 40,
      formatter: "rowSelection",
      titleFormatter: "rowSelection",
      hozAlign: "center",
      headerSort: false,
      cssClass: "text-center",
      cellClick: function (cell: CellComponent) {
        const row = cell.getRow();
        row.toggleSelect();
      },
    },
    { title: "server", field: "server", hozAlign: "center" },
    { title: "alias", field: "alias", hozAlign: "center" },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = searchTerm
    ? initialData.filter((item) =>
        item.alias.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : initialData;

  const filteredDataByCategory = selectedCategories.includes("All")
    ? filteredData
    : filteredData.filter((item) => selectedCategories.includes(item.category));

  const options = {
    layout: "fitColumns",
    printAsHtml: true,
    printVisibleRowsOnly: true,
    movableColumns: true,
  };

  const noDataOption = {
    layout: "fitColumns",
    placeholder: "검색된 데이터가 없습니다.",
  };

  const clearSearch = () => {
    setSearchTerm("");
    tableRef.current?.table.clearFilter();
  };

  const handleConfirm = () => {
    const selectedRows = tableRef.current?.table.getSelectedRows() || [];
    const selectedCount = selectedRows.length;

    if (selectedCount > 0) {
      const selectedItems = selectedRows.map((row: RowComponent) =>
        row.getData()
      );
      setSelectedData(selectedItems);
      const selectedServerNames = selectedItems.map(
        (item: TableDataItem) => item.alias
      );
      alert(
        `서버 ${selectedCount}건을 선택했습니다. 선택한 서버: ${selectedServerNames.join(
          ", "
        )}`
      );
    } else {
      setSelectedData([]);
      alert("No servers selected");
    }

    setDropdownMenu(false);
  };

  const handleDropdownVisible = () => {
    setSearchTerm("");
    setDropdownMenu(!dropdownMenu);
  };

  const handleCancelClick = () => {
    setSelectedData([]);
    setDropdownMenu(false);
  };

  const handleSelectCategory = (category: string) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      const updatedCategories = selectedCategories.includes("All")
        ? [category]
        : selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category];
      setSelectedCategories(updatedCategories);

      if (updatedCategories.length === 0) {
        setSelectedCategories(["All"]);
      } else if (updatedCategories.length === 3) {
        // 이 부분은 카테고리 수에 따라 달라짐! api 작업 시 변수로 받아올 예정
        setSelectedCategories(["All"]);
      } else {
        setSelectedCategories(updatedCategories);
      }
    }
  };

  const dropdownText =
    selectedServerCount > 0
      ? `${selectedServerNames[0]}외 ${selectedServerCount - 1}건`
      : "=== EMS ===";

  const selectedOptionName =
    selectedServerCount === 1 ? selectedData[0].alias : "";

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
        {selectedServerCount === 1 ? selectedOptionName : dropdownText}
      </div>
      {/* === 드롭 다운 메뉴 === */}
      <div
        style={{
          position: "absolute",
          backgroundColor: "#E5E5E5",
          width: 200,
          zIndex: 100,
        }}
      >
        {dropdownMenu ? (
          <div style={{ width: 200, backgroundColor: "#E5E5E5" }}>
            <div>
              {/* === 검색 기능 === */}
              <input
                style={{ color: "black", width: 150 }}
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button
                onClick={clearSearch}
                style={{ paddingLeft: 4, paddingRight: 4 }}
              >
                Clear
              </button>
            </div>
            <div>
              <button
                key="All"
                onClick={() => handleSelectCategory("All")}
                style={{
                  paddingLeft: 4,
                  paddingRight: 4,
                  backgroundColor: selectedCategories.includes("All")
                    ? "lightGrey"
                    : "white",
                  borderRadius: 10,
                  marginRight: 5,
                }}
              >
                All
              </button>
              {Array.from(
                new Set(initialData.map((item) => item.category))
              ).map((category) => (
                <button
                  key={category}
                  onClick={() => handleSelectCategory(category)}
                  style={{
                    backgroundColor: selectedCategories.includes(category)
                      ? "lightGrey"
                      : "white",
                    borderRadius: 10,
                    marginRight: 5,
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
            <div
              style={{
                width: 200,
                height: 200,
                overflow: "scroll",
                overflowX: "hidden",
                backgroundColor: "#E5E5E5",
              }}
            >
              {filteredDataByCategory.length > 0 ? (
                <ReactTabulator
                  ref={tableRef}
                  data={filteredDataByCategory}
                  columns={columns}
                  options={options}
                  layout={"fitData"}
                />
              ) : (
                <div style={{ textAlign: "center" }}>
                  <ReactTabulator
                    ref={tableRef}
                    data={[]}
                    columns={columns}
                    options={noDataOption}
                    layout={"fitData"}
                  />
                </div>
              )}
            </div>
            <div>
              {/* === 확인/취소 버튼 === */}
              <button
                style={{
                  backgroundColor: "lightGrey",
                  borderRadius: 10,
                  width: 60,
                }}
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                style={{
                  backgroundColor: "lightGrey",
                  borderRadius: 10,
                  width: 60,
                }}
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default MultiGroupDropdown;
