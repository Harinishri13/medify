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

  // Fetch states on mount
  useEffect(() => {
    const getStates = async () => {
      const res = await fetchStates();
      setStates(res);
    };
    getStates();
  }, []);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (!stateName) return;
    const getCities = async () => {
      const res = await fetchCities(stateName);
      setCities(res);
    };
    getCities();
  }, [stateName]);

  // Close dropdowns when clicking outside
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

  // Handle form submission
  const handleSearch = async () => {
    if (!stateName || !cityName) return;
    const results = await fetchCenters(stateName, cityName);
    onResults(results);
  };

  return (
    <div className="search-form">
      {/* State Dropdown */}
      <div className="dropdown" ref={stateRef}>
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
                  onClick={() => {
                    setStateName(s);
                    setShowStateDropdown(false);
                    setCityName(""); // reset city when state changes
                  }}
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
      <div className="dropdown" ref={cityRef}>
        <input
          type="text"
          placeholder="Select City"
          value={cityName}
          readOnly
          className="dropdown-input"
          onClick={() => setShowCityDropdown(!showCityDropdown)}
          disabled={!stateName} // disable until a state is selected
        />
        {showCityDropdown && (
          <ul className="dropdown-list">
            {cities.length === 0 ? (
              <li>Loading...</li>
            ) : (
              cities.map((c) => (
                <li
                  key={c}
                  onClick={() => {
                    setCityName(c);
                    setShowCityDropdown(false);
                  }}
                  className={cityName === c ? "selected" : ""}
                >
                  {c}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
}
