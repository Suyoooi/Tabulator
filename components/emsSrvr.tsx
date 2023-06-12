import React, { useEffect, useRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import axios from "axios";

interface TableDataItem {
  collectDate: string;
  emsServer: {
    srvrAlias: string;
    fabCd: string;
  };
  queue: {
    pendMsgCnt: number;
    emsQueNm: string;
  };
}

const EmsSrvr = () => {
  const tableRef = useRef<ReactTabulator | null>(null);
  const [tableData, setTableData] = useState<TableDataItem[]>([]);

  const columns = [
    { title: "EMS Queue Name", field: "emsQueNm", width: 150 },
    { title: "Collect Date", field: "collectDate", align: "right" },
    { title: "Server Alias", field: "srvrAlias", align: "right" },
    { title: "Fab Location", field: "fabCd", align: "center" },
    { title: "Fab Code", field: "pendMsgCnt", align: "left" },
  ];

  const options = {
    layout: "fitColumns",
    printAsHtml: true,
    printVisibleRowsOnly: true,
    movableColumns: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/v1/tibco/ems/get/queue", {
          data_name: "",
          ems_server_name: "",
          fab_cd: "D11",
          fab_loc_cd: "이천",
          st_dt: "2023-04-28T01:00:19.248Z",
          en_dt: "2023-05-30T17:32:20.000Z",
          scroll_size: 100,
        });

        const jsonData: TableDataItem[] = response.data.data
          .slice(0, -1) // 마지막 값을 제외
          .map((item: any) => ({
            collectDate: item.collectDate,
            srvrAlias: item.emsServer.srvrAlias,
            fabCd: item.emsServer.fabCd,
            emsQueNm: item.queue.emsQueNm,
            pendMsgCnt: item.queue.pendMsgCnt,
          }));

        setTableData(jsonData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ReactTabulator
        ref={tableRef}
        columns={columns}
        data={tableData}
        options={options}
      />
    </div>
  );
};

export default EmsSrvr;
