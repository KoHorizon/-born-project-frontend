import React, { useContext, useState ,createContext } from 'react'
import { setBooleanModalBasket } from "../types/setStateAction";


const defaultState = {
  isOpen: false,
  setIsOpen: () => {}
}

export const BasketContext = createContext<setBooleanModalBasket >(defaultState);

export const ReduxBasketProvider = (props:any) => {
  const [isOpen, setIsOpen] = useState(true)
  // const [orderProducts, setOrderProducts] = useState({})




  return (
    <BasketContext.Provider value={{ isOpen , setIsOpen }}>
      {props.children}
    </BasketContext.Provider>
  )
}
