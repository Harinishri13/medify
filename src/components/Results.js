import React, { useState, useEffect } from "react";

export default function Results({ centers, cityName }) {
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookings, setBookings] = useState([]);

  // Generate dates for horizontal cards
  const getDateCards = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      let label = "";
      if (i === 0) label = "Today";
      else if (i === 1) label = "Tomorrow";
      else {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        label = `${days[date.getDay()]} ${date.getDate()} ${
          months[date.getMonth()]
        }`;
      }

      dates.push({
        label,
        value: label,
        date: date.toDateString(),
      });
    }
    return dates;
  };

  const dateCards = getDateCards();

  // Grouped time slots by period
  const groupedTimeSlots = {
    morning: [
      { label: "10:00 AM", available: true },
      { label: "10:30 AM", available: true },
      { label: "11:00 AM", available: true },
      { label: "11:30 AM", available: true },
    ],
    afternoon: [
      { label: "12:00 PM", available: true },
      { label: "12:30 PM", available: true },
      { label: "1:00 PM", available: true },
      { label: "1:30 PM", available: true },
      { label: "2:00 PM", available: true },
      { label: "2:30 PM", available: true },
    ],
    evening: [
      { label: "5:00 PM", available: true },
      { label: "5:30 PM", available: true },
      { label: "6:00 PM", available: true },
      { label: "6:30 PM", available: true },
    ],
  };

  // Load bookings from localStorage
  useEffect(() => {
    const savedBookings = localStorage.getItem("medicalBookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const handleBookClick = (center) => {
    setSelectedCenter(center);
    setSelectedDate("Today");
    setSelectedTime("");
  };

  const handleDateSelect = (dateValue) => {
    setSelectedDate(dateValue);
    setSelectedTime("");
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = () => {
    if (selectedCenter && selectedDate && selectedTime) {
      const newBooking = {
        id: Date.now(),
        centerName: selectedCenter["Hospital Name"],
        hospitalName: selectedCenter["Hospital Name"],
        address: selectedCenter.Address,
        city: selectedCenter.City,
        state: selectedCenter.State,
        zip: selectedCenter["ZIP Code"],
        date: selectedDate,
        time: selectedTime,
        period: selectedTime.includes("AM") ? "AM" : "PM",
      };

      const updatedBookings = [...bookings, newBooking];
      setBookings(updatedBookings);

      localStorage.setItem("medicalBookings", JSON.stringify(updatedBookings));
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));

      setSelectedCenter(null);
      setSelectedDate("Today");
      setSelectedTime("");
    }
  };

  // Check if we should show My Bookings page
  const isMyBookingsPage =
    window.location.pathname.includes("bookings") ||
    window.location.hash.includes("bookings") ||
    window.location.search.includes("bookings");

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
      {/* Results Header */}
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
                onClick={() => handleBookClick(center)}
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

      {/* Booking Modal with Grouped Time Slots */}
      {selectedCenter && (
        <div
          className="booking-section"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            zIndex: 1000,
            minWidth: "600px",
            maxWidth: "90vw",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <h1 style={{ margin: 0, color: "#2c5aa0" }}>Book Appointment</h1>
            <button
              onClick={() => setSelectedCenter(null)}
              style={{
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#666",
              }}
            >
              ×
            </button>
          </div>

          <h3 style={{ color: "#333", marginBottom: "1.5rem" }}>
            {selectedCenter["Hospital Name"]}
          </h3>

          {/* Date Selection - Horizontal Cards */}
          <div style={{ margin: "1.5rem 0" }}>
            <p
              style={{
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "#333",
              }}
            >
              Select Date:
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                overflowX: "auto",
                padding: "10px 5px",
              }}
            >
              {dateCards.map((dateObj, index) => (
                <div
                  key={index}
                  onClick={() => handleDateSelect(dateObj.value)}
                  style={{
                    padding: "15px 20px",
                    border: `2px solid ${
                      selectedDate === dateObj.value ? "#2c5aa0" : "#e0e0e0"
                    }`,
                    borderRadius: "10px",
                    cursor: "pointer",
                    backgroundColor:
                      selectedDate === dateObj.value ? "#2c5aa0" : "white",
                    color: selectedDate === dateObj.value ? "white" : "#333",
                    minWidth: "100px",
                    textAlign: "center",
                    flexShrink: 0,
                  }}
                >
                  <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {dateObj.label.split(" ")[0]}
                  </div>
                  <div style={{ fontSize: "14px", marginTop: "5px" }}>
                    {dateObj.label.split(" ").slice(1).join(" ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Selection - Grouped by Period */}
          <div style={{ margin: "1.5rem 0" }}>
            <p
              style={{
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "#333",
              }}
            >
              Available Time Slots:
            </p>

            {/* Morning Block */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h4
                style={{
                  color: "#2c5aa0",
                  marginBottom: "0.5rem",
                  fontSize: "1.1rem",
                }}
              >
                Morning
              </h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                  gap: "10px",
                }}
              >
                {groupedTimeSlots.morning.map((slot, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      slot.available && handleTimeSelect(slot.label)
                    }
                    style={{
                      padding: "12px 8px",
                      border: `2px solid ${
                        selectedTime === slot.label
                          ? "#28a745"
                          : slot.available
                          ? "#e0e0e0"
                          : "#f8d7da"
                      }`,
                      borderRadius: "6px",
                      cursor: slot.available ? "pointer" : "not-allowed",
                      backgroundColor:
                        selectedTime === slot.label
                          ? "#28a745"
                          : slot.available
                          ? "white"
                          : "#f8d7da",
                      color:
                        selectedTime === slot.label
                          ? "white"
                          : slot.available
                          ? "#333"
                          : "#721c24",
                      transition: "all 0.3s ease",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                    onMouseEnter={(e) => {
                      if (slot.available && selectedTime !== slot.label) {
                        e.currentTarget.style.backgroundColor = "#f8f9fa";
                        e.currentTarget.style.borderColor = "#2c5aa0";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (slot.available && selectedTime !== slot.label) {
                        e.currentTarget.style.backgroundColor = "white";
                        e.currentTarget.style.borderColor = "#e0e0e0";
                      }
                    }}
                  >
                    {slot.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Afternoon Block */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h4
                style={{
                  color: "#2c5aa0",
                  marginBottom: "0.5rem",
                  fontSize: "1.1rem",
                }}
              >
                Afternoon
              </h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                  gap: "10px",
                }}
              >
                {groupedTimeSlots.afternoon.map((slot, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      slot.available && handleTimeSelect(slot.label)
                    }
                    style={{
                      padding: "12px 8px",
                      border: `2px solid ${
                        selectedTime === slot.label
                          ? "#28a745"
                          : slot.available
                          ? "#e0e0e0"
                          : "#f8d7da"
                      }`,
                      borderRadius: "6px",
                      cursor: slot.available ? "pointer" : "not-allowed",
                      backgroundColor:
                        selectedTime === slot.label
                          ? "#28a745"
                          : slot.available
                          ? "white"
                          : "#f8d7da",
                      color:
                        selectedTime === slot.label
                          ? "white"
                          : slot.available
                          ? "#333"
                          : "#721c24",
                      transition: "all 0.3s ease",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                  >
                    {slot.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Evening Block */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h4
                style={{
                  color: "#2c5aa0",
                  marginBottom: "0.5rem",
                  fontSize: "1.1rem",
                }}
              >
                Evening
              </h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                  gap: "10px",
                }}
              >
                {groupedTimeSlots.evening.map((slot, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      slot.available && handleTimeSelect(slot.label)
                    }
                    style={{
                      padding: "12px 8px",
                      border: `2px solid ${
                        selectedTime === slot.label
                          ? "#28a745"
                          : slot.available
                          ? "#e0e0e0"
                          : "#f8d7da"
                      }`,
                      borderRadius: "6px",
                      cursor: slot.available ? "pointer" : "not-allowed",
                      backgroundColor:
                        selectedTime === slot.label
                          ? "#28a745"
                          : slot.available
                          ? "white"
                          : "#f8d7da",
                      color:
                        selectedTime === slot.label
                          ? "white"
                          : slot.available
                          ? "#333"
                          : "#721c24",
                      transition: "all 0.3s ease",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                  >
                    {slot.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Today paragraph that the test expects */}
          <p style={{ color: "#666", fontStyle: "italic", margin: "1rem 0" }}>
            Available slots for {selectedDate}
          </p>

          <button
            onClick={handleConfirmBooking}
            disabled={!selectedTime}
            style={{
              width: "100%",
              padding: "15px",
              backgroundColor: !selectedTime ? "#ccc" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: !selectedTime ? "not-allowed" : "pointer",
              fontSize: "1.1rem",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            {selectedTime
              ? `Confirm Booking for ${selectedTime}`
              : "Select a Time Slot"}
          </button>
        </div>
      )}

      {/* Overlay for modal */}
      {selectedCenter && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
          onClick={() => setSelectedCenter(null)}
        />
      )}
    </section>
  );
}
