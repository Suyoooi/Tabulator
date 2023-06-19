import React, { useRef, useState } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);

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

  const filteredDataByCategory =
    selectedCategory === "All"
      ? filteredData
      : filteredData.filter((item) => item.category === selectedCategory);

  const options = {
    layout: "fitColumns",
    printAsHtml: true,
    printVisibleRowsOnly: true,
    movableColumns: true,
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
      : "=== EMS ===";

  return (
    <div style={{ zIndex: 10 }}>
      <div
        onClick={handleDropdownVisible}
        style={{
          backgroundColor: "lightGrey",
          width: 150,
          height: 20,
          cursor: "pointer",
        }}
      >
        {dropdownText}
      </div>
      {dropdownMenu ? (
        <div style={{ width: 200, backgroundColor: "#E5E5E5" }}>
          <div>
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
                backgroundColor:
                  selectedCategory === "All" ? "lightGrey" : "white",
                borderRadius: 10,
                marginRight: 5,
              }}
            >
              All
            </button>
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
          {filteredDataByCategory.length > 0 ? (
            <ReactTabulator
              ref={tableRef}
              data={filteredDataByCategory}
              columns={columns}
              options={options}
              layout={"fitData"}
            />
          ) : (
            <div>Data가 존재하지 않습니다.</div>
          )}
          <div>
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
  );
};

export default MultiGroupDropdown;
