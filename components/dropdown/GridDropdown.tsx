import React, { useEffect, useRef, useState } from "react";

interface TableDataItem {
  id: number;
  group: string;
  server: string;
}

const initialData: TableDataItem[] = [
  { id: 1, group: "a", server: "EMS1" },
  { id: 2, group: "a", server: "EMS2" },
  { id: 3, group: "b", server: "EMS3" },
  { id: 5, group: "c", server: "EMS4" },
  { id: 6, group: "d", server: "EMS5" },
  { id: 7, group: "e", server: "EMS6" },
  { id: 8, group: "b", server: "EMS7" },
];

const GridDropdown = () => {
  const [selectedData, setSelectedData] = useState<TableDataItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);

  const selectedServerNames = selectedData.map((option) => option.server);

  const handleCheckboxChange = (item: TableDataItem) => {
    const isChecked = selectedData.some(
      (selectedItem) => selectedItem.id === item.id
    );
    if (isChecked) {
      setSelectedData((prevSelectedData) =>
        prevSelectedData.filter((selectedItem) => selectedItem.id !== item.id)
      );
      setSelectAll(false);
    } else {
      setSelectedData((prevSelectedData) => [...prevSelectedData, item]);
      if (selectedData.length + 1 === initialData.length) {
        setSelectAll(true);
      }
    }
  };

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedData(newSelectAll ? initialData.slice(1) : []);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = searchTerm
    ? initialData.filter((item) =>
        item.server.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : initialData;

  const checkboxChecked = (item: TableDataItem) =>
    selectedData.some((selectedItem) => selectedItem.id === item.id);

  const clearSearch = () => {
    setSearchTerm("");
  };

  const dropdownText =
    selectedData.length > 0
      ? `${selectedServerNames[0]}외 ${selectedData.length - 1}건`
      : "EMS server를 선택하세요";

  const handleDropdownVisible = () => {
    setSearchTerm("");
    setDropdownMenu(!dropdownMenu);
  };

  const handleCancelClick = () => {
    setSelectedData([]);
    setDropdownMenu(false);
  };

  const handleConfirm = () => {
    const selectedCount = selectedData.length;

    if (selectedCount > 0) {
      setSelectedData(selectedData);
      const selectedServerNames = selectedData.map(
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
      {/* 입력 창 */}
      <div
        onClick={handleDropdownVisible}
        style={{
          backgroundColor: "lightGrey",
          width: 255,
          height: 30,
          cursor: "pointer",
          paddingLeft: 5,
        }}
      >
        {dropdownText}
      </div>
      {dropdownMenu ? (
        <div>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 mb-2 border"
            style={{ color: "black" }}
          />
          <button
            style={{
              backgroundColor: "black",
              height: 40,
              width: 60,
              color: " white",
            }}
            onClick={clearSearch}
          >
            Clear
          </button>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <table className="w-full border-collapse">
              {/* === header === */}
              <thead>
                <tr style={{ backgroundColor: "grey" }}>
                  <th className="w-12">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                    />
                  </th>
                  <th
                    colSpan={2}
                    style={{
                      color: "black",
                      paddingLeft: 10,
                      borderLeft: "2px solid black",
                      backgroundColor: "grey",
                    }}
                  >
                    Group
                  </th>
                  <th
                    colSpan={2}
                    style={{
                      color: "black",
                      paddingLeft: 10,
                      borderLeft: "2px solid black",
                      backgroundColor: "grey",
                    }}
                  >
                    Server
                  </th>
                </tr>
              </thead>
              {/* === data === */}
              <tbody>
                {filteredData.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <tr
                      style={{
                        textAlignLast: "center",
                        backgroundColor: index % 2 === 0 ? "lightGrey" : "grey",
                      }}
                    >
                      <td className="text-center">
                        <input
                          type="checkbox"
                          checked={checkboxChecked(item)}
                          onChange={() => handleCheckboxChange(item)}
                        />
                      </td>
                      <td
                        colSpan={2}
                        style={{
                          color: "black",
                          paddingLeft: 10,
                          borderLeft: "2px solid black",
                        }}
                      >
                        {item.server}
                      </td>
                      {item.group && (
                        <tr
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "lightGrey" : "grey",
                          }}
                        >
                          <td
                            colSpan={5}
                            style={{
                              color: "black",
                              // paddingLeft: 10,
                              borderLeft: "2px solid black",
                              fontWeight: "bold",
                              justifyContent: "center",
                            }}
                          >
                            {item.group}
                          </td>
                        </tr>
                      )}
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {dropdownMenu ? (
        <div style={{ display: "flex", marginTop: 10 }}>
          <button
            style={{
              backgroundColor: "black",
              height: 40,
              borderRadius: 10,
              width: 80,
              color: "white",
            }}
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            style={{
              backgroundColor: "black",
              height: 40,
              borderRadius: 10,
              width: 80,
              color: "white",
            }}
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div></div>
      )}
      <div style={{ backgroundColor: "white", height: 210 }}>
        {selectedData.length > 0 && (
          <div className="mt-4">
            <h4 style={{ color: "black" }}>선택한 서버 확인용</h4>
            <ul>
              {selectedData.map((item) => (
                <li style={{ color: "grey" }} key={item.id}>
                  {item.server}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GridDropdown;
