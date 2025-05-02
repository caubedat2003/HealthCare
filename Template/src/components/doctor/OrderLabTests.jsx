import React from 'react';
import { Container, Typography } from '@mui/material';

function OrderLabTests() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Order Lab Tests
            </Typography>
            <Typography variant="body1">
                Order lab tests for patients here. (Placeholder: Backend API for lab test orders not yet implemented.)
            </Typography>
        </Container>
    );
}

export default OrderLabTests;