import React from 'react';
import { Container, Typography } from '@mui/material';

function PrescriptionsControl() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Prescriptions Control
            </Typography>
            <Typography variant="body1">
                Manage and verify prescriptions here. (Placeholder: Backend API for prescriptions control not yet implemented.)
            </Typography>
        </Container>
    );
}

export default PrescriptionsControl;