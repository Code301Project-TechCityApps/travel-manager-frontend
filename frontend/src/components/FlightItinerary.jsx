import React, { useState } from 'react';
import axios from 'axios';

const FlightDetailsForm = () => {
  const [airline, setAirline] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send flight details to backend
      await axios.post('/api/submit-flight-details', {
        airline,
        flightNumber,
        departureAirport,
        arrivalAirport,
        departureDate,
        returnDate
      });
      // Set submitted to true to switch to display mode
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting flight details:', error);
    }
  };

  const handleEdit = () => {
    // Set submitted to false to switch back to edit mode
    setSubmitted(false);
  };

  const handleSave = () => {
    // Logic to save edited flight details
    // For simplicity, we'll just set submitted to true here
    setSubmitted(true);
  };

  return (
    <div>
      <h2>Flight Details Form</h2>
      {submitted ? (
        <div>
          <p><strong>Airline:</strong> {airline}</p>
          <p><strong>Flight Number:</strong> {flightNumber}</p>
          <p><strong>Departure Airport:</strong> {departureAirport}</p>
          <p><strong>Arrival Airport:</strong> {arrivalAirport}</p>
          <p><strong>Departure Date:</strong> {departureDate}</p>
          <p><strong>Return Date:</strong> {returnDate}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="airline">Airline:</label>
            <input
              type="text"
              id="airline"
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="flightNumber">Flight Number:</label>
            <input
              type="text"
              id="flightNumber"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="departureAirport">Departure Airport:</label>
            <input
              type="text"
              id="departureAirport"
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="arrivalAirport">Arrival Airport:</label>
            <input
              type="text"
              id="arrivalAirport"
              value={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="departureDate">Departure Date:</label>
            <input
              type="date"
              id="departureDate"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="returnDate">Return Date:</label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      {!submitted && (
        <button onClick={handleSave}>Save</button>
      )}
    </div>
  );
};

export default FlightDetailsForm;