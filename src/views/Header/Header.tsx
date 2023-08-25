import { AppBar, Toolbar, Typography, IconButton, Button, Avatar, Menu, MenuItem, Link as MuiLink } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

type Props = {};

export default function Header({ }: Props) {
  const { loggedInUser, user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const buttonStyle = {
    color: '#ABABAB',
    backgroundColor: 'transparent',
    marginTop: '10px',
    '&:hover': {
      color: '#f9f6f2',
      backgroundColor: 'transparent',
    },
    marginLeft: '10px',
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: '#e1dbd6', width: '100%', top: 0 }}>
      <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '25px' }}>
          <div
            style={{
              backgroundColor: '#e2e2e2',
              padding: '5px',
            }}
          >
            <MuiLink component={Link} to="/home">
              <img
                src="../../assets/Logo3.png" alt="Logo"
                alt="Website-logo"
                style={{
                  height: '50px',
                  width: 'auto',
                }}
              />
            </MuiLink>
          </div>
          <MuiLink component={Link} to="/home">
          <img
            src="../../assets/Logo-Text3.png"
            alt="Logo Text"
            style={{
              height: '20px',
              width: 'auto',
              marginLeft: '10px',
              marginTop: '8px'
            }}
          />
          </MuiLink>
        </div>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
        </Typography>
        <Button color="inherit" sx={buttonStyle}>
          Publish extensions
        </Button>
        {user === null ? (
          <React.Fragment>
            <span style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px' }}>|</span>
            <Button color="inherit" sx={buttonStyle}>
              Log in
            </Button>
            <span style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px' }}>|</span>
            <Button color="inherit" style={{ marginRight: '30px' }} sx={buttonStyle}>
              Sign up
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <Avatar alt="Profile" src="/path-to-profile-image.jpg" />
              <span style={{ fontSize: '15px', marginLeft: '5px', color: '#fff' }}>username</span>
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}
