import { useEffect, useState } from "react"
import axios from "axios"

const WEATHER_API = process.env.REACT_APP_WEATHER_API

const Weather = ({ lat, lon, city }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
  axios
    .get(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API}`)
    .then(response => setWeather(response.data))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
if (Object.keys(weather).length === 0) return <div>Loading weather data...</div>

  return (
    <div>
      {console.log(weather.current.wind_speed)}
      <h2>Weather in {city}</h2>
      <div>temperature {weather.current.temp} Celcius</div>
      <img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt={city}/>
      <div>wind {weather.current.wind_speed} m/s</div>
      <br /><br />
    </div>
  )
}

export default Weather