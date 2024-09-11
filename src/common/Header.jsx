/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Container, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const NavButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    margin: theme.spacing(0, 2),
    color: '#ffffff',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
}));

const SignInButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    color: '#ffffff',
    backgroundColor: '#ffffff20',
    borderRadius: '20px',
    padding: theme.spacing(1, 3),
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
}));

const Header = ({ companyName }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const menuItems = ['Pricing', 'Our Customers', 'Contact sales'];

    return (
        <AppBar
            sx={{
                background: 'none',
                padding: '0.8rem 0',
                boxShadow: 'none',
                position: 'relative'
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                }}
                maxWidth="lg"
            >
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fff' }}>
                    {companyName}
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                    {menuItems.map((item) => (
                        <NavButton key={item}>{item}</NavButton>
                    ))}
                    {/* <SignInButton variant="contained">Sign in</SignInButton> */}
                </Box>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { xs: 'block', md: 'none' } }}
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>

                {/* Drawer for Mobile Menu */}
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                        sx: {
                            width: '250px',
                            background: 'linear-gradient(135deg, #ff5858, #f09819, #7B61FF, #6A1B9A)',
                            color: '#fff',
                        },
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                        <IconButton onClick={toggleDrawer(false)}>
                            <CloseIcon sx={{ color: '#fff' }} />
                        </IconButton>
                    </Box>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem button key={item}>
                                <ListItemText primary={item} sx={{ textAlign: 'center' }} />
                            </ListItem>
                        ))}
                        {/* <ListItem button>
                            <SignInButton variant="contained" sx={{ width: '100%', textAlign: 'center' }}>
                                Sign in
                            </SignInButton>
                        </ListItem> */}
                    </List>
                </Drawer>
            </Container>
        </AppBar>
    );
};

export default Header;
