import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  TextField,
  Typography,
  Snackbar,
  CardContent,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { updateProfilePhone } from "../../services/user.services";
import { getAllUsers } from "../../services/user.services";

export default function PhoneSection() {
  const [phone, setPhone] = useState("");
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const { loggedInUser, user, setUser } = useContext(AuthContext);

  const handleSnackbarClose = () => {
    setErrorSnackbarOpen(false);
  };

  const changePhone = async () => {
    const password = prompt(
      "Please enter your password to confirm phone change:"
    );
    if (password) {
      const credentials = EmailAuthProvider.credential(
        loggedInUser.email,
        password
      );
      try {
        await reauthenticateWithCredential(user, credentials);
        if (phone) {
          await updateProfilePhone(phone, loggedInUser.username);
          setErrorSnackbarOpen(true);
          const allUsers = await getAllUsers();
          setUser((prev) => ({ ...prev, allUsers }));
          setPhone(phone);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Typography
        variant="h6"
        style={{
          fontSize: "20px",
          color: "gray",
          fontWeight: "normal",
          paddingTop: "40px",
        }}
      >
        Want to change your phone number?
      </Typography>
      <Card>
        <CardContent>
          <form>
            <TextField
              fullWidth
              id="confirmPhone"
              label="Change Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="New phone"
              margin="normal"
              variant="outlined"
            />
            <Button
              onClick={changePhone}
              variant="contained"
              style={{
                margin: "0 auto",
                display: "block",
                marginTop: "15px",
                fontSize: "17px",
              }}
            >
              Update Phone
            </Button>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Congratulations! You successfully changed your phone!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
