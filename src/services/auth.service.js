import axiosClient from './base';
import { LoginModel } from '../models/data-model/login.model';
import { store } from '../redux/store';
import axios from 'axios';
import querystring from 'query-string';

const AuthService = {
    login: (user) => {
        return axiosClient.post('/auth/login', user);
    },

    pingSe: () => {
        // return axiosClient.get('/ping');
        return axios.get(`http://localhost:5000/ping`);
    },

    refreshToken: () => {
        return axios.post(`/auth/refresh-token`, {
            refreshToken: store.getState().user.tokenRefresh,
        }, {
            baseURL: process.env.REACT_APP_API_URL,
            headers: {
                'content-type': 'application/json',
            },
            paramsSerializer: params => querystring.stringify(params),
        });
    },

};
export default AuthService;
