import { useEffect, useState } from "react";
import { getReviewsByAddontHandle } from "../../services/review.services";
import { Card, Button, Container, Typography, Grid, ThemeProvider, styled, Modal } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Rating from '@mui/material/Rating';
import { theme } from "../../common/common";
import { deleteReview } from "../../services/review.services";
import { Box } from "@mui/system";
import { EditReview } from "./EditReview";

export default function Reviews({addonId, currentReview}){

    const [showModal, setShowModal] = useState(false);
   
    const [reviews, setReviews] = useState();
    const [error, setError] = useState();

    useEffect(()=>{

        try{
            (getReviewsByAddontHandle(addonId))
            .then((source)=>{
                setReviews(source)
            })
            }
            catch(error){
                setError(error)
            }
        
    },[currentReview, reviews])


     const handleEditReview = () => {

    }


    return(
        <ThemeProvider theme={theme}>
        <Container>
        {reviews && reviews.map((review)=>(
            <Card sx={{m:3, width:'100%'}} key={review.createdOn}> 
                <CardHeader title={
                    <>
                    <Grid container>

                    <Grid item md={2} sx={{mr:1}} >

                        <Button size='m'>
                            {review.author}
                        </Button>
                    </Grid>
                    
                    <Grid item sx={{mr:1}}> <Rating readOnly value={review.rating}/> </Grid>

                    

                    <Grid item > 
                    <Typography>
                        {new Date(review.createdOn).toLocaleDateString()}
                    </Typography>
                    </Grid>
                    
                    <Grid md={6}>
                    <Box display="flex" justifyContent="flex-end" alignItems="center" height="100%" >
                    <Button 
                    variant='outlined'
                    sx={{mr:1}}
                    onClick={()=>{
                        deleteReview(review.reviewId, addonId);
                        alert('Your review has been deleted')
                    }}
                    > Delete Review </Button>
                    <Button 
                    variant='contained'
                    onClick={()=>{
                        setShowModal(true)
                    }}
                    > Edit Review </Button>
                    </Box>
                    </Grid>
                    
                    </Grid>
                    
                    <hr/>
                    </>
                }
                /> 
                
                <CardContent>
                    <Typography align='left'>
                        {review.content}
                    </Typography>
                </CardContent>

                {showModal && (
                    <EditReview
                    reviewId={review.reviewId}
                    content={review.content}
                    ratingValue={review.rating}
                    // refreshComments={currentReview}
                    setShowEditModal={setShowModal}
                    />
                )}
  
            </Card>
            
        ))}
    

        </Container>
        </ThemeProvider>
    )
}