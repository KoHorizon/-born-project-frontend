import React, { useContext, useEffect, useState } from 'react'
import { postOrderHasIngredient } from '../api/product';
import OrderList from '../components/order/orderList';
import { BasketContext } from '../providers/providerBasket';
import './styles/invoicePage.css';


export default function InvoicePage(props: any) {
    const { prepareOrder, setPrepareOrder } = useContext(BasketContext)
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



    // Function To Post the Order once Order exist
    const postOrder = async () => {
        if (prepareOrder.length === 0) return

        const order = await postOrderHasIngredient(prepareOrder);
        
        if(order.status == 200) { // Make an alert if succesfull
            console.log(order.status, 'order have been created');
        }
        setPrepareOrder([])
    }

    
    return (
        <div className=''>
                <p className='invoiceTitle'>Invoice</p>
            {
                prepareOrder.length > 0 ?
                <>
                    <OrderList/>
                    <p>Exclude Price: {excludedPrice}€</p>
                    <p>prix: {price}€</p>
                    <button onClick={() => postOrder()}>Pay</button>
                </>
                :
                <>
                    <p>Nothing to pay for !</p>
                </>
            }
        </div>
    )
}
// prepareOrder.length > 0 ? <button className='order-modalOrder' onClick={() => postOrder()} >Post Order</button> : <></>
