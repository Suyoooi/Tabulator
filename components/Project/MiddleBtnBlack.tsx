import React from "react";

interface CustomButtonProps {
  text: string;
  //   onClick: () => void;
}

const MiddleBtnBlack: React.FC<CustomButtonProps> = ({ text }) => {
  return (
    <div style={{ display: "flex" }}>
      <button
        style={{
          padding: "12px 0px 11px 0px",
          borderRadius: 8,
          border: "1.5px solid #1F1F1F",
          background: "#1F1F1F",
          width: 144,
        }}
        //   onClick={onClick}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {text}
        </div>
      </button>
    </div>
  );
};

export default MiddleBtnBlack;
