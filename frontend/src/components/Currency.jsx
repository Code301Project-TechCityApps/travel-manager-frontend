import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import CurrencyModal from './CurrencyModal';
import currencies from '../assets/currencies.json';

const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;

function Currency() {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [conversionResult, setConversionResult] = useState(null);
    const [latestRates, setLatestRates] = useState({});
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showAllRates, setShowAllRates] = useState(false);
    const [activeField, setActiveField] = useState('from');

    const handleCurrencySelect = (currencyCode) => {
        if (activeField === 'from') {
            setFromCurrency(currencyCode);
        } else {
            setToCurrency(currencyCode);
        }
        setShowModal(false);
        handleFetchRates();
    };

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
            const conversionValue = data.response.value;
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

    const handleFetchRates = async (showAll = false) => {
        const symbols = showAll ? '' : 'USD,EUR,JPY,GBP,CAD';
        const url = `https://api.currencybeacon.com/v1/latest?api_key=${API_KEY}&base=${fromCurrency}&symbols=${symbols}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch rates: ' + await response.text());
            }
            const data = await response.json();
            const formattedRates = Object.entries(data.rates).reduce((acc, [key, value]) => {
                acc[key] = Number(value).toFixed(2);
                return acc;
            }, {});

            setLatestRates(formattedRates);
        } catch (err) {
            console.error('Error fetching rates:', err);
            setError(err.message);
        }
    };

    return (
        <Container fluid="sm" className="p-3">
            <Row className="mb-4">
                <Col>
                    <h2 className="text-center">Currency Converter</h2>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="fromCurrency">
                            <Form.Label column sm={3}>From</Form.Label>
                            <Col sm={9} className="d-flex justify-content-center">
                                <Form.Control
                                    as="input"
                                    value={fromCurrency}
                                    readOnly
                                    onClick={() => setActiveField('from')}
                                    aria-label="From currency"
                                    className="w-75"
                                />
                                <Button variant="outline-primary" className="mt-2 ms-2" onClick={() => setShowModal(true)}>Select</Button>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="toCurrency">
                            <Form.Label column sm={3}>To</Form.Label>
                            <Col sm={9} className="d-flex justify-content-center">
                                <Form.Control
                                    as="input"
                                    value={toCurrency}
                                    readOnly
                                    onClick={() => setActiveField('to')}
                                    aria-label="To currency"
                                    className="w-75"
                                />
                                <Button variant="outline-primary" className="mt-2 ms-2" onClick={() => setShowModal(true)}>Select</Button>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="amount">
                            <Form.Label column sm={3}>Amount</Form.Label>
                            <Col sm={9} className="d-flex justify-content-center">
                                <Form.Control
                                    type="number"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    aria-label="Amount to convert"
                                    className="w-75"
                                />
                            </Col>
                        </Form.Group>
                        <div className="d-flex justify-content-center">
                            <Button variant="success" className="w-50" onClick={handleConvert}>Convert</Button>
                        </div>
                    </Form>
                    {conversionResult && (
                        <Alert variant="success" className="mt-3">
                            Conversion Result: {conversionResult.symbol}{conversionResult.value}
                        </Alert>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2 className="text-center mb-3">Latest Rates</h2>
                    <div className="d-flex justify-content-center mb-2">
                        <Button variant="primary" className="w-50" onClick={() => handleFetchRates(false)}>Fetch Top 5 Rates</Button>
                    </div>
                    <div className="d-flex justify-content-center mb-2">
                        <Button variant="secondary" className="w-50" onClick={() => {
                            setShowAllRates(!showAllRates);
                            handleFetchRates(!showAllRates);
                        }}>
                            {showAllRates ? 'Show Less' : 'Show All'}
                        </Button>
                    </div>
                    {Object.keys(latestRates).length > 0 && (
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <ul className="list-unstyled">
                                {Object.entries(latestRates).map(([key, value]) => (
                                    <li key={key}>{key}: {value}</li>
                                ))}
                            </ul>
                        </div>
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
