import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../../types/product'
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
    color: 'white',
    opacity: '0.2'
}

const STYLE_FLEX= {
    display: 'flex',
    justifyContent: 'space-between'
}

const STYLE_DISABLE = {
    diplay: 'none'
}
export default function ProductAll(props: any) {

    let navigate = useNavigate()

    useEffect(() => {
        // console.log(props.product);   
    },[])


  return (
    <>
    {   
        props.product.map((product: Product) => {
            // console.log(product,'sdsd');
            
            return(
            <div key={product.id} style={product.availability ? STYLE_AVAILABLE_PRODUCT : STYLE_UNAVAILABLE_PRODUCT}>
                {
                product.availability ? 
                <div style={STYLE_FLEX}>
                    {
                        product.custom ? 
                        <>
                            <p>{product.name}</p>
                        </>
                        :
                        <>
                            <p>{product.name}</p>
                            <p>{product.price}€</p>
                        
                        </>
                    }
                </div>
                    :
                <div style={STYLE_FLEX}>
                    <p>{product.name}</p>
                    <p>{product.price}€</p>
                </div>
                }
                <button className={ product.availability ? 'active' : 'disabled' } onClick={() => navigate(`/details/product/${product.id}`)}> Go to the Product </button>
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