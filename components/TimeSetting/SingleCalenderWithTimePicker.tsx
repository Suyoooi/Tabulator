import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SingleCalendarWithTimePicker = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [imageSrc, setImageSrc] = useState<string | undefined>("/calender.png");

  const handleDateChange = (date: Date | null) => {
    setSelectedDateTime(date);
  };

  const handleImageClick = (date: Date | null) => {
    setSelectedDateTime(date);
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
        <img src={imageSrc} style={{ width: 24 }} onChange={handleImageClick} />
      </div>
    </div>
  );
};

export default SingleCalendarWithTimePicker;
