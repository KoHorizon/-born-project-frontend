import { AxiosPromise } from 'axios';
import { ResponseProducts, Product } from '../types/product';
import request from '../services/request';
import { Order } from '../types/order';
import { ResponseIngredient } from '../types/ingredient';


export const getIngredients = (): AxiosPromise<ResponseIngredient> =>
    request({
        url: '/ingredients',
        method: 'GET'
    });
