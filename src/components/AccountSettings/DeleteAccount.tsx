import { getAddonsByUserUid } from "../../services/addon.services";
import { getReviewsByUserUidHandle } from "../../services/review.services";
import { deleteAddonAndRelatedData } from "../../services/addon.services";
import React, { useContext } from "react";
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { AddonsContext } from "../../context/AddonsContext";
import { Button, Card, CardContent, Typography, CardHeader } from "@mui/material";
import { Box } from "@mui/system";
import { useAsync } from "react-select/async";
import { deleteUserData } from "../../services/user.services";
import { logoutUser } from "../../services/auth.services";

/**
 * Component that provides the functionality to delete the user's account,
 * along with associated posts, comments, and voting data.
 *
 * @return {<DeleteAccountSection />};
 */
export default function DeleteAccountSection() {

  const { loggedInUser, user, setUser } = useContext(AuthContext);
  const { allAddons, setAllAddons } = useContext(AddonsContext);

  async function handleDelete() {
    const password = prompt(
      "Please enter your password to confirm account deletion:"
    );
    if (password) {
      const credentials = EmailAuthProvider.credential(
        loggedInUser.email,
        password
      );

      try {
        await reauthenticateWithCredential(user, credentials);

        if (
          window.confirm(
            "Are you sure you want to delete your account? This action is irreversible. Your account, posts, comments and other activity will be deleted."
          )
        ) {
          try {
            const addonsToBeDeleted = allAddons.filter((addon) => {
              addon.userUid === loggedInUser.uid;
            })

            const reviewsToBeDeleted = await (getReviewsByUserUidHandle(loggedInUser.uid))

            console.log("addons", addonsToBeDeleted);
            console.log("reviews", reviewsToBeDeleted);

            await deleteUser(user);

            await deleteUserData(
              loggedInUser.username,
              addonsToBeDeleted,
              reviewsToBeDeleted
            )
            alert("Your account has been deleted.");
            logoutUser();


          } catch (error) {
            console.log(error);
          }

        }
      } catch (error) {
        console.log(error);

      }

    }
  }

  return (
    <>
      <Card sx={{ border: "1px solid #DFDFE0" }}>
        <CardHeader title="Want to delete your account?"
          titleTypographyProps={{ variant: 'h6', fontWeight: "bold" }} />
        <CardContent>
          <Typography>
            Click the Button and delete your account:
          </Typography>
          <Box display="flex" justifyContent="center" marginTop="15px">
            <Button
              onClick={handleDelete}
              variant="contained"
              color="secondary"
            >
              Delete Account
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  )

}