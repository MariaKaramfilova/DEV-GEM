import { Card, Button, Typography, Grid, CardHeader, CardContent, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import Rating from '@mui/material/Rating';
import { Box, Container } from "@mui/system";
import { useState } from "react";
import { EditReview } from "./EditReview";
import { deleteReview, getRepliesByReviewUidHandle } from "../../services/review.services";
import { CreateReviewReply } from "./CreateReviewReply";
import React from "react";

export default function SingleReview({
    author,
    rating,
    content,
    date,
    reviewId,
    addonId,
    hasReply,

}){

const [showModal, setShowModal] = useState(false);
const [showReplyModal, setShowReplyModal] = useState(false);

const [replies, setReplies] = useState([])
const [showReplies, setShowReplies] = useState(false)

const handleDisplayReplies = async () => {

    const response = await getRepliesByReviewUidHandle(reviewId);
    setReplies(response);
    setShowReplies(true);
    
}

return(
    <>
    <Card sx={{m:3, width:'100%', border: "1px solid #DFDFE0", '&:hover': {
      border: '1px solid #1977d2' }}} key={date}> 
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
                    
                    <Grid md={7}>
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
                    <Typography align='left' sx={{p:2}}>
                        {content}
                    </Typography>
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant='text'
                        onClick={()=>setShowReplyModal(true)}>
                        REPLY
                        </Button>
                        
                        {hasReply && showReplies ===false &&
                            <Button variant='text'
                            onClick={handleDisplayReplies}>
                            SHOW REPLIES
                            </Button>
                        }

                        {showReplies === true &&
                            <Button variant='text'
                            onClick={()=> setShowReplies(false)}>
                            HIDE REPLIES
                            </Button>
                        }
                        
                    </Box>
                </CardContent>
            </Card>
            
            {showReplies && 
            (
                <List>
      {replies.map((reply) => (
        <Card sx={{mb:1}}>
        <ListItem key={reply.id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>{reply.author.charAt(0).toUpperCase()}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={reply.author}
            secondary={
              <React.Fragment>
                <Typography variant="body2" color="textPrimary">
                  {reply.content}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(reply.createdOn).toLocaleString()}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        </Card>
      ))}
    </List>
            )}
            
                {
                ( showReplyModal &&
                    <>
                   <CreateReviewReply
                   author={author}
                   reviewId={reviewId}
                   setShowReplyModal={setShowReplyModal}
                   showReplyModal={showReplyModal}
                   addonId={addonId}

                   />
                   </>
                )}
            </>
)

}