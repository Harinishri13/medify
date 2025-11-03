import React, { useEffect, useState, useRef } from "react";
import { fetchStates, fetchCities, fetchCenters } from "./api";

export default function SearchForm({ onResults }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const stateRef = useRef();
  const cityRef = useRef();

  useEffect(() => {
    const getStates = async () => {
      const res = await fetchStates();
      setStates(res);
    };
    getStates();
  }, []);

  useEffect(() => {
    if (!stateName) {
      setCities([]); // Clear cities when state is cleared
      return;
    }
    const getCities = async () => {
      const res = await fetchCities(stateName);
      setCities(res);
    };
    getCities();
  }, [stateName]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stateRef.current && !stateRef.current.contains(event.target)) {
        setShowStateDropdown(false);
      }
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setShowCityDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async () => {
    if (!stateName || !cityName) return;
    const results = await fetchCenters(stateName, cityName);
    onResults(results, cityName); // Pass cityName to onResults
  };

  const handleStateSelect = (state) => {
    setStateName(state);
    setCityName(""); // Reset city name when state changes
    setShowStateDropdown(false);
    setCities([]); // Clear cities list
  };

  const handleCitySelect = (city) => {
    setCityName(city);
    setShowCityDropdown(false);
  };

  return (
    <div className="search-form">
      {/* State Dropdown */}
      <div className="dropdown" id="state" ref={stateRef}>
        <input
          type="text"
          placeholder="Select State"
          value={stateName}
          readOnly
          className="dropdown-input"
          onClick={() => setShowStateDropdown(!showStateDropdown)}
        />
        {showStateDropdown && (
          <ul className="dropdown-list">
            {states.length === 0 ? (
              <li>Loading...</li>
            ) : (
              states.map((s) => (
                <li
                  key={s}
                  onClick={() => handleStateSelect(s)}
                  className={stateName === s ? "selected" : ""}
                >
                  {s}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {/* City Dropdown */}
      <div className="dropdown" id="city" ref={cityRef}>
        <input
          type="text"
          placeholder="Select City"
          value={cityName}
          readOnly
          className="dropdown-input"
          onClick={() => stateName && setShowCityDropdown(!showCityDropdown)}
          disabled={!stateName}
        />
        {showCityDropdown && (
          <ul className="dropdown-list">
            {cities.length === 0 ? (
              <li>Loading...</li>
            ) : (
              cities.map((c) => (
                <li
                  key={c}
                  onClick={() => handleCitySelect(c)}
                  className={cityName === c ? "selected" : ""}
                >
                  {c}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      <button
        onClick={handleSearch}
        id="searchBtn"
        className="search-button"
        disabled={!stateName || !cityName}
      >
        Search
      </button>
    </div>
  );
}
