import React, { useState } from 'react';
import { Container, Typography, TextField, Button, CircularProgress, Alert, Snackbar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createPatientProfile } from '../../services/patientApiService';
import { useNavigate } from 'react-router-dom';

function ProfileAdd() {
    const [profile, setProfile] = useState({
        full_name: '',
        dob: '',
        gender: '',
        phone: '',
        email: '',
        house_number: '',
        street: '',
        district: '',
        city: '',
        insurance_id: '',
        type: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = {
                full_name: profile.full_name,
                dob: profile.dob,
                gender: profile.gender,
                phone: profile.phone,
                email: profile.email,
                address: {
                    house_number: profile.house_number,
                    street: profile.street,
                    district: profile.district,
                    city: profile.city
                },
                insurance_id: profile.insurance_id || null,
                type: profile.type
            };
            await createPatientProfile(data);
            setSnackbar({ open: true, message: 'Patient profile created successfully', severity: 'success' });
            setProfile({
                full_name: '',
                dob: '',
                gender: '',
                phone: '',
                email: '',
                house_number: '',
                street: '',
                district: '',
                city: '',
                insurance_id: '',
                type: ''
            });
            navigate('/profile');
        } catch (err) {
            setError(err.message);
            setSnackbar({ open: true, message: err.message, severity: 'error' });
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
                Add Patient Profile
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Full Name"
                        name="full_name"
                        value={profile.full_name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        value={profile.dob}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Gender</InputLabel>
                        <Select
                            name="gender"
                            value={profile.gender}
                            onChange={handleInputChange}
                            label="Gender"
                            required
                        >
                            <MenuItem value="">Select Gender</MenuItem>
                            <MenuItem value="M">Male</MenuItem>
                            <MenuItem value="F">Female</MenuItem>
                            <MenuItem value="O">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Phone"
                        name="phone"
                        value={profile.phone}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="House Number"
                        name="house_number"
                        value={profile.house_number}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Street"
                        name="street"
                        value={profile.street}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="District"
                        name="district"
                        value={profile.district}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="City"
                        name="city"
                        value={profile.city}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Insurance ID"
                        name="insurance_id"
                        value={profile.insurance_id}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Patient Type</InputLabel>
                        <Select
                            name="type"
                            value={profile.type}
                            onChange={handleInputChange}
                            label="Patient Type"
                            required
                        >
                            <MenuItem value="">Select Type</MenuItem>
                            <MenuItem value="Outpatient">Outpatient</MenuItem>
                            <MenuItem value="Inpatient">Inpatient</MenuItem>
                            <MenuItem value="Emergency">Emergency</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        Create Profile
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

export default ProfileAdd;