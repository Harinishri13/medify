import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Try multiple possible storage keys
    const medicalBookings = localStorage.getItem("medicalBookings");
    const regularBookings = localStorage.getItem("bookings");

    const savedBookings = medicalBookings || regularBookings;
    setBookings(savedBookings ? JSON.parse(savedBookings) : []);
  }, []);

  return (
    <div className="bookings-page">
      <h1>My Bookings</h1>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      <div className="bookings-list">
        {bookings.map((b, idx) => (
          <div className="booking-card" key={idx}>
            <h3>{b.centerName || b.hospitalName}</h3>
            <p>{b.address}</p>
            <p>
              {b.city}, {b.state} - {b.zip}
            </p>
            <p>
              Date: {b.date} <strong>Time:</strong> {b.time} ({b.period})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
