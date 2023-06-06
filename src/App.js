import "./App.css";
import { Search } from "./components/search/search";
import CurrentWeather from "./components/current weather/currentWeather";
import { useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./apis";
import Forecast from "./components/forecast/forecast";
import Icon from "./imgs/weather2.png";

function App() {
  const [nav, setNav] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnSearchChange = (searchData) => {
    // console.log(searchData)
    const [lat, lon] = searchData.value.split("");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch((err) => console.log(err));
  };
  console.log(currentWeather);
  console.log(forecast);
  return (
    <div className="container">
      <div style={{ paddingBottom: "10px", display: "inline-flex" }}>
        <img
          src={Icon}
          alt="logo"
          style={{
            marginRight: "10px",
            height: "50px",
            width: "50px",
            display: "flex",
            paddingTop: "5px",
          }}
        />
        <h1 className="h1">WEATHER APP</h1>
      </div>
      <Search onSearchData={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
