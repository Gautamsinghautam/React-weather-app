import "./current-weather.css";

const currentWeather = () => {
    return (
        <>
        <div className="weather">
            <div className="top">
                <div>
                <p className="city">Belgrade</p>
                <p className="weather-description">Sunny</p>
                </div>
                <img alt="weather" className="weather-icon" src="https://openweathermap.org/img/wn/01d.png" />
            </div>
            
        </div>
        </>
    )
}

export default currentWeather;