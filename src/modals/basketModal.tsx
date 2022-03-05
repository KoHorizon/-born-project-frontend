import React, { useContext } from 'react'
import { BasketContext } from '../providers/reduxBasket'
import ReactDOM  from 'react-dom';
import './styles/basketModal.css'





export default function BasketModal() {

    const { isOpen, setIsOpen } = useContext(BasketContext)



    if(!isOpen) return null;



    return ReactDOM.createPortal(
        <>
        <div className='modalBasket-main'>
            <div>THIS IS A MODAL</div>
            <button onClick={() => setIsOpen(false)} >close</button>
        </div>
        </>,
        document.getElementById('modal')!
    )
}
