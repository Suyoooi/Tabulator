import React, { useState } from "react";

interface IDataItem {
  id: number;
  [key: string]: string | number;
}

interface GridComponentProps {
  data: IDataItem[];
  headers: string[];
  fieldLabel: string;
}

const Grid: React.FC<GridComponentProps> = ({ data, headers, fieldLabel }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [filteredData, setFilteredData] = useState(data);

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const checkboxChecked = (item: IDataItem) => selectedItems.includes(item.id);

  const handleCheckboxChange = (item: IDataItem) => {
    if (checkboxChecked(item)) {
      setSelectedItems(selectedItems.filter((id) => id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item.id]);
    }
  };

  return (
    <table className="table-fixed">
      <thead>
        <tr style={{ backgroundColor: "grey" }}>
          <th className="w-12">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
          </th>
          {headers.map((header) => (
            <th
              key={header}
              className="border-b"
              style={{
                color: "black",
                paddingLeft: 10,
                borderLeft: "2px solid black",
                backgroundColor: "grey",
              }}
            >
              {header}
            </th>
          ))}
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
            {headers.map((header) => (
              <td
                key={header}
                className="border-b"
                style={{
                  color: "black",
                  paddingLeft: 10,
                  borderLeft: "2px solid black",
                }}
              >
                {item[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
