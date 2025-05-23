import axios from 'axios';

const API_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }
                const response = await axios.post(`${API_URL}/api/admin/token/refresh/`, {
                    refresh: refreshToken
                });
                const { access } = response.data;
                localStorage.setItem('access_token', access);
                originalRequest.headers.Authorization = `Bearer ${access}`;
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        const errorMessage = error.response?.data?.error || error.response?.data?.detail || 'Request failed.';
        return Promise.reject(new Error(errorMessage));
    }
);

export const createPatientProfile = async (data) => {
    try {
        const response = await api.post('/api/patient/profile/', data);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAppointments = async () => {
    try {
        const user_id = localStorage.getItem('user_id');
        if (!user_id) {
            throw new Error('No user ID available');
        }
        const response = await api.get('/api/patient/appointments/', { params: { user_id } });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createAppointment = async (data) => {
    try {
        const user_id = localStorage.getItem('user_id');
        if (!user_id) {
            throw new Error('No user ID available');
        }
        const response = await api.post('/api/patient/appointments/create/', { ...data, user_id });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};