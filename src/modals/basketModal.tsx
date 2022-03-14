import React, { useContext, useEffect, useState } from 'react'
import { BasketContext } from '../providers/providerBasket'
import ReactDOM  from 'react-dom';
import './styles/basketModal.css'
import { postOrderHasIngredient } from '../api/product';
import { useNavigate } from 'react-router-dom';





export default function BasketModal() {

    const { isOpen, setIsOpen, prepareOrder, setPrepareOrder } = useContext(BasketContext)

    let navigate = useNavigate()
    const [price, setPrice] = useState<number>()
    const [excludedPrice, setExcludedPrice] = useState<number>()
    const [invoice, setInvoice] = useState<boolean>(false)

    useEffect(() => {
        console.log(prepareOrder);
    },[])

    
    // This is useEffect will launch everytime an object product is set to prepareOrder in the provider
    // It's job is to calculate the price of every product and excluded ingredient
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


    // Function Delete Product
    const deleteProduct = async (product: any) => {        
        setPrepareOrder((items) =>  items.filter(item => item.product.id !== product));    
    }

    const deleteIngredientOfProduct = async (ingredientId: any, order: any) => {
        // console.log(ingredientId, 'id');
        // console.log(order, 'order');
        // setPrepareOrder((item) => item.map((el:any) => el.exclude_ingredients).filter((fe: any) => fe.id !== ingredientId.id ))
        // console.log(prepareOrder);
        
    }


    // Function To Post the Order once Order exist
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
                            // console.log(order.product.name);
                            // console.log(order.exclude_ingredients.length);
                            return(
                                <div key={order.product.id} className='modalBasket-oderChildren'>
                                    <div className='modalBasket-productData'>
                                        <p> Produit : {order.product.name}</p>
                                        {order.product.custom ? <p></p> : 
                                        <div>
                                            <p>
                                                {order.product.price}€    
                                            </p>
                                            <p className='deleteProduct-ModalOrder' onClick={() => deleteProduct(order.product.id)}>X</p>
                                        </div>}
                                        
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
                                                                            <p className='deleteProduct-ModalOrder' onClick={() => deleteIngredientOfProduct(excludeIngredient,order)}>X</p>
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
                prepareOrder.length > 0 ? <button className='order-modalOrder' onClick={() => navigate('/invoice')} > Invoice </button> : <></>
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