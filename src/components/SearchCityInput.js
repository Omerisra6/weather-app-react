import debounce from 'lodash.debounce';
import React from 'react'

export default function SearchCityInput( { setCity } ) 
{
  const debouncedSearchCity = debounce( ( e ) =>{

    if ( ! e.target.value ) 
    {
      return
    }

    setCity( e.target.value ) 
  }, 1000 )
  
  return (

    <input type="text" className="search-city" placeholder="Type a city..." onChange={ debouncedSearchCity }/>
  )
}
