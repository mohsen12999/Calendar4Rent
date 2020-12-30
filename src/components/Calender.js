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

  const ChooseDay = (day) => {
    // we have not start day
    if (!startDay) {
      setStartDay(day);
      return true;
    }

    // we have start day but not end date
    if (!endDay) {
      // if endDay<startDay
      if (
        startDay.jy > day.jy ||
        (startDay.jy === day.jy && startDay.jm > day.jm) ||
        (startDay.jy === day.jy &&
          startDay.jm === day.jm &&
          startDay.jd > day.jd)
      ) {
        // swap start day and end date
        setEndDay(startDay);
        setStartDay(day);
        return true;
      }

      setEndDay(day);
      return true;
    }

    // we have start day and end day, get it as start day and remove end date
    setStartDay(day);
    setEndDay(undefined);
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
          ChooseDay={ChooseDay}
        />
        <MonthCalender
          year={currentMonth === 12 ? currentYear + 1 : currentYear}
          month={currentMonth === 12 ? 1 : currentMonth + 1}
          today={today}
          startDay={startDay}
          endDay={endDay}
          ChooseDay={ChooseDay}
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
        <p>
          تعداد روز های انتخابی:{" "}
          {!startDay || !endDay
            ? "روزها را انتخاب کنید!"
            : startDay.jy === endDay.jy && startDay.jm === endDay.jm
            ? endDay.jd - startDay.jd
            : startDay.jy === endDay.jy && startDay.jm + 1 === endDay.jm
            ? jalaali.jalaaliMonthLength(startDay.jy, startDay.jm) -
              startDay.jd +
              endDay.jd
            : ""}
        </p>
      </div>
    </div>
  );
};

export default Calender;
