import React, { useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem, Box, Alert } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/apiService';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
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
            await registerUser(formData);
            navigate('/login'); // Adjust to '/' if login page not implemented
        } catch (err) {
            setError(err.response?.data?.detail || Object.values(err.response?.data || {}).flat().join(' ') || 'Registration failed');
        }
    };

    const roles = [
        'patient',
        'doctor',
        'nurse',
        'pharmacist',
        'admin',
        'lab_technician',
    ];

    return (
        <Container maxWidth="sm" className="homepage-container">
            <Typography variant="h4" component="h1" color="primary" align="center" gutterBottom>
                Register for HealthPro
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
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
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
                <TextField
                    select
                    label="Role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    fullWidth
                >
                    {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<PersonAddIcon />}
                    fullWidth
                >
                    Register
                </Button>
            </Box>
        </Container>
    );
}

export default Register;