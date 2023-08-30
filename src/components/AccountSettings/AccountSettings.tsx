import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Container, Grid, Divider } from "@mui/material";
// import DeleteAccountSection from "./DeleteAccountSection";
import EmailSection from "./EmailField";
import PasswordSection from "./PasswordField";
import PhoneSection from "./PhoneField";
import ProfilePictureSection from "./ProfilePicture";
import { AuthContext } from "../../context/AuthContext";
import { ACCOUNT_SETTINGS, HOME_PATH, ADMIN } from "../../common/common";
import DeleteAccountSection from "./DeleteAccount";

const AccountSettings = () => {
  const { loggedInUser, user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(true);
    }
    if (user) {
      setUserRole(loggedInUser.role);
    }
    setLoading(false);
  }, [loggedInUser]);

  return (
    <Container maxWidth="md">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" style={{ marginTop: "20px", flexGrow: 1 }}>
          {ACCOUNT_SETTINGS}
        </Typography>
        <Link to={HOME_PATH} style={{ display: "block", color: "black", fontSize: "23px", textDecoration: "none", marginRight: "15px" }}>
          Back To Home
        </Link>
      </div>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ProfilePictureSection />
        </Grid>
        <Grid item xs={12}>
          <PasswordSection />
        </Grid>
        <Grid item xs={12}>
          <EmailSection />
        </Grid>
        {userRole === ADMIN && (
          <Grid item xs={12}>
            <PhoneSection />
          </Grid>
        )}
        <Grid item xs={12}>
          <DeleteAccountSection />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountSettings;
