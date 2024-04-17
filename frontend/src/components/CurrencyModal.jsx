import React, { useState, useMemo } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';

function CurrencyModal({ show, onHide, onSelectCurrency, currencies }) {
    const [search, setSearch] = useState('');

    // Filter currencies based on user input, checking both name and code
    const filteredCurrencies = useMemo(() => {
        return currencies.filter(currency =>
            currency.code.toLowerCase().includes(search.toLowerCase()) ||
            currency.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, currencies]);

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Select a Currency</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    type="text"
                    placeholder="Search by name or code"
                    onChange={e => setSearch(e.target.value)}
                />
                <ListGroup>
                    {filteredCurrencies.map(currency => (
                        <ListGroup.Item
                            key={currency.code}
                            action
                            onClick={() => {
                                onSelectCurrency(currency.code);
                                onHide(); // Close modal after selection
                            }}
                        >
                            {currency.code} - {currency.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
}

export default CurrencyModal;
