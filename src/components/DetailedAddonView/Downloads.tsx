import { useEffect, useState } from "react";
import { getAddonById } from "../../services/addon.services";
import Typography from '@mui/material/Typography';

export default function Downloads({addonId, downloadsChange, currentDownloads}){

    const [downloads, setDownloads] = useState()
    const [error, setError] = useState()

    useEffect(()=>{

        (async () => {
                try {
                    const fetchedPost = await getAddonById(addonId);
                    setDownloads(fetchedPost.downloads);
                } catch (error) {
                    setError(error);
                } 
        })();

    },[downloadsChange])

    return(

   <div>
    { downloads ? 
        (<Typography variant='h5'> {downloads} Downloads </Typography>)
        :
        (<Typography variant='h5'> {currentDownloads} Downloads </Typography>)
    }
    </div>
    )

}