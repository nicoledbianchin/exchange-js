import axios from 'axios';
const client = axios.create({
    baseURL: 'https://api.exchangeratesapi.io/latest?base=',
    timeout: 5000});
export default client;