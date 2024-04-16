import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';

const API_KEY = import.meta.env.VITE_LOCATION_API_KEY;

function Currency() {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [conversionResult, setConversionResult] = useState(null);
    const [latestRates, setLatestRates] = useState({});
    const [error, setError] = useState('');

    // Function to convert currency
    const handleConvert = async () => {
        try {
            const url = `https://api.currencybeacon.com/v1/convert?api_key=${API_KEY}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
            const response = await fetch(url);
            if (!response.ok) {
                const errorText = await response.text();  // Attempt to read the response as text
                throw new Error('Failed to convert currency: ' + errorText);
            }
            const data = await response.json();
            setConversionResult(data);  // Update the state with the conversion result
            console.log({data});  // Log the result to the console for debugging
        } catch (err) {
            console.error('Error converting currency:', err);
            setError(err.message);  // Update the state with the error message
            console.log(err.message);  // Log the error message to the console for debugging
        }
    };

    // Function to get the latest rates
    const handleFetchRates = async (base = '', symbols = '') => {
        try {
            const response = await fetch(`https://api.currencybeacon.com/v1/latest?api_key=${API_KEY}&base=${base}&symbols=${symbols}`);
            if (!response.ok) {
                const errorText = await response.text(); // Getting the error message from the response body
                throw new Error('Failed to fetch rates: ' + errorText);
            }
            const data = await response.json();
            setLatestRates(data.rates);
        } catch (err) {
            console.error('Error fetching rates:', err);
            setError(err.message);
        }
    };
    console.log({latestRates});

    return (
        <Container>
            <Row>
                <Col>
                    <h2>Currency Converter</h2>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                From
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control list="country" as="input" value={fromCurrency} onChange={e => setFromCurrency(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                To
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control list="country" as="input" value={toCurrency} onChange={e => setToCurrency(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Amount
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <datalist id="country">
                                <option value={"USD"} /> 
                                <option value={"CAD"} /> 
                        </datalist>
                        <Button onClick={handleConvert}>Convert</Button>
                    </Form>
                    {conversionResult && <Alert variant="success">Conversion Result: {conversionResult.value}</Alert>}
                </Col>
                <Col>
                    <h2>Latest Rates</h2>
                    <Button onClick={() => handleFetchRates(fromCurrency, toCurrency)}>Fetch Rates</Button>
                    {Object.keys(latestRates).length > 0 && (
                        <ul>
                            {Object.entries(latestRates).map(([key, value]) => (
                                <li key={key}>{key}: {value}</li>
                            ))}
                        </ul>
                    )}
                </Col>
            </Row>
            {error && <Alert variant="danger">{error}</Alert>}
        </Container>
    );
}

export default Currency;
