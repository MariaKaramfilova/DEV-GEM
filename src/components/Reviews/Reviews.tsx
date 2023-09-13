import { useEffect, useState } from "react";
import { Review, getReviewsByAddonHandle } from "../../services/review.services";
import { Container, ThemeProvider } from "@mui/material";
import { theme } from "../../common/common";
import SingleReview from "./SingleReview";
import Typography from '@mui/material/Typography';
interface ReviewsProps {
    addonId: string;
    currentReview: boolean;
  }

export default function Reviews({addonId, currentReview}: ReviewsProps){
   
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(()=>{

        try{
            (getReviewsByAddonHandle(addonId))
            .then((source)=>{
                setReviews(source)
            })
            }
            catch(error){
                console.log(error);
            }
        
    },[currentReview, reviews])


    return(
        <ThemeProvider theme={theme}>
        <Container>
        {reviews.length > 0 ? reviews.map((review: Review)=>(

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
        <Typography variant='h3'> No Reviews Yet </Typography>
        }

        </Container>
        </ThemeProvider>
    )
}