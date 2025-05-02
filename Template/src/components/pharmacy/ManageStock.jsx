import React from 'react';
import { Container, Typography } from '@mui/material';

function ManageStock() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Manage Stock
            </Typography>
            <Typography variant="body1">
                Monitor and update pharmacy inventory here. (Placeholder: Backend API for stock management not yet implemented.)
            </Typography>
        </Container>
    );
}

export default ManageStock;