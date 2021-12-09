import { useMemo } from "react";

const useClassName = ( classNames, deps = [] ) => {
    return useMemo( () => {
        return Object.entries( classNames ).reduce( ( carry, [ key, value ] ) => {
           if( !!value ) {
               carry.push( key )
           }

           return carry
        }, [] ).join( ' ' )
    }, deps )
}

export default useClassName
