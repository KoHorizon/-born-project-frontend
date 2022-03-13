import React, { createContext, useEffect, useState } from 'react'
import { getIngredients } from '../api/ingredient';
import { Ingredient } from '../types/ingredient';

const defaultIngredient = {
    id: 99999,
    name: 'default',
    price: 0.00,
    stock: 0,
    img_name: 'default_img'
};
export const IngredientContext = createContext<Ingredient | any>(defaultIngredient);

export const ReduxIngredientProvider = (props: any) => {
    const [ingredientProvider, setIngredientProvider] = useState([defaultIngredient]);

    useEffect(() => {
        getIngredients().then((res) => setIngredientProvider(res.data.ingredient));   

    },[])


    return (
        <IngredientContext.Provider value={{ ingredientProvider }}>
            {props.children}
        </IngredientContext.Provider>
    )
}
