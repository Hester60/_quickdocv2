import axios from 'axios';

const api = axios.create({
    baseURL: `http://${window.location.hostname}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_BASE_PATH}/`,
    timeout: 3000
});

export default api;
