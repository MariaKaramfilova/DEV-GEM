import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { AuthContext } from '../../context/AuthContext';
import { logoutUser } from '../../services/auth.services';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { Link as RouterLink } from "react-router-dom";
import { AccountBoxIcon } from '@mui/icons-material/AccountBox';
import { LOG_IN_PATH, SIGN_UP_PATH } from '../../common/common';
import DiamondIcon from '@mui/icons-material/Diamond';


function ResponsiveAppBar() {
  const { loggedInUser, user } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
         

          <DiamondIcon sx={{ display: 'flex', width: 35, height: 35}} />

          <Typography
            variant="h6"
            noWrap
            component={Link} // Use Link component for navigation
            to="/"
            sx={{
              ml: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
        DEV/GEM
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
        
          </Box>
          <Box sx={{ flexGrow: 0 }}>

            { loggedInUser ? 
            <>
             <Button
            component={RouterLink} 
            to={SIGN_UP_PATH}
            sx={{ my: 2, color: 'white' }}
          >
            Upload Addon
            </Button> 

                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* place user image down here */}
                    <Avatar alt="Remy Sharp" src={AccountBoxIcon} sx={{ width: 32, height: 32 }}/> 
                </IconButton>
                </Tooltip>
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
           
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Account Settings</Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Dashbord</Typography>
                </MenuItem>

                <MenuItem onClick={logoutUser}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>

            </Menu> </> : 
            <>
            <Button
            component={RouterLink} 
            to={LOG_IN_PATH}
            sx={{ my: 2, color: 'white' }}
          >
            Sign In
            </Button> 
|
            <Button
            component={RouterLink} 
            to={SIGN_UP_PATH}
            sx={{ my: 2, color: 'white' }}
          >
            Register
            </Button> 
            
            </>}

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
