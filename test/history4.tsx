import React, { useRef, useState, useEffect } from "react";
import { ColumnDefinition, ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import QuickDatePicker from "@/components/timeSetting/QuickDatePicker";
import axios from "axios";
import { QUEUE_DATE_COLUMNS_LIST } from "@/constant/QueueListData";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import DropdownComponent from "@/components/dropdown/DropdownComponent";
import CodeList from "@/components/codeList";

export interface ReactTabulatorProps {
  columns?: ColumnDefinition[];
  options?: any;
  events?: any;
  onRef?: (ref: any) => void;
  [k: string]: any;
}

export interface ModResponse {
  data: any[];
  last: number;
  tib_srvr_list: any;
  pattern: any;
  name: any;
  start_date: any;
  end_date: any;
}

const History4 = (props: ReactTabulatorProps) => {
  const tableRef = useRef<ReactTabulator | null>(null);
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(
    moment().subtract(10, "minutes").format("YYYY-MM-DD HH:mm:ss")
  );
  const [endDate, setEndDate] = useState(
    moment().format("YYYY-MM-DD HH:mm:ss")
  );
  const [serverFilter, setServerFilter] = useState<number[]>([]);
  const [queueFilter, setQueueFilter] = useState("");
  const [selectedPattern, setSelectedPattern] = useState("");
  const [size, setSize] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(3);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [ajaxUrl, setAjaxUrl] = useState<any>(
    `/monitor/queue/test/hist?start_date=${startDate}&end_date=${endDate}&name=${queueFilter}&pattern=${selectedPattern}`
  );

  const columns = QUEUE_DATE_COLUMNS_LIST;

  const options = {
    height: 500,
    placeholder: t("MUL_ST_0009"),
    // ajaxURL: "/monitor/queue/test/hist",
    ajaxURL: ajaxUrl,
    dataSendParams: {
      page: "page",
      size: "size",
    },
    dataReceiveParams: {
      last_page: "last",
    },
    filterMode: "remote",
    pagination: true,
    paginationMode: "remote",
    paginationButtonCount: 5,
    paginationCounter: "rows",
    paginationSize: size,
    currentPage: currentPage,
    paginationSizeSelector: true,
    ajaxResponse: async function (url: any, params: any, response: any) {
      console.log("url:::", url);
      console.log("params:::", params);
      const responseData = response.data;

      const rowData = responseData.queue_hist_list;
      // console.log("rowData:::", rowData);
      const tableInfo: any = tableRef.current?.table;
      // console.log("선택한 페이지:::", tableInfo.getPage());
      // const selectedPage = tableInfo.getPage();
      const selectedPageSize = tableInfo.getPageSize();
      setSize(selectedPageSize);
      // setCurrentPage(selectedPage);
      // console.log("여기서 바뀜:::", selectedPageSize);

      const totalPageCount = !isNaN(responseData?.total_count)
        ? Math.ceil(Number(responseData.total_count) / selectedPageSize) - 1
        : 0;

      setTotalPage(totalPageCount);

      const result = {
        last_page: totalPageCount,
        data: rowData,
      };

      console.log(result);

      return result;
    },
    ajaxError: function (error: any) {
      console.log("ajaxError", error);
    },
  };

  const handleClickButton = async () => {
    setCurrentPage(1);

    const paramsVal = {
      start_date: startDate,
      end_date: endDate,
      name: queueFilter,
      pattern: selectedPattern,
    };

    const paramString = Object.entries(paramsVal)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            Array.isArray(value) && value.length
              ? value.join(",")
              : value.toString()
          )}`
      )
      .join("&");

    const newUrl = `/monitor/queue/test/hist?${paramString}`;

    setAjaxUrl(newUrl);
  };

  const handleSelectedServerAlias = (tibSrvrSn: number[]) => {
    setServerFilter(tibSrvrSn);
  };

  // excel 다운로드
  const fetchTableDataExcel = async () => {
    try {
      // await fetchTableData(); // 조회 API 실행

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
              key={ajaxUrl}
              ref={tableRef}
              // data={filteredData}
              columns={columns}
              options={options}
              events={{
                dataLoaded: function (data: any[]) {
                  console.log("dataLoaded", data);
                  const modResponse = {
                    data: data,
                    last: totalPage,
                  };
                  console.log(modResponse);
                  return modResponse;
                },
                ajaxError: function (error: any) {
                  console.log("ajaxError", error);
                },
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default History4;
