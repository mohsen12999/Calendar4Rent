import React from "react";
import Calender from "./Calender";

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
            onClick={(e) => setShowFullDayTitle(e.target.checked)}
          />{" "}
          نمایش کامل روزها
        </label>
      </p>

      <Calender monthCount={monthCount} showFullDayTitle={showFullDayTitle} />
    </div>
  );
};

export default App;
