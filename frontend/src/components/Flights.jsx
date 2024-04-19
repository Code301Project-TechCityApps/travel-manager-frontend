import axios from 'axios';
import React from 'react';
import FlightForm from './FlightForm';

// Set the API URL to your server endpoint where flight details are submitted
const API_URL = 'http://localhost:3000/api/flightDetails'; // Adjust if necessary

export const submitFlightDetails = async (flightDetails) => {
  try {
    // Make a POST request to the server with flight details
    const response = await axios.post(API_URL, flightDetails);
    return response.data;
  } catch (error) {
    console.error('Failed to submit flight details:', error);
    throw error;
  }
};

function Flights() {
  // Render the FlightForm and pass the submitFlightDetails function as a prop
  return (

    <div>
        <h1>Flight Itinerary</h1>
      <FlightForm onSubmit={submitFlightDetails} />
    </div>
  );
}

export default Flights;
