import { useState, useEffect } from 'react'
import axios from 'axios'

/*
import Search from './components/Search'
import AddPerson from './components/AddPerson'
import Persons from './components/Persons'
*/

const Search = ({ search, handleSearch }) => {
    return (
        <div>
            find countries
            <input
                value={search}
                onChange={handleSearch}
            />
        </div>
    )
}

const CountrySummary = ({index, country, handleClick}) => {
    return (
        <p>
            {country.name.common}
            <button value={index} onClick={handleClick}>show</button>
        </p>
    )
}

const CountryDetail = ({country}) => {
    //console.log('country', country)
    if (Object.keys(country).length == 0) {
        return (<></>)
    }
    return (
        <div>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>languages</h3>
            <ol>
            {
                Object.entries(country.languages).map(([key, value]) => {
                    return (
                        <li key={value}>{value}</li>
                    )
                })
            }
            </ol>
            <img src={country.flags['png']} />
        </div>
    )
}

const Countries = ({ countries, handleClick }) => {
    //console.log('countries', countries)
    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else {
        return (
            <>
                {
                    countries.map((country, index) =>
                        <CountrySummary key={country.name.common} index={index} country={country} handleClick={handleClick} />
                    )
                }
            </>
        )
    }
}

const App = () => {
    let filteredCountries = []
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [showCountry, setShowCountry] = useState({})

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log('loaded', response.data)
                setCountries(response.data)
            })
    }, [])

    filteredCountries = countries.filter(
        (country) => country.name.common.toLowerCase().includes(search.toLowerCase())
    )

    const handleSearch = (event) => {
        setSearch(event.target.value.trim())
    }

    const handleClick = (event) => {
        //console.log('click button ', event.target.value)
        setShowCountry(filteredCountries[parseInt(event.target.value)])
    }

    return (
        <div>
            <Search search={search} handleSearch={handleSearch} />
            <Countries countries={filteredCountries} handleClick={handleClick} />
            <CountryDetail country={showCountry} />
        </div>
    )
}

export default App
