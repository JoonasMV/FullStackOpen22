import React, { useState, useEffect } from "react"
import axios from "axios"

import Countries from "./modules/Countries"

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filter, setFilter] = useState("")
  
  const handleFilter = (e) => {
    const search = e.target.value
    setFilter(search)
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(search)))
  }

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilter} />
      </div>
      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App
