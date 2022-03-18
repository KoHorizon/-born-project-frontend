import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../../types/product'
import '../styles/productAllMain.css'


const STYLE_AVAILABLE_PRODUCT = {
    backgroundColor: '#F0B67F',
    marginTop: '10px',
    padding: '20px',
    color: 'white',
    width: '40%',
    height: '130px',
    borderRadius: '10px',
    cursor: 'pointer' 
}

const STYLE_UNAVAILABLE_PRODUCT = {
    backgroundColor: 'blue',
    width: '40%',
    marginTop: '10px',
    padding: '20px',
    color: 'white',
    opacity: '0.2',
    height: '130px',
    borderRadius: '10px',
}

const STYLE_FLEX= {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
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
    <div className='productAll-main'>
    {   
        props.product.map((product: Product) => {
            
            return(
            <div  className='shadow' onClick={() => product.availability && navigate( `/details/product/${product.id}`) } 
                key={product.id} style={product.availability ? STYLE_AVAILABLE_PRODUCT : STYLE_UNAVAILABLE_PRODUCT}>
                {
                product.availability ? 
                <div >
                    {
                        product.custom ? 
                        <>  
                            <div className='container-ProductAll'>
                                <div style={STYLE_FLEX}>
                                    <p>{product.name}</p>
                                </div>
                                <div className='img-container-ProductAll'>
                                    <p>img</p>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className='container-ProductAll'>
                                <div style={STYLE_FLEX}>
                                    <p className='name-container-ProductAll'>{product.name}</p>
                                    <p >{product.price}€</p>
                                </div>
                                <div className='img-container-ProductAll'>
                                    <p>img</p>
                                </div>
                            </div>
                        </>
                    }
                </div>
                    :
                <div className='container-ProductAll'>

                    <div style={STYLE_FLEX}>
                        <p>{product.name}</p>
                    </div>
                    <div className='img-container-ProductAll'>
                        <p>img</p>
                    </div>
                </div>

                }
            </div>
            )
        })
    }
    </div>
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