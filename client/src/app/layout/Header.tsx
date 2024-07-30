import { ShoppingCart } from '@mui/icons-material';
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography, useMediaQuery, Drawer, ListItemText } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
]

const navLinkStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({ darkMode, handleThemeChange }: Props) {
    const { basket } = useAppSelector(state => state.basket);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawer = (
        <Box sx={{ width: 250 }}>
            <List>
                {midLinks.map(({ title, path }) => (
                    <ListItem button component={NavLink} to={path} key={path} onClick={handleDrawerToggle}>
                        <ListItemText primary={title.toUpperCase()} />
                    </ListItem>
                ))}
            </List>
            <List>
                {rightLinks.map(({ title, path }) => (
                    <ListItem button component={NavLink} to={path} key={path} onClick={handleDrawerToggle}>
                        <ListItemText primary={title.toUpperCase()} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                    <Typography
                        variant='h6'
                        component={NavLink}
                        to='/'
                        sx={navLinkStyles}
                    >
                        RE-STORE
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                </Box>

                {matches ? (
                    <List sx={{ display: 'flex' }}>
                        {midLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navLinkStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <>
                        <IconButton color='inherit' edge='start' onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                            <ShoppingCart />
                        </IconButton>
                        <Drawer anchor='left' open={drawerOpen} onClose={handleDrawerToggle}>
                            {drawer}
                        </Drawer>
                    </>
                )}

                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit' sx={{ mr: 2 }}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    {matches && (
                        <List sx={{ display: 'flex' }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navLinkStyles}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}
