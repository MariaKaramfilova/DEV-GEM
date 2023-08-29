import { useEffect, useState } from "react";
import { getReviewsByAddontHandle } from "../../services/review.services";
import { Card, Button, Container, Typography, Grid, ThemeProvider, styled } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Rating from '@mui/material/Rating';
import { theme } from "../../common/common";
import { deleteReview } from "../../services/review.services";
import { Box } from "@mui/system";


export default function Reviews({addonId, currentReview}){
   

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


    return(
        <ThemeProvider theme={theme}>
        <Container>
        {reviews && reviews.map((review)=>(
            <Card sx={{m:3}} key={review.createdOn}> 
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
                    
                    <Grid md={7}>
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
                        deleteReview(review.reviewId, addonId);
                        alert('Your review has been deleted')
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
  
            </Card>
            
        ))}
        </Container>
        </ThemeProvider>
    )
}