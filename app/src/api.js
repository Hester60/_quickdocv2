import axios from 'axios';

const instance = axios.create({
    baseURL: `http://${window.location.hostname}:${process.env.REACT_APP_API_PORT}${process.env.REACT_APP_API_BASE_PATH}/`,
    timeout: 3500,
});

export default instance;