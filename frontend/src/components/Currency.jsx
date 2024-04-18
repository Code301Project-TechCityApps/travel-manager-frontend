import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import CurrencyModal from './CurrencyModal';
import currencies from '../assets/currencies.json';
import '../css/currency.css'

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

    const openModal = (field) => {
        setActiveField(field);
        setShowModal(true);
    };

    return (
        <Container>
            <Row className="title-row">
                <Col>
                    <h2>Currency Converter</h2>
                    <Form>
                        <Form.Group as={Row} controlId="fromCurrency">
                            <Form.Label column sm={3}>From</Form.Label>
                            <Col sm={9}>
                                <Form.Control as="input" value={fromCurrency} readOnly onClick={() => openModal('from')} aria-label="From currency"/>
                                <Button variant="outline-primary" onClick={() => openModal('from')}>Select</Button>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="toCurrency">
                            <Form.Label column sm={3}>To</Form.Label>
                            <Col sm={9}>
                                <Form.Control as="input" value={toCurrency} readOnly onClick={() => openModal('to')} aria-label="To currency"/>
                                <Button variant="outline-primary" onClick={() => openModal('to')}>Select</Button>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="amount">
                            <Form.Label column sm={3}>Amount</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="number" value={amount} onChange={e => setAmount(e.target.value)} aria-label="Amount to convert"/>
                            </Col>
                        </Form.Group>
                        <div className="button-group">
                            <Button variant="success" onClick={handleConvert}>Convert</Button>
                        </div>
                    </Form>
                    {conversionResult && (
                        <Alert variant="success">
                            Conversion Result: {conversionResult.symbol}{conversionResult.value}
                        </Alert>
                    )}
                </Col>
            </Row>
            <Row className="rates-row">
                <Col>
                    <h2>Latest Rates</h2>
                    <div className="button-group">
                        <Button variant="primary" onClick={() => handleFetchRates(false)}>Fetch Top 5 Rates</Button>
                        <Button variant="secondary" onClick={() => {
                            setShowAllRates(!showAllRates);
                            handleFetchRates(!showAllRates);
                        }}>
                            {showAllRates ? 'Show Less' : 'Show All'}
                        </Button>
                    </div>
                    {Object.keys(latestRates).length > 0 && (
                        <div className="rates-list">
                            <ul>
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
