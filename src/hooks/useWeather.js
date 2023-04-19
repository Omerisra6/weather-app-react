import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useWeather(city)  
{
  const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast'
  const apiKey  = 'e798e1207b7e3305818eb08037d97fcb'

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
      params: { q:city , appid:apiKey }, 
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
