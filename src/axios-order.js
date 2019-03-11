import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burger-builder-7c89c.firebaseio.com/'
});

export default instance;