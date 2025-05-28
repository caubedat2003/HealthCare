import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, CircularProgress, Alert, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getAppointments, createAppointment, getDoctors } from '../../services/patientApiService';

function BookAppointment() {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        doctor_id: '',
        appointment_date: '',
        status: 'Pending'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        fetchAppointments();
        fetchDoctors();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const data = await getAppointments();
            setAppointments(data);
        } catch (err) {
            setError(err.message);
            setSnackbar({ open: true, message: err.message, severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const fetchDoctors = async () => {
        try {
            const data = await getDoctors();
            setDoctors(data);
        } catch (err) {
            setSnackbar({ open: true, message: err.message, severity: 'error' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await createAppointment(formData);
            setSnackbar({ open: true, message: 'Appointment booked successfully', severity: 'success' });
            setFormData({ doctor_id: '', appointment_date: '', status: 'Pending' });
            fetchAppointments(); // Refresh appointment list
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
                Appointment Management
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <>
                    <Typography variant="h6" gutterBottom>
                        Past Appointments
                    </Typography>
                    {appointments.length === 0 ? (
                        <Typography>No appointments found.</Typography>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Doctor ID</TableCell>
                                        <TableCell>Appointment Date</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Created At</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {appointments.map((appt) => (
                                        <TableRow key={appt.id}>
                                            <TableCell>{doctors.find((doc) => doc.id === appt.doctor_id)?.name || appt.doctor_id}</TableCell>
                                            <TableCell>{new Date(appt.appointment_date).toLocaleString()}</TableCell>
                                            <TableCell>{appt.status}</TableCell>
                                            <TableCell>{new Date(appt.created_at).toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                        Book New Appointment
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Doctor</InputLabel>
                            <Select
                                name="doctor_id"
                                value={formData.doctor_id}
                                onChange={handleInputChange}
                                label="Doctor"
                            >
                                {doctors.map((doc) => (
                                    <MenuItem key={doc.user_id} value={doc.user_id}>
                                        {doc.name} — {doc.specialization}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Appointment Date"
                            name="appointment_date"
                            type="datetime-local"
                            value={formData.appointment_date}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            disabled={loading}
                        >
                            Book Appointment
                        </Button>
                    </form>
                </>
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

export default BookAppointment;