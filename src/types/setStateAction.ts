import { Order } from "./order"

export type setBooleanModalBasket = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setOrderProducts: React.Dispatch<React.SetStateAction<{}>>
    prepareOrder: any[]
    setPrepareOrder: React.Dispatch<React.SetStateAction<any[]>>
}


