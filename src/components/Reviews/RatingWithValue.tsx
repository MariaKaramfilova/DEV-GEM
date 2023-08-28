import Rating from '@mui/material/Rating';
import { getRatingsForAddon } from '../../services/review.services';
import { useEffect, useState } from 'react';

export default function RatingWithValue({addonId}){

    const [ratings, setRatings] = useState(0)
    
    useEffect(()=>{
        async function fetch(){

            try{
                const ratingsResult = await getRatingsForAddon(addonId)
                setRatings(ratingsResult);
                console.log(ratingsResult);

            }catch(error){
                console.log(error);
                
            }
        } 

        fetch()
    }
    ,[])

    return(
        <Rating value={ratings} readOnly></Rating>
    )
}