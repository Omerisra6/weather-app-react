import React from 'react'
import Hour from './Hour'


export default function CityWeather( { weather } ) {
    weather = weather.data
    return (
        <div className={`${weather.list[0].weather[0].main} city-container`}>
            <div className="details-container">
                <div className="city-current">

                    <div className="city-details">

                        <h1 className="city-name">{ weather.city.name}, {weather.city.country}</h1>

                        <div className="city-time">
                            <h2 className="city-hour">{GetTimeByZone(weather.city.timezone)}</h2>
                        </div>

                        <div className="main-current-temp">{ToC(weather.list[0].main.temp ) }</div>
                        
                        
                        <div className="current-feeling">{ weather.list[0].weather[0].main}</div>
                        
                        
                    </div>
                </div>

                <div className="hours-container">
                    {weather.list.slice(0, 8).map(( hour, index) => {
                        return Hour(hour)

                    })}
                </div>
            </div>
        </div>
    )
}

function ToC( kelvin ) { return ( Math.round( kelvin - 273.15)+ '\xB0C' ) }

function GetTimeByZone( offset ) {

    var d = new Date();

    var utc = d.getTime() + ( d.getTimezoneOffset() * 60000 );

    var nd = new Date( utc + ( 3600000*offset ) );

    return nd.toLocaleString().substring(12,17)
}