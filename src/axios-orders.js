import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-ed987.firebaseio.com/'
});

export default instance;