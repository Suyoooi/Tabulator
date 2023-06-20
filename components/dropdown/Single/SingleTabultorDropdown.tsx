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
  {
    id: 6,
    server: "EMS6",
    value: "EMS6",
  },
  {
    id: 7,
    server: "EMS7",
    value: "EMS7",
  },
];

const SingleTabulatorDropdown = () => {
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
      formatter: (cell: CellComponent) => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => {
          const row = cell.getRow();
          const isChecked = checkbox.checked;

          if (isChecked) {
            const selectedRows = tableRef.current?.table.getSelectedRows();
            if (selectedRows) {
              selectedRows.forEach((selectedRow: RowComponent) => {
                const selectedCheckbox = selectedRow
                  .getElement()
                  .querySelector("input[type='checkbox']");
                if (selectedCheckbox && selectedCheckbox !== checkbox) {
                  (selectedCheckbox as HTMLInputElement).checked = false;
                  selectedRow.toggleSelect();
                }
              });
            }
          }

          row.toggleSelect();
        });

        return checkbox;
      },
      hozAlign: "center",
      headerSort: false,
      cssClass: "text-center",
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
    setSearchTerm("");
    setDropdownMenu(!dropdownMenu);
  };

  const handleCancelClick = () => {
    setSelectedData(initialData);
    setDropdownMenu(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    tableRef.current?.table.clearFilter();
  };

  const dropdownText =
    selectedData.length > 0 ? `${selectedServerNames[0]}` : "=== EMS ===";

  return (
    <div>
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
        {dropdownText}
      </div>
      {/* === 드롭 다운 메뉴 === */}
      <div
        style={{
          position: "absolute",
          backgroundColor: "#E5E5E5",
          width: 220,
          // height: 230,
          zIndex: 100,
        }}
      >
        {dropdownMenu ? (
          <div>
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
            {filteredData.length > 0 ? (
              <div
                style={{
                  width: 200,
                  height: 200,
                  overflow: "scroll",
                  overflowX: "hidden",
                  backgroundColor: "#E5E5E5",
                }}
              >
                <ReactTabulator
                  ref={tableRef}
                  data={filteredData}
                  columns={columns}
                  options={options}
                  layout={"fitData"}
                />
              </div>
            ) : (
              <div>Data가 존재하지 않습니다.</div>
            )}
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

export default SingleTabulatorDropdown;
