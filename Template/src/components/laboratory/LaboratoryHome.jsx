import React from 'react';
import { Container, Typography } from '@mui/material';

function LaboratoryHome() {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Welcome Laboratory
            </Typography>
            <Typography variant="body1">
                This is the laboratory dashboard home page. Use the sidebar to navigate to different management sections.
            </Typography>
        </Container>
    );
}

export default LaboratoryHome;