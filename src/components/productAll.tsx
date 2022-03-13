import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../types/product'
const STYLE_AVAILABLE_PRODUCT = {
    backgroundColor: 'red',
    marginTop: '10px',
    padding: '20px',
    color: 'white'
}

const STYLE_UNAVAILABLE_PRODUCT = {
    backgroundColor: 'blue',
    marginTop: '10px',
    padding: '20px',
    color: 'white'
}
export default function ProductAll(props: any) {

    let navigate = useNavigate()

    useEffect(() => {
        console.log(props.product);   
    },[])


  return (
    <>
    {   
        props.product.map((product: Product) => {
            return(
            <div key={product.id} style={product.availability ? STYLE_AVAILABLE_PRODUCT : STYLE_UNAVAILABLE_PRODUCT}>
                {
                product.availability ? 
                <p>{product.name}</p>
                :
                <p>{product.name}</p>
                }
                <button className='button' onClick={() => navigate(`/details/product/${product.id}`)}> Go to the Product </button>
            </div>
            )
        })
    }
    </>
  )
}

// product.
//          filter((productToFilter: Product) => productToFilter.availability === true )
//          .map((productAvailable:Product) => {
//             return(
//                 <ProductOfTheDay key={productAvailable.id} available={productAvailable}/>
//                 // <p key={elementAvailable.id}>{elementAvailable.name}</p>
//             )
//          })