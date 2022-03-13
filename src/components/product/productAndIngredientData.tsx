import React from 'react'
import { Ingredient } from '../../types/ingredient'
import { Product } from '../../types/product'
import '../styles/productAndIngredientData.css'

interface IProps {
    product: Product,
    ingredient: Ingredient[]
}



const STYLE_CONTAINER_PRODUCT_INGREDIENT_DATA = {
    display: 'flex',
    width:'100%',
    justifyContent: 'space-evenly'
}


export default function ProductAndIngredientData({product, ingredient}: IProps) {


  return (
    <div style={STYLE_CONTAINER_PRODUCT_INGREDIENT_DATA}>
        <div className='image-product'></div>
        <div className='ingredient'>
            {
                product.custom == false ?
                    <div className='product-ingredients'>
                        <span>Ingredients :</span>
                        { 
                            ingredient.map(el => {
                                return(
                                    <p key={el.id}> - {el.name}</p>
                                    )
                                })  
                        }
                    </div>:
                    <div>
                        <span className='customize'>This is a Custom Product </span>
                    </div>
            }
        </div>
    </div>
  )
}
