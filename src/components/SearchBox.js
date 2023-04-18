import React from 'react'

export default function SearchBox( {children} ) {
    return (

        <div className="search-box">
            {children}
            <i className="fa fa-search"></i>
        </div>
           
    )
}
