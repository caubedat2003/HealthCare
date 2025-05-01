import React from 'react';
import { Container, Typography } from '@mui/material';

function NurseSchedule() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Nurse Schedule
            </Typography>
            <Typography variant="body1">
                Manage nurse schedules here. (Placeholder: Backend API for nurse schedules not yet implemented.)
            </Typography>
        </Container>
    );
}

export default NurseSchedule;