import React, { useEffect } from 'react'
import { Product } from '../types/product';
const STYLE_TODAY_PRODUCT = {
    backgroundColor: 'black',
    marginTop: '10px',
    padding: '20px'
}
export default function ProductOfTheDay(props: any) {
    
    useEffect(() => {
        // console.table(props.available);
    },[])

    const addProductToBasketHandler = (dataToAdd:Product) => {
        console.log(dataToAdd);
    }


    return (
        
        <div style={STYLE_TODAY_PRODUCT}>
            <p>{props.available.id}</p>
            <button onClick={() => addProductToBasketHandler(props.available)}>Add this product to basked</button>
        </div>
    )
}
