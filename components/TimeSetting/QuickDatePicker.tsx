import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const QuickDatePicker = () => {
  const [startDateTime, setStartDateTime] = useState<Date | null>(null);
  const [endDateTime, setEndDateTime] = useState<Date | null>(null);
  const startDatePickerRef = useRef<any>(null);
  const endDatePickerRef = useRef<any>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDateTime(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDateTime(date);
  };

  const isTimeAvailable = (time: Date) => {
    if (!startDateTime) return true;
    return time.getTime() > startDateTime.getTime();
  };

  const openStartDatePicker = () => {
    startDatePickerRef.current.setOpen(true);
  };

  const openEndDatePicker = () => {
    endDatePickerRef.current.setOpen(true);
  };

  const handleButtonClick = () => {
    console.log("시작 일시:", startDateTime);
    console.log("종료 일시:", endDateTime);
    console.log("조회에 성공했습니다");
    alert(
      `조회에 성공했습니다.\n시작 일시: ${startDateTime?.toLocaleString()}\n종료 일시: ${endDateTime?.toLocaleString()}`
    );
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex" }}>
        <DatePicker
          ref={startDatePickerRef}
          selected={startDateTime}
          onChange={handleStartDateChange}
          showTimeSelect
          dateFormat="yyyy.MM.dd HH:mm"
          timeFormat="HH:mm"
          placeholderText="시작 일시 선택하기"
        />
        <img
          src="/calender.png"
          style={{ width: 24, cursor: "pointer" }}
          onClick={openStartDatePicker}
        />
      </div>
      ~
      <div style={{ display: "flex", marginTop: 8 }}>
        <DatePicker
          ref={endDatePickerRef}
          selected={endDateTime}
          onChange={handleEndDateChange}
          showTimeSelect
          dateFormat="yyyy.MM.dd HH:mm"
          timeFormat="HH:mm"
          minDate={startDateTime || new Date()}
          filterTime={isTimeAvailable}
          placeholderText="종료 일시 선택하기"
        />
        <img
          src="/calender.png"
          style={{ width: 24, cursor: "pointer" }}
          onClick={openEndDatePicker}
        />
        <button
          style={{ width: 50, backgroundColor: "lightGrey", borderRadius: 8 }}
          onClick={handleButtonClick}
        >
          Quick
        </button>
      </div>
    </div>
  );
};

export default QuickDatePicker;
