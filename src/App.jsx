import "./App.css";
import { dateArray, strategyArray } from "../src/data/index.js";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const toggleOptions = strategyArray.map((item) => item.View);
function App() {
  const [activeToggleOption, setActiveToggleOption] = useState(
    toggleOptions[0]
  );
  const [selectedDate, setSelectedDate] = useState(dateArray[0]);
  const [openDateOptions, setOpenDateOptions] = useState(false);

  // function for strategy count
  const getGroupedStrategies = () => {
    const activeStrategy = strategyArray.find(
      (item) => item.View === activeToggleOption
    );
    if (!activeStrategy) return [];
    const strategiesForDate = activeStrategy.Value[selectedDate] || [];
    const grouped = strategiesForDate.reduce((acc, strategy) => {
      acc[strategy] = (acc[strategy] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(grouped);
  };

  return (
    <div className="container">
      <div className="list">
        {/* Toggle Options */}
        <div className="toggle-options">
          {toggleOptions.map((option) => (
            <p
              onClick={() => setActiveToggleOption(option)}
              className={
                option === activeToggleOption ? "active-toggle-option" : ""
              }
              key={option}
            >
              {option}
            </p>
          ))}
        </div>

        {/* Dropdown */}
        <div className="date-dropdowns">
          <div
            className="selected-date"
            onClick={() => setOpenDateOptions(!openDateOptions)}
          >
            <span style={{ paddingLeft: "24px" }}>
              {selectedDate.split("-").join(" ")}
            </span>
            {openDateOptions ? (
              <FaAngleUp
                color="#2563eb"
                size={20}
                style={{ paddingRight: "24px" }}
              />
            ) : (
              <FaAngleDown
                color="#2563eb"
                size={20}
                style={{ paddingRight: "24px" }}
              />
            )}
          </div>
          {/* Inner Dropdown Transition*/}
          <div className={`date-list ${openDateOptions ? "open" : ""}`}>
            {dateArray
              .filter((date) => date !== selectedDate)
              .map((date) => (
                <span
                  key={date}
                  className={`date ${openDateOptions ? "dropdown-active" : ""}`}
                  onClick={() => {
                    setSelectedDate(date);
                    setOpenDateOptions(false);
                  }}
                >
                  {date.split("-").join(" ")}
                </span>
              ))}
          </div>
        </div>

        {/* Strategies List */}
        <div className="strategies">
          <div className="cards-container">
            {getGroupedStrategies().length === 0 ? (
              <div className="no-strategies">
                <p> There are no strategies for</p>
                <h1 className="no-strategies-date">
                  {selectedDate.split("-").join(" ")}
                </h1>
              </div>
            ) : (
              getGroupedStrategies().map(([strategy, count], idx) => (
                <div className="strategy-card" key={idx}>
                  <h4>{strategy}</h4>
                  <p className="strategy-count">
                    <span className="dot">&#x2022; </span>
                    {count} {count > 1 ? "Strategies" : "Strategy"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
