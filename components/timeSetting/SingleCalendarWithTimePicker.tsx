import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SingleCalendarWithTimePicker = () => {
  const nowTime = new Date(Date.now());
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    nowTime
  );
  const singleDatePickerRef = useRef<any>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDateTime(date);
  };

  const openDatePicker = () => {
    singleDatePickerRef.current.setOpen(true);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DatePicker
          ref={singleDatePickerRef}
          selected={selectedDateTime}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="yyyy.MM.dd HH:mm"
          timeFormat="HH:mm"
        />
        <img
          src="/calender.png"
          style={{ width: 24, cursor: "pointer" }}
          onClick={openDatePicker}
        />
      </div>
    </div>
  );
};

export default SingleCalendarWithTimePicker;
