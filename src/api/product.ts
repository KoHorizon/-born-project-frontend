import { AxiosPromise } from 'axios';
import { ResponseProducts, Product } from '../types/product';
import request from '../services/request';
import { Order } from '../types/order';


export const getProducts = (): AxiosPromise<ResponseProducts> =>
    request({
        url: '/product',
        method: 'GET'
    });


export const getProductsAndIngredient = (id: any) : AxiosPromise<any> =>
    request({
        url: `/product-has-ingredient/${id}`,
        method: 'GET'
    })



export const postOrderHasIngredient = (data: any) : AxiosPromise<any> => 
    request({
        url: `/order-has-product`,
        method: 'POST',
        data
    });


export const postProduct = (data: any) : AxiosPromise<any> => 
    request({
        url: 'product-has-ingredient',
        method: 'POST',
        data
    })

// const {data} = await login(loginData);