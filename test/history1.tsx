import React, { useRef, useState, useEffect } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import QuickDatePicker from "@/components/timeSetting/QuickDatePicker";
import axios from "axios";
import { QUEUE_DATE_COLUMNS_LIST } from "@/constant/QueueListData";
import moment from "moment";
import { QueueHistoryTableData } from "@/types/webComm";
import DropdownComponent from "@/components/dropdown/DropdownComponent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CodeList from "@/components/codeList";
import { isEmpty } from "lodash";
import { parseCookies } from "nookies";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "@/constant/redux/loadingSlice";

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

const History1 = () => {
  const tableRef = useRef<ReactTabulator | null>(null);
  const cookies = parseCookies();
  const accessToken = cookies["access_token"];
  const [startDate, setStartDate] = useState(
    moment().subtract(10, "minutes").format("YYYY-MM-DD HH:mm:ss")
  );
  const [endDate, setEndDate] = useState(
    moment().format("YYYY-MM-DD HH:mm:ss")
  );

  const [serverFilter, setServerFilter] = useState<number[]>([]);
  const [queueFilter, setQueueFilter] = useState("");
  const [selectedPattern, setSelectedPattern] = useState("");
  const [filteredData, setFilteredData] = useState<QueueHistoryTableData[]>([]);
  const { t, i18n } = useTranslation("common");
  const dispatch = useDispatch();

  const columns = QUEUE_DATE_COLUMNS_LIST;

  const fetchTableData = async () => {
    try {
      dispatch(startLoading());
      const paramsVal = {
        tib_srvr_list: serverFilter,
        pattern: selectedPattern,
        name: queueFilter,
        start_date: startDate,
        end_date: endDate,
      };

      // 필터된 매개 변수 생성
      const filteredParams = Object.fromEntries(
        Object.entries(paramsVal).filter(([, value]) => !isEmpty(value))
      );

      const paramString = Object.entries(filteredParams)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
              Array.isArray(value) && value.length
                ? value.join(",")
                : value.toString()
            )}`
        )
        .join("&");

      const url = `/monitor/queue/hist?${paramString}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const rowData = response.data.data;
      setFilteredData(rowData);
      dispatch(stopLoading());
    } catch (error) {
      dispatch(stopLoading());
      console.error("Error fetching table data:", error);
    }
  };

  // const [langVal, setLangVal] = useState("");
  // const currentLocale = i18n.language;

  // useEffect(() => {
  //   console.log(currentLocale);
  //   if (currentLocale === "en") {
  //     setLangVal("No data found.");
  //   } else if (currentLocale === "ko") {
  //     setLangVal("검색된 데이터가 없습니다.");
  //   }
  // }, [currentLocale]);

  const langVal = t("MUL_WD_0137");

  const options = {
    layout: "fitDataTable",
    pagination: true,
    paginationSize: 10,
    paginationSizeSelector: [10, 50, 100],
    height: 460,
    placeholder: langVal,
  };

  // 조회 버튼
  const handleClickButton = async () => {
    fetchTableData();
  };

  // 서버 선택
  const handleSelectedServerAlias = (tibSrvrSn: number[]) => {
    setServerFilter(tibSrvrSn);
  };

  // excel 다운로드
  const fetchTableDataExcel = async () => {
    try {
      await fetchTableData(); // 조회 API 실행

      const params = {
        tib_srvr_list: serverFilter,
        pattern: selectedPattern,
        name: queueFilter,
        start_date: startDate,
        end_date: endDate,
      };

      const paramString = Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
              Array.isArray(value) && value.length
                ? value.join(",")
                : value.toString()
            )}`
        )
        .join("&");

      const url = `/monitor/queue/hist/excel?${paramString}`;

      const response = await axios.get(url, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const contentDisposition = response.headers["content-disposition"];
      const match = contentDisposition.match(/filename=(.+)/);
      const filename = match ? match[1] : "queue_history.xlsx";

      const blobURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = blobURL;
      link.setAttribute("download", filename);
      link.click();

      console.log("Excel downloaded successfully");
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const handleDownloadButtonClick = () => {
    fetchTableDataExcel();
  };

  return (
    <>
      <section id="content" className="content">
        <div className="content__header content__boxed overlapping">
          <div className="content__wrap"></div>
        </div>
        <div className="content__boxed">
          <div className="mt-2 search-box justify-content-center">
            <div className="row col-md-12">
              <div className="mb-2 row col-md-6">
                <label
                  className="col-sm-3 col-form-label text-sm-end"
                  htmlFor="sel_server"
                >
                  {t("MUL_WD_0009")}
                </label>
                <div className="col-sm-6">
                  <DropdownComponent
                    onServerSelected={handleSelectedServerAlias}
                  />
                </div>
              </div>
              <div className="mb-2 row col-md-6">
                <label
                  className="col-sm-3 col-form-label text-sm-end"
                  htmlFor="sel_queue"
                >
                  Queue
                </label>
                <div className="col-sm-5">
                  <select
                    id="sel_queue"
                    className="form-select"
                    value={selectedPattern}
                    onChange={(e) => setSelectedPattern(e.target.value)}
                  >
                    <CodeList codeGroupId="QUE_TP_CD" />
                  </select>
                </div>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control"
                    value={queueFilter}
                    onChange={(e) => setQueueFilter(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-2 row col-md-6">
                <label
                  className="col-sm-3 col-form-label text-sm-end"
                  htmlFor="int_day"
                >
                  {t("MUL_WD_0026")}
                </label>
                <div className="col-sm-6">
                  <QuickDatePicker
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={(date) =>
                      setStartDate(moment(date).format("YYYY-MM-DD HH:mm:ss"))
                    }
                    onEndDateChange={(date) =>
                      setEndDate(moment(date).format("YYYY-MM-DD HH:mm:ss"))
                    }
                    defaultTime={new Date(Date.now() - 10 * 60 * 1000)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <button
                type="button"
                onClick={handleClickButton}
                className="gap-2 btn btn-dark hstack"
              >
                <i className="i_view_search fs-5"></i>
                {t("MUL_WD_0022")}
              </button>
            </div>
          </div>
          <div
            className="mt-3 content__boxed"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            {/* --- 저장 버튼 --- */}
            <button
              className="btn btn-icon btn-green"
              onClick={handleDownloadButtonClick}
              type="button"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-original-title={t("MUL_WD_0012") as string}
            >
              <i className="i_excel icon-lg fs-5"></i>
            </button>
          </div>
          <div className="table table-responsive">
            {/* --- Tabulator --- */}
            <ReactTabulator
              key={filteredData.length}
              ref={tableRef}
              autoResize={false}
              options={options}
              data={filteredData}
              columns={columns}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default History1;
