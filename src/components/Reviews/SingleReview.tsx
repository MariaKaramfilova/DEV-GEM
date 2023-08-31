import { Card, Button, Typography, Grid, CardHeader, CardContent } from "@mui/material";
import Rating from '@mui/material/Rating';
import { Box } from "@mui/system";
import { useState } from "react";
import { EditReview } from "./EditReview";
import { deleteReview } from "../../services/review.services";

export default function SingleReview({
    author,
    rating,
    content,
    date,
    reviewId,
    addonId,

}){

const [showModal, setShowModal] = useState(false);

return(
    <Card sx={{m:3, width:'100%'}} key={date}> 
                <CardHeader title={
                    <>
                    <Grid container>

                    <Grid item md={2} sx={{mr:1}} >

                        <Button size='m'>
                            {author}
                        </Button>
                    </Grid>
                    
                    <Grid item sx={{mr:1}}> <Rating readOnly value={rating}/> </Grid>

                    

                    <Grid item > 
                    <Typography>
                        {new Date(date).toLocaleDateString()}
                    </Typography>
                    </Grid>
                    
                    <Grid md={6}>
                    <Box display="flex" justifyContent="flex-end" alignItems="center" height="100%" >
                    <Button 
                    variant='outlined'
                    sx={{mr:1}}
                    onClick={()=>{
                        deleteReview(reviewId, addonId);
                        alert('Your review has been deleted')
                    }}
                    > Delete Review </Button>
                    <Button 
                    variant='contained'
                    onClick={()=>{
                        setShowModal(!showModal)
                    }}
                    > Edit Review </Button>
                    </Box>
                    </Grid>
                    
                    </Grid>

                    {showModal && (
                    <EditReview
                    reviewId={reviewId}
                    content={content}
                    ratingValue={rating}
                    // refreshComments={currentReview}
                    setShowEditModal={setShowModal}
                    showEditModal={showModal}
                    />
                     )}
                    <hr/>
                    </>
                }
                /> 
                
                <CardContent>
                    <Typography align='left'>
                        {content}
                    </Typography>
                </CardContent>
  
            </Card>
)

}