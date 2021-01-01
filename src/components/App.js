import React from "react";
import Calender from "./Calender";
import jalaali from "jalaali-js";

// import logo from './logo.svg';

import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const App = () => {
  const [monthCount, setMonthCount] = React.useState(2);
  const [showFullDayTitle, setShowFullDayTitle] = React.useState(true);

  const today = jalaali.toJalaali(new Date());
  const [startDay, setStartDay] = React.useState();
  const [endDay, setEndDay] = React.useState();
  const [countDay, setCountDay] = React.useState();

  const onChangeDay = (startDay, endDay, countDay) => {
    setStartDay(startDay);
    setEndDay(endDay);
    setCountDay(countDay);
  };

  return (
    <div style={{ direction: "rtl", textAlign: "center" }}>
      <p>
        تعداد ماه‌های انتخابی:{" "}
        <select
          onChange={(e) => setMonthCount(e.target.value)}
          value={monthCount}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </p>

      <p>
        <label>
          <input
            type="checkbox"
            checked={showFullDayTitle}
            onChange={(e) => setShowFullDayTitle(e.target.checked)}
          />{" "}
          نمایش کامل روزها
        </label>
      </p>

      <Calender
        monthCount={monthCount}
        showFullDayTitle={showFullDayTitle}
        onChangeDay={onChangeDay}
      />

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
        <p>تعداد روز های انتخابی: {countDay ?? "روزها را انتخاب کنید!"}</p>
      </div>
    </div>
  );
};

export default App;
