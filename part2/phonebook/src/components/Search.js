import React from 'react'

const Search = ({searchName, onChange}) => {
    return (
        <div>
            filter shown with
            <input value={searchName} onChange={onChange} />
        </div>
    )
}

export default Search
