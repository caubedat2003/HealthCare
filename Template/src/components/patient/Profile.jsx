import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, CircularProgress, Alert, Snackbar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getPatientProfile, updatePatientProfile } from '../../services/patientApiService';

function Profile() {
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
    const [isEditing, setIsEditing] = useState(false);
    const [hasProfile, setHasProfile] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id'); // Lấy user_id từ localStorage

    useEffect(() => {
        if (!userId) {
            navigate('/login'); // Nếu không có userId, chuyển hướng đến trang đăng nhập
            return;
        }
        fetchProfile();
    }, [userId, navigate]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await getPatientProfile(userId);
            setProfile({
                full_name: data.full_name || '',
                dob: data.dob || '',
                gender: data.gender || '',
                phone: data.phone || '',
                email: data.email || '',
                house_number: data.address?.house_number || '',
                street: data.address?.street || '',
                district: data.address?.district || '',
                city: data.address?.city || '',
                insurance_id: data.insurance_id || '',
                type: data.type || ''
            });
            setHasProfile(true);
        } catch (err) {
            if (err.response?.status === 404) {
                setHasProfile(false);
                navigate('/patient/profile-add'); // Redirect đến trang thêm profile nếu không tìm thấy
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
            await updatePatientProfile(data);
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
        navigate('/patient/profile-add');
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Patient Profile
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
                        label="Full Name"
                        name="full_name"
                        value={profile.full_name || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        disabled={!isEditing}
                        required
                    />
                    <TextField
                        label="Date of Birth"
                        name="dob"
                        type="date"
                        value={profile.dob || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        disabled={!isEditing}
                        required
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Gender</InputLabel>
                        <Select
                            name="gender"
                            value={profile.gender || ''}
                            onChange={handleInputChange}
                            label="Gender"
                            disabled={!isEditing}
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
                        label="House Number"
                        name="house_number"
                        value={profile.house_number || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        disabled={!isEditing}
                        required
                    />
                    <TextField
                        label="Street"
                        name="street"
                        value={profile.street || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        disabled={!isEditing}
                        required
                    />
                    <TextField
                        label="District"
                        name="district"
                        value={profile.district || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        disabled={!isEditing}
                        required
                    />
                    <TextField
                        label="City"
                        name="city"
                        value={profile.city || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        disabled={!isEditing}
                        required
                    />
                    <TextField
                        label="Insurance ID"
                        name="insurance_id"
                        value={profile.insurance_id || ''}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        disabled={!isEditing}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Patient Type</InputLabel>
                        <Select
                            name="type"
                            value={profile.type || ''}
                            onChange={handleInputChange}
                            label="Patient Type"
                            disabled={!isEditing}
                            required
                        >
                            <MenuItem value="">Select Type</MenuItem>
                            <MenuItem value="Outpatient">Outpatient</MenuItem>
                            <MenuItem value="Inpatient">Inpatient</MenuItem>
                            <MenuItem value="Emergency">Emergency</MenuItem>
                        </Select>
                    </FormControl>
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
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Profile;