import { useState, useEffect } from "react";
import { expandAnalyticsData, generateDataForBumpChart, getAnalyticsData, getAnalyticsForAddon } from "../../services/analytics.services";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bg from 'date-fns/locale/bg';
import { Grid, Typography } from "@mui/material";
import AnalyticsTable from "./AnalyticsTable";
import "./AnalyticsDashboard.css";
import AnalyticsCharts from "./AnalyticsChart";

registerLocale('bg', bg)


const addons = ["-NclSwZhUvHz9-gSHWRn", "-Nd7Z0yI2K8adK96eJYl", "-Ncwm1QlxctZLYtcWsUM"];

export const AnalyticsDashboard = () => {
    const[startDate, setStartDate] = useState(new Date());
    const[endDate, setEndDate] = useState(new Date());
    const[analyticsData, setAnalyticsData] = useState([])
    const[loading, setLoading] = useState (true);
    const[dataForBumpChart, setDataForBumpChart] = useState('');

    useEffect(() => {
        setLoading(true);
      
        const fetchData = async () => {

          try{

            const allAddonsData = await Promise.all(
              addons.map(async(addon) => {
                const addonData = await expandAnalyticsData(addon, startDate, endDate);
                return addonData
              })
            )
           
            const bumpChartContent = generateDataForBumpChart(allAddonsData);
            
            setAnalyticsData(allAddonsData);
            setDataForBumpChart(bumpChartContent)

            console.log(analyticsData);
            console.log(dataForBumpChart);
            
          }catch(error){
            console.log(error);
            
          }finally{
            setLoading(false)
          }

        };
      
    
        
        
        fetchData();
      }, [startDate, endDate]);

      const handleStartDateChange = (date) => {
        if (endDate && date > endDate) {
          alert('Start date cannot be after end date');
        } else {
          setStartDate(date);
        }
      };
    
      const handleEndDateChange = (date) => {
        if (startDate && date < startDate) {
          alert('End date cannot be before start date');
        } else {
          setEndDate(date);
        }
      };

    return(
        <>
        <Typography variant='h3'>Analytical Dashbord</Typography>
        <Grid container sx={{mt:2}}>
            
            <Grid item sx={{mr:1}}>
        <Typography variant='h6'>Start Date: </Typography>
         <DatePicker 
         wrapperClassName="datePicker"
         selected={startDate} 
         onChange={handleStartDateChange}
         locale="bg"></DatePicker>
            </Grid>

            <Grid item>

        <Typography variant='h6'>End Date:</Typography>
        <DatePicker 
  
         selected={endDate} 
         onChange={handleEndDateChange}
         locale="bg">
            
         </DatePicker>
         </Grid>

        </Grid>
        { 
        !loading && 
        <>

        <div>
        <AnalyticsTable
        addons={analyticsData}
        />

        </div>

        </>
        }

        </>
    )

}