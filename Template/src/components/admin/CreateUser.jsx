import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, CircularProgress, Alert, Snackbar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createUser, fetchRoles } from '../../services/adminApiService';

function CreateUser() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: ''
    });
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const fetchRoleData = async () => {
            try {
                const roleData = await fetchRoles(true); // Fetch raw role data
                setRoles(roleData);
            } catch (err) {
                setError('Failed to fetch roles. Please try again later.');
                console.error(err);
            }
        };

        fetchRoleData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await createUser(user);
            setSnackbar({ open: true, message: 'User created successfully', severity: 'success' });
            setTimeout(() => navigate('/admin-page/users', { state: { refresh: Date.now() } }), 2000);
        } catch (err) {
            setError('Failed to create user. Please check your input or authentication.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Create User
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="First Name"
                        name="first_name"
                        value={user.first_name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Last Name"
                        name="last_name"
                        value={user.last_name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={user.password}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="role"
                            value={user.role}
                            onChange={handleInputChange}
                            label="Role"
                        >
                            <MenuItem value="">None</MenuItem>
                            {roles.map((role) => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, mr: 1 }}
                        disabled={loading}
                    >
                        Create
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate('/admin-page/users')}
                        sx={{ mt: 2 }}
                    >
                        Cancel
                    </Button>
                </form>
            )}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default CreateUser;