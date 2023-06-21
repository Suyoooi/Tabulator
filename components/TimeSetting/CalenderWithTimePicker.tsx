import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarWithTimePicker = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDateTime(date);
  };

  return (
    <div>
      <DatePicker
        selected={selectedDateTime}
        onChange={handleDateChange}
        showTimeSelect
        dateFormat="yyyy.MM.dd HH:mm"
        timeFormat="HH:mm"
      />
    </div>
  );
};

export default CalendarWithTimePicker;
