import React from "react";
import jalaali from "jalaali-js";

import MonthCalender from "./MonthCalender";

const Calender = () => {
  const jToday = jalaali.toJalaali(new Date());

  const [currentYear, setCurrentYear] = React.useState(jToday.jy);
  const [currentMonth, setCurrentMonth] = React.useState(jToday.jm);

  const increaseMonth = () => {
    const newMonth = currentMonth + 1;
    if (newMonth > 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  const decreaseMonth = () => {
    const newMonth = currentMonth - 1;
    if (newMonth < 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  return (
    <div
      style={{
        direction: "rtl",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <span onClick={() => decreaseMonth()} style={{ cursor: "pointer" }}>
        &lt;&lt;
      </span>
      <MonthCalender
        year={currentYear}
        month={currentMonth}
        position={0}
        showFullDayTitle={true}
      />
      <MonthCalender
        year={currentMonth === 12 ? currentYear + 1 : currentYear}
        month={currentMonth === 12 ? 1 : currentMonth + 1}
        position={1}
      />
      <span onClick={() => increaseMonth()} style={{ cursor: "pointer" }}>
        &gt;&gt;
      </span>
    </div>
  );
};

export default Calender;
