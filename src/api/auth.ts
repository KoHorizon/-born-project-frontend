import { AxiosPromise } from 'axios';
import { ResponseAuth, Credential, UserMe } from '../types/credential';
import request from '../services/request';


export const login = (data: Credential): AxiosPromise<ResponseAuth> =>
    request({
        url: '/auth',
        method: 'POST',
        data
    });


export const getUserMe = (): AxiosPromise<any> => 
    request({
        url: '/users/me',
        method: 'GET'
    })