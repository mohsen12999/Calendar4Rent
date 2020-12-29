import React from "react";
import jalaali from "jalaali-js";

import MonthCalender from "./MonthCalender";

const Calender = () => {
  const jToday = jalaali.toJalaali(new Date());

  return (
    <div
      style={{
        direction: "rtl",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <span>&lt;&lt;</span>
      <MonthCalender
        year={jToday.jy}
        month={jToday.jm}
        position={0}
        showFullDayTitle={true}
      />
      <MonthCalender year={jToday.jy} month={jToday.jm + 1} position={1} />
      <span>&gt;&gt;</span>
    </div>
  );
};

export default Calender;
