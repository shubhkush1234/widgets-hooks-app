import React , { useState , useEffect} from 'react'
import axios from 'axios';

const Search = () => {

    const [term, setTerm] = useState('programming');
    const [results, setResults] = useState([]);

    console.log(results, "results");
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
            setResults(data.query.search);
        }
        if(term){ // to avoid empty term search request
            search(); 
        }
    }, [term]);

    const renderResults = results.map((result, index) => {
        return(
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a className="ui button" 
                       href={`https://en.wikipedia.org?curid=${result.pageid}`}
                    >Go
                    </a>
                </div>
                <div className="item content">
                    <div className="header">
                    {result.title}
                    </div>
                    <div className="">
                        <span dangerouslySetInnerHTML={{__html: result.snippet }}></span>
                    
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="ui form">
            <div className="field">
                <label>Search</label>
                <input type="text"  
                       value={term}
                       onChange={event => setTerm(event.target.value)}/>
            </div>
            <div className="ui celled list">{renderResults}</div>
        </div>
    )
}
export default Search;
