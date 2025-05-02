import React from 'react';
import { Container, Typography } from '@mui/material';

function MedicalTests() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Medical Tests
            </Typography>
            <Typography variant="body1">
                Manage and process medical tests here. (Placeholder: Backend API for medical tests not yet implemented.)
            </Typography>
        </Container>
    );
}

export default MedicalTests;