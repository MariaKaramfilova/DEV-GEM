import React, {useContext, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import { 
    createUserByUsername, 
    getAllUsers, 
    getUserByUsername, 
    getUserData } 
    from "../../services/user.services";
import { registerUser } from "../../services/auth.services";
import { Link, useNavigate } from "react-router-dom";
import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";
import { URL_TO_EXTERNAL_DEFAULT_PROF_PIC } from "../../common/common";
import { LOG_IN_PATH } from "../../common/common";

export default function RegistrationFrom (){

    const [profilePictureURL, setProfilePictureURL ] = useState( URL_TO_EXTERNAL_DEFAULT_PROF_PIC)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfrimPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const {setUser} = useContext(AuthContext);


     /**
   * Check if an email is already in use.
   * @param {string} email - The email to check.
   * @returns {boolean} True if the email is already in use, false otherwise.
   */
  const checkEmailExistence = async (email: string) => {
    const auth = getAuth();

    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking email existence:", error);
      throw error;
    }
  };

   /**
   * Check if an email is already in use.
   * @param {string} email - The email to check.
   * @returns {boolean} True if the email is already in use, false otherwise.
   */
   const checkEmailExistence = async (email) => {
    const auth = getAuth();

    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking email existence:", error);
      throw error;
    }
  };

  /**
   * Handle registration form submission.
   * @param {Event} event - The form submit event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (firstName.length < 4 || firstName.length > 32 || !firstName) {
      setError("First name should be between 4 and 32 symbols");
      return true;
    }
    if (lastName.length < 4 || lastName.length > 32 || !lastName) {
      setError("Last name should be between 4 and 32 symbols");
      return true;
    }
    if (password !== confirmPassword || !password) {
      setError("Please check if your passwords match!");
      return true;
    }
    if (password.length < 6) {
      setError("Password should be more than 6 characters!");
      return true;
    }
    if (
      (!email.includes("@") && !email.includes(".com")) ||
      (!email.includes(".bg") && !email.includes("@"))
    ) {
      setError("Email is not valid!");
    }

    try {
      const snapshot = await getUserByUsername(userName);
      if (snapshot.exists()) {
        return alert("This Username already exists!");
      }
      const emailExists = await checkEmailExistence(email);
      if (emailExists) {
        setError("This Email is already in use!");
      }
      const credential = await registerUser(email, password);
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
      navigate("/success-register");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
    <Typography variant="h4" align="center" gutterBottom>
      Registration Form
    </Typography>
    <form onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        error={error.includes("First name")}
        helperText={error.includes("First name") && error}
        margin="normal"
      />
      {/* Add other fields here */}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </form>
  </Container>
);
  )

}