import React from 'react';
import { Container, Typography } from '@mui/material';

function AdminHome() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Welcome Admin
            </Typography>
            <Typography variant="body1">
                This is the admin dashboard home page. Use the sidebar to navigate to different management sections.
            </Typography>
        </Container>
    );
}

export default AdminHome;