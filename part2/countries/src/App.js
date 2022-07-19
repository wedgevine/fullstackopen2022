import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Countries = ({ countries, selectedCountry, handleClick }) => {
    console.log('countries', countries)

    let country = {}
    if (countries.length == 1) {
        country = countries[0]
    }

    //console.log('country', country)

    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (countries.length > 1) {
        console.log('selected country ', selectedCountry)
        return (
            <>
                {
                    countries.map((country, index) =>
                        <CountrySummary key={index} index={index} country={country} handleClick={handleClick} />
                    )
                }
                <CountryDetail country={selectedCountry} />
            </>

        )
    } else {
        return (
            <CountryDetail country={country} />
        )
    }
}

const App = () => {
    let filteredCountries = []
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState({})

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                //console.log('loaded', response.data)
                setCountries(response.data)
            })
    }, [])

    filteredCountries = countries.filter(
        (country) => country.name.common.toLowerCase().includes(search.toLowerCase())
    )

    const handleSearch = (event) => {
        const searchText = event.target.value.trim()
        if (searchText != search) {
            setSearch(event.target.value.trim())
            setSelectedCountry({})
        }
    }

    const handleClick = (event) => {
        setSelectedCountry(filteredCountries[parseInt(event.target.value)])
    }

    return (
        <div>
            <Search search={search} handleSearch={handleSearch} />
            <Countries countries={filteredCountries} selectedCountry={selectedCountry} handleClick={handleClick}/>
        </div>
    )
}

export default App
