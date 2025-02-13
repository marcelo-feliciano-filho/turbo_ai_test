import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers['Authorization'];
    }
};

export default API;
