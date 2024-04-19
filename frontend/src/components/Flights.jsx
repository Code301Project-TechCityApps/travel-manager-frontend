import axios from 'axios';
import React, { useState, useEffect } from 'react';
import FlightForm from './FlightForm';

// Set the API URL to your server endpoint where flight details are submitted
const API_URL = 'http://localhost:3000/api/flightDetails'; // Adjust if necessary

function Flights() {
    const [flights, setFlights] = useState([]);
    const [lastSubmitted, setLastSubmitted] = useState(null);

    // Fetch all flights
    const fetchFlights = async () => {
        try {
            const response = await axios.get(API_URL);
            setFlights(response.data);
            // Optionally set lastSubmitted to the last in the fetched list if it makes sense for your app
            if (response.data.length > 0) {
                setLastSubmitted(response.data[response.data.length - 1]);
            }
        } catch (error) {
            console.error('Failed to fetch flights:', error);
        }
    };

    // Re-fetch flights after a new submission
    const submitFlightDetails = async (flightDetails) => {
        try {
            const response = await axios.post(API_URL, flightDetails);
            fetchFlights();  // Refresh the list of flights after posting
            setLastSubmitted(flightDetails);  // Update lastSubmitted to reflect the newly submitted details
            return response.data;
        } catch (error) {
            console.error('Failed to submit flight details:', error);
            throw error;
        }
    };

    // Initial fetch of flights
    useEffect(() => {
        fetchFlights();
    }, []);

    return (
        <div>
            <h1>Flight Itinerary</h1>
            <FlightForm onSubmit={submitFlightDetails} initialFlightDetails={lastSubmitted} />
            <h2>Saved Flights</h2>
            {flights.map((flight) => (
                <div key={flight._id}> {/* Use _id which is more unique */}
                    Airline: {flight.airline}, Flight Number: {flight.flightNumber}, Departure: {flight.departureAirport}, Arrival: {flight.arrivalAirport}, Departure Date: {flight.departureDate}, Return Date: {flight.returnDate}
                </div>
            ))}
        </div>
    );
}

export default Flights;
