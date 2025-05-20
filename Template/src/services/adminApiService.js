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

export const getUserProfile = async () => {
    const response = await api.get('/api/admin/users/me');
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

export const fetchUsers = async () => {
    try {
        const response = await api.get('/api/admin/users/');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users. Please check your authentication or try again later.');
    }
};

export const fetchRoles = async (raw = false) => {
    try {
        const response = await api.get('/api/admin/role/');
        if (raw) {
            return response.data; // Return raw role data
        }
        return response.data.reduce((acc, role) => {
            acc[role.id] = role.name;
            return acc;
        }, {});
    } catch (error) {
        throw new Error('Failed to fetch roles. Please check your authentication or try again later.');
    }
};

export const deleteRole = async (roleId) => {
    try {
        await api.delete(`/api/admin/role/${roleId}/`);
    } catch (error) {
        throw new Error('Failed to delete role. Please check your authentication or try again later.');
    }
};

export const fetchRole = async (roleId) => {
    try {
        const response = await api.get(`/api/admin/role/${roleId}/`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch role. Please check your authentication or try again later.');
    }
};

export const updateRole = async (roleId, data) => {
    try {
        await api.put(`/api/admin/role/${roleId}/`, data);
    } catch (error) {
        throw new Error('Failed to update role. Please check your authentication or try again later.');
    }
};

export const createRole = async (data) => {
    try {
        const response = await api.post('/api/admin/role/', data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create role. Please check your input or authentication.');
    }
};

export const createUser = async (data) => {
    try {
        const response = await api.post('/api/admin/users/', data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create user. Please check your input or authentication.');
    }
};

export const fetchUser = async (userId) => {
    try {
        const response = await api.get(`/api/admin/users/${userId}/`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user. Please check your authentication or try again later.');
    }
};

export const updateUser = async (userId, data) => {
    try {
        await api.put(`/api/admin/users/${userId}/`, data);
    } catch (error) {
        throw new Error('Failed to update user. Please check your input or authentication.');
    }
};

export const deleteUser = async (userId) => {
    try {
        await api.delete(`/api/admin/users/${userId}/`);
    } catch (error) {
        throw new Error('Failed to delete user. Please check your authentication or try again later.');
    }
};