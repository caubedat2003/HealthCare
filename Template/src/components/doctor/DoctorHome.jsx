import React from 'react';
import { Container, Typography } from '@mui/material';

function DoctorHome() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Welcome Doctor
            </Typography>
            <Typography variant="body1">
                This is the doctor dashboard home page. Use the sidebar to navigate to different management sections.
            </Typography>
        </Container>
    );
}

export default DoctorHome;