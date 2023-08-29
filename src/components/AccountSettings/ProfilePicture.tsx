import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Card,
  Snackbar,
  CardContent,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { updateProfilePic } from "../../services/user.services";
import Skeleton from '@mui/joy/Skeleton';
import {
  AVATAR_API_URL,
  DEFAULT_PROF_PIC_DIR,
} from "../../common/common";
import { FileWithPath } from "react-dropzone";

export default function ProfilePictureSection() {
  const [photo, setPhoto] = useState<FileWithPath | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [profilePictureURL, setProfilePictureURL] = useState<string>("");
  const [prevProfilePictureURL, setPrevProfilePictureURL] = useState<string>(
    profilePictureURL
  );
  const [isRandomAvatarDisabled, setIsRandomAvatarDisabled] =
    useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const { loggedInUser, user, setUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (!user) {
      setLoading(true);
    }
    if (user) {
      setFirstName(loggedInUser.firstName);
      setSurname(loggedInUser.lastName);
      setProfilePictureURL(
        loggedInUser.profilePictureURL || DEFAULT_PROF_PIC_DIR
      );
      setPrevProfilePictureURL(
        loggedInUser.profilePictureURL || DEFAULT_PROF_PIC_DIR
      );
      setUsername(loggedInUser.username);
    }
    setLoading(false);
  }, [loggedInUser]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!allowedTypes.includes(selectedFile.type)) {
        console.error("Invalid file type. Please select an image or gif file.");
        return;
      }

      setPhoto(selectedFile);
    }
  }

  const handleClickRandomAvatar = async () => {
    try {
      const imageResponse = await fetch(`${AVATAR_API_URL}${crypto.randomUUID()}`);
      const imageUrl = imageResponse.url;
      const file = await createFileFromUrl(imageUrl);
      setProfilePictureURL(imageUrl);
      setPhoto(file);
      setIsRandomAvatarDisabled(true);
    } catch (error) {
      console.error(error);
    }
  };

  async function createFileFromUrl(url: string): Promise<File> {
    try {
      const response = await fetch(url);
      const data = await response.blob();
      const metadata = { type: "image/jpg" };
      const file = new File([data], `${crypto.randomUUID()}.jpg`, metadata);
      return file;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const handleClickUpload = async () => {
    if (photo && loggedInUser.username) {
      try {
        const data = await updateProfilePic(photo, loggedInUser.username);
        setProfilePictureURL(data);
        setPrevProfilePictureURL(data);
        setSnackbarOpen(true);

        const allUsers = await getAllUsers();
        setUser((prev) => ({ ...prev, allUsers }));
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    } else {
      console.error("No file selected.");
    }
  };

  return (
    <>
      {loading || !user ? (
        <Skeleton height={100} width={300} />
      ) : (
        <Card>
          <CardContent>
            <div style={{ display: "flex", alignItems: "center" }}>
              {profilePictureURL && (
                <img
                  src={profilePictureURL}
                  alt="Profile picture"
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
              )}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h6"
                  
                >
                  {firstName} {surname}
                </Typography>
                <Typography
                  variant="h6"
                 
                >
                  @{username}
                </Typography>
                <div className="d-flex">
                  {!isRandomAvatarDisabled ? (
                    <Button 
                    variant='outlined'
                    onClick={handleClickRandomAvatar}
                    sx={{mt:1}}
                    >
                      Generate random avatar
                      
                    </Button>
                  ) : (
                    <Button onClick={handleClickUpload}>
                      Upload
                    </Button>
                  )}
                  {isRandomAvatarDisabled && (
                    <Button
                      onClick={() => {
                        setIsRandomAvatarDisabled(false);
                        setProfilePictureURL(prevProfilePictureURL);
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      <br/>
      <Typography
        variant="h6"
        align='left'
      >
        Upload new profile picture (png, jpg/jpeg, GIF):
      </Typography>
      <br />
      <FormControl fullWidth>
       
        <Input
          type="file"
          id="profile-picture-upload"
          onChange={handleChange}
          inputProps={{ accept: "image/png, image/jpeg, image/gif" }}
        />
      </FormControl>
      <Button
        onClick={handleClickUpload}
        disabled={loading || !photo}
        variant='contained'
        sx={{mt:3}}
      >
        Upload
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="You have successfully changed your profile picture!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
