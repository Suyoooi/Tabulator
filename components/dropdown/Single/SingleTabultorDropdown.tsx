import React, { useEffect, useRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import { CellComponent } from "tabulator-tables";
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

const SingleTabulatorDropdown = () => {
  const tableRef = useRef<ReactTabulator | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedData, setSelectedData] = useState<TableDataItem[]>([]);
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);

  //   선택한 서버에 대한 변수
  const selectedServerNames = selectedData.map((option) => option.server);
  const selectedServerCount = selectedData.length;

  console.log(selectedData);

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
    // { title: "", field: "", hozAlign: "center", headerSort: false },
    { title: "server", field: "server", hozAlign: "center" },
  ];

  useEffect(() => {
    setSelectedData(initialData);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = selectedData.filter((item) =>
    item.server.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const options = {
    layout: "fitColumns",
    printAsHtml: true,
    printVisibleRowsOnly: true,
    movableColumns: true,
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
