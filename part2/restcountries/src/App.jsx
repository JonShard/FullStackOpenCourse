import { useState, useEffect } from 'react'
import axios from 'axios'

import countryService from './services/countries'

const SearchResult = ({ filtered, setSearchValue }) => {
  const onResultClick = (pickedCountry) => {
    setSearchValue(pickedCountry)
  }

  if (filtered.length == 0) return <p>No matches</p>
  if (filtered.length > 10) return <p>Too many matches, try making your search more specific.</p>
  if (filtered.length == 1) return // We're happy, nothing to do here
  return (
    <div>
      {filtered.map(c => <div>{c.name.common} <button onClick={() => onResultClick(c.name.common)}>Show</button></div>)}
    </div>
  )
}

const Search = ({ countries, searchValue, setSearchValue, filtered, setFiltered }) => {
  const onChange = (event) => {
    setSearchValue(event.target.value)
    console.log('searchValue', event.target.value)
  }

  useEffect(() => {
    setFiltered(countries.filter(c => c.name.common.toLowerCase().includes(searchValue.toLowerCase())))
    console.log(`filtered ${filtered.length}`)
    console.log(`countries ${countries.length}`)
  }, [searchValue])


  return (
    <div>
      Find countries
      <input onChange={onChange} value={searchValue} />
      <SearchResult filtered={filtered} setSearchValue={setSearchValue} />
    </div>
  )
}

const Country = ({ filtered }) => {
  if (filtered.length != 1) return

  const country = filtered[0]
  console.log('country', country)


  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.entries(country.languages).map(([code, name]) => (<li key={code}>{name}</li>))}
      </ul>
      <img
        src={country.flags.svg}
        alt={country.flags.alt || `Flag of ${country.name.common}`}
        style={{ width: '150px', border: '1px solid #eee' }}
      />    </div>
  )
}



const App = () => {
  const [searchValue, setSearchValue] = useState([])
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    countryService.getAll()
      .then(response => setCountries(response))
      .catch(error => console.log('Failed to search for countries:', error))
  }, [searchValue])

  return (
    <div>
      <Search countries={countries}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        filtered={filtered}
        setFiltered={setFiltered}
      />
      <Country filtered={filtered} />
    </div>
  )
}

export default App