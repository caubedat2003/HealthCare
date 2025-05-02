import React from 'react';
import { Container, Typography } from '@mui/material';

function PatientHome() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Welcome Patient
            </Typography>
            <Typography variant="body1">
                This is the patient dashboard home page. Use the sidebar to navigate to different management sections.
            </Typography>
        </Container>
    );
}

export default PatientHome;