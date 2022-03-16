import React, { useContext, useEffect, useState } from 'react'
import { BasketContext } from '../../providers/providerBasket'

export default function OrderList() {

    const { prepareOrder, setPrepareOrder } = useContext(BasketContext)
    
    return (
        <>
            <div>
                {
                    prepareOrder.length > 0  ? prepareOrder.map((order, index) => {
                        
                        return(
                            <div key={index} className='modalBasket-oderChildren'>
                                <div className='modalBasket-productData'>
                                    <p> Produit : {order.product.name}</p>
                                    {order.product.custom ? <p></p> : <p>{order.product.price}€</p>}
                                </div>
                                <div>
                                    {   
                                        order.exclude_ingredients ?
                                            order.exclude_ingredients.length > 0 ? 
                                                <div className='modalBasket-excludedIngredient'>
                                                    <span>Exclude:</span>
                                                    <div className='modalBasket-excludedIngredient-content'>
                                                        {   
                                                            order.exclude_ingredients.map((excludeIngredient: any) => {
                                                                return(
                                                                    <div key={excludeIngredient.id}>
                                                                        <p>
                                                                            {excludeIngredient.name}   
                                                                        </p>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                        :
                                        <></> : 
                                        <div>
                                            <div className='modalBasket-excludedIngredient'>
                                                <span> Custom Ingredient :</span>
                                                <div className='modalBasket-excludedIngredient-content'>
                                                    {  
                                                        order.ingredients.map((customIngredient: any) => {
                                                            return(
                                                                <p key={customIngredient.id}>{customIngredient.name}</p>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    }    

                                </div>
                            </div>
                        )
                    }) : <div></div>

                }
            </div>

        </>
    )
}
