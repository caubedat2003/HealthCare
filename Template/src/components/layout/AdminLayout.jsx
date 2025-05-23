import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Home as HomeIcon,
    People as PeopleIcon,
    AssignmentInd as RoleIcon,
    Category as CategoryIcon,
    CalendarToday as ScheduleIcon,
} from '@mui/icons-material';
import { getUserProfile, logoutUser } from '../../services/apiService';

const drawerWidth = 240;

const navItems = [
    { name: 'Home', path: '/admin-page', icon: <HomeIcon /> },
    { name: 'User Manager', path: '/admin-page/users', icon: <PeopleIcon /> },
    { name: 'Role Manager', path: '/admin-page/roles', icon: <RoleIcon /> },
    { name: 'Patient Type Manager', path: '/admin-page/patient-types', icon: <CategoryIcon /> },
    { name: 'Doctor Schedule', path: '/admin-page/doctor-schedule', icon: <ScheduleIcon /> },
    { name: 'Nurse Schedule', path: '/admin-page/nurse-schedule', icon: <ScheduleIcon /> },
];

function AdminLayout() {
    const [user, setUser] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserProfile();
                setUser(response);
            } catch (err) {
                setUser(null);
                navigate('/login');
            }
        };
        if (localStorage.getItem('access_token')) {
            fetchUser();
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logoutUser();
        setUser(null);
        handleMenuClose();
        navigate('/login');
    };

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    HealthPro Admin
                </Typography>
            </Toolbar>
            <List>
                {navItems.map((item) => (
                    <ListItem
                        button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        Admin Dashboard
                    </Typography>
                    {user ? (
                        <>
                            <Button color="inherit" onClick={handleMenuOpen}>
                                {user.username}
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={() => navigate('/login')}>
                                Login
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>
                                Register
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: 8,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}

export default AdminLayout;