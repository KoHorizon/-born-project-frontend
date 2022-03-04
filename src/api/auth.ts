import { AxiosPromise } from 'axios';
import { ResponseAuth, Credential } from '../types/credential';
import request from '../services/request';


export const login = (data: Credential): AxiosPromise<ResponseAuth> =>
    request({
        url: '/auth',
        method: 'POST',
        data
    });