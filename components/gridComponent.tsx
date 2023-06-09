import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { ReactTabulator, ReactTabulatorOptions } from "react-tabulator";
import "react-tabulator/lib/styles.css";

const GridComponent = () => {
  const [data, setData] = useState([
    { id: 1, name: "John Doe", age: 25, email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", age: 30, email: "jane.smith@example.com" },
  ]);

  // csv download
  const handleExportCSV = () => {
    if (tableRef.current && tableRef.current.table) {
      tableRef.current.table.download("csv", "data.csv");
    }
  };

  // xlsx download
  const handleExportXLSX = () => {
    if (tableRef.current && tableRef.current.table) {
      const data = tableRef.current.table.getData();
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
      link.download = "data.xlsx";
      link.click();
    }
  };

  const tableRef = useRef<ReactTabulator | null>(null);

  const options: ReactTabulatorOptions = {
    pagination: true,
    paginationSize: 10,
    paginationSizeSelector: [5, 10],
    layout: "fitData",
  };

  const columns = [
    { title: "Name", field: "name" },
    { title: "Age", field: "age" },
    { title: "Email", field: "email" },
  ];

  useEffect(() => {
    if (tableRef.current && tableRef.current.table) {
      tableRef.current.table.setData(data);
    }
  }, [data]);

  return (
    <div>
      <ReactTabulator
        ref={tableRef}
        columns={columns}
        data={data}
        options={options}
      />
      <button
        style={{ backgroundColor: "lightgray", width: 100, borderRadius: 10 }}
        onClick={handleExportCSV}
      >
        Export as CSV
      </button>
      <button
        style={{ backgroundColor: "lightgray", width: 100, borderRadius: 10 }}
        onClick={handleExportXLSX}
      >
        Export as XLSX
      </button>
    </div>
  );
};

export default GridComponent;
