import React from "react";
import jalaali from "jalaali-js";
import { PERSIAN_WEEK_DAYS, PERSIAN_MONTHS } from "../shared/constants";

import "./MonthCalender.css";

// position: 0 current month, 1 next months, -1 prev month
const MonthCalender = ({
  year,
  month,
  today,
  startDay,
  endDay,
  showDayTitle = true,
  showFullDayTitle = false,
  ChooseDay,
}) => {
  // const jToday = jalaali.toJalaali(new Date());

  const firstDayOfMonth = jalaali.toGregorian(year, month, 1);
  const firstDayOfMonthDayOfWeek = new Date(
    firstDayOfMonth.gy,
    firstDayOfMonth.gm,
    firstDayOfMonth.gd
  ).getDay();

  const monthLength = jalaali.jalaaliMonthLength(year, month);

  const dayArray = Array.from(
    { length: Math.ceil((monthLength + firstDayOfMonthDayOfWeek) / 7) },
    (_, i) =>
      Array.from({ length: 7 }, (_, j) => {
        const dayNumber = i * 7 + j + 1 - firstDayOfMonthDayOfWeek;
        return dayNumber > 0 && dayNumber <= monthLength ? dayNumber : 0;
      })
  );

  const tdClassName = (day) => {
    if (day === 0) {
      return "emptyDay";
    }

    const isActiveClass =
      year < today.jy ||
      (year === today.jy && month < today.jm) ||
      (year === today.jy && month === today.jm && day < today.jd)
        ? "disable"
        : "active";

    const isTodayClass =
      year === today.jy && month === today.jm && day === today.jd
        ? " today"
        : "";

    const chooseDayClass =
      startDay &&
      year === startDay.jy &&
      month === startDay.jm &&
      day === startDay.jd
        ? " chooseDay startDay"
        : endDay &&
          year === endDay.jy &&
          month === endDay.jm &&
          day === endDay.jd
        ? " chooseDay endDay"
        : "";

    const selectedDate =
      startDay &&
      endDay &&
      ((endDay.jy === startDay.jy &&
        endDay.jy === year &&
        endDay.jm === startDay.jm &&
        endDay.jm === month &&
        day > startDay.jd &&
        day < endDay.jd) ||
        (endDay.jy === startDay.jy &&
          endDay.jy === year &&
          endDay.jm !== startDay.jm &&
          ((month > startDay.jm && month < endDay.jm) ||
            (month === startDay.jm && day > startDay.jd) ||
            (month === endDay.jm && day < endDay.jd))) ||
        (endDay.jy !== startDay.jy &&
          ((year > startDay.jy && year < endDay.year) ||
            (year === startDay.jy &&
              (month > startDay.jm ||
                (month === startDay.jm && day > startDay.jd))) ||
            (year === endDay.jy &&
              (month < endDay.jm ||
                (month === endDay.jm && day < endDay.jd))))))
        ? " selectedDay"
        : "";

    /*
    const allInSameMonth =
      endDay.jy === startDay.jy &&
      endDay.jy === year &&
      endDay.jm === startDay.jm &&
      endDay.jm === month &&
      day > startDay.jd &&
      day < endDay.jd;

    const sameYear =
      endDay.jy === startDay.jy &&
      endDay.jy === year &&
      endDay.jm !== startDay.jm &&
      ((month > startDay.jm && month < endDay.jm) ||
        (month === startDay.jm && day > startDay.jd) ||
        (month === endDay.jm && day < endDay.jd));

    const differenceYear =
      endDay.jy !== startDay.jy &&
      ((year > startDay.jy && year < endDay.year) ||
        (year === startDay.jy &&
          (month > startDay.jm ||
            (month === startDay.jm && day > startDay.jd))) ||
        (year === endDay.jy &&
          (month < endDay.jm || (month === endDay.jm && day < endDay.jd))));
          */

    return isActiveClass + isTodayClass + chooseDayClass + selectedDate;
  };

  const clickDay = (e, day) => {
    const selectedDay = { jy: year, jm: month, jd: day };
    var className = e.target.className;
    if (className.includes("active")) {
      ChooseDay(selectedDay);
    }
  };

  return (
    <table className="month-table">
      <caption>{PERSIAN_MONTHS[month - 1] + " " + year}</caption>
      {showDayTitle && (
        <thead>
          <tr>
            {PERSIAN_WEEK_DAYS.map((d, index) => (
              <th key={index}>{showFullDayTitle ? d.name : d.short}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {dayArray.map((weekArray, week_index) => (
          <tr key={week_index}>
            {weekArray.map((day, day_index) => (
              <td
                key={day_index}
                onClick={(e) => clickDay(e, day)}
                className={tdClassName(day)}
              >
                {day > 0 ? day : ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

export default MonthCalender;
