import { useState } from "react";
import RadioButton from "./RadioButtonTrue";
import RadioButtonTrue from "./RadioButtonTrue";
import RadioButtonFalse from "./RadioButtonFalse";
import Grid from "../Grid/Grid";
import MultiGroupDropdown from "../dropdown/Multi/MultiGroupDropdown";
import QueueTopicGrid from "../Grid/QueueGrid";
import QueueGrid from "../Grid/QueueGrid";

const SelectQueueTopic = () => {
  const [openModal, setOpenModal] = useState<boolean>(true);
  const [topicButton, setTopicButton] = useState<boolean>(true);
  const [queueButton, setQueueButton] = useState<boolean>(false);

  const handleButtonClick = () => {
    setOpenModal(!openModal);
  };

  const handleTopicRadioButtonClick = () => {
    setTopicButton(true);
    setQueueButton(false);
  };

  const handleQueueRadioButtonClick = () => {
    setTopicButton(false);
    setQueueButton(true);
  };

  return (
    <>
      <div>
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
                width: "40%",
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
                <div style={{ fontSize: 17 }}>EMS Topic/Queue Select</div>
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
                  <QueueGrid />
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
