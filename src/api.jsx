
// This file is for testing API calls. It is not used in the actual app.

export const geo_api_url = 'https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,unicodeFlag,dialCode';

export const geo_api_options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};