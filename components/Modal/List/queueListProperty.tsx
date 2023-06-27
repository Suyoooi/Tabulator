import React, { useEffect, useRef, useState } from "react";

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

const QueueListProperty: React.FC<SelectQueueListProps> = ({ handleClose }) => {
  const [openModal, setOpenModal] = useState<boolean>(true);

  const handleButtonClick = () => {
    handleClose(); // 부모 컴포넌트의 상태 변경 함수 호출
  };

  return (
    <div style={{ zIndex: 10 }}>
      {openModal === true && (
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <table className="w-full border-collapse">
              {/* === header === */}
              <thead>
                <tr style={{ backgroundColor: "grey" }}>
                  <th
                    colSpan={2}
                    style={{
                      color: "black",
                      paddingLeft: 10,
                      borderLeft: "2px solid black",
                      backgroundColor: "grey",
                    }}
                  >
                    QueueProperty
                  </th>
                  <th
                    colSpan={2}
                    style={{
                      color: "black",
                      paddingLeft: 10,
                      borderLeft: "2px solid black",
                      backgroundColor: "grey",
                    }}
                  >
                    Value
                  </th>
                </tr>
              </thead>
              {/* === data === */}
              <tbody>
                {initialData.map((item, index) => (
                  <React.Fragment key={item.value}>
                    <tr
                      style={{
                        textAlignLast: "center",
                        backgroundColor: index % 2 === 0 ? "lightGrey" : "grey",
                      }}
                    >
                      <td
                        colSpan={2}
                        style={{
                          color: "black",
                          paddingLeft: 10,
                          borderLeft: "2px solid black",
                        }}
                      >
                        {item.queueProperty}
                      </td>
                      {item.value && (
                        <tr
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "lightGrey" : "grey",
                          }}
                        >
                          <td
                            colSpan={5}
                            style={{
                              color: "black",
                              paddingLeft: 10,
                              borderLeft: "2px solid black",
                              justifyContent: "center",
                            }}
                          >
                            {item.value}
                          </td>
                        </tr>
                      )}
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
              <button onClick={handleButtonClick}>닫기 </button>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueueListProperty;
