import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, CircularProgress, Alert, Snackbar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getDoctorProfile, updateDoctorProfile } from '../../services/doctorApiService';

function DoctorProfile() {
    const [profile, setProfile] = useState({
        name: '',
        specialization: '',
        phone: '',
        email: '',
        schedule: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [isEditing, setIsEditing] = useState(false);
    const [hasProfile, setHasProfile] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        }
        fetchProfile();
    }, [userId, navigate]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await getDoctorProfile(userId);
            setProfile({
                name: data.name || '',
                specialization: data.specialization || '',
                phone: data.phone || '',
                email: data.email || '',
                schedule: data.schedule || ''
            });
            setHasProfile(true);
        } catch (err) {
            if (err.response?.status === 404) {
                setHasProfile(false);
                navigate('/doctor/profile-add');
            } else {
                setError(err.message);
                setSnackbar({ open: true, message: err.message, severity: 'error' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
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
            await updateDoctorProfile(data);
            setSnackbar({ open: true, message: 'Profile updated successfully', severity: 'success' });
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
            setSnackbar({ open: true, message: err.message, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleAddProfile = () => {
        navigate('/doctor/profile-add');
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Doctor Profile
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {!hasProfile ? (
                <div>
                    <Typography>No profile found. Please add a profile.</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddProfile}
                        sx={{ mt: 2 }}
                    >
                        Add Profile
                    </Button>
                </div>
            ) : (
                <div>
                    <TextField
                        label="Name"
                        name="name"
                        value={profile.name || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        disabled={!isEditing}
                        required
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Specialization</InputLabel>
                        <Select
                            name="specialization"
                            value={profile.specialization || ''}
                            onChange={handleInputChange}
                            label="Specialization"
                            disabled={!isEditing}
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
                        value={profile.phone || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        disabled={!isEditing}
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={profile.email || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        disabled={!isEditing}
                        required
                    />
                    <TextField
                        label="Schedule"
                        name="schedule"
                        value={profile.schedule || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        disabled={!isEditing}
                        required
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleEditToggle}
                        sx={{ mt: 2, mr: 2 }}
                    >
                        {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                    </Button>
                    {isEditing && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{ mt: 2 }}
                            disabled={loading}
                        >
                            Save Changes
                        </Button>
                    )}
                </div>
            )}
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

export default DoctorProfile;