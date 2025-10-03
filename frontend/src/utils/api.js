import axios from 'axios';

// Updated base URL to deployed Render backend
const API = axios.create({ baseURL: 'https://book-review-platform-3.onrender.com/api' });

// Attach token to headers
API.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default API;
