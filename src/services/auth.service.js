import axiosClient from './index';
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
        return axios.post(`http://localhost:5000/api/v1/auth/refresh-token`, {
        },{
            baseURL: process.env.REACT_APP_API_URL,
            headers: {
                'content-type': 'application/json',
            },
            withCredentials: true,
            paramsSerializer: params => querystring.stringify(params),
        });
    },

};
export default AuthService;
