import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';


export default function useWeather(city) {
    const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast'
    const apiKey  = 'e798e1207b7e3305818eb08037d97fcb'
    const [loading, setLoading] = useState(false)
    const [error, setError]     = useState(true)
    const [founded, setFounded] = useState(false) 
    const [weather, setWeather] = useState()  

   useEffect(() => {

    setWeather()
       
   }, [city])


   useEffect(() => {
      let cancel
      setLoading(true)

      axios({
        method: 'GET',
        url: baseUrl,    
        params: { q:city , appid:apiKey}, 
        cancelToken: new axios.CancelToken(c => cancel = c) 
      }).then(res => {

        setWeather(res)
        setLoading(false)
        setFounded(true)
        setError(false)

      }).catch( e =>{
        
        //if there is an error stop loading and send didnt found
        setLoading(false)
        setFounded(false)

        //ignore axios cancel error
        if(axios.isAxiosError(e)){
          return 
        }
        //if the error is not axios error set it to true
        setError(true)

    })
    return()=> cancel()

   }, [city])


   return {weather, loading, error, founded}
}
