import { useState } from 'react'
import axios from 'axios';
const API = import.meta.env.VITE_SERVER_URL;

function Translator() {

    const [text, setText] = useState ('');
    const [toLang, setToLang] = useState([]);
    const [translations, setTranslations] = useState([]);

    const handleChangeText = (e) => {
        setText(e.target.value);
    };

    const handleChangeTargetLang = (e) => {
        const selectedLanguages = Array.from(e.target.selectedOptions, option => option.value); 
        setToLang(selectedLanguages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API}/api/translate/translate?text=${text}&toLang=${toLang}`)
            console.log('response.data ', response.data);
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
            <label htmlFor='targetLang'>Target Languages</label>
            <select id='targetLang' multiple value={toLang} onChange={handleChangeTargetLang}>
                <option value='fr'>French</option>
                <option value='es'>Spanish</option>
                <option value='de'>German</option>
            </select>
            <button type='submit'>Translate</button>
        </form>
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