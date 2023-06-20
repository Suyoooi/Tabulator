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

const MultiBothSearchDropdown = () => {
  const tableRef = useRef<ReactTabulator | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedData, setSelectedData] = useState<TableDataItem[]>([]);
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);

  console.log(selectedData);

  //   선택한 서버에 대한 변수
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

  const noDataOption = {
    layout: "fitColumns",
    placeholder: "검색된 데이터가 없습니다.",
  };

  // 데이터 확인용 alert 추가
  // 체크박스 선택 여부에 따라 selectedData 배열 업데이트
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
    setSelectedData([]);
    setDropdownMenu(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    tableRef.current?.table.clearFilter();
  };

  const dropdownText =
    selectedData.length > 0
      ? `${selectedServerNames[0]}외 ${selectedData.length - 1}건`
      : "선택한 server가 없습니다";

  const selectedOptionName =
    selectedData.length === 1 ? selectedData[0].value : "";

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
    <div
      style={{ zIndex: 10 }}
      ref={dropdownRef as React.RefObject<HTMLDivElement>}
    >
      {/* === 입력 창 === */}
      <div style={{ display: "flex" }}>
        <input
          style={{
            backgroundColor: "lightGrey",
            width: 120,
            height: 24,
          }}
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        ></input>
        <button
          style={{ width: 56, backgroundColor: "#C9C9C9" }}
          onClick={() => {
            setDropdownMenu(true);
          }}
        >
          검색
        </button>
        <button
          onClick={handleDropdownVisible}
          style={{
            backgroundColor: "grey",
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          ▽
        </button>
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
        {selectedData.length === 1 ? selectedOptionName : dropdownText}
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
                style={{
                  width: 50,
                  backgroundColor: "#C9C9C9",
                }}
              >
                Clear
              </button>
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
              {filteredData.length > 0 ? (
                <ReactTabulator
                  ref={tableRef}
                  data={filteredData}
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

export default MultiBothSearchDropdown;
