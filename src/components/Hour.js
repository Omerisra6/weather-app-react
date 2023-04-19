import React from 'react'
import { toC } from './CityWeather'

export default function Hour( { hourWeather }) 
{
    const hourTemp = toC( hourWeather.main.temp )
    const iconName = getIconName( hourWeather.weather[0].main )
    const hourTime = hourWeather.dt_txt.substring( 11,16 ) 
    const hourDate = formatDate( hourWeather.dt_txt.substring( 0,10 ) )
    
    return (
        <div className="hour-container">
            <div className="top-hour">
                <h2 className="hour-temp">{ hourTemp }</h2>

                <h2 className="hour-feeling"><i className={ `fa fa-${ iconName }` }></i></h2>
            </div>

            <div className="hour">
                <h2 >{ hourTime }</h2>
                <h2 className="date">{ hourDate }</h2>
            </div>
            
        </div>
    )
}

function getIconName( condition ) 
{
    const iconMap = {
        'Rain': 'cloud-rain',
        'Clouds': 'cloud',
        'Snow': 'snowflake',
        'Clear': 'sun'
    }

    return iconMap[ condition ]
}

function formatDate( date ) 
{   
   
    const fullDate  = new Date ( date )
    const monthName = fullDate.toLocaleString( 'default', { month: 'long' } );
    const day       = fullDate.getDate()

    return `${ day } ${ monthName } `
}