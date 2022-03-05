import React, {createContext, useEffect, useState} from "react";
import { getProducts } from "../api/product";
import { Product } from "../types/product";

const defaultProduct = {
    id: 1,
    name: 'default',
    img_name: 'none',
    availability: false,
    custom: false,
    day_special: false,
    price: 0.00
};

export const ReduxContext = React.createContext<Product | any>(defaultProduct);

export const ReduxProvider = (props:any) => {
    const [product, setProducts] = useState([defaultProduct]);


    useEffect(() => {
        getProducts().then((res) => setProducts(res.data.product));        
    },[])


    return (
        <ReduxContext.Provider value={{ product }}>
            {props.children}
        </ReduxContext.Provider>
    )
}