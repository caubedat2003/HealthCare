import React from 'react';
import { Container, Typography } from '@mui/material';

function PharmacyHome() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Welcome Pharmacy
            </Typography>
            <Typography variant="body1">
                This is the pharmacy dashboard home page. Use the sidebar to navigate to different management sections.
            </Typography>
        </Container>
    );
}

export default PharmacyHome;