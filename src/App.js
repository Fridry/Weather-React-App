import React, { useState } from "react";
import "./App.css";

import api from "./api";

const apiData = {
  key: "App Key"
};

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState([]);

  const handleSearch = async e => {
    if (e.key === "Enter") {
      const response = await api.get(
        `/weather?q=${query}&units=metric&appid=${apiData.key}`
      );
      setQuery("");
      setWeather(response.data);
    }
  };

  const dateBuilder = d => {
    let months = [
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
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const weatherClass = () => {
    if (typeof weather.main != "undefined") {
      if (weather.main.temp <= 0) {
        return "app cold";
      } else if (weather.main.temp <= 10) {
        return "app windy";
      } else if (weather.main.temp <= 20) {
        return "app";
      } else if (weather.main.temp <= 29) {
        return "app sunny";
      } else if (weather.main.temp > 29) {
        return "app hot";
      }
    } else {
      return "app";
    }
  };

  const temperature = weatherClass();

  return (
    <div className={`${temperature}`}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyPress={handleSearch}
          />
        </div>

        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="wheather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="wheather">{weather.weather[0].main}</div>
              <div className="wheather">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Icon"
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default App;
