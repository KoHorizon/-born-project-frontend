import React from 'react'
import { Ingredient } from '../../types/ingredient'
import { Product } from '../../types/product'
import '../styles/productAndIngredientData.css'

interface IProps {
    product: Product,
    ingredient: Ingredient[]
    ingredientToCustomize: Ingredient[]
}



const STYLE_CONTAINER_PRODUCT_INGREDIENT_DATA = {
    display: 'flex',
    width:'100%',
    justifyContent: 'space-evenly'
}


export default function ProductAndIngredientData({product, ingredient, ingredientToCustomize}: IProps) {


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
                    </div>
                    :
                    <div className='product-ingredients'>
                        <span className='customize'>Compose your customize product :</span>
                            { 
                                ingredientToCustomize.map(el => {
                                    
                                    return(
                                        <p key={el.id}> - {el.name}</p>
                                        )
                                    })  
                            }
                    </div>
            }
        </div>
    </div>
  )
}
