import React, { useEffect, useState } from 'react'
import { getOrderHasProductAndIngredientsUndone } from '../../api/order'
import { OrderKitchen } from '../../types/order'
import '../styles/kitchenPage.css'
export default function KitchenPage() {

  const [orderForKitchen , setOrderForKitchen] = useState<OrderKitchen[]>([])

  useEffect(() => {
    getOrderHasProductAndIngredientsUndone().then((res) => {
      setOrderForKitchen(res.data.response)
      
    });
    // console.log(orderForKitchen)
    

  },[]) 

  const handleOrderFinnished = (id: number) => {
    console.log(id);
    
  }





  return (
    <div className='kitchenBody'>
      {
        orderForKitchen ? 
        orderForKitchen.map((el) => {
          
          return(
            <div key={el.order} className="kitchenElement">
              <span className='orderId' onClick={() => handleOrderFinnished(el.order)}>{el.order}</span>

              <div className='kitchen-orderContent-body'>
                {
                  el.orderProduct.map((content, index) => {
                    return(
                      <div key={index} className='orderContent'>
                        <p className='kitchen-productName'>{content.product.name}</p>
                        <div className='kitchen-line-order'></div>
                        <div className='kitchen-ingredient'>
                          <p className='kitchen-ingredient-title'>Ingredient : </p>
                          {content.ingredient.map((ingredient, index) => {
                            return(
                              <p key={index} className='kitchen-ingredient-name'>{ingredient.name}</p>
                            )
                          })}
                        </div>
                        {content.excludedIngredient ? 
                          <div className='kitchen-excludeIngredient'>
                            {content.excludedIngredient.length > 0 ? 
                              <p className='kitchen-ingredient-title'>Exclude Ingredient : </p>
                            :<></>
                            }
                            {
                              content.excludedIngredient.map((exclude,index) => {
                                return(
                                  <p key={index} className='kitchen-ingredient-name'>{exclude.name}</p>
                                )
                              })
                            }
                          </div>:<></>
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })
        :
        <></>

      }






















    </div>
  )
}
