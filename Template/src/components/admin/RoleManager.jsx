import React from 'react';
import { Container, Typography } from '@mui/material';

function RoleManager() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Role Manager
            </Typography>
            <Typography variant="body1">
                Manage user roles here. (Placeholder: Backend API for role management not yet implemented.)
            </Typography>
        </Container>
    );
}

export default RoleManager;