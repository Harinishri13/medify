import React from "react";

export default function Results({ centers, cityName, onBookClick }) {
  return (
    <section>
      <h1>
        {centers.length} medical centers available in {cityName}
      </h1>
      <div className="results">
        {centers.map((c, idx) => (
          <div key={idx} className="card">
            <h3>{c["Hospital Name"]}</h3>
            <p>{c.Address}</p>
            <p>
              {c.City}, {c.State} - {c["ZIP Code"]}
            </p>
            <p>Rating: {c["Overall Rating"] || "N/A"}</p>
            <button className="book-btn" onClick={() => onBookClick(c)}>
              Book FREE Center Visit
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
