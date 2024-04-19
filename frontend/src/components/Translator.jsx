import React, { useState, useEffect } from 'react';
import '../css/reset.css';
import axios from 'axios';
import TranslationModal from './TranslationModal';
import languagesData from '../assets/language.json';
import '../css/translator.css';
import { Card, Form, Button } from 'react-bootstrap';

const API = import.meta.env.VITE_SERVER_URL;

function Translator() {
    const [text, setText] = useState('');
    const [toLang, setToLang] = useState([]);
    const [translations, setTranslations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [languageName, setLanguageName] = useState("");

    useEffect(() => {
        setLanguages(languagesData);
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSelectLanguage = (selectedLanguage) => {
        setToLang([selectedLanguage]);
        setLanguageName(languages.filter(lang => lang.code === selectedLanguage)[0]?.language);
        handleCloseModal();
    };

    const handleChangeText = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API}/api/translate/translate?text=${text}&toLang=${toLang}`);
            setTranslations(response.data);
        } catch (error) {
            console.error('Translation Error:', error);
        }
    };

    return (
        <Card className="translator-card">
            <Card.Body>
                <Card.Title>Translate Text</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="text">
                        <Form.Control type="text" className="translated-box" value={text} onChange={handleChangeText} as="textarea" placeholder="Enter your text here..." />
                    </Form.Group>
                    <Button className="button-center" variant="primary" onClick={handleOpenModal}>
                        Choose Language
                    </Button>
                    <Button className="button-center" variant="success" type="submit">
                        Translate
                    </Button>
                </Form>
                <TranslationModal
                    show={showModal}
                    onHide={handleCloseModal}
                    onSelectLanguage={handleSelectLanguage}
                    languages={languages}
                />
                <Card.Title style={{ paddingTop: '20px' }}>Translation:</Card.Title>
                <Form.Label>Selected Language: {languageName}</Form.Label>
                <Card.Text className="translated-box">
                    {translations.translatedText ? (
                        <strong>{translations.translatedText}</strong>
                    ) : (<em>Your translated text will appear here...</em>)}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Translator;
