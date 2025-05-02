import React from 'react';
import { Container, Typography } from '@mui/material';

function PatientHistory() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Patient History
            </Typography>
            <Typography variant="body1">
                View patient medical histories here. (Placeholder: Backend API for patient history not yet implemented.)
            </Typography>
        </Container>
    );
}

export default PatientHistory;