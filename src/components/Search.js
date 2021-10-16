import React , { useState , useEffect} from 'react'
import axios from 'axios';

const Search = () => {

    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);


    console.log("I run every re rendr")
    useEffect(() => {
        const search = async () => {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php',
                {
                    params: {
                        action: 'query',
                        list: 'search',
                        origin: '*',
                        format:'json',
                        srsearch: term
                    }
                }
            );
            setResults(data);
        }
        if(term){ // to avoid empty term search request
            search(); 
        }
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
