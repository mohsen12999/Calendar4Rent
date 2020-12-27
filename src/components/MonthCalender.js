import React from "react";
import jalaali from "jalaali-js";

const MonthCalender = () => {
  const jToday = jalaali.toJalaali(new Date());

  const firstDayOfMonth = jalaali.toGregorian(jToday.jy, jToday.jm, 1);
  const firstDayOfMonthDayOfWeek = new Date(
    firstDayOfMonth.gy,
    firstDayOfMonth.gm,
    firstDayOfMonth.gd
  ).getDay();

  const monthLength = jalaali.jalaaliMonthLength(jToday.jy, jToday.jm);

  const dayArray = Array.from(
    { length: Math.ceil((monthLength + firstDayOfMonthDayOfWeek) / 7) },
    (_, i) =>
      Array.from({ length: 7 }, (_, j) => {
        const dayNumber = i * 7 + j + 1 - firstDayOfMonthDayOfWeek;
        return dayNumber > 0 && dayNumber <= monthLength ? dayNumber : 0;
      })
  );

  const showDayTitle = true;

  return (
    <table style={{ direction: "rtl" }}>
      {showDayTitle && (
        <thead>
          <tr>
            <th>شنبه</th>
            <th>یکشنبه</th>
            <th>دوشنبه</th>
            <th>سه‌شنبه</th>
            <th>چهارشنبه</th>
            <th>پنجشنبه</th>
            <th>جمعه</th>
          </tr>
        </thead>
      )}
      <tbody>
        {dayArray.map((weekArray) => (
          <tr>
            {weekArray.map((day) => (
              <td>{day > 0 ? day : ""}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

export default MonthCalender;
