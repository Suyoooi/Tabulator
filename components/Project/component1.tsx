import MiddleBtn from "./MiddleBtn";
import MiddleBtnBlack from "./MiddleBtnBlack";

const Component1 = () => {
  return (
    <>
      <div
        style={{
          width: 335,
          height: 480,
          borderRadius: 16,
          border: "1.5px solid #1F1F1F",
          background: "#fff",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          @@님에게서
          <br /> 대결 신청이 왔어요!
        </div>
        <div style={{ paddingLeft: 24 }}>
          {/* --- text1 --- */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, color: "#000" }}>
              도발 메세지
            </div>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#000" }}>
              도발 메세지
            </div>
          </div>
          {/* --- text2 --- */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, color: "#000" }}>
              대결 보상
            </div>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#000" }}>
              맘스터치 기프티콘
            </div>
          </div>
          {/* --- text3 --- */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, color: "#000" }}>
              대결 기간/보상
            </div>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#000" }}>
              7일
            </div>
            <div style={{ fontSize: 16, fontWeight: 500, color: "#000" }}>
              150,000원
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 15 }}>
          <MiddleBtn text={"승낙"} />
          <MiddleBtnBlack text={"거절"} />
        </div>
      </div>
    </>
  );
};

export default Component1;
