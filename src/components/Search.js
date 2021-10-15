import React , { useState , useEffect} from 'react'
import axios from 'axios';

const Search = () => {

    const [term, setTerm] = useState('');
    console.log("I run every re rendr")
    useEffect(() => {
        console.log("I only run on term change");
    }, [term])

    return (
        <div className="ui form">
            <div className="field">
                <label>Search</label>
                <input type="text"  
                       value={term}
                       onChange={event => setTerm(event.target.value)}/>
            </div>
        </div>
    )
}
export default Search;
