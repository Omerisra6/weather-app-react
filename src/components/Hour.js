import { stubString } from 'lodash'
import React from 'react'

export default function Hour(hourWeather) {
    return (
        <div className="hour-container">
            <div className="top-hour">
                <h2 className="hour-temp">{ToC(hourWeather.main.temp)}</h2>

                <h2 className="hour-feeling"><i className={`fa fa-${SetIconName(hourWeather.weather[0].main)}`}></i></h2>
            </div>

            <h2 className="hour">{hourWeather.dt_txt.substring(11,16)}</h2>
        </div>
    )
}

function ToC(kelvin) {return ( Math.round( kelvin - 273.15)+ '\xB0C.')}

function SetIconName(condition) {
    switch (condition) {
        case 'Rain':
            return 'cloud-rain'
            break;
 
         case 'Clouds':
         return 'cloud'
         break;
 
         case 'Snow':
             return 'snowflake'
             break;
 
        default:
            return 'sun'
            break;
    }
     
}