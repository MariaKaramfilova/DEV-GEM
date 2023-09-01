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
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router
import { Link as RouterLink } from "react-router-dom";
import { AccountBoxIcon } from "@mui/icons-material/AccountBox";
import {
  CREATE_ADDON_PATH,
  LOG_IN_PATH,
  SIGN_UP_PATH,
  ADMIN_WORD,
  ADMIN_PANEL_PATH,
  ACCOUNT_SETTING_PATH,
  MY_ADDONS_PATH
} from "../../common/common";
import DiamondIcon from "@mui/icons-material/Diamond";

function ResponsiveAppBar() {
  const { loggedInUser } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMyAccount = () => {
    navigate(ACCOUNT_SETTING_PATH);
  };

  const handleManageAddonsMenu = () => {
    handleCloseUserMenu();
    navigate(MY_ADDONS_PATH);
  }

  return (
    <AppBar position="absolute" style={{display: "block", overflow: "visible", top: 0, left: 0, right: 0, marginBottom: "2em"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DiamondIcon sx={{ display: "flex", width: 35, height: 35 }} />

          <Typography
            variant="h6"
            noWrap
            component={Link} // Use Link component for navigation
            to="/"
            sx={{
              ml: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            DEV/GEM
          </Typography>

          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            {loggedInUser ? (
              <>
                {loggedInUser.role === ADMIN_WORD && (
                  <Button
                    variant="outlined"
                    component={RouterLink}
                    to={ADMIN_PANEL_PATH}
                    sx={{ my: 2, color: "white", borderColor: "white", mr: 2 }}
                  >
                    Admin Panel
                  </Button>
                )}
                {!loggedInUser.blockedStatus &&
                  <Button
                    variant="outlined"
                    component={RouterLink}
                    to={CREATE_ADDON_PATH}
                    sx={{ my: 2, color: "white", borderColor: "white", mr: 2 }}
                  >
                    Upload Add-on
                  </Button>
                }
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {/* place user image down here */}
                    <Avatar
                      alt="Remy Sharp"
                      src={AccountBoxIcon}
                      sx={{ width: 32, height: 32 }}
                    />
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

                  <MenuItem onClick={handleMyAccount}>
                    <Typography textAlign="center">Account Settings</Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Dashbord</Typography>
                  </MenuItem>

                  {!loggedInUser.blockedStatus &&
                    (<MenuItem onClick={handleManageAddonsMenu}>
                      <Typography textAlign="center">Manage Add-ons</Typography>
                    </MenuItem>)}

                  <MenuItem onClick={logoutUser}>
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>
                </Menu>{" "}
              </>
            ) : (
              <>
                <Button
                  component={RouterLink}
                  to={LOG_IN_PATH}
                  sx={{ my: 2, color: "white" }}
                >
                  Sign In
                </Button>
                |
                <Button
                  component={RouterLink}
                  to={SIGN_UP_PATH}
                  sx={{ my: 2, color: "white" }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
