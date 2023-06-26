import { useState } from "react";
import RadioButtonFalse from "./RadioButton/RadioButtonFalse";
import { CellComponent } from "tabulator-tables";
import QueueTopicGrid from "../Grid/QueueTopicGrid";
import RadioButtonTrue from "./RadioButton/RadioButtonTrue";

interface SelectQueueTopicProps {
  handleClose: () => void;
}

const columnsTopic = [
  {
    title: "",
    width: 20,
    formatter: "rowSelection",
    titleFormatter: "rowSelection",
    hozAlign: "center",
    headerSort: false,
    cssClass: "text-center",
    cellClick: function (cell: CellComponent) {
      const row = cell.getRow();
      row.toggleSelect();
    },
  },
  { title: "group", field: "group", hozAlign: "center" },
  { title: "server", field: "server", hozAlign: "center" },
  { title: "topic", field: "topic", hozAlign: "center" },
];
const columnsQueue = [
  {
    title: "",
    width: 20,
    formatter: "rowSelection",
    titleFormatter: "rowSelection",
    hozAlign: "center",
    headerSort: false,
    cssClass: "text-center",
    cellClick: function (cell: CellComponent) {
      const row = cell.getRow();
      row.toggleSelect();
    },
  },
  { title: "group", field: "group", hozAlign: "center" },
  { title: "server", field: "server", hozAlign: "center" },
  { title: "queue", field: "queue", hozAlign: "center" },
];

const SelectQueueTopic: React.FC<SelectQueueTopicProps> = ({ handleClose }) => {
  const [openModal, setOpenModal] = useState<boolean>(true);
  const [topicButton, setTopicButton] = useState<boolean>(true);
  const [queueButton, setQueueButton] = useState<boolean>(false);
  const [columns, setColumns] = useState(columnsTopic);
  const [radioButtonText, setRadioButtonText] = useState<string>("Topic");

  console.log(radioButtonText);

  const handleButtonClick = () => {
    handleClose(); // 부모 컴포넌트의 상태 변경 함수 호출
  };
  const handleTopicRadioButtonClick = () => {
    setTopicButton(true);
    setQueueButton(false);
    setColumns(columnsTopic); // columns 업데이트
    setRadioButtonText("Topic");
  };

  const handleQueueRadioButtonClick = () => {
    setTopicButton(false);
    setQueueButton(true);
    setColumns(columnsQueue); // columns 업데이트
    setRadioButtonText("Queue");
  };

  console.log(openModal);

  return (
    <>
      <div style={{ zIndex: 100 }}>
        {openModal === true && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "31%",
                background: "white",
                padding: 10,
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 30,
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 600 }}>
                  EMS Topic/Queue Select
                </div>
                <img
                  onClick={handleButtonClick}
                  src="/close.png"
                  style={{ width: 24, height: 22, cursor: "pointer" }}
                />
              </div>
              {/* === Topic/Queue 선택 === */}
              <div style={{ display: "flex", height: 20 }}>
                <div
                  style={{ display: "flex", marginRight: 8 }}
                  onClick={handleTopicRadioButtonClick}
                >
                  {topicButton === true ? (
                    <RadioButtonTrue />
                  ) : (
                    <RadioButtonFalse />
                  )}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    Topic
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                  }}
                  onClick={handleQueueRadioButtonClick}
                >
                  {queueButton === true ? (
                    <RadioButtonTrue />
                  ) : (
                    <RadioButtonFalse />
                  )}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    Queue
                  </div>
                </div>
              </div>
              {/* === 서버 목록 드롭 다운 === */}
              <div>
                <div style={{ marginTop: 20 }}>ems server</div>
                <div style={{ position: "relative" }}>
                  <QueueTopicGrid
                    columns={columns}
                    radioButtonText={radioButtonText}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectQueueTopic;
