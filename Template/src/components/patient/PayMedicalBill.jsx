import React from 'react';
import { Container, Typography } from '@mui/material';

function PayMedicalBill() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Pay Medical Bill
            </Typography>
            <Typography variant="body1">
                Pay your medical bills here. (Placeholder: Backend API for bill payments not yet implemented.)
            </Typography>
        </Container>
    );
}

export default PayMedicalBill;