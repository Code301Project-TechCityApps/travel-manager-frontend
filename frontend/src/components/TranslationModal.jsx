import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function TranslationModal({ show, onHide, onSelectLanguage, languages }) {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredLanguages = languages.filter(lang =>
        lang.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChangeLanguage = (e) => {
        setSelectedLanguage(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleConfirm = () => {
        onSelectLanguage(selectedLanguage);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Select Language</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="languageSelect">
                    <Form.Label>Select Language:</Form.Label>
                    <Form.Control as="select" value={selectedLanguage} onChange={handleChangeLanguage}>
                        <option value="">Choose...</option>
                        {filteredLanguages.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.language}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TranslationModal;
