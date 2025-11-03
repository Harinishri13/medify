const BASE = "https://meddata-backend.onrender.com";

export async function fetchStates() {
  try {
    const res = await fetch(BASE + "/states");
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export async function fetchCities(state) {
  try {
    const res = await fetch(BASE + "/cities/" + encodeURIComponent(state));
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export async function fetchCenters(state, city) {
  try {
    const res = await fetch(
      `${BASE}/data?state=${encodeURIComponent(
        state
      )}&city=${encodeURIComponent(city)}`
    );
    const data = (await res.ok) ? await res.json() : [];
    return data.map((item) => ({
      "Hospital Name": item["Hospital Name"] || item.name || "Unknown",
      Address: item.Address || item.address || "",
      City: item.City || item.city || city,
      State: item.State || item.state || state,
      "ZIP Code": item["ZIP Code"] || item.zip || "",
      "Overall Rating": item["Overall Rating"] || item.rating || "",
    }));
  } catch {
    return [];
  }
}
