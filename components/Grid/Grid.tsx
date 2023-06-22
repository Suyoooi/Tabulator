import React, { useEffect, useRef, useState } from "react";

interface GridComponentProps {
  data: TableDataItem[];
  fieldLabel: string;
}

interface TableDataItem {
  id: number;
  server: string;
}

const GridComponent: React.FC<GridComponentProps> = ({ data, fieldLabel }) => {
  const [selectedData, setSelectedData] = useState<TableDataItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 체크 박스 선택
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
      if (selectedData.length + 1 === data.length) {
        setSelectAll(true);
      }
    }
  };

  // 전체 선택
  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedData(newSelectAll ? data : []);
  };

  // 데이터 필터링
  const filteredData = searchTerm
    ? data.filter((item) =>
        item.server.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  // 선택한 체크 박스
  const checkboxChecked = (item: TableDataItem) =>
    selectedData.some((selectedItem) => selectedItem.id === item.id);

  return (
    <div style={{ width: 300 }}>
      <table className="w-full border-collapse">
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
              className="border-b"
              colSpan={2}
              style={{
                color: "black",
                paddingLeft: 10,
                borderLeft: "2px solid black",
                backgroundColor: "grey",
              }}
            >
              {/* 필드 명 라벨을 출력 */}
              {fieldLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr
              key={item.id}
              style={{
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
                className="border-b"
                colSpan={2}
                style={{
                  color: "black",
                  paddingLeft: 10,
                  borderLeft: "2px solid black",
                }}
              >
                {item.server}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GridComponent;
