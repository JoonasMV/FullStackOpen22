import Weather from "./Weather"

const Country = ({ country, weather }) => {    
    if (country.length === 0 || weather.length === 0) {
        return (
            <div>
                
            </div>
            )
        } else {
            const languages = Object.values(country.languages)
            return (
                <div>
                    <div id={country.name.common}>
                        <h2>{country.name.common}</h2>
                            <div>Capital: {country.capital}</div>
                            <div>Area: {country.area}</div>

                        <h3>Languages</h3>
                            <ul>
                                {languages.map(language =>
                                    <li key={language}>{language}</li>)}
                            </ul>
                        <h3>Flag</h3>
                            <div>{<img src={country.flags.png}></img>}</div>
                    </div>
                    <Weather weather={weather} city={country.capital} />
                </div>
            )
    }
}

export default Country