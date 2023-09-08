import { useState, useEffect } from "react";
import { getAnalyticsData, getAnalyticsForAddon } from "../../services/analytics.services";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bg from 'date-fns/locale/bg';
import { Grid, Typography } from "@mui/material";
import { convertDateFormat } from "../../common/helperFunctions";
import AnalyticsCard from "./AnalyticsCard";
import AnalyticsTable from "./AnalyticsCard";
import "./AnalyticsDashboard.css";
import AnalyticsCharts from "./AnalyticsChart";

registerLocale('bg', bg)


const addons = ["-NclSwZhUvHz9-gSHWRn", "-Nd7Z0yI2K8adK96eJYl", "-Ncwm1QlxctZLYtcWsUM"];

export const AnalyticsDashboard = () => {
    const[startDate, setStartDate] = useState(new Date());
    const[endDate, setEndDate] = useState(new Date());
    const[analyticsData, setAnalyticsData] = useState([])
    const [loading, setLoading] = useState (true);

    useEffect(() => {
        setLoading(true);
      
        const fetchData = async () => {

          try{
            const snapshot = await getAnalyticsForAddon(addons[0], '2023-09-06', '2023-09-07')
           
            console.log(snapshot);
            
          }catch(error){
            console.log(error);
            
          }finally{
            setLoading(false)
          }


          // try {
          //   const updatedAnalyticsData = await Promise.all(
          //     addons.map(async (addon) => {
          //       const addonData = await getAnalyticsData(startDate, endDate, addon);
          //       return addonData;
          //     })
          //   );
      
          //   setAnalyticsData(updatedAnalyticsData);
          // } catch (error) {
          //   console.error("Error fetching analytics data:", error);
          // } finally {
          //   setLoading(false);
          // }
        };
      
        console.log(analyticsData);
        
        fetchData();
      }, [startDate, endDate]);

    return(
        <>
        <Typography variant='h3'>Analytical Dashbord</Typography>
        <Grid container sx={{mt:2}}>
            
            <Grid item sx={{mr:1}}>
        <Typography>Start Date: </Typography>
         <DatePicker 
         wrapperClassName="datePicker"
         selected={startDate} 
         onChange={(date)=> setStartDate(date)}
         locale="bg"></DatePicker>
            </Grid>

            <Grid item>

        <Typography>End Date:</Typography>
        <DatePicker 
  
         selected={endDate} 
         onChange={(date)=> setEndDate(date)}
         locale="bg">
            
         </DatePicker>
         </Grid>

        </Grid>
        {/* { 
        !loading && 
        <>

        <div>
        <AnalyticsTable
        analyticsData={analyticsData}
        />

        </div>

        </>
        } */}

        </>
    )

}