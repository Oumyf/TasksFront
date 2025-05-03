// src/components/layout/Header.js
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import { AccountCircle, Dashboard, Assignment } from '@mui/icons-material';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <RouterLink to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Gestion de Tâches
            </RouterLink>
          </Typography>
          
          {currentUser ? (
            <>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/" 
                startIcon={<Dashboard />}
              >
                Dashboard
              </Button>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/tasks" 
                startIcon={<Assignment />}
              >
                Tâches
              </Button>
              <div>
                <IconButton
                  size="large"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                    {currentUser.fullName ? currentUser.fullName.charAt(0) : <AccountCircle />}
                  </Avatar>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    {currentUser.fullName} 
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
                </Menu>
              </div>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Connexion
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Inscription
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;