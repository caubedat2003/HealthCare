import React from 'react';
import { Container, Typography } from '@mui/material';

function Treatments() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Treatments
            </Typography>
            <Typography variant="body1">
                Manage patient treatments here. (Placeholder: Backend API for treatments not yet implemented.)
            </Typography>
        </Container>
    );
}

export default Treatments;