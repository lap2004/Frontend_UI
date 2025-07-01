
import axios from 'axios';

// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   withCredentials: true,
// });
// export const api = axios.create({
//   baseURL: 'https://headset-adaptive-admissions-tank.trycloudflare.com', // thay bằng link backend sau khi chạy cloudflared tunnel --url http://127.0.0.1:8000
//   withCredentials: true,
// });
export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // thay bằng link backend sau khi chạy cloudflared tunnel --url http://127.0.0.1:8000
  withCredentials: true,
});

// Interceptor để tự động gắn token vào header Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // hoặc sessionStorage.getItem

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);