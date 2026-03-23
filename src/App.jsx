import { useState } from 'react'
import './App.css'
import { Theme } from "@radix-ui/themes";
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { weather_api_key, weather_api_url, geo_api_url } from './api';
import Forecast from './components/forecast/forecast';


function App() {
  const [count, setCount] = useState(0)
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  
  const handleOnSearchChange = (searchData) => {
    // First, get coordinates from the capital city name
    const geoFetch = fetch(`${geo_api_url}?q=${searchData.capital}&limit=1&appid=${weather_api_key}`);
    
    geoFetch
      .then(response => response.json())
      .then(geoData => {
        if (geoData.length === 0) {
          console.log("Could not find coordinates for capital:", searchData.capital);
          return;
        }
        
        const { lat, lon } = geoData[0];

        const currentWeatherFetch = fetch(`${weather_api_url}/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}`);
        const forecastFetch = fetch(`${weather_api_url}/forecast?lat=${lat}&lon=${lon}&appid=${weather_api_key}`);

        return Promise.all([currentWeatherFetch, forecastFetch])
          .then(async (response) => {
            const weatherResponse = await response[0].json();
            const forecastResponse = await response[1].json();
            setCurrentWeather({city: searchData.label, ...weatherResponse});
            setForecast({city: searchData.label, ...forecastResponse});
          });
      })
      .catch((err) => console.log(err));
  }
  console.log("Current Weather:", currentWeather);
  // console.log("Forecast:", forecast);

  return (
    <>
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
    </>
  )
}

export default App
