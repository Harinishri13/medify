import React, { useEffect, useState } from "react";
import { fetchStates, fetchCities, fetchCenters } from "../utils/api";

export default function SearchForm({ onResults }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStates()
      .then(setStates)
      .catch(() => setStates([]));
  }, []);

  useEffect(() => {
    if (!stateName) return setCities([]);
    fetchCities(stateName)
      .then(setCities)
      .catch(() => setCities([]));
  }, [stateName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stateName || !cityName) return;
    setLoading(true);
    const data = await fetchCenters(stateName, cityName);
    setLoading(false);
    onResults(data || [], cityName.toLowerCase());
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div id="state" className="field">
        <label>State</label>
        <ul>
          {states.length === 0 ? (
            <li>Loading...</li>
          ) : (
            states.map((s) => (
              <li
                key={s}
                onClick={() => setStateName(s)}
                style={{ cursor: "pointer", listStyle: "none", padding: "3px" }}
              >
                {s}
              </li>
            ))
          )}
        </ul>
      </div>

      <div id="city" className="field">
        <label>City</label>
        <ul>
          {cities.length === 0 ? (
            <li>Loading...</li>
          ) : (
            cities.map((c) => (
              <li
                key={c}
                onClick={() => setCityName(c)}
                style={{ cursor: "pointer", listStyle: "none", padding: "3px" }}
              >
                {c}
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="field">
        <button type="submit" id="searchBtn">
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}
