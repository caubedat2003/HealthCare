import axios from 'axios';

const API_URL = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:8080';

export const registerUser = async (data) => {
    const response = await axios.post(`${API_URL}/api/admin/users/register`, data);
    return response.data;
};