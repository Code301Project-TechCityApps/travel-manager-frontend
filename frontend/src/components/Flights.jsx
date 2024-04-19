import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import FlightForm from './FlightForm';

// Set the API URL to your server endpoint where flight details are submitted
const API_URL = import.meta.env.VITE_SERVER_URL;

function Flights() {
    const [flights, setFlights] = useState([]);
    const [lastSubmitted, setLastSubmitted] = useState(null);

    // Fetch all flights
    const fetchFlights = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/flightDetails`);
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
            const response = await axios.post(`${API_URL}/api/flightDetails`, flightDetails);
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
            <Table striped bordered hover> {/* Use react-bootstrap Table component */}
                <thead>
                    <tr>
                        <th>Airline</th>
                        <th>Flight Number</th>
                        <th>Departure Airport</th>
                        <th>Arrival Airport</th>
                        <th>Departure Date</th>
                        <th>Return Date</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight) => (
                        <tr key={flight._id}> {/* Use _id which is more unique */}
                            <td>{flight.airline}</td>
                            <td>{flight.flightNumber}</td>
                            <td>{flight.departureAirport}</td>
                            <td>{flight.arrivalAirport}</td>
                            <td>{flight.departureDate}</td>
                            <td>{flight.returnDate}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Flights;
