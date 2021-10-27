import React, { useState } from 'react';
import Dropdown from './dropdown';
import Convert from './Convert';

const options= [
    {
        label: 'Afrikaans',
        value: 'af'
    },
    {
        label: 'Arabic',
        value: 'ar'
    },
    {
        label: 'Hindi',
        value: 'hi'
    }
]

const Translate = () => {
    const [language, setLanguage] = useState("")
    const [text, setText] = useState('');
    const APIauthKey = "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM";
    return (
        <div>
            <input type="text" onClick={(e) => setText(e.target.value)}/>
            <Dropdown 
                label="select a language"
                options={options}
                selected={options[0]} 
                onSelectedChange={setLanguage}
            />
            <hr />
            <h3 className="ui header"> Output</h3>
            <Convert text={text} language={language}/>
        </div>
    )
}
export default Translate;