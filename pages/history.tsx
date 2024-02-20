const History = () => {
  return (
    <div style={{ marginTop: 30, marginLeft: 30 }}>
      <div
        style={{
          width: 304,
          border: "2px solid #4B4B4B",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: 10,
            textAlign: "center",
            paddingTop: 40,
            paddingBottom: 40,
            paddingRight: 24,
            paddingLeft: 24,
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          과정을 삭제할까요? <br />
          삭제한 과정은 복구할 수 없어요.
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            borderTop: "2px solid #4B4B4B",
          }}
        >
          <div
            style={{
              backgroundColor: "#B9B9B9",
              color: "#1B1B1B",
              width: "50%",
              padding: 10,
              paddingRight: 16,
              paddingLeft: 16,
              textAlign: "center",
              borderRight: "2px solid #4B4B4B",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            삭제
          </div>
          <div
            style={{
              backgroundColor: "#F90013",
              color: "#FFFFFF",
              width: "50%",
              padding: 10,
              paddingRight: 16,
              paddingLeft: 16,
              textAlign: "center",
              fontSize: 16,
              fontWeight: 700,
              lineHeight: "150%",
              letterSpacing: -0.15,
            }}
          >
            취소하기
          </div>
        </div>
      </div>
      {/* 복사/삭제하기 */}
      <div
        style={{
          width: 122,
          border: "2px solid #4B4B4B",
          borderRadius: 4,
          backgroundColor: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            padding: 8,
            // paddingLeft: 16,
            // paddingRight: 16,
            borderBottom: "2px solid #4B4B4B",
          }}
        >
          <div style={{ width: 24, height: 24, border: "1px solid #1B1B1B" }} />
          <div style={{ color: "#1B1B1B", fontSize: 15, fontWeight: 700 }}>
            복사하기
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            padding: 8,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <div style={{ width: 24, height: 24, border: "1px solid #EB0016" }} />
          <div style={{ color: "##EB0016", fontSize: 15, fontWeight: 700 }}>
            삭제하기
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
