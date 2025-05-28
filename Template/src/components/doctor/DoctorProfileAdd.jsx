import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createDoctorProfile } from '../../services/doctorApiService';

function DoctorProfileAdd() {
    const [profile, setProfile] = useState({
        name: '',
        specialization: '',
        phone: '',
        email: '',
        schedule: ''
    });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const data = {
                user_id: userId,
                name: profile.name,
                specialization: profile.specialization,
                phone: profile.phone,
                email: profile.email,
                schedule: profile.schedule
            };
            await createDoctorProfile(data);
            setSnackbar({ open: true, message: 'Profile created successfully', severity: 'success' });
            navigate('/doctor/profile');
        } catch (err) {
            setSnackbar({ open: true, message: err.message, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Add Doctor Profile
            </Typography>
            <TextField
                label="Name"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Specialization</InputLabel>
                <Select
                    name="specialization"
                    value={profile.specialization}
                    onChange={handleInputChange}
                    label="Specialization"
                    required
                >
                    <MenuItem value="">Select Specialization</MenuItem>
                    <MenuItem value="Dentomaxillofacial">Dentomaxillofacial</MenuItem>
                    <MenuItem value="Otorhinolaryngology">Otorhinolaryngology</MenuItem>
                    <MenuItem value="Cardiology">Cardiology</MenuItem>
                    <MenuItem value="Pathology">Pathology</MenuItem>
                    <MenuItem value="Physiology">Physiology</MenuItem>
                    <MenuItem value="Oncology">Oncology</MenuItem>
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
                label="Schedule"
                name="schedule"
                value={profile.schedule}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
                disabled={loading}
            >
                Submit
            </Button>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </Container>
    );
}

export default DoctorProfileAdd;