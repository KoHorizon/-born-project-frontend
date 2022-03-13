import React, { useContext, useEffect } from 'react';
import { getProducts } from '../api/product';
import ProductAll from '../components/productAll';
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
            console.table(product);
        
        } catch (error) {
            console.log(error);
        }
    },[])
    // console.table(product);

    return (
        <div>
            <ProductAll product={product}   />
            <button onClick={() => setIsOpen(true)}>OPEN</button>
            <BasketModal /> 
        </div>
    );
}



// product.
//          filter((productToFilter: Product) => productToFilter.availability === true )
//          .map((productAvailable:Product) => {
//             return(
//                 <ProductOfTheDay key={productAvailable.id} available={productAvailable}/>
//                 // <p key={elementAvailable.id}>{elementAvailable.name}</p>
//             )
//          })