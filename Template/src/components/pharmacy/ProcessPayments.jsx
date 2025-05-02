import React from 'react';
import { Container, Typography } from '@mui/material';

function ProcessPayments() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Process Payments
            </Typography>
            <Typography variant="body1">
                Handle patient payments for medications here. (Placeholder: Backend API for payment processing not yet implemented.)
            </Typography>
        </Container>
    );
}

export default ProcessPayments;