import React, { useEffect, useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("bookings");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setBookings(Array.isArray(parsed) ? parsed : []);
      } catch {
        setBookings([]);
      }
    }
  }, []);

  const getValue = (obj, ...possibleKeys) => {
    for (const key of possibleKeys) {
      if (obj[key] !== undefined) return obj[key];
    }
    return "";
  };

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((b, i) => (
            <div key={i} className="booking-card">
              <h3>
                {getValue(b, "Hospital Name", "hospitalName", "centerName")}
              </h3>
              <p>
                {getValue(b, "City", "city")}, {getValue(b, "State", "state")}
              </p>
              <p>Type: {getValue(b, "Hospital Type", "type")}</p>
              <p>Rating: {getValue(b, "Hospital overall rating", "rating")}</p>
              <p>Date: {getValue(b, "bookingDate", "date")}</p>
              <p>Time: {getValue(b, "bookingTime", "time")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
