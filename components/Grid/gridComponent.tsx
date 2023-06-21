import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";

interface TableDataItem {
  id: number;
  name: string;
  age: string;
  col: string;
  dob: string;
}

const GridComponent = () => {
  const tableRef = useRef<ReactTabulator | null>(null);
  const [tableData, setTableData] = useState<TableDataItem[]>([]);

  // csv 형식으로 저장
  const handleExportCSV = () => {
    if (tableRef.current && tableRef.current.table) {
      const table = tableRef.current.table;
      table.download("csv", "data.csv");
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
      link.download = "data.xlsx";
      link.click();
    }
  };

  const columns = [
    { title: "Name", field: "name", width: 150 },
    { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
    { title: "Favourite Color", field: "col" },
    { title: "Date Of Birth", field: "dob", hozAlign: "center" },
    { title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
    {
      title: "Passed?",
      field: "passed",
      hozAlign: "center",
      formatter: "tickCross",
    },
  ];

  const initialData: TableDataItem[] = [
    { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },
    { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
    {
      id: 3,
      name: "Christine Lobowski",
      age: "42",
      col: "green",
      dob: "22/05/1982",
    },
    {
      id: 4,
      name: "Brendon Philips",
      age: "125",
      col: "orange",
      dob: "01/08/1980",
    },
    {
      id: 5,
      name: "Margret Marmajuke",
      age: "16",
      col: "yellow",
      dob: "31/01/1999",
    },
  ];

  useEffect(() => {
    setTableData(initialData);
  }, []);

  return (
    <div>
      <div className="table-responsive">
        <ReactTabulator
          ref={tableRef}
          data={tableData}
          columns={columns}
          layout={"fitData"}
        />
        <button
          style={{ backgroundColor: "lightgray", width: 150, borderRadius: 10 }}
          onClick={handleExportCSV}
        >
          Export as CSV
        </button>
        <button
          style={{ backgroundColor: "lightgray", width: 150, borderRadius: 10 }}
          onClick={handleExportXLSX}
        >
          Export as XLSX
        </button>
      </div>
    </div>
  );
};

export default GridComponent;
