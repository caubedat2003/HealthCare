import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiService';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginUser(formData);
            console.log('Login successful:', response); // For debugging
            if (response.user.role === 'patient') {
                navigate('/patient');
            } else if (response.user.role === 'admin') {
                navigate('/admin');
            }
            else if (response.user.role === 'doctor') {
                navigate('/doctor');
            }
            else if (response.user.role === 'pharmacist') {
                navigate('/pharmacy');
            }
            else {
                setError('Unsupported user role');
            }
        } catch (err) {
            setError(err.response?.data?.non_field_errors?.[0] || 'Login failed');
        }
    };

    return (
        <Container maxWidth="sm" className="homepage-container">
            <Typography variant="h4" component="h1" color="primary" align="center" gutterBottom>
                Login to HealthPro
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<LoginIcon />}
                    fullWidth
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
}

export default Login;