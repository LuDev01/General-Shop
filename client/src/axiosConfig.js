import axios from 'axios';

const axiosClient = axios.create({
    // baseURL: 'https://general-shop-shedev-backend.vercel.app/',
    baseURL: 'http://localhost:5000/', 
  });
  
export default axiosClient;
