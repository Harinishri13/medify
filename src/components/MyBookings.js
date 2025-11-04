import React, { useState } from "react";

export default function MyBookings() {
  // Initialize state directly from localStorage
  const getInitialBookings = () => {
    const medical = localStorage.getItem("medicalBookings");
    const regular = localStorage.getItem("bookings");
    const data = medical || regular;
    try {
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const [bookings, setBookings] = useState(getInitialBookings);

  return (
    <div className="bookings-page" style={{ padding: "2rem" }}>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((b, idx) => (
            <div
              key={b.id || idx}
              className="booking-card"
              style={{
                border: "1px solid #ddd",
                padding: "1.5rem",
                margin: "1rem 0",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{b.hospitalName || b.centerName || b["Hospital Name"]}</h3>
              <p>{b.address}</p>
              <p>
                {b.city}, {b.state} - {b.zip}
              </p>
              <p>
                <strong>Date:</strong> {b.date || b.bookingDate} |{" "}
                <strong>Time:</strong> {b.time || b.bookingTime}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
