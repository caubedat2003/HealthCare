import React from 'react';
import { Container, Typography } from '@mui/material';

function PatientTypeManager() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Patient Type Manager
            </Typography>
            <Typography variant="body1">
                Manage patient types here. (Placeholder: Backend API for patient type management not yet implemented.)
            </Typography>
        </Container>
    );
}

export default PatientTypeManager;