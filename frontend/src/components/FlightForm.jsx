import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';

function FlightForm({ onSubmit }) {
  const [flightDetails, setFlightDetails] = useState({
    airline: '',
    flightNumber: '',
    departureAirport: '',
    arrivalAirport: '',
    departureDate: '',
    returnDate: ''
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightDetails({
      ...flightDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await onSubmit(flightDetails);
      setMessage({ type: 'success', text: 'Flight details saved successfully!' });
      setFlightDetails({
        airline: '',
        flightNumber: '',
        departureAirport: '',
        arrivalAirport: '',
        departureDate: '',
        returnDate: ''
      }); // Optionally reset form on success
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error saving flight details. Please try again.' });
    }
  };

  const handleReset = () => {
    setFlightDetails({
      airline: '',
      flightNumber: '',
      departureAirport: '',
      arrivalAirport: '',
      departureDate: '',
      returnDate: ''
    });
    setMessage(null);
  };

  return (
    <Container>
      {message && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formAirline">
          <Form.Label>Airline</Form.Label>
          <Form.Control type="text" name="airline" value={flightDetails.airline} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formFlightNumber">
          <Form.Label>Flight Number</Form.Label>
          <Form.Control type="text" name="flightNumber" value={flightDetails.flightNumber} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="formDepartureAirport">
          <Form.Label>Departure Airport</Form.Label>
          <Form.Control type="text" name="departureAirport" value={flightDetails.departureAirport} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formArrivalAirport">
          <Form.Label>Arrival Airport</Form.Label>
          <Form.Control type="text" name="arrivalAirport" value={flightDetails.arrivalAirport} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formDepartureDate">
          <Form.Label>Departure Date</Form.Label>
          <Form.Control type="date" name="departureDate" value={flightDetails.departureDate} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formReturnDate">
          <Form.Label>Return Date</Form.Label>
          <Form.Control type="date" name="returnDate" value={flightDetails.returnDate} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">Save</Button>
        <Button variant="secondary" onClick={handleReset}>Reset</Button>
      </Form>
    </Container>
  );
}

export default FlightForm;

