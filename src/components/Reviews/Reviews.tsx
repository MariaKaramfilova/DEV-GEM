import { useEffect, useState } from "react";
import { getReviewsByAddontHandle } from "../../services/review.services";
import { Card, Button, Container, Grid, ThemeProvider, styled, Modal } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Rating from '@mui/material/Rating';
import { theme } from "../../common/common";
import { deleteReview } from "../../services/review.services";
import { Box } from "@mui/system";
import { EditReview } from "./EditReview";
import SingleReview from "./SingleReview";
import Typography from '@mui/material/Typography';

export default function Reviews({addonId, currentReview}){

    const [showModal, setShowModal] = useState(false);
   
    const [reviews, setReviews] = useState([]);
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
        {reviews.length > 0 ? reviews.map((review)=>(

            <SingleReview
            author={review.author}
            authorEmail={review.userEmail}
            rating={review.rating}
            content={review.content}
            date={review.createdOn}
            reviewId={review.reviewId}
            addonId={addonId}
            hasReply={review.hasReply}
            ></SingleReview>
            
        )):
        <Typography variant='3'> No Reviews Yet </Typography>
        }

        </Container>
        </ThemeProvider>
    )
}