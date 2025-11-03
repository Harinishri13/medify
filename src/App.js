import React, { useState, useEffect } from "react";

export default function Results({ centers, cityName, onBookClick }) {
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage
  useEffect(() => {
    const savedBookings = localStorage.getItem("medicalBookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  // If we're on My Bookings page, show bookings
  const isMyBookingsPage =
    window.location.pathname.includes("bookings") ||
    window.location.hash.includes("bookings");

  if (isMyBookingsPage) {
    const savedBookings = JSON.parse(
      localStorage.getItem("medicalBookings") || "[]"
    );
    return (
      <div className="bookings-page" style={{ padding: "2rem" }}>
        <h1>My Bookings</h1>
        {savedBookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <div className="bookings-list">
            {savedBookings.map((booking, idx) => (
              <div
                key={booking.id || idx}
                className="booking-card"
                style={{
                  border: "1px solid #ddd",
                  padding: "1.5rem",
                  margin: "1rem 0",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <h3>{booking.hospitalName || booking.centerName}</h3>
                <p>{booking.address}</p>
                <p>
                  {booking.city}, {booking.state} - {booking.zip}
                </p>
                <p>
                  <strong>Date:</strong> {booking.date} | <strong>Time:</strong>{" "}
                  {booking.time}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <section style={{ padding: "2rem" }}>
      {/* Results Header - cityName will now be properly passed from App */}
      <h1 style={{ marginBottom: "2rem", color: "#333" }}>
        {centers ? centers.length : 0} medical centers available in{" "}
        {cityName ? cityName.toLowerCase() : ""}
      </h1>

      {/* List of medical centers */}
      <div className="results">
        {centers && centers.length > 0 ? (
          centers.map((center, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                border: "1px solid #ddd",
                padding: "1.5rem",
                margin: "1rem 0",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3 style={{ color: "#2c5aa0", marginBottom: "0.5rem" }}>
                {center["Hospital Name"]}
              </h3>
              <p style={{ margin: "0.25rem 0", color: "#666" }}>
                {center.Address}
              </p>
              <p style={{ margin: "0.25rem 0", color: "#666" }}>
                {center.City}, {center.State} - {center["ZIP Code"]}
              </p>
              <p style={{ margin: "0.5rem 0", fontWeight: "bold" }}>
                Rating: {center["Overall Rating"] || "N/A"}
              </p>
              <button
                className="book-btn"
                onClick={() => onBookClick(center)} // Use the prop from App
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#2c5aa0",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  marginTop: "1rem",
                }}
              >
                Book FREE Center Visit
              </button>
            </div>
          ))
        ) : (
          <p>No medical centers found.</p>
        )}
      </div>
    </section>
  );
}
