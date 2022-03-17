import { AxiosPromise } from "axios";
import request from '../services/request';

export const getOrderHasProductAndIngredientsUndone = () : AxiosPromise<any> =>
    request({
        url: '/order-has-product',
        method: 'GET',
    });



export const postDeliveredOrder = (id: any) : AxiosPromise<any> =>
    request({
        url: `/order/${id}`,
        method: 'GET',
    })