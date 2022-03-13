import { AxiosPromise } from 'axios';
import { ResponseProducts, Product } from '../types/product';
import request from '../services/request';


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