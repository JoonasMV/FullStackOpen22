import { useState } from "react"
import Country from "./Country"
import Weather from "./Weather"

const Details = ({ country }) => {
  const [show, setShow] = useState(false)

  return(
    <div>
      <button onClick={() => setShow(!show)}>hide</button>
      {show && 
      <div>
        <Country country={country} />
        <Weather 
        lat={country.capitalInfo.latlng[0]} 
        lon={country.capitalInfo.latlng[1]}
        city={country.capital} />
      </div>
      }
    </div>
  )
}

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  if (countries.length === 1) return <Country country={countries[0]} />

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <Details country={country} />
        </div>
      ))}
    </div>
  )
}

export default Countries