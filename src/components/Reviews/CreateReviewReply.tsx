import React, { useContext, useState } from 'react';
import { Modal, TextareaAutosize, Button, Grid, TextField, Alert, Typography, Rating } from '@mui/material';
import { addReviewReply, editReview } from '../../services/review.services';
import { Box } from '@mui/system';
import { modalStyle } from '../CreateReview/CreateReview'; 
import { AuthContext } from '../../context/AuthContext';
import emailjs from 'emailjs-com';
import { useParams } from 'react-router-dom';

export const CreateReviewReply = ({ reviewId, author, authorEmail, addonId, setShowReplyModal, showReplyModal }) => {

  const { loggedInUser, user } = useContext(AuthContext);

  const params = useParams();

  const [error, setError] = useState();
  const [reviewContent, setReviewContent] = useState();

  const handleClose = () => {
    setShowReplyModal(!showReplyModal);
  };

  const sendEmail = () => {
  emailjs.send('default_service', 'template_2wn5lmz', {
    to_email: authorEmail,
    to_name: author,
    from_name: 'DEV GEM Team',
    message: params.id,
  }, 'gitdmzmSLJWM7j5CQ')
  .then((response) => {
    console.log('Email sent successfully!', response);
  })
  .catch((error) => {
    console.error('Email could not be sent:', error);
  });
};

  const handleSubmit = async () => {
    try {
      await addReviewReply(reviewContent, loggedInUser.username, reviewId, addonId);
      handleClose();
      alert('Thank you for submitting your reply.')
      // await sendEmail();
    } catch (error) {
      console.error("Error making a reply:", error);
    }

    console.log(authorEmail);
    
  };

  return (
   <Modal
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={setShowReplyModal}
            >
                <Box sx={modalStyle}>

                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Reply to a review
                </Typography>

                < Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Grid md={12}>
                            <TextField
                            required
                            fullWidth
                            id="reply"
                            label="Reply to a review"
                            name="reply"
                            autoComplete="reply"
                            value={reviewContent}
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
  );
};


