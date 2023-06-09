import axios from "axios";

const ExportTest = () => {
  return (
    <div>
      <button
        style={{ backgroundColor: "pink", width: 100, borderRadius: 10 }}
        onClick={() => {
          axios({
            url: "http://192.168.10.55:8080/api/v1/ems",
            method: "get",
            responseType: "blob",
          }).then((response) => {
            const blob = new Blob([response.data], {
              // type: "application/vnd.ms-excel",
            });
            console.log(response);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "test.zip";
            a.click();
            window.URL.revokeObjectURL(url);
          });
        }}
      >
        download
      </button>
    </div>
  );
};

export default ExportTest;
