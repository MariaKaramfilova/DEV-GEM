import { Dispatch, SetStateAction } from 'react';
import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";
import { LoggedInUser } from '../../context/AuthContext.ts';
import { phone } from 'phone';

const auth = getAuth();

export async function validateSignUp(firstName: string, lastName: string, email: string, password: string, confirmPassword: string, userName: string, phoneNumber: string, setError: Dispatch<SetStateAction<string>>, allUsers: LoggedInUser[]) {

  if (firstName.length < 4 || firstName.length > 32 || !firstName) {
    setError("First name should be between 4 and 32 symbols");
    return false;
  }

  if (lastName.length < 4 || lastName.length > 32 || !lastName) {
    setError("Last name should be between 4 and 32 symbols");
    return false;
  }

  if (password !== confirmPassword || !password) {
    setError("Please check if your passwords match!");
    return false;
  }

  if (password.length < 6) {
    setError("Password should be more than 6 characters!");
    return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    setError("Email is not valid!");
    return false;
  }

  if (!userName || userName.length < 2 || userName.length > 20) {
    setError("Add a valid username between between 2 and 20 symbols.");
    return false;
  }
  
  const isUniqueUsername = !!allUsers.filter(el => el.username === userName).length;
  
  if (isUniqueUsername) {
    setError("This Username already exists!");
    return false;
  }

  const isUniqueEmail = !!allUsers.filter(el => el.email === email).length;
  
  if (isUniqueEmail) {
    setError("This Email is already in use!");
    return false;
  }

  if (!(phone(phoneNumber)).isValid) {
    setError('Add a valid phone number in the following format: +359x xxxx xxxx');
    return false;
  }

  const isUniquePhone = !!allUsers.filter(el => el.phoneNumber.replace(/ /g, '') === phoneNumber.replace(/ /g, '')).length;

  if (isUniquePhone) {
    setError('This phone number already exist in our database. Add a new one.');
    return false;
  }

  return true;
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
