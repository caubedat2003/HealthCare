import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

function Homepage() {
    return (
        <Container maxWidth="sm" className="homepage-container">
            <Typography variant="h3" component="h1" color="primary" align="center" gutterBottom>
                Welcome to HealthPro
            </Typography>
            <Button
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
                startIcon={<LoginIcon />}
                size="large"
                fullWidth
            >
                Login
            </Button>
        </Container>
    );
}

export default Homepage;