import { useState, useEffect } from "react";
import { expandAnalyticsData, generateDataForBumpChart, generateDataForLineChart, generateDataForPieChart, getAnalyticsData, getAnalyticsForAddon } from "../../services/analytics.services";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bg from 'date-fns/locale/bg';
import { Grid, Typography } from "@mui/material";
import AnalyticsTable from "./AnalyticsTable";
import "./AnalyticsDashboard.css";
import { MyResponsivePie } from "./AnalyticsPieChart";
import { MyResponsiveLine } from "./AnalyticsLineChart";
import { Box } from "@mui/system";

registerLocale('bg', bg)


const addons = ["-NclSwZhUvHz9-gSHWRn", "-Nd7Z0yI2K8adK96eJYl"];

export const AnalyticsDashboard = () => {
    const[startDate, setStartDate] = useState(new Date());
    const[endDate, setEndDate] = useState(new Date());
    const[analyticsData, setAnalyticsData] = useState([])
    const[loading, setLoading] = useState (true);
    const[dataForBumpChart, setDataForBumpChart] = useState('');
    const[dataForPieChart, setDataForPieChart] = useState('');
    const[dataForLineChart, setDataForLineChart] = useState('');

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
            const pieChartContent = generateDataForPieChart(allAddonsData);
            const lineChartContent = generateDataForLineChart(allAddonsData);
            
            setAnalyticsData(allAddonsData);
            setDataForBumpChart(bumpChartContent);
            setDataForPieChart(pieChartContent);
            setDataForLineChart(lineChartContent);

            console.log(analyticsData);
            console.log(lineChartContent);
            
            
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

        <Grid container>

        <Grid item md={6}>
        <Box sx={{ height: '400px', mt:5 }}>
          <Typography variant='h5'> Downloads Share</Typography>
          <MyResponsivePie data={dataForPieChart} />
        </Box>
        </Grid>

        <Grid item md={6}>
        <Box sx={{ height: '400px', mt:5 }}>
          <Typography variant='h5'> Daily Downloads </Typography>
          <MyResponsiveLine data={dataForLineChart} />
        </Box>
        </Grid>

        </Grid>
        </>
        }

        </>
    )

}