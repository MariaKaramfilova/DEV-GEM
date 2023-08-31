import React, { useState } from 'react';
import { Modal, TextareaAutosize, Button, Grid, TextField, Alert, Typography, Rating } from '@mui/material';
import { editReview } from '../../services/review.services';
import { Box } from '@mui/system';
import { modalStyle } from '../CreateReview/CreateReview'; 

export const EditReview = ({ reviewId, content, ratingValue, setShowEditModal }) => {
  const [editedContent, setEditedContent] = useState(content);
  const [editedRating, setEditedRating ] = useState(ratingValue);
  const [error, setError] = useState();


  const handleClose = () => {
    setShowEditModal(false);
  };

  const handleSubmit = async () => {
    try {
      await editReview(reviewId, editedContent, editedRating);
      handleClose();
      alert('Your review has been updated.')
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  return (
   <Modal
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={true}
            >
                <Box sx={modalStyle}>

                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit a review
                </Typography>
                <Rating
                value={editedRating}
                onChange={(event, newValue) => {
                  event.preventDefault()
                  setEditedRating(newValue);
                }}>
                </Rating>

                < Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Grid md={12}>
                            <TextField
                            required
                            fullWidth
                            id="review"
                            label="Edit your review"
                            name="lastName"
                            autoComplete="review"
                            value={editedContent}
                            onChange={(e) => setEditedContent (e.target.value)}
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


