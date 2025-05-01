import React from 'react';
import { Container, Typography } from '@mui/material';

function UserManager() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                User Manager
            </Typography>
            <Typography variant="body1">
                List of users will be displayed here. (Placeholder: Backend API for user list not yet implemented.)
            </Typography>
        </Container>
    );
}

export default UserManager;