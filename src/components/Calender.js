import React from "react";
import jalaali from "jalaali-js";

import MonthCalender from "./MonthCalender";

import "./Calendar.css";

const Calender = () => {
  const today = jalaali.toJalaali(new Date());

  const [currentYear, setCurrentYear] = React.useState(today.jy);
  const [currentMonth, setCurrentMonth] = React.useState(today.jm);

  const [startDay, setStartDay] = React.useState();
  const [endDay, setEndDay] = React.useState();

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
    <div>
      <div className="root-calendar">
        <span onClick={() => decreaseMonth()} className="change-month-btn">
          &lt;&lt;
        </span>
        <MonthCalender
          year={currentYear}
          month={currentMonth}
          showFullDayTitle={true}
          today={today}
          startDay={startDay}
          endDay={endDay}
          ChooseStartDay={(day) => setStartDay(day)}
        />
        <MonthCalender
          year={currentMonth === 12 ? currentYear + 1 : currentYear}
          month={currentMonth === 12 ? 1 : currentMonth + 1}
          today={today}
          startDay={startDay}
          endDay={endDay}
          ChooseStartDay={(day) => setStartDay(day)}
        />
        <span onClick={() => increaseMonth()} className="change-month-btn">
          &gt;&gt;
        </span>
      </div>
      <div style={{ textAlign: "center", direction: "rtl" }}>
        <p>امروز: {today.jy + "/" + today.jm + "/" + today.jd}</p>
        <p>
          روز شروع:{" "}
          {startDay
            ? startDay.jy + "/" + startDay.jm + "/" + startDay.jd
            : "انتخاب نشده"}
        </p>
        <p>
          روز پایان:{" "}
          {endDay
            ? endDay.jy + "/" + endDay.jm + "/" + endDay.jd
            : "انتخاب نشده"}
        </p>
        <p>تعداد روز های انتخابی: {startDay && endDay ? "" : "0"}</p>
      </div>
    </div>
  );
};

export default Calender;
