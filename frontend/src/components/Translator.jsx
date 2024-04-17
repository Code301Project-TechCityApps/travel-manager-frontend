import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TranslationModal from './TranslationModal'; 
import languagesData from '../assets/language.json';

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
        <div>
            <h2>Translate Text</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='text'>Text:</label>
                <input type="text" id="text" value={text} onChange={handleChangeText} />
                <button type='button' onClick={handleOpenModal}>
                    Choose a language
                    (
                        {
                          languageName
                        }
                       
                        )
                </button>
                <button type='submit'>Translate</button>
            </form>
            <TranslationModal
                show={showModal}
                onHide={handleCloseModal}
                onSelectLanguage={handleSelectLanguage}
                languages={languages} // Pass your language data here
            />
            <div>
                <h3>Translations</h3>
                <ul>
                        <li>
                            <strong>{translations.translatedText}</strong>
                        </li>
                </ul>
            </div>
        </div>
    );
}

export default Translator;
