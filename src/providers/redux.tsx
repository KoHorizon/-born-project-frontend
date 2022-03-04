import React, {createContext, useEffect, useState} from "react";

interface Product {
    id: number,
    name: string,
    img_name: string,
    availability: boolean,
    custom: boolean,
    price: number
}



export const ReduxContext = createContext< object | null>(null);

export const ReduxProvider = (props:any) => {
    const [products, setProducts] = useState({});


    useEffect(() => {
        
    })


    return (
        <ReduxContext.Provider value={{ products}}>
            {props.children}
        </ReduxContext.Provider>
    )
}