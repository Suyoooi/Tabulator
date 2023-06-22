import { useState } from "react";
import SelectQueueTopic from "./SelectQueueTopic";

const SelectQueueTopicTest = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleButtonClick = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <div style={{ display: "flex", marginTop: 30, marginLeft: 50 }}>
        <button
          onClick={handleButtonClick}
          style={{
            width: 180,
            height: 30,
            color: "black",
            borderRadius: 10,
            backgroundColor: "lightBlue",
            border: "2px solid black",
          }}
        >
          Select Queue/Topic
        </button>
        {openModal === true && <SelectQueueTopic />}
      </div>
    </>
  );
};

export default SelectQueueTopicTest;
