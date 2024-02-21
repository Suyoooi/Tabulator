const History = () => {
  return (
    <div
      style={{
        marginTop: 30,
        marginLeft: 30,
        width: 375,
        backgroundColor: "#f4ffc4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      <div
        style={{
          width: 304,
          border: "2px solid #4B4B4B",
          borderRadius: 8,
          overflow: "hidden",
          justifyContent: "center",
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
          width: 128,
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

            borderBottom: "2px solid #4B4B4B",
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              border: "1px solid #1B1B1B",
              marginLeft: 8,
            }}
          />
          <div
            style={{
              color: "#1B1B1B",
              fontSize: 15,
              fontWeight: 700,
              marginRight: 8,
            }}
          >
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
          <div style={{ color: "#EB0016", fontSize: 15, fontWeight: 700 }}>
            삭제하기
          </div>
        </div>
      </div>

      {/* 네모네모 */}
      <div
        style={{
          border: "2px solid #4B4B4B",
          padding: 16,
          backgroundColor: "#fff",
          borderRadius: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <div style={{ color: "#1B1B1B", fontSize: 20, fontWeight: 700 }}>
                routine name
              </div>
              <div style={{ color: "#1B1B1B", fontSize: 16, fontWeight: 600 }}>
                |
              </div>
              <div style={{ color: "#1B1B1B", fontSize: 16, fontWeight: 600 }}>
                n개
              </div>
            </div>
            <div style={{ display: "flex", gap: 4, flexDirection: "column" }}>
              <div>시작 시간: nn:nn AM</div>
              <div>총 소요 시간: nn시간 nn분</div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <button
              style={{
                width: 48,
                height: 28,
                borderRadius: 20,
                backgroundColor: "pink",
              }}
            />
            <button
              style={{
                width: 24,
                height: 24,
                borderRadius: 10,
                backgroundColor: "gray",
                alignSelf: "center",
              }}
            />
          </div>
        </div>
      </div>
      {/* 네모네모2 */}
      <div
        style={{
          border: "2px solid #4B4B4B",
          padding: 16,
          backgroundColor: "#fff",
          borderRadius: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                borderRadius: 50,
                backgroundColor: "gray",
                width: 40,
                height: 40,
              }}
            />
            <div
              style={{
                color: "#1B1B1B",
                fontSize: 16,
                fontWeight: 600,
                alignSelf: "center",
              }}
            >
              세수하기
            </div>
          </div>
          <div
            style={{
              color: "#1B1B1B",
              fontSize: 16,
              fontWeight: 400,
              alignItems: "center",
            }}
          >
            10 분
          </div>
        </div>
      </div>
      <div
        style={{
          borderRadius: 50,
          backgroundColor: "#FEAC54",
          width: 40,
          height: 40,
          border: "2px solid #4B4B4B",
        }}
      >
        +
      </div>
      <div
        style={{
          border: "2px solid #4B4B4B",
          backgroundColor: "#FFC4CA",
          borderRadius: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 16,
            paddingBottom: 16,
          }}
        >
          <button
            style={{
              width: 24,
              height: 24,
              borderRadius: 10,
              backgroundColor: "gray",
              alignSelf: "center",
            }}
          />
          <div
            style={{
              color: "#1B1B1B",
              fontSize: 14,
              fontWeight: 400,
              fontStyle: "normal",
              lineHeight: "150%",
              letterSpacing: -0.14,
            }}
          >
            '출근 준비' 과정이 08:07 AM에 시작됩니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;

// const textStyle = {
//     color: isDisabled ? "#969696" : "#1B1B1B",
//     fontSize: 16,
//     fontWeight: 600,
//   };
