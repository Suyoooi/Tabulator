import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";

interface TableDataItem {
  id: number;
  emsQueNm: string;
  collectDate: string;
  srvrAlias: string;
  fabLocCd: string;
  fabCd: string;
}

const EmsGridTest = () => {
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

  // Add Data 버튼을 클릭했을 때 실행되는 함수
  const handleAddData = () => {
    const newId = tableData.length + 1;
    const newData: TableDataItem = {
      id: newId,
      emsQueNm: "",
      collectDate: "",
      srvrAlias: "",
      fabLocCd: "",
      fabCd: "",
    };
    const updatedData = [...tableData, newData];
    setTableData(updatedData);
  };

  const columns = [
    { title: "emsQueNm", field: "emsQueNm", hozAlign: "center", editor: true },
    {
      title: "collectDate",
      field: "collectDate",
      hozAlign: "center",
      editor: true,
    },
    {
      title: "srvrAlias",
      field: "srvrAlias",
      hozAlign: "center",
      editor: true,
    },
    {
      title: "fabLocCd",
      field: "fabLocCd",
      hozAlign: "center",
      editor: true,
    },
    { title: "fabCd", field: "fabCd", hozAlign: "center", editor: true },
  ];

  const initialData: TableDataItem[] = [
    {
      id: 1,
      emsQueNm: "Suyeon",
      collectDate: "23",
      srvrAlias: "",
      fabLocCd: "0",
      fabCd: "D11",
    },
    {
      id: 2,
      emsQueNm: "Amily",
      collectDate: "1",
      srvrAlias: "14/05/1982",
      fabLocCd: "0",
      fabCd: "D11",
    },
    {
      id: 3,
      emsQueNm: "Christine",
      collectDate: "42",
      srvrAlias: "22/05/1982",
      fabLocCd: "0",
      fabCd: "D11",
    },
    {
      id: 4,
      emsQueNm: "Brendon",
      collectDate: "125",
      srvrAlias: "01/08/1980",
      fabLocCd: "0",
      fabCd: "D11",
    },
    {
      id: 5,
      emsQueNm: "Gana",
      collectDate: "16",
      srvrAlias: "31/01/1999",
      fabLocCd: "0",
      fabCd: "D11",
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
          onClick={handleAddData}
        >
          Add Data
        </button>
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

export default EmsGridTest;
