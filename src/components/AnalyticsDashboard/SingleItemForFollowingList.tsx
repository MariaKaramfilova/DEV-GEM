import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { getAddonById } from '../../services/addon.services';
import { followAddon, unfollowAddon } from '../../services/analytics.services';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { AuthContext } from '../../context/AuthContext';

export const SingleItemForFollowingList = ({addonId, addonName}) => {
    const [following, setFollowing] = useState(true);
    const [addon, setAddon] = useState();
    const { loggedInUser, allUsers } = useContext(AuthContext);

    const handleUnfollow = async() => {

        try{
            await unfollowAddon(addonId, loggedInUser?.username);
        }catch(error){
            console.log(error);
        }finally{
            setFollowing(false)
        }

    }

    const handleFollow = async() => {

        try{
            await followAddon(addonId, loggedInUser?.username);
        }catch(error){
            console.log(error);
        }finally{
            setFollowing(true)
        }

    }


    return (
        <Card key={addonId} sx={{mb:1}}>
          <CardContent>
            <Grid container>
            <Grid item md={2}>
            <Typography variant="h6">{addonName}</Typography>
            </Grid>
            <Grid item>
            {following && <Button
              variant="contained"
              onClick={handleUnfollow}
            >
              Unfollow
            </Button>}

            {!following && <Button
              variant="outlined"
              onClick={handleFollow}
            >
              <BookmarkIcon sx={{ mr: 1 }} /> Follow
            </Button>}
            </Grid>
                
            </Grid>
          </CardContent>
        </Card>
    )


}