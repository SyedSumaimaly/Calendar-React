import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "../App.css";
import Calendar from "react-calendar";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

function MyCalendar() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const Days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  let [datesData, setdatesData] = useState([]);
  let [currentDate, setCurrentDate] = useState("");
  let [currMonth, setCurrMonth] = useState(new Date().getMonth());
  let [currYear, setCurrYear] = useState(new Date().getFullYear());
  let datedsiplay = new Date();
  console.log(datedsiplay);
  const displayCal = () => {
    let date = new Date();
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(
      currYear,
      currMonth,
      lastDateofMonth
    ).getDay();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    let data = [];

    for (let i = firstDayofMonth; i > 0; i--) {
      data.push({ class: "inactive", value: lastDateofLastMonth - i + 1 });
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday =
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
          ? "active"
          : "";
      data.push({ class: isToday, value: i });
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      data.push({ class: "inactive", value: i - lastDayofMonth + 1 });
    }

    currentDate = `${months[currMonth]} ${currYear}`;
    setCurrentDate(currentDate);
    setdatesData(data);
  };

  const previousMonth = () => {
    if (currMonth === 0) {
      setCurrMonth(11);
      setCurrYear(currYear - 1);
    } else {
      setCurrMonth(currMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currMonth === 11) {
      setCurrMonth(0);
      setCurrYear(currYear + 1);
    } else {
      setCurrMonth(currMonth + 1);
    }
  };

  const previousYear = () => {
    setCurrYear(currYear - 1);
  };

  const nextYear = () => {
    setCurrYear(currYear + 1);
  };

  useEffect(() => {
    displayCal();
  }, [currMonth, currYear]);

  return (
    <div className="main_div">
      <div className="header">
        {/* <p className="current-date">{currentDate}</p> */}
        <div className="icons">
          <span onClick={previousYear}>
            <KeyboardDoubleArrowLeftIcon />
          </span>
          <span onClick={previousMonth}>
            <NavigateBeforeIcon />
          </span>
          <span>{currentDate}</span>
          <span onClick={nextMonth}>
            <NavigateNextIcon />
          </span>
          <span onClick={nextYear}>
            <KeyboardDoubleArrowRightIcon />
          </span>
        </div>
      </div>

      <div className="cal">
        <ul className="weeks">
          {Days.map((val, i) => {
            return <li key={i}>{val}</li>;
          })}
        </ul>

        <ul className="days">
          {datesData &&
            datesData.length > 0 &&
            datesData.map((e, i) => {
              return (
                <li className={e.class} key={i}>
                  {e.value}
                </li>
              );
            })}
        </ul>
        <div >
          <div className="datedisplay">
            <h1>{Days[datedsiplay.getDay()]}</h1>
            <h2>
              {datedsiplay.getHours()}:{datedsiplay.getMinutes()}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;
