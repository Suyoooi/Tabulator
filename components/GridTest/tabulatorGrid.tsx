import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";

const TabulatorGrid = () => {
  const tableRef = useRef<ReactTabulator | null>(null);
  const [newData, setNewData] = useState<
    {
      id: number;
      price: number;
      quantity: number;
      product: string;
      availability: string;
    }[]
  >([]);

  // csv 형식으로 저장
  const handleExportCSV = () => {
    if (tableRef.current && tableRef.current.table) {
      const table = tableRef.current.table;
      table.download("csv", "test.csv");
    }
  };

  // xlsx 형식으로 저장
  const handleExportXLSX = () => {
    if (tableRef.current && tableRef.current.table) {
      const table = tableRef.current.table;
      const data = table.getData();
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const excelData = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const excelUrl = URL.createObjectURL(excelData);
      const link = document.createElement("a");
      link.href = excelUrl;
      link.download = "test.xlsx";
      link.click();
    }
  };

  const handleAddData = () => {
    const nextId = list.length + newData.length + 1;
    const newEntry = {
      id: nextId,
      price: 0,
      quantity: 0,
      product: "",
      availability: "",
    };
    setNewData([...newData, newEntry]);
  };

  const columns = [
    {
      formatter: "responsiveCollapse",
      width: 30,
      minWidth: 30,
      hozAlign: "center",
      resizable: false,
      headerSort: false,
    },
    { title: "ID", field: "id", width: 50, sorter: "number" },
    { title: "Product", field: "product", hozAlign: "center", editor: true },
    { title: "Price", field: "price", hozAlign: "left" },
    { title: "Quantity", field: "quantity", responsive: 1 },
    {
      title: "Availability",
      field: "availability",
      editor: "select",
      editorParams: { values: ["Enable", "Disable"] },
    },
  ];

  const list = [
    {
      id: 1,
      price: 2,
      quantity: 6,
      product: "Apples",
      availability: "Enable",
    },
    {
      id: 2,
      price: 2,
      quantity: 2,
      product: "Oranges",
      availability: "Enable",
    },
    {
      id: 3,
      price: 1,
      quantity: 2,
      product: "Bananas",
      availability: "Enable",
    },
    {
      id: 4,
      price: 5,
      quantity: 1,
      product: "Strawberry",
      availability: "Disable",
    },
  ];

  const options = {
    responsiveLayoutCollapseStartOpen: true,
    responsiveLayout: "collapse",
    layout: "fitColumns",
  };

  return (
    <>
      <div>
        <ReactTabulator
          ref={tableRef}
          options={options}
          data={list.concat(newData)}
          columns={columns}
        />
        <button
          style={{ backgroundColor: "white", width: 150, borderRadius: 10 }}
          onClick={handleExportCSV}
        >
          Export as CSV
        </button>
        <button
          style={{ backgroundColor: "white", width: 150, borderRadius: 10 }}
          onClick={handleExportXLSX}
        >
          Export as XLSX
        </button>
        <button
          style={{ backgroundColor: "white", width: 150, borderRadius: 10 }}
          onClick={handleAddData}
        >
          Add Data
        </button>
      </div>
    </>
  );
};

export default TabulatorGrid;
