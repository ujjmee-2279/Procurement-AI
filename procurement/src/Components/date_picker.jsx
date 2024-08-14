import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePicker = () => {
  const nextDate = new Date(new Date().setDate(new Date().getDate() + 1));
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: nextDate,
    key: "selection",
  });
  const handleChange = (ranges) => {
    setDate(ranges.selection);
  };
  return (
    <div>
      <DateRangePicker ranges={[date]} minDate={new Date()} onChange={handleChange} />
    </div>
  );
};

export default DatePicker;