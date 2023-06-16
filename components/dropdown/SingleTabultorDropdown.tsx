import React, { useEffect, useRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import { CellComponent } from "tabulator-tables";
import "react-tabulator/lib/styles.css";

interface TableDataItem {
  id: number;
  server: string;
}

const SingleTabulatorDropdown = () => {
  const tableRef = useRef<ReactTabulator | null>(null);
  const [tableData, setTableData] = useState<TableDataItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<TableDataItem[]>([]);

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

  const initialData: TableDataItem[] = [
    {
      id: 1,
      server: "ems server1",
    },
    {
      id: 2,
      server: "ems server2",
    },
    {
      id: 3,
      server: "ems server3",
    },
    {
      id: 4,
      server: "ems server4",
    },
    {
      id: 5,
      server: "ems server5",
    },
  ];

  useEffect(() => {
    setTableData(initialData);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = tableData.filter((item) =>
    item.server.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const options = {
    layout: "fitColumns",
    printAsHtml: true,
    printVisibleRowsOnly: true,
    movableColumns: true,
  };

  const handleSelect = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleConfirm = () => {
    const selectedRows = tableRef.current?.table.getSelectedRows() || [];
    const selectedCount = selectedRows.length;
    setSelectedData(selectedRows);
    setDropdownOpen(false);
    alert(`EMS 서버 ${selectedCount}건이 선택되었습니다.`);
    document
      .getElementById("selectedCount")
      ?.setAttribute("value", String(selectedCount));
  };

  const handleCancel = () => {
    setDropdownOpen(false);
  };

  return (
    <div>
      {/* === 입력 창 === */}
      <div
        onClick={handleDropdownVisible}
        style={{ backgroundColor: "white", width: 200, cursor: "pointer" }}
      >
        {selectedData.length > 0
          ? `${selectedServerNames[0]}외 ${selectedData.length}건 `
          : "ems server 선택"}
      </div>
      {dropdownMenu ? (
        <div style={{ width: 200 }}>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
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
            <button onClick={() => setSelectedData([])}>Cancel</button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SingleTabulatorDropdown;
