import React from 'react'
import Hour from './Hour'


export default function CityWeather( { weather } ) 
{
    weather = weather.data
    const { name, country, timezone } = weather.city
    const time                        = getHourByTimeZone( timezone ) 
    const temp                        = toC( weather.list[ 0 ].main.temp ) 
    const feeling                     = weather.list[ 0 ].weather[ 0 ].main

    return (
        <div className="city-container">
            <div className="details-container">
                <div className="city-current">

                    <div className="city-details">

                        <h1 className="city-name">{ name }, { country }</h1>

                        <div className="city-time">
                            <h2 className="city-hour">{ time }</h2>
                        </div>

                        <div className="main-current-temp">{ temp }</div>
                        
                        
                        <div className="current-feeling">{ feeling }</div>
                        
                        
                    </div>
                </div>

                <div className="hours-container">
                    { weather.list.slice( 0, 8 ).map( ( hourWeather, index ) => {

                        return <Hour hourWeather={ hourWeather } key={ index }/>
                    }) }
                </div>
            </div>
        </div>
    )
}

export function toC( kelvin ) { return ( Math.round( kelvin - 273.15)+ '\xB0C' ) }

function getHourByTimeZone( timezoneOffset ) 
{
    const currentTime          = Date.now();
    const timezoneOffsetMillis = timezoneOffset * 1000;
    const timezoneTime         = currentTime + timezoneOffsetMillis;

    const timezoneDate   = new Date( timezoneTime );
    const hours          = timezoneDate.getHours();
    const minutes        = timezoneDate.getMinutes()
    const minutesDisplay = minutes > 9 ? minutes : '0' + minutes;

    return hours + ':' + minutesDisplay;
}