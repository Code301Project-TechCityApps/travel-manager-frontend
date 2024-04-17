import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import CurrencyModal from './CurrencyModal';
import currencies from '../assets/currencies.json'; 

const API_KEY = import.meta.env.VITE_LOCATION_API_KEY;

function Currency() {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [conversionResult, setConversionResult] = useState(null);
    const [latestRates, setLatestRates] = useState({});
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [activeField, setActiveField] = useState('from'); 

    const handleCurrencySelect = (currencyCode) => {
        if (activeField === 'from') {
            setFromCurrency(currencyCode);
        } else {
            setToCurrency(currencyCode);
        }
        setShowModal(false); 
    };

    // Function to convert currency
    const handleConvert = async () => {
        if (!fromCurrency || !toCurrency || isNaN(amount) || amount <= 0) {
            setError('Please ensure all fields are correctly filled and the amount is greater than zero.');
            return;
        }
    
        try {
            const url = `https://api.currencybeacon.com/v1/convert?api_key=${API_KEY}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
            const response = await fetch(url);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('Failed to convert currency: ' + errorText);
            }
            const data = await response.json();
            console.log("API response data:", data);  // Keep this log to confirm the structure in future
    
            // Accessing the 'value' from 'response' object in the API response
            const conversionValue = data.response.value; // This assumes 'value' is correctly formatted as a number
            if (typeof conversionValue !== 'number') {
                console.error('Unexpected result type:', conversionValue);
                throw new Error('Conversion result is not a number.');
            }
    
            const formattedResult = Number(conversionValue).toFixed(2);
            const currencySymbol = currencies.find(c => c.code === toCurrency)?.symbol || '';
            setConversionResult({
                value: formattedResult,
                symbol: currencySymbol
            });
        } catch (err) {
            console.error('Error converting currency:', err);
            setError(err.message);
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
                                <Form.Control 
                                  as="input" 
                                  value={fromCurrency}
                                  readOnly
                                  onClick={() => { setActiveField('from'); setShowModal(true); }}
                                />
                                <Button onClick={() => { setActiveField('from'); setShowModal(true); }}>Select Currency</Button>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                To
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control 
                                  as="input" 
                                  value={toCurrency} 
                                  readOnly
                                  onClick={() => { setActiveField('to'); setShowModal(true); }}
                                />
                                <Button onClick={() => { setActiveField('to'); setShowModal(true); }}>Select Currency</Button>
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
                        <Button onClick={handleConvert}>Convert</Button>
                    </Form>
                    {conversionResult && (
                    <Alert variant="success">
                        Conversion Result: {conversionResult.symbol}{conversionResult.value}
                    </Alert>)}
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
            <CurrencyModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onSelectCurrency={handleCurrencySelect}
                currencies={currencies}
            />
        </Container>
    );
}

export default Currency;