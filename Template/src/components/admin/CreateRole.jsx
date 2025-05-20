import React, { useState } from 'react';
import { Container, Typography, TextField, Button, CircularProgress, Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createRole } from '../../services/adminApiService';

function CreateRole() {
    const navigate = useNavigate();
    const [role, setRole] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRole((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e, E) => {
        e.preventDefault();
        try {
            setLoading(true);
            await createRole(role);
            setSnackbar({ open: true, message: 'Role created successfully', severity: 'success' });
            setTimeout(() => navigate('/admin-page/roles', { state: { refresh: Date.now() } }), 2000); // Redirect after 2s
        } catch (err) {
            setError('Failed to create role. Please check your input or authentication.');
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
                Create Role
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Role Name"
                        name="name"
                        value={role.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={role.description}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                    />
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
                        onClick={() => navigate('/admin-page/roles')}
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

export default CreateRole;