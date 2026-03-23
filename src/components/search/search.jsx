import { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { countries_capital_api_url, countries_capital_api_options } from "../../api";

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);
    const [countriesData, setCountriesData] = useState([]);

    // Fetch all countries and capitals once on component mount
    useEffect(() => {
        fetch(countries_capital_api_url, countries_capital_api_options)
            .then(response => response.json())
            .then(response => {
                console.log("All Countries and Capitals:", response);
                if (response.data) {
                    setCountriesData(response.data);
                }
            })
            .catch(error => console.error("Error fetching countries and capitals:", error));
    }, []);

    const loadOptions = (inputValue) => {
        // Filter countries locally by input value
        const filtered = countriesData.filter(country =>
            country.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        return Promise.resolve({
            options: filtered.map((countryInfo) => {
                return {
                    value: countryInfo.name,
                    label: `${countryInfo.name}`,
                    capital: countryInfo.capital
                };
            })
        });
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        console.log("Selected Country and Capital:", searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for country"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
}

export default Search;