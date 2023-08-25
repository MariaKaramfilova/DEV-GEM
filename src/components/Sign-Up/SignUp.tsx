import {useContext, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import { registerUser } from "../../services/auth.services";
import { URL_TO_EXTERNAL_DEFAULT_PROF_PIC } from "../../common/common";
import { Alert } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import { LOG_IN_PATH } from "../../common/common";
import Copyright from "../../common/copyright";
import {phone} from 'phone';

import {checkEmailExistence ,validateSignUp} from "./validation";
import { 
    createUserByUsername, 
    getAllUsers, 
    getUserByUsername, 
    getUserData } 
    from "../../services/user.services";

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
  

export default function RegistrationForm (){

    const [profilePictureURL, setProfilePictureURL ] = useState( URL_TO_EXTERNAL_DEFAULT_PROF_PIC)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfrimPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')

    // const navigate = useNavigate();
    const {setUser} = useContext(AuthContext);

  /**
   * Handle registration form submission.
   * @param {Event} event - The form submit event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    validateSignUp(firstName, lastName, email, password, confirmPassword, setError);

    try {
      const snapshot = await getUserByUsername(userName);
      console.log(snapshot);
      
      if (snapshot.exists()) {
        return setError("This Username already exists!");
      }
      const emailExists = await checkEmailExistence(email);
      if (emailExists) {
        return setError("This Email is already in use!");
      }


      if((phone(phoneNumber)).isValid !== true){
        return setError('Invalid phone number')
      }

      const credential = await registerUser(email, password);
      console.log(credential);
      
      await createUserByUsername(
        firstName,
        lastName,
        credential.user.uid,
        credential.user.email,
        userName,
        company,
        profilePictureURL,
        phoneNumber
      );
      const loggedUserSnapshot = await getUserData(credential.user.uid);
      const loggedInUser = Object.values(loggedUserSnapshot.val()).find(
        (el) => el.uid === credential.user.uid
      );
      const allUsers = await getAllUsers();
      setUser({
        user: credential.user,
        loggedInUser,
        allUsers,
      });

      setSuccessMessage('Registration is complete. Please check your inbox for email confirmation.');
      console.log('done');
      
      // navigate("/success-register");

    } catch (error) {

      console.error(error);
    }
  };

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  name="Username"
                  autoComplete="Username"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="Company Name"
                  label="Company Name"
                  name="Company Name"
                  autoComplete="Company Name"
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="Phone Number"
                  label="Phone Number"
                  name="Phone Number"
                  autoComplete="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Confirm Password"
                  label="Confirm Password"
                  type="password"
                  id="Confirm Password"
                  autoComplete="Confirm Password"
                  onChange={(e) => setConfrimPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to={LOG_IN_PATH} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {successMessage && (
        <Alert severity="success">
        {successMessage}
        </Alert>
        )}
        {error && (
         <Alert severity="error">
            {error}
          </Alert>
        )}
        <Copyright sx={{ mt: 5 }} />
      </Container>

);

}