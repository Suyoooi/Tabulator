import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

const SimpleDataTimePicker1 = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);

  const handleDateTimeChange = (dateTime: Date | null) => {
    setSelectedDateTime(dateTime);
  };

  const handleTimeChange = (time: string | null) => {
    if (selectedDateTime) {
      const newDateTime = new Date(selectedDateTime);
      if (time) {
        const [hours, minutes] = time.split(":");
        newDateTime.setHours(Number(hours));
        newDateTime.setMinutes(Number(minutes));
      }
      handleDateTimeChange(newDateTime);
    }
  };

  return (
    <div>
      <h3>Selected Date and Time: {selectedDateTime?.toLocaleString()}</h3>
      <div>
        <DatePicker
          selected={selectedDateTime}
          onChange={handleDateTimeChange}
          dateFormat="MM/dd/yyyy"
          placeholderText="Select a date"
        />
        <TimePicker
          value={
            selectedDateTime
              ? selectedDateTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : null
          }
          onChange={handleTimeChange}
          clearIcon={null}
        />
      </div>
    </div>
  );
};

export default SimpleDataTimePicker1;
