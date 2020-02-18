import axios from 'axios';
const client = axios.create({
    baseURL: 'https://api.exchangeratesapi.io/',
    timeout: 5000});
export default client;