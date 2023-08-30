import React from "react";

interface CustomButtonProps {
  text: string;
  //   onClick: () => void;
}

const MiddleBtn: React.FC<CustomButtonProps> = ({ text }) => {
  return (
    <div style={{ display: "flex" }}>
      <button
        style={{
          padding: "12px 0px 11px 0px",
          borderRadius: 8,
          border: "1.5px solid #1F1F1F",
          backgroundColor: "#fff",
          width: 144,
        }}
        //   onClick={onClick}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#1F1F1F",
          }}
        >
          {text}
        </div>
      </button>
    </div>
  );
};

export default MiddleBtn;
