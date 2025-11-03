import React, { useState } from "react";

export default function Results({ centers, cityName }) {
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("");

  const handleBookClick = (center) => {
    setSelectedCenter(center);
  };

  const handleDateChange = (e) => setSelectedDate(e.target.value);
  const handleTimeChange = (e) => setSelectedTime(e.target.value);

  return (
    <section>
      {/* Main results header for Cypress */}
      <h1>
        {centers.length} medical centers available in {cityName}
      </h1>

      {/* List of centers */}
      <div className="results">
        {centers.map((c, idx) => (
          <div
            key={idx}
            className="card"
            onClick={() => handleBookClick(c)}
            style={{ cursor: "pointer" }}
          >
            <h3>{c["Hospital Name"]}</h3>
            <p>{c.Address}</p>
            <p>
              {c.City}, {c.State} - {c["ZIP Code"]}
            </p>
            <p>Rating: {c["Overall Rating"] || "N/A"}</p>
            <button className="book-btn">Book FREE Center Visit</button>
          </div>
        ))}
      </div>

      {/* Booking section */}
      {selectedCenter && (
        <div
          className="booking-section"
          style={{
            marginTop: "2rem",
            border: "1px solid #ccc",
            padding: "1rem",
          }}
        >
          <h1>Book Appointment</h1>
          <h3>{selectedCenter["Hospital Name"]}</h3>

          {/* Date selector */}
          <label>
            Date:
            <select value={selectedDate} onChange={handleDateChange}>
              <option>Today</option>
              <option>Tomorrow</option>
              <option>Day After Tomorrow</option>
            </select>
          </label>

          {/* Time selector */}
          <label style={{ marginLeft: "1rem" }}>
            Time:
            <select value={selectedTime} onChange={handleTimeChange}>
              <option value="">Select Time</option>
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
            </select>
          </label>

          <button style={{ display: "block", marginTop: "1rem" }}>
            Confirm Booking
          </button>
        </div>
      )}
    </section>
  );
}
