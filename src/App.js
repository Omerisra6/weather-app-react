import { useState, useEffect, useCallback } from 'react';
import useWeather from './useWeather';
import debounce from 'lodash.debounce';
import CityWeather from './CityWeather';



function App() {

  const [city, setCity] = useState('london')

  const searchCity = (e => {

    setCity(e.target.value)

  })


  const debouncedSearchCity = useCallback(
    debounce( searchCity, 500)
  , []);

  
  const {weather, loading, error, founded} = useWeather(city)
  return (
    <div className={`app ${ ! founded && ! loading && ! error ? `not-found` : ''} ${loading && 'loading'} ${error && ! loading ? 'error' : ''}`}>
      <div className="search-box">
        <input type="text" className="search-city" placeholder="type a city..." onChange={debouncedSearchCity}/>
        <i className="fa fa-search"></i>
      </div>
      <div> {typeof weather !== 'undefined' ? CityWeather(weather) : null} </div>
      <div> {loading && <div class="lds-hourglass"></div>} </div>
      <div className="not-found-text"> { ! founded && ! loading && ! error ? `couldnt found  "${city}""` : null} </div>
      <div className="error-text"> {error && ! loading ? 'the connection to the server have been lost' : ''} </div>

    </div>
  );
}

export default App;
