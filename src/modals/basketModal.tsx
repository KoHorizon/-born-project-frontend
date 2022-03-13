import React, { useContext, useEffect, useState } from 'react'
import { BasketContext } from '../providers/providerBasket'
import ReactDOM  from 'react-dom';
import './styles/basketModal.css'
import { postOrderHasIngredient } from '../api/product';





export default function BasketModal() {

    const { isOpen, setIsOpen, prepareOrder } = useContext(BasketContext)


    const [orderOfBasket, setOrderOfBasket] = useState<any>()
    const [price, setPrice] = useState<number>()
    const [excludedPrice, setExcludedPrice] = useState<number>()

    useEffect(() => {
        

        let price = 0;
        let excludedPrice = 0;
        
        for (const orderData of prepareOrder) {
            price += parseFloat(orderData.product.price) 

            if (orderData.exclude_ingredients) {
                for (const excludeIngredient of orderData.exclude_ingredients) {
                    price -= parseFloat(excludeIngredient.price) 
                    excludedPrice -= parseFloat(excludeIngredient.price) ;
                    
                }
            }

            if (orderData.ingredients) {
                for (const customIngredient of orderData.ingredients) {
                    price += parseFloat(customIngredient.price) 
                }
            }            
        }

        setPrice(price)
        setExcludedPrice(excludedPrice)

    }, [prepareOrder])
    if(!isOpen) return null;




    const postOrder = async () => {
        if (prepareOrder.length === 0) return

        const order = await postOrderHasIngredient(prepareOrder);
        
        if(order.status == 200) { // Make an alert if succesfull
            console.log(order.status, 'order have been created');
        }
    }

    return ReactDOM.createPortal(
        <>
        <div className='modalBasket-main'>
            <div className='modalBasket-order'>
                    {
                        prepareOrder.length > 0  ? prepareOrder.map(order => {
                            

                            return(
                                <div key={order.product.id} className='modalBasket-oderChildren'>
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
                                                                        <p key={excludeIngredient.id}>{excludeIngredient.name}</p>
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
                        })
                        : 
                        <>
                            <p>Le Panier est vide</p>
                        </>
                    }
                    {prepareOrder.length > 0 ?
                        <div className='modalBasket-endContainer'>
                            <div className='modalBasket-finalPrice'>
                                <p>Excluded Price : {excludedPrice}€</p>
                                <p>Total : {price}€</p>
                            </div>
                        </div>
                    : <></>}
             </div>
            {
                prepareOrder.length > 0 ?<button className='order-modalOrder' onClick={() => postOrder()} >Post Order</button>: <></>
            }
            <button className='clode-modalOrder' onClick={() => setIsOpen(false)} >close</button>

        </div>
        </>,
        document.getElementById('modal')!
    )
}


// order.exclude_ingredients.map((excludeIngredient: any) => {
//     return(
        
//         <div key={excludeIngredient.id} > {excludeIngredient.name}</div>
//     )
// })