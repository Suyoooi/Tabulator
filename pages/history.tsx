const History = () => {
  return (
    <>
      <div
        style={{
          marginTop: 30,
          marginLeft: 30,
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
            }}
          >
            취소하기
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
