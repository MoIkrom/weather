/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { TabTitle } from "./utils/TabTitle";
import axios from "axios";
import "./App.css";
import Card from "./components/card";

function App() {
  TabTitle("Weather Apps");

  const [country, setCountry] = useState("");
  const [list, setList] = useState("");
  const [temperature, setTemperature] = useState("");
  const [date, setDate] = useState("");
  const APIKEY = "cc43e720cd7cd0d0f933f5404aea9ad4";

  const currentWeather = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=-6.200000&lon=106.816666&appid=${APIKEY}&units=metric`)
      .then((res) => {
        console.log(res);
        setCountry(res.data.name);
        setTemperature(res.data.main.temp);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const forecastWeather = () => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/forecast?q=Jakarta&cnt=5&appid=${APIKEY}&units=metric`)
      .then((res) => {
        setList(res.data.list);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  useEffect(() => {
    currentWeather();
    forecastWeather();
  }, []);

  const today = () => {
    let thisDay = new Date().toDateString();
    const [day, month, date, year] = thisDay.split(" ");
    return day + " , " + date + " " + month + " " + year;
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className="Headers">Welcome to Weather Apps</p>
        <div className="cont-up">
          <p className="country">{country}</p>
          <p className="temp">{temperature} °С</p>
          <p className="days">{today()}</p>
        </div>

        <div className="map">
          {list.length > 0
            ? list.map((list, idx) => {
                const relatedDay = () => {
                  let data = list.dt_txt;
                  let today = data.split(" ", 1);
                  let mydate = new Date(today).toDateString();
                  const [dayy, month, date, year] = mydate.split(" ");
                  return dayy + " , " + date + " " + month + " " + year;
                };
                return <Card className="cards" key={idx} temperatures={list.main.temp} days={relatedDay()} />;
              })
            : "Data Not Found"}
        </div>
      </header>
    </div>
  );
}

export default App;
