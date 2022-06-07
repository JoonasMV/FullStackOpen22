import React, { useState, useEffect } from "react";
import axios from 'axios'
import Search from "./components/Search";
import DisplayResult from "./components/DisplayResult";
import Country from "./components/Country";

const api_key = process.env.REACT_APP_API_KEY

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [showCountry, setShowCountry] = useState([])
  const [weather, setWeather] = useState([])

  // gets countries from RESTcountries file
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  // returns nothing until city chosen
  let city = "https://api.openweathermap.org/geo/1.0/direct?q=.&limit=5&appid="+api_key
  if(showCountry.length !== 0) {
    city = "https://api.openweathermap.org/data/2.5/weather?lat="+showCountry.latlng[0]+"&lon="+showCountry.latlng[1]+"&appid="+api_key+"&units=metric"
    //console.log(city)
  } 
      
  const cityWeather = () => {
  }
  // weather data
  useEffect(() => {
    axios
      .get(city)
      .then(response => {
        setWeather(response.data)
      })
    }, [city])


  // handles search term
  const handleSearch = (event) => {
    setShowCountry("")

    // filters countries
    setFilteredCountries(
      countries.filter(country => country.name.common.toLowerCase().includes(event.target.value))
    )
  }

  const handleShowCountry = (index) => {
    let displayedCountry  = [filteredCountries[index]]
    setShowCountry(displayedCountry[0])
    cityWeather()
  }

  
  return (
    <div>
      <Search handleSearch={handleSearch}/>

      <DisplayResult countries={filteredCountries} handleShowCountry={handleShowCountry} />
      <Country country={showCountry} weather={weather}/>
      </div>
  );
}

export default App;
