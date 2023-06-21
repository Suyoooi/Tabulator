import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SimpleDatePicker2: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
      />
    </div>
  );
};

export default SimpleDatePicker2;
