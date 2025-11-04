import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  const [cityName, setCityName] = useState("");

  const handleSearchResults = (data, city) => {
    setCenters(data);
    setCityName(city);
  };

  const openBookingModal = (center) => setSelectedCenter(center);
  const closeBookingModal = () => setSelectedCenter(null);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchForm onResults={handleSearchResults} />
                {centers.length > 0 && (
                  <Results
                    centers={centers}
                    cityName={cityName}
                    onBookClick={openBookingModal}
                  />
                )}
                {selectedCenter && (
                  <BookingModal
                    center={selectedCenter}
                    onClose={closeBookingModal}
                  />
                )}
              </>
            }
          />
          <Route path="/bookings" element={<MyBookings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
