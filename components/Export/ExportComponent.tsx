import React from "react";
import * as XLSX from "xlsx";

interface ExportDataProps<T> {
  rows: T[];
  columns: any[];
}

const ExportComponent = <T extends {}>({
  rows,
  columns,
}: ExportDataProps<T>) => {
  // CSV 형식으로 저장
  const handleExportCSV = () => {
    const data = rows;
    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(data));
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // XLSX 형식으로 저장
  const handleExportXLSX = () => {
    const data = rows;
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
  };

  return (
    <>
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
    </>
  );
};

export default ExportComponent;
