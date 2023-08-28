import { useEffect, useState } from "react";
import { getReviewsByAddontHandle } from "../../services/review.services";
import { Paper, Card, Button, Container, Typography, Link, Grid } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Rating from '@mui/material/Rating';

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
        
    },[currentReview])


    
    
    return(

        <Container>
        {reviews && reviews.map((review)=>(
            <Card sx={{m:3}} key={review.createdOn}> 
                <CardHeader title={
                    <>
                    <Grid container>

                    <Grid item sx={{mr:1}}>

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
    )
}