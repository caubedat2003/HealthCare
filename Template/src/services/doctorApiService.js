import axios from 'axios';

const API_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getDoctorProfile = async (userId) => {
    try {
        const response = await api.get('/api/doctor/profile/', { params: { user_id: userId } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createDoctorProfile = async (profileData) => {
    try {
        const response = await api.post('/api/doctor/profile/', profileData);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateDoctorProfile = async (profileData) => {
    try {
        const response = await api.patch('/api/doctor/profile/', profileData);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};