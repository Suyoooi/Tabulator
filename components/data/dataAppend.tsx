import React, { useEffect, useRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import axios from "axios";

interface TableDataItem {
  Id: number;
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

const DataAppend = () => {
  const tableRef = useRef<ReactTabulator | null>(null);
  const [tableData, setTableData] = useState<TableDataItem[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  const columns = [
    { title: "ID", field: "Id", width: 100 },
    { title: "emsQueNm", field: "emsQueNm", width: 150 },
    { title: "collectDate", field: "collectDate", align: "right" },
    { title: "srvrAlias", field: "srvrAlias", align: "right" },
    { title: "fabCd", field: "fabCd", align: "center" },
    { title: "pendMsgCnt", field: "pendMsgCnt", align: "left" },
  ];

  const options = {
    layout: "fitColumns",
    printAsHtml: true,
    printVisibleRowsOnly: true,
    movableColumns: true,
  };

  const fetchData = async () => {
    try {
      const response = await axios.post("/api/tibco/ems/get/queue", {
        data_name: "",
        ems_server_name: "",
        fab_cd: "D11",
        fab_loc_cd: "이천",
        st_dt: "2023-04-28T01:00:19.248Z",
        en_dt: "2023-05-30T17:32:20.000Z",
        scroll_size: limit + offset,
      });

      const jsonData: TableDataItem[] = response.data.data
        .slice(offset, offset + limit) // 데이터 범위 조정
        .map((item: any, index: number) => ({
          // 임시 아이디 값 부여 (값 확인 목적)
          Id: index + 1,
          collectDate: item.collectDate,
          srvrAlias: item.emsServer.srvrAlias,
          fabCd: item.emsServer.fabCd,
          emsQueNm: item.queue.emsQueNm,
          pendMsgCnt: item.queue.pendMsgCnt,
        }));

      // 새로운 데이터를 기존 데이터에 뒤에 추가
      setTableData((prevTableData) => [...prevTableData, ...jsonData]);

      // 데이터 총 개수는 콘솔로 확인,,
      console.log(offset);
      console.log(limit);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit, offset]);

  const handleAppendData = () => {
    setOffset(offset + limit);
  };

  return (
    <div>
      <ReactTabulator
        ref={tableRef}
        columns={columns}
        data={tableData}
        options={options}
      />
      <button
        style={{
          backgroundColor: "lightPink",
          width: 150,
          borderRadius: 10,
          marginTop: 10,
          marginBottom: 10,
        }}
        onClick={handleAppendData}
      >
        Append Data
      </button>
    </div>
  );
};

export default DataAppend;
