import axios from 'axios' ; 

export default axios.create({
    // json-server
    // baseURL : 'http://localhost:3000/'
    // springboot 
    baseURL : 'http://localhost:8972/'
});
