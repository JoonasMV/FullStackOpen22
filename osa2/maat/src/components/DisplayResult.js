import Country from "./Country"


const DisplayResult = ({ countries, handleShowCountry }) => {
    //console.log(countries)
    if(countries.length > 10) {
        return(
            <div>
                Too many matches, specify more
            </div>
        )
    } else if (countries.length == 0) {
        return(
            <div>
                No matches
            </div>
        )
    } else {
        return (
            <div>
                {countries.map((country, index) => 
                <div key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => handleShowCountry(index)}>Show</button>
                </div>
                )}
            </div>
        )
    }
}

export default DisplayResult