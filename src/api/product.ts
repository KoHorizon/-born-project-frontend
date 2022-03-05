import { AxiosPromise } from 'axios';
import { ResponseProducts, Product } from '../types/product';
import request from '../services/request';


export const getProducts = (): AxiosPromise<ResponseProducts> =>
    request({
        url: '/product',
        method: 'GET'
    });