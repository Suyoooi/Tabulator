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
    category: "Category 1",
  },
  {
    id: 2,
    server: "Group2",
    alias: "ems-02",
    value: "Group2",
    category: "Category 1",
  },
  {
    id: 3,
    server: "Group3",
    alias: "ems-03",
    value: "Group3",
    category: "Category 2",
  },
  {
    id: 4,
    server: "Group4",
    alias: "ems-04",
    value: "Group4",
    category: "Category 2",
  },
  {
    id: 5,
    server: "Group5",
    alias: "ems-05",
    value: "Group5",
    category: "Category 3",
  },
];

const MultiGroupDropdown = () => {
  const tableRef = useRef<ReactTabulator | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedData, setSelectedData] = useState<TableDataItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "Category 1" // 기본 카테고리 선택
  );
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);

  console.log(selectedData);

  // 선택한 서버에 대한 변수
  const selectedServerNames = selectedData.map((option) => option.server);
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
    { title: "alias", field: "alias", hozAlign: "center" }, // Add this line
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = searchTerm
    ? initialData.filter((item) =>
        item.server.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : initialData;

  const options = {
    layout: "fitColumns",
    printAsHtml: true,
    printVisibleRowsOnly: true,
    movableColumns: true,
  };

  const handleSearch = () => {
    if (searchTerm) {
      tableRef.current?.table.setFilter("alias", "like", searchTerm);
    } else {
      tableRef.current?.table.clearFilter();
    }
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
        (item: TableDataItem) => item.server
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

    console.log(selectedData);
  };

  const handleDropdownVisible = () => {
    setSelectedData([]);
    setSearchTerm("");
    setDropdownMenu(!dropdownMenu);
  };

  const handleCancelClick = () => {
    setSelectedData([]);
    setDropdownMenu(false);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const dropdownText =
    selectedData.length > 0
      ? `${selectedServerNames[0]}외 ${selectedData.length - 1}건`
      : "EMS server를 선택하세요";

  return (
    <div>
      {/* 입력 창 */}
      <div
        onClick={handleDropdownVisible}
        style={{ backgroundColor: "skyblue", width: 200, cursor: "pointer" }}
      >
        {dropdownText}
      </div>
      {dropdownMenu ? (
        <div style={{ width: 200 }}>
          <div>
            <input
              style={{ color: "black" }}
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={clearSearch}>Clear</button>
          </div>
          {/* 카테고리 버튼 */}
          <div>
            {Array.from(new Set(initialData.map((item) => item.category))).map(
              (category) => (
                <button
                  key={category}
                  onClick={() => handleSelectCategory(category)}
                  style={{
                    backgroundColor:
                      selectedCategory === category ? "pink" : "white",
                    borderRadius: 10,
                    marginRight: 5,
                  }}
                >
                  {category}
                </button>
              )
            )}
          </div>
          {/* 선택한 카테고리에 해당하는 옵션 그리드 출력 */}
          <ReactTabulator
            ref={tableRef}
            data={filteredData.filter(
              (item) => item.category === selectedCategory
            )}
            columns={columns}
            options={options}
            layout={"fitData"}
          />
          <div>
            <button
              style={{
                backgroundColor: "pink",
                borderRadius: 10,
                width: 80,
              }}
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button onClick={handleCancelClick}>Cancel</button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MultiGroupDropdown;
