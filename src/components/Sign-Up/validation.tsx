import { Dispatch, SetStateAction } from 'react';
import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";
const auth = getAuth();

export function validateSignUp (firstName: string, lastName: string, email: string, password: string, confirmPassword: string, setError: Dispatch<SetStateAction<string>>){

    if (firstName.length < 4 || firstName.length > 32 || !firstName) {
        setError("First name should be between 4 and 32 symbols");
        return;
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
        return;
      }

}

  /**
   * Check if an email is already in use.
   * @param {string} email - The email to check.
   * @returns {boolean} True if the email is already in use, false otherwise.
   */
  export const checkEmailExistence = async (email: string) => {

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
