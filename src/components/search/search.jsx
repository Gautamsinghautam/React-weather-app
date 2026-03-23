import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geo_api_url, geo_api_options } from "../../api";

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        // Filter countries by input value from the response
        return fetch(geo_api_url, geo_api_options)
            .then(response => response.json())
            .then(response => {
                console.log("API Response:", response);
                // Filter countries based on user input
                const filtered = response.data.filter(country =>
                    country.name.toLowerCase().includes(inputValue.toLowerCase())
                );
                return {
                    options: filtered.map((countryInfo) => {
                        return {
                            value: countryInfo.name,
                            label: `${countryInfo.name} ${countryInfo.unicodeFlag || ''}`,
                        };
                    })
                };
            })
            .catch(error => console.error("Error fetching country info:", error));
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
}

export default Search;