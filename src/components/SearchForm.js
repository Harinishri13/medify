import React, { useEffect, useState } from "react";
import { fetchStates, fetchCities, fetchCenters } from "./api";

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
        <select
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
          required
        >
          <option value="">Select state</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div id="city" className="field">
        <label>City</label>
        <select
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          required
        >
          <option value="">Select city</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <button type="submit" id="searchBtn">
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}
