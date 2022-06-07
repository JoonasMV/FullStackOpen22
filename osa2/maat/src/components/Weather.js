const Weather = ({ weather, city }) => {
    const weatherIcon = "http://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png"
    return (
        <div>
            <h3>Weather in {city}</h3>
            <div>temperature: {weather.main.temp} Celcius</div>
            <img src={weatherIcon} alt={city}></img>
            <div>Wind: {weather.wind.speed} m/s</div>
        </div>
    )
}

export default Weather