import {
    Root,
    Item,
    Header,
    Trigger,
    Content,
} from "@radix-ui/react-accordion";
import "./forecast.css";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


const Forecast = ({ data }) => {
    // Group forecast data by date and calculate min/max temps and other details
    const forecastsByDate = {};
    
    for (const item of data.list) {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        
        if (!forecastsByDate[date]) {
            forecastsByDate[date] = {
                temp_min: item.main.temp_min,
                temp_max: item.main.temp_max,
                humidity: item.main.humidity,
                pressure: item.main.pressure,
                feels_like: item.main.feels_like,
                wind_speed: item.wind.speed,
                cloudiness: item.clouds.all,
                weather: item.weather[0],
                dt: item.dt,
            };
        } else {
            // Update min and max for this date
            forecastsByDate[date].temp_min = Math.min(forecastsByDate[date].temp_min, item.main.temp_min);
            forecastsByDate[date].temp_max = Math.max(forecastsByDate[date].temp_max, item.main.temp_max);
            // Average humidity, pressure, wind speed and cloudiness
            forecastsByDate[date].humidity = Math.round((forecastsByDate[date].humidity + item.main.humidity) / 2);
            forecastsByDate[date].pressure = Math.round((forecastsByDate[date].pressure + item.main.pressure) / 2);
            forecastsByDate[date].wind_speed = Math.round((forecastsByDate[date].wind_speed + item.wind.speed) / 2 * 10) / 10;
            forecastsByDate[date].cloudiness = Math.round((forecastsByDate[date].cloudiness + item.clouds.all) / 2);
        }
    }
    
    // Get next 7 days
    const nextSevenDays = Object.values(forecastsByDate).slice(0, 7);

    // Get day names for each forecast entry
    const getDayName = (forecastDate) => {
        const date = new Date(forecastDate * 1000);
        return WEEK_DAYS[date.getDay()];
    };

    return (
        <>
            <label className="title">Next 6-Days Forecast</label>

            <div className="forecast-list">
                {nextSevenDays.map((item, index) => (
                    <div className="forecast-item" key={index}>
                        <img alt="weather" className="weather-icon" src={`https://openweathermap.org/img/wn/${item.weather.icon}.png`} />
                        <div className="forecast-info">
                            <label className="day">{getDayName(item.dt)}</label>
                            <label className="condition">{item.weather.main}</label>
                            <label className="min-max">{Math.round(item.temp_min - 273.15)}°C / {Math.round(item.temp_max - 273.15)}°C</label>
                        </div>
                        <div className="forecast-details">
                            <div className="detail-item">
                                <span className="detail-label">💧 Humidity</span>
                                <span className="detail-value">{item.humidity}%</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">🌪️ Wind</span>
                                <span className="detail-value">{item.wind_speed} m/s</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">🔽 Pressure</span>
                                <span className="detail-value">{item.pressure} hPa</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">☁️ Clouds</span>
                                <span className="detail-value">{item.cloudiness}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Forecast;