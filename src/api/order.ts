import { AxiosPromise } from "axios";
import request from '../services/request';

export const getOrderHasProductAndIngredientsUndone = () : AxiosPromise<any> =>
    request({
        url: '/order-has-product',
        method: 'GET',
    });



