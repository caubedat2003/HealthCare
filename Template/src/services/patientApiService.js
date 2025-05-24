import axios from 'axios';

const API_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

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

export const getPatientProfile = async (userId) => {
    try {
        const response = await api.get('/api/patient/profile/', { params: { user_id: userId } });
        return response.data;
    } catch (error) {
        throw error; // Để xử lý lỗi 404 trong Profile.jsx
    }
};

export const createPatientProfile = async (profileData) => {
    try {
        const response = await api.post('/api/patient/profile/', profileData);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updatePatientProfile = async (profileData) => {
    try {
        const response = await api.patch('/api/patient/profile/', profileData);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};