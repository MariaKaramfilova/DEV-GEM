import Rating from '@mui/material/Rating';
import { getRatingsForAddon } from '../../services/review.services';
import { useEffect, useState } from 'react';

interface RatingWithValueProps {
    addonId: string;
  }

export default function RatingWithValue({addonId}: RatingWithValueProps){

    const [ratings, setRatings] = useState(0)
    
    useEffect(()=>{
        async function fetch(){

            try{
                const ratingsResult = await getRatingsForAddon(addonId)
                setRatings(ratingsResult);

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