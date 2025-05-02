import React from 'react';
import { Container, Typography } from '@mui/material';

function MedicalReports() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Medical Reports
            </Typography>
            <Typography variant="body1">
                View and manage medical reports here. (Placeholder: Backend API for medical reports not yet implemented.)
            </Typography>
        </Container>
    );
}

export default MedicalReports;