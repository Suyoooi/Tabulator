import { useState } from "react";
import QueueListProperty from "./queueListProperty";

const QueueListProertyTest = () => {
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
            backgroundColor: "lightPink",
            border: "2px solid black",
          }}
        >
          Queue List Property
        </button>
      </div>

      {openModal === true && (
        <QueueListProperty handleClose={handleButtonClick} />
      )}
    </>
  );
};

export default QueueListProertyTest;
