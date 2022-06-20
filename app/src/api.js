import axios from 'axios';

export const API_BASE_URL = `http://${window.location.hostname}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_BASE_PATH}/`;

const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 3500,
});

export default instance;