import React, { useEffect, useRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";

interface TableDataItem {
  queueProperty: string;
  value: string;
}

interface SelectQueueListProps {
  handleClose: () => void;
}

const initialData: TableDataItem[] = [
  { queueProperty: "a", value: "EMS1" },
  { queueProperty: "a", value: "EMS2" },
  { queueProperty: "b", value: "EMS3" },
  { queueProperty: "c", value: "EMS4" },
  { queueProperty: "d", value: "EMS5" },
  { queueProperty: "e", value: "EMS6" },
  { queueProperty: "b", value: "EMS7" },
];

const QueueProperty: React.FC<SelectQueueListProps> = ({ handleClose }) => {
  const [openModal, setOpenModal] = useState<boolean>(true);

  const columns = [
    { title: "QueueProperty", field: "QueueProperty", hozAlign: "center" },
    { title: "Value", field: "Value", hozAlign: "center" },
  ];

  const options = {
    layout: "fitColumns",
    printAsHtml: true,
    printVisibleRowsOnly: true,
    movableColumns: true,
  };

  const handleButtonClick = () => {
    handleClose(); // 부모 컴포넌트의 상태 변경 함수 호출
  };

  return (
    <div style={{ zIndex: 10 }}>
      {openModal === true && (
        <div
          style={{
            paddingTop: 20,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            // width: 400
            // height: 400,
            background: "white",
            // textAlign: "-webkit-center",
            textAlignLast: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 20 }}>Queue Property</div>
            <img src="/download.png" style={{ cursor: "pointer" }}></img>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: 300,
            }}
          >
            <table className="w-full border-collapse">
              <ReactTabulator
                data={initialData}
                columns={columns}
                options={options}
                layout={"fitData"}
              />
            </table>
          </div>
          <button
            style={{
              width: 60,
              height: 30,
              marginTop: 10,
              backgroundColor: "ivory",
              border: "2px solid grey",
              borderRadius: 8,
            }}
            onClick={handleButtonClick}
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
};

export default QueueProperty;
