import React, { useContext, useEffect } from 'react';
import { getProducts } from '../api/product';
import { ReduxContext } from '../providers/redux';
import { Product } from '../types/product';

export default function MainPage() {


    const { product } = useContext(ReduxContext)


    useEffect(() => {
        try {
            console.log(product,'sds');
        } catch (error) {
            console.log(error);
        }
    },[])

    return (
        <div>
            { 
                product.
                filter((elementToFilter: Product) => elementToFilter.availability === true )
                .map((elementAvailable:Product) => {
                    return(
                        <p>{elementAvailable.name}</p>
                    )
                })
            }
        </div>
    );
}
