
// API to get all countries and their capitals
export const countries_capital_api_url = 'https://countriesnow.space/api/v0.1/countries/capital';

export const countries_capital_api_options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

export const weather_api_url = "https://api.openweathermap.org/data/2.5";
export const weather_api_key = "cb100a8f8cb85266ae1d68ec60f27304";

// Geo API to convert city name to coordinates
export const geo_api_url = "https://api.openweathermap.org/geo/1.0/direct";

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
