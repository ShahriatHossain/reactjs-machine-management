import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://machinestream.herokuapp.com'
});

export default instance;