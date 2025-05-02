import React from 'react';
import { Container, Typography } from '@mui/material';

function MedicalReport() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Medical Report
            </Typography>
            <Typography variant="body1">
                View your medical reports here. (Placeholder: Backend API for medical reports not yet implemented.)
            </Typography>
        </Container>
    );
}

export default MedicalReport;