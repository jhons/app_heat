import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://172.16.2.37:4000'
})