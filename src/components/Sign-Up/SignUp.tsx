import {useContext, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import { registerUser } from "../../services/auth.services";
import { URL_TO_EXTERNAL_DEFAULT_PROF_PIC } from "../../common/common";
import { TextField, Button, Typography, Container, Alert } from '@mui/material';
import {checkEmailExistence ,validateSignUp} from "./validation";
import { 
    createUserByUsername, 
    getAllUsers, 
    getUserByUsername, 
    getUserData } 
    from "../../services/user.services";

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
        return alert("This Username already exists!");
      }
      const emailExists = await checkEmailExistence(email);
      if (emailExists) {
        setError("This Email is already in use!");
      }
      const credential = await registerUser(email, password);
      console.log(credential);
      
      await createUserByUsername(
        firstName,
        lastName,
        credential.user.uid,
        credential.user.email,
        userName,
        profilePictureURL
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
      
    //   navigate("/success-register");

    } catch (error) {

      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
    <Typography variant="h4" align="center" color="black" gutterBottom >
      Sign Up
    </Typography>
    <form onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        margin="normal"
      />

    <TextField
        label="Company Name"
        variant="outlined"
        fullWidth
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        margin="normal"
      />

       <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />

      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        margin="normal"
      />
       
       
       <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />

       <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfrimPassword(e.target.value)}
        margin="normal"
      />

      <Button type="submit" variant="contained" size="large" color="primary">
        Register
      </Button>
    </form>
    
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

  </Container>
);

}