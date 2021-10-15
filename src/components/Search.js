import React , { useState } from 'react'

const Search = () => {

    const [term, setTerm] = useState('');

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
