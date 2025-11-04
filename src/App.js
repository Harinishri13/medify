import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/navbar";
import SearchForm from "./components/SearchForm";
import Results from "./components/Results";
import BookingModal from "./components/BookingModal";
import MyBookings from "./components/MyBookings";

function App() {
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [showBookings, setShowBookings] = useState(false);
  const [cityName, setCityName] = useState("");

  const handleSearchResults = (data, city) => {
    setCenters(data);
    setCityName(city);
    setShowBookings(false);
  };

  const openBookingModal = (center) => setSelectedCenter(center);
  const closeBookingModal = () => setSelectedCenter(null);

  const toggleMyBookings = () => setShowBookings((prev) => !prev);

  return (
    <div className="App">
      <Navbar onMyBookingsClick={toggleMyBookings} />
      <Header />
      {!showBookings && (
        <>
          <SearchForm onResults={handleSearchResults} />
          {centers.length > 0 && (
            <Results
              centers={centers}
              cityName={cityName}
              onBookClick={openBookingModal}
            />
          )}
        </>
      )}
      {showBookings && <MyBookings />}
      {selectedCenter && (
        <BookingModal center={selectedCenter} onClose={closeBookingModal} />
      )}
    </div>
  );
}

export default App;
