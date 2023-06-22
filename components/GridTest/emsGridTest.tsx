import React, { useEffect, useRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import { CellComponent } from "tabulator-tables";
import "react-tabulator/lib/styles.css";

interface TableDataItem {
  id: number;
  emsQueNm: string;
  collectDate: string;
  srvrAlias: string;
  fabLocCd: string;
  fabCd: string;
  _children?: TableDataItem[];
}

const emsGridTest = () => {
  const tableRef = useRef<ReactTabulator | null>(null);
  const [tableData, setTableData] = useState<TableDataItem[]>([]);

  const columns = [
    {
      title: "",
      width: 70,
      formatter: "rowSelection",
      titleFormatter: "rowSelection",
      hozAlign: "center",
      headerSort: false,
      cssClass: "text-center",
      cellClick: function (cell: CellComponent) {
        const row = cell.getRow();
        row.toggleSelect();

        const table = tableRef.current?.table;
        if (table) {
          const selectedRows = table.getSelectedRows();
          const children = row.getData()._children;
          if (selectedRows.includes(row) && children) {
            for (const child of children) {
              const childRow = table.getRow(child.id);
              if (childRow) {
                table.selectRow(childRow);
              }
            }
          }
        }
      },
    },
    { title: "emsQueNm", field: "emsQueNm", hozAlign: "center" },
    {
      title: "collectDate",
      field: "collectDate",
      hozAlign: "center",
    },
    {
      title: "srvrAlias",
      field: "srvrAlias",
      hozAlign: "center",
    },
    {
      title: "fabLocCd",
      field: "fabLocCd",
      hozAlign: "center",
    },
    { title: "fabCd", field: "fabCd", hozAlign: "center" },
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
      // 하위 메뉴
      _children: [
        {
          id: 6,
          emsQueNm: "Child1",
          collectDate: "16",
          srvrAlias: "31/01/1999",
          fabLocCd: "0",
          fabCd: "D11",
        },
        {
          id: 7,
          emsQueNm: "Child2",
          collectDate: "16",
          srvrAlias: "31/01/1999",
          fabLocCd: "0",
          fabCd: "D11",
        },
      ],
    },
  ];

  useEffect(() => {
    setTableData(initialData);
  }, []);

  // Tree와 Grouping 옵션 추가
  const options = {
    layout: "fitData",
    dataTree: true,
    dataTreeStartExpanded: true,
    groupBy: "fabLocCd",
  };

  return (
    <div>
      <div className="table-responsive">
        <ReactTabulator
          ref={tableRef}
          data={tableData}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
};

export default emsGridTest;
