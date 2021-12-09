import { useState, useEffect, useCallback } from 'react';
import useWeather from './useWeather';
import debounce from 'lodash.debounce';
import CityWeather from './CityWeather';
import useClassName from './hooks/use-class-name';
import NotFound from './NotFound';
import Error from './Error';
import Loader from './Loader';
import Input from './Input';
import SearchBox from './SearchBox';





function App() {

  const [city, setCity] = useState('london')

  const debouncedSearchCity = useCallback(
    debounce( ( e ) => setCity( e.target.value ), 500 )
  , [] );

  
  const { weather, loading, error, founded } = useWeather(city)

  const className = useClassName( {
    'app': true,
    'not-found': ! founded && ! loading && ! error,
    'loading': loading,
    'error': error && ! loading
  }, [ founded, loading, error ] );

  return (
    <div className={ className }>
      
      <SearchBox><Input onChange={debouncedSearchCity}/></SearchBox>
      
      { weather && <CityWeather weather={ weather } /> }
      {loading && <Loader/>} 

      
      { ! founded && ! loading && ! error && <NotFound>Couldn't find "{ city }"</NotFound> }

      { error && ! loading && <Error>the connection to the server have been lost</Error>}

    </div>
  );
}

export default App;
