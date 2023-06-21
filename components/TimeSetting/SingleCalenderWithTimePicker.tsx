import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SingleCalendarWithTimePicker = () => {
  const nowTime = new Date(Date.now());
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(
    nowTime
  );
  const DatePickerRef = useRef<any>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDateTime(date);
  };

  const openDatePicker = () => {
    DatePickerRef.current.setOpen(true);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DatePicker
          selected={selectedDateTime}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="yyyy.MM.dd HH:mm"
          timeFormat="HH:mm"
        />
        <img
          src="/calender.png"
          style={{ width: 24 }}
          onClick={openDatePicker}
        />
      </div>
    </div>
  );
};

export default SingleCalendarWithTimePicker;
