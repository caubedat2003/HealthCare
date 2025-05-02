import React from 'react';
import { Container, Typography } from '@mui/material';

function BookAppointment() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Book Appointment
            </Typography>
            <Typography variant="body1">
                Schedule appointments with doctors here. (Placeholder: Backend API for appointment booking not yet implemented.)
            </Typography>
        </Container>
    );
}

export default BookAppointment;