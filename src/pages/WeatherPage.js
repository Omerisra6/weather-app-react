import { useState} from 'react';
import useWeather from '../hooks/useWeather';
import CityWeather from '../components/CityWeather';
import NotFound from '../components/NotFound';
import Error from '../components/Error';
import Loader from '../components/Loader';
import SearchBox from '../components/SearchBox';
import SearchCityInput from '../components/SearchCityInput';

export function WeatherPage() 
{
  const [ city, setCity ]                  = useState( 'jerusalem' )
  const { weather, loading, error, found } = useWeather( city )
  const classNames                         = getClassNames( loading, error, found, weather )
  
  return (
    <div className={ classNames }>
      
      <div className="weather-page-top"> 
        <SearchBox><SearchCityInput setCity={ setCity }/></SearchBox> 
      </div>
      
      
      { weather && <CityWeather weather={ weather } /> }
      { loading && <Loader/> } 

      
      { ! found && ! loading && ! error && <NotFound>Couldn't find "{ city }"</NotFound> }

      { error && ! loading && <Error>the connection to the server have been lost</Error> }

    </div>
  );
}

const getClassNames = ( loading, error, found, weather ) => {

  const weatherStatus = weather ? weather.data.list[ 0 ].weather[ 0 ].main.toLowerCase() : ''

  const classesDisplay =
  {
    [ weatherStatus ]: true,
    'city-page': true,
    'not-found': ! found && ! loading && ! error,
    'loading': loading,
    'error': error && ! loading
  }

  return getTrueKeys( classesDisplay ).join( ' ' );
}

const getTrueKeys = ( obj ) => {

  return Object.entries( obj )
  .filter( ( [ _, boolean ] ) => boolean )
  .map( ( [ key, _ ] ) => key ) 
}