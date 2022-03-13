import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProductsAndIngredient } from '../api/product';
import ProductAndIngredientData from '../components/product/productAndIngredientData';
import { BasketContext } from '../providers/reduxBasket';
import { Ingredient } from '../types/ingredient';
import { Product } from '../types/product';
import './styles/productPage.css';

const defaultProduct = {
    id: 1,
    name: 'default',
    img_name: 'none',
    availability: false,
    custom: false,
    day_special: false,
    price: 0.00
};

const defaultIngredient = {
    id: 1,
    img_name: 'none',
    name: 'no ingredietn',
    price: 0.00,
    stock: 0,
};

const STYLE_CONTAINER_CUSTOMIZE = {
    display: 'flex',
    width:'100%',
}

export default function ProductPage(props: any) {
    const { id } = useParams();
    const { setOrderProducts } = useContext(BasketContext)


    const [product, setProduct] = useState<Product>(defaultProduct)
    const [ingredients, setIngredient] = useState<Ingredient[]>([defaultIngredient])
    const [excludeIngredient, setExcludeIngredient] = useState<Ingredient[]>([])

    const orderObject = {
        email: null,
        product: product,
        exclude_ingredients: excludeIngredient
    }

    useEffect(() => {
        getProductsAndIngredient(id).then((res) => {
            setProduct(res.data.response.product)
            setIngredient(res.data.response.ingredients)
            // console.log(res.data.response.ingredients);
        })
    },[])



    const createExcludeForProduct = async (ingredient: Ingredient) => {
        if(excludeIngredient.length < ingredients.length ) {
            setIngredient((items) => items.filter(item => item.id !== ingredient.id));
            setExcludeIngredient(dataIngredient => [...dataIngredient, ingredient]);
        }  
        
    }

    const createCustomizeProduct = () => {
        
    }

    const handleSubmitToBasket = () => {        
        setOrderProducts(orderObject)
    }



  return ( 
    <>
        <p>ProductPage</p>
        <ProductAndIngredientData product={product} ingredient={ingredients} />
        <div className='separator'>
            <span>Personnaliser</span>
            <div className='separator-line'></div>
        </div>

        <div style={STYLE_CONTAINER_CUSTOMIZE}>
            {
                product.custom == false ?
                    ingredients.map(ingredient => {
                        return( 
                            <div key={ingredient.id} className='exclude-ingredient'>
                                <p>{ingredient.name}</p>
                                <span onClick={() => createExcludeForProduct(ingredient)}>X</span>
                            </div>
                        )
                    })
                :
                <p>ddd</p>
            }
        </div>
        <button onClick={() => handleSubmitToBasket()}>Envoyer au panier</button>

    </>
  ) 
}
// {
//     ingredients.map(el => {
//         return(
//            <p key={el.id}>{el.name}</p>
//         )
//     })  
// }