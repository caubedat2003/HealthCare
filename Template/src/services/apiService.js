import axios from 'axios';

const API_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const registerUser = async (data) => {
    const response = await axios.post(`${API_URL}/api/admin/users/register`, data);
    return response.data;
};

export const loginUser = async (data) => {
    const response = await api.post('/api/admin/users/login', data);
    // Store tokens in localStorage
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
};

export const getUserProfile = async () => {
    const response = await api.get('/api/admin/users/me');
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};