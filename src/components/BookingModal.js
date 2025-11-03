import React, { useEffect, useState } from "react";

function saveBooking(booking) {
  const key = "bookings";
  const raw = localStorage.getItem(key);
  const arr = raw ? JSON.parse(raw) : [];
  arr.push(booking);
  localStorage.setItem(key, JSON.stringify(arr));
}

export default function BookingModal({ center, onClose }) {
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const maxDateObj = new Date();
  maxDateObj.setDate(today.getDate() + 7);
  const maxDate = maxDateObj.toISOString().split("T")[0];

  const [date, setDate] = useState(minDate);
  const [slot, setSlot] = useState("09:00");
  const [period, setPeriod] = useState("Today");

  useEffect(() => {
    const d = new Date(date);
    setPeriod(d.toDateString() === today.toDateString() ? "Today" : "Morning");
  }, [date, today]);

  const slots = ["09:00", "10:00", "11:00", "13:00", "15:00", "17:00"];

  const handleConfirm = () => {
    saveBooking({
      centerName: center["Hospital Name"],
      address: center.Address,
      city: center.City,
      state: center.State,
      zip: center["ZIP Code"],
      date,
      time: slot,
      period,
    });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          ×
        </button>
        <h2>Book at {center["Hospital Name"]}</h2>
        <div className="booking-grid">
          <div className="calendar">
            <label>Select Date</label>
            <input
              type="date"
              min={minDate}
              max={maxDate}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="times">
            <p>{period}</p>
            <label>Choose Time</label>
            <div className="slot-list">
              {slots.map((s) => (
                <button
                  key={s}
                  className={"slot " + (s === slot ? "active" : "")}
                  onClick={() => setSlot(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="actions">
          <button onClick={handleConfirm}>Confirm Booking</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
