import React, { useEffect, useRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import { CellComponent, RowComponent } from "tabulator-tables";
import "react-tabulator/lib/styles.css";

interface TableDataItem {
  id: number;
  server: string;
  value: string;
}

const initialData: TableDataItem[] = [
  {
    id: 1,
    server: "EMS1",
    value: "EMS1",
  },
  {
    id: 2,
    server: "EMS2",
    value: "EMS2",
  },
  {
    id: 3,
    server: "EMS3",
    value: "EMS3",
  },
  {
    id: 4,
    server: "EMS4",
    value: "EMS4",
  },
  {
    id: 5,
    server: "EMS5",
    value: "EMS5",
  },
];

const MultiSearchDropdown = () => {
  const tableRef = useRef<ReactTabulator | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedData, setSelectedData] = useState<TableDataItem[]>([]);
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
      tableRef.current?.table.setFilter("server", "like", searchTerm);
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
          <ReactTabulator
            ref={tableRef}
            data={filteredData}
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

export default MultiSearchDropdown;
