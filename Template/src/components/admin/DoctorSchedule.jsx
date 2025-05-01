import React from 'react';
import { Container, Typography } from '@mui/material';

function DoctorSchedule() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Doctor Schedule
            </Typography>
            <Typography variant="body1">
                Manage doctor schedules here. (Placeholder: Backend API for doctor schedules not yet implemented.)
            </Typography>
        </Container>
    );
}

export default DoctorSchedule;