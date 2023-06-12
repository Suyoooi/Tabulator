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
  pendMsgCnt: string;
  fabCd: string;
}

const EmsGridTest = () => {
  const tableRef = useRef<ReactTabulator | null>(null);
  const [tableData, setTableData] = useState<TableDataItem[]>([]);
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.post("/api/v1/tibco/ems/get/queue", {
  //       data_name: "",
  //       ems_server_name: "",
  //       fab_cd: "D11",
  //       fab_loc_cd: "이천",
  //       st_dt: "2023-04-28T01:00:19.248Z",
  //       en_dt: "2023-05-30T17:32:20.000Z",
  //       scroll_size: 100,
  //     });
  //     setTableData(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

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
      pendMsgCnt: "",
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
      title: "pendMsgCnt",
      field: "pendMsgCnt",
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
      pendMsgCnt: "0",
      fabCd: "D11",
    },
    {
      id: 2,
      emsQueNm: "Amily",
      collectDate: "1",
      srvrAlias: "14/05/1982",
      pendMsgCnt: "0",
      fabCd: "D11",
    },
    {
      id: 3,
      emsQueNm: "Christine",
      collectDate: "42",
      srvrAlias: "22/05/1982",
      pendMsgCnt: "0",
      fabCd: "D11",
    },
    {
      id: 4,
      emsQueNm: "Brendon",
      collectDate: "125",
      srvrAlias: "01/08/1980",
      pendMsgCnt: "0",
      fabCd: "D11",
    },
    {
      id: 5,
      emsQueNm: "Gana",
      collectDate: "16",
      srvrAlias: "31/01/1999",
      pendMsgCnt: "0",
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
