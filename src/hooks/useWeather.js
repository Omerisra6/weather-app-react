import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useWeather(city)  
{
  const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast'
  const API_KEY  = process.env.REACT_APP_WEATHER_KEY

  const [ loading, setLoading ] = useState( false )
  const [ error, setError ]     = useState( true )
  const [ found, setFound ]     = useState( false )  
  const [ weather, setWeather ] = useState( null )   


  useEffect(() =>  {
    setWeather( null ) ;

    let cancel
    setLoading(true )

    axios( {
      method: 'GET',
      url: baseUrl,    
      params: { q:city , appid:API_KEY }, 
      cancelToken: new axios.CancelToken( c => cancel = c )  
    })
    .then( res =>  {

      setWeather( res )
      setFound( true )
      setError( false )
    })
    .catch( ( error ) => {

      setFound( false )

      if( !! error.response  )
      {
        return 
      }

      setError(true )
    })
    .finally( () =>  {

      setLoading( false ) ;
    } ); 

    return () => cancel( )

  }, [ city ] )


  return { weather, loading, error, found }
}
