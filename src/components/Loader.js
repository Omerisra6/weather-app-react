import React from 'react'

export default function Loader( { className } ) 
{
    return ( 
        <div className={`lds-hourglass ${className}`}></div>    
    )
}
