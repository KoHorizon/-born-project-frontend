import React, { useContext, useState ,createContext, useEffect } from 'react'
import { Order } from '../types/order';
import { setBooleanModalBasket } from "../types/setStateAction";


const defaultState = {
  isOpen: false,
  setIsOpen: () => {},
  setOrderProducts: () => {},
  handlePrepareOrder: (tempOrder: any) => {},
  prepareOrder: [
    {}
  ],
  setPrepareOrder: () => {},

}

export const BasketContext = createContext<setBooleanModalBasket >(defaultState);

export const ReduxBasketProvider = (props:any) => {
  const [isOpen, setIsOpen] = useState(false)
  const [orderProducts, setOrderProducts] = useState({})
  let [prepareOrder, setPrepareOrder] = useState<any[]>([])

  useEffect(() => {
    if (Object.keys(orderProducts).length > 0 && orderProducts.constructor === Object) {
      // console.log(orderProducts,'test');
      // console.log('cest vide ');
      setPrepareOrder(prepareOrderData => [...prepareOrderData, orderProducts])    

    }
  

    // setPrepareOrder(prepareOrderData => [...prepareOrderData, orderProducts])
  },[orderProducts])

  useEffect(() => {
    console.log(prepareOrder,'this is the prepare order');
  },[prepareOrder])



  return (
    <BasketContext.Provider value={{ isOpen , setIsOpen , setOrderProducts, prepareOrder, setPrepareOrder}}>
      {props.children}
    </BasketContext.Provider>
  )
}
