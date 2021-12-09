import React from 'react'

export default function Input( props ) {
    return (

        <input type="text" className="search-city" placeholder="Type a city..." onChange={props.onChange}/>
           
    )
}
