import React, { useContext, useEffect } from 'react';
import { getProducts } from '../api/product';
import ProductOfTheDay from '../components/productOfTheDay';
import BasketModal from '../modals/basketModal';
import { BasketContext } from '../providers/reduxBasket';
import { ProductContext } from '../providers/reduxProducts';
import { Product } from '../types/product';

export default function MainPage() {


    const { product } = useContext(ProductContext)
    const { setIsOpen } = useContext(BasketContext)


    useEffect(() => {
        try {
            // console.table(product);
        
        } catch (error) {
            console.log(error);
        }
    },[])
    // console.table(product);

    return (
        <div>
            { 
                product.
                filter((elementToFilter: Product) => elementToFilter.availability === true )
                .map((elementAvailable:Product) => {
                    return(
                        <ProductOfTheDay key={elementAvailable.id} available={elementAvailable}/>
                        // <p key={elementAvailable.id}>{elementAvailable.name}</p>
                    )
                })
            }
            <button onClick={() => setIsOpen(true)}>OPEN</button>
            <BasketModal /> 
        </div>
    );
}
