import React, { useEffect, useState } from "react";

interface TableDataItem {
  id: number;
  server: string;
}

const initialData: TableDataItem[] = [
  { id: 1, server: "EMS1" },
  { id: 2, server: "EMS2" },
  { id: 3, server: "EMS3" },
  { id: 4, server: "EMS4" },
  { id: 5, server: "EMS5" },
  { id: 6, server: "EMS6" },
  { id: 7, server: "EMS7" },
];

const GridDropdown = () => {
  const [selectedData, setSelectedData] = useState<TableDataItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    setSelectedData(newSelectAll ? initialData : []);
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

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 mb-2 border"
      />
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
              Server
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

        {selectedData.length > 0 && (
          <div className="mt-4">
            <h4 style={{ color: "black" }}>Selected Servers:</h4>
            <ul>
              {selectedData.map((item) => (
                <li key={item.id}>{item.server}</li>
              ))}
            </ul>
          </div>
        )}
      </table>
    </div>
  );
};

export default GridDropdown;
