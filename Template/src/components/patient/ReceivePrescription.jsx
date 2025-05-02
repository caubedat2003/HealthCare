import React from 'react';
import { Container, Typography } from '@mui/material';

function ReceivePrescription() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Receive Prescription
            </Typography>
            <Typography variant="body1">
                View and manage your prescriptions here. (Placeholder: Backend API for prescriptions not yet implemented.)
            </Typography>
        </Container>
    );
}

export default ReceivePrescription;