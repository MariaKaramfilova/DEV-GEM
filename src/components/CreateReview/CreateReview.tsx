import { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';
import { Reviews } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { addReview } from '../../services/review.services';
import { AuthContext } from '../../context/AuthContext';
import { Alert } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  
export default function CreateReview ({addonId, userId, addonName, author, reviewsUpdate, currentReview}){
  const { loggedInUser, user } = useContext(AuthContext);

  const [ open, setOpen ] = useState(false);
  const [ratingValue, setRatingValue] = useState();
  const [reviewConent, setReviewContent] = useState();
  const [error, setError] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function handleSubmit(){
    console.log(addonId);
    console.log(userId);

    if(!ratingValue){
      setError('Please select rating to submit your review.')
      return
    }

    try {
        await addReview(
          reviewConent,
          loggedInUser.username,
          addonId,
          userId,
          ratingValue
        );

        alert("Thank you for submitting your review");
        reviewsUpdate(!currentReview)
        handleClose();
      } catch (error) {
        console.log(error);
        
  }
}

    return(

        <Container>
            <Button onClick={handleOpen} size='large' variant='outlined' sx={{mr:2}}>
                   < RateReviewIcon sx={{mr:1}}/> Write a Review
            </Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Write a review for {addonName}
                </Typography>
                <Rating
                value={ratingValue}
                onChange={(event, newValue) => {
                  event.preventDefault()
                  setRatingValue(newValue);
                }}>
                </Rating>

                < Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Grid md={12}>
                            <TextField
                            required
                            fullWidth
                            id="review"
                            label="Write your review"
                            name="lastName"
                            autoComplete="review"
                            onChange={(e) => setReviewContent (e.target.value)}
                            multiline
                            rows={6}
                            />
                        </Grid>

                        <Grid container sx={{mt:3}}>
                        <Grid item md={2}>
                            <Button onClick={handleSubmit} variant='contained'> Submit </Button>
                        </Grid>
                        <Grid item md={2}>
                            <Button onClick={handleClose} variant='outlined'> Cancel </Button>
                        </Grid>
                        </Grid>
                        {error && (
                          <Box sx={{mt:1}}>
                             <Alert severity="error">
                            {error}
                          </Alert>
                          </Box>
                        )}
                    </Box>
                </Box>
            </Modal>
        </Container>
    )

}