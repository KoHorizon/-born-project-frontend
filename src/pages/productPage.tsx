import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsAndIngredient } from '../api/product';
import ProductAndIngredientData from '../components/product/productAndIngredientData';
import { BasketContext } from '../providers/providerBasket';
import { IngredientContext } from '../providers/providerIngredient';
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
    const { ingredientProvider } = useContext(IngredientContext)

    let navigate = useNavigate()

    const [product, setProduct] = useState<Product>(defaultProduct)
    const [ingredients, setIngredient] = useState<Ingredient[]>([defaultIngredient])
    const [excludeIngredient, setExcludeIngredient] = useState<Ingredient[]>([])


    const [ingredientToCustomize, setIngredientToCustomize] = useState<Ingredient[]>([])



    const orderObject = {
        email: null,
        product: product,
        exclude_ingredients: excludeIngredient
    }

    const orderObjectCustomize = {
        email: null,
        product: product,
        ingredients: ingredientToCustomize
    }

    useEffect(() => {
        getProductsAndIngredient(id).then((res) => {
            setProduct(res.data.response.product)
            setIngredient(res.data.response.ingredients)
            // console.log(res.data.response.ingredients);
        })

        // console.log(ingredientProvider);
        

    },[])

    useEffect(() => {
        console.log(ingredientToCustomize);

    },[ingredientToCustomize])

    const createExcludeForProduct = async (ingredient: Ingredient) => {
        if(ingredients.length > 1 && excludeIngredient.length < ingredients.length ) {
            setIngredient((items) => items.filter(item => item.id !== ingredient.id));
            setExcludeIngredient(dataIngredient => [...dataIngredient, ingredient]);
        }  
        
    }

    const createCustomizeProduct = async (ingredient: Ingredient) => {
        if (ingredientToCustomize.length == ingredientProvider.length) return

        for await (const customizeIngredient of ingredientToCustomize) {
            if(customizeIngredient.id === ingredient.id) return;            
        }
        
        setIngredientToCustomize(dataIngredient => [...dataIngredient, ingredient]);
    }

    const handleSubmitToBasket = (custom: any) => {  
        switch(custom) {
            case false:
                setOrderProducts(orderObject)
                break;
            case true:
                if (ingredientToCustomize.length === 0) return;
                setOrderProducts(orderObjectCustomize)
                break;
                    // setOrderProducts(orderObjectCustomize)
                    
                }
        navigate('/test')
    }



  return ( 
    <>
        <p>ProductPage</p>
        <button onClick={() => navigate('/test')}>Go back</button>
        <ProductAndIngredientData product={product} ingredient={ingredients} ingredientToCustomize={ingredientToCustomize}/>
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
                ingredientProvider.map((ingredientAll: any) => {
                    return (
                        <div key={ingredientAll.id} className='exclude-ingredient'>
                                <p>{ingredientAll.name}</p>
                                <span onClick={() => createCustomizeProduct(ingredientAll)}> K </span>
                        </div>
                    )
                })
            }
        </div>
        
        <button onClick={() => handleSubmitToBasket(product.custom)}>Envoyer au panier</button>

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