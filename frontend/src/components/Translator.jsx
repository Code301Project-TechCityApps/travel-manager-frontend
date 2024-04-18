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
                         <Button variant="primary" onClick={handleOpenModal}
                          style={{
                            marginLeft: '30%'
                        }}
                         >Choose Language
                     </Button>
                     </Form.Group>
                    
                     <Button variant="success" type="submit" 
                          style={{
                            marginLeft: '37%'
                        }}
                       >

                         Translate
                     </Button>
                 </Form>
                 <TranslationModal
                    show={showModal}
                    onHide={handleCloseModal}
                    onSelectLanguage={handleSelectLanguage}
                    languages={languages} // Pass your language data here
                />
           
            <Card.Title className="translation-title">Translation:</Card.Title>
            <Form.Label>Selected Language: {languageName}</Form.Label>
                <Card.Text className="translated-box" >
                {translations.translatedText ? (
                    <strong>{translations.translatedText}</strong>
                ) : (
                    <em>Your translated text will appear here...</em>
                )}
                </Card.Text>
             </Card.Body>
         </Card>
    );
}
export default Translator;

