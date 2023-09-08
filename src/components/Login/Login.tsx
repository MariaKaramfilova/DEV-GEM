import { useNavigate, Link as RouterLink, useLocation } from "react-router-dom";
import React, { useContext, useRef, useState } from "react";
import { loginUser } from "../../services/auth.services";
import { AuthContext } from "../../context/AuthContext";
import { getUserData } from "../../services/user.services";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert } from '@mui/material';
import { SIGN_UP_PATH, FORGOT_PASSWORD_PATH } from "../../common/common";
import Copyright from "../../common/copyright";

/**
 * A component for user login.
 *
 * Allows users to log in using their email and password.
 *
 * @component
 * @example
 * return (
 *   <Login />
 * );
 */
export default function Login() {

    const {setUser} = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };
    console.log(from);
    
      
      // TODO remove, this demo shouldn't need to reset the theme.

  /**
   * Handle form submission for user login.
   * @param {Event} e - The form submission event.
   */
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const data = await loginUser(
        emailRef.current.value,
        passwordRef.current.value
      );
      (async () => {
        const loggedUserSnapshot = await getUserData(data.user.uid);
        console.log(data?.user?.emailVerified);
        
        const loggedInUser = Object.values(loggedUserSnapshot.val()).find(
          (el) => el.uid === data.user.uid
        );
        setUser((prev) => ({ ...prev, loggedInUser, user: data.user }));
      })();
      navigate(from);
    } catch (error) {
      setError(`${error.message}`);
    }

    setLoading(false);
  }

    return (

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef = {emailRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef = {passwordRef}
            />
        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to={FORGOT_PASSWORD_PATH} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to={SIGN_UP_PATH} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            </Box>
        </Box>
        {error && (
         <Alert severity="error">
            {error}
          </Alert>
        )}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );

}
