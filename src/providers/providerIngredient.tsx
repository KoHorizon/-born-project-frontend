import React, { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { getIngredients } from '../api/ingredient';
import { Ingredient } from '../types/ingredient';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3002";
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
        
        const socket = socketIOClient(ENDPOINT);
        socket.on("Ordered", content => {
            console.log(content);
            
        });
        // getIngredients().then((res) => setIngredientProvider(res.data.ingredient));   


    },[])


    return (
        <IngredientContext.Provider value={{ ingredientProvider }}>
            {props.children}
        </IngredientContext.Provider>
    )
}
