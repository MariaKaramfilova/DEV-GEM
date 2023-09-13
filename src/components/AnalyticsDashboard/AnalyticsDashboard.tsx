import { useState, useEffect, useContext } from "react";
import { expandAnalyticsData, generateDataForBumpChart, generateDataForLineChart, generateDataForPieChart, getAnalyticsData, getAnalyticsForAddon, getFollowedAddons } from "../../services/analytics.services";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bg from 'date-fns/locale/bg';
import { Grid, Typography } from "@mui/material";
import AnalyticsTable from "./AnalyticsTable";
import "./AnalyticsDashboard.css";
import { MyResponsivePie } from "./AnalyticsPieChart";
import { MyResponsiveLine } from "./AnalyticsLineChart";
import { Box } from "@mui/system";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { AuthContext } from "../../context/AuthContext";
import { SingleItemForFollowingList } from "./SingleItemForFollowingList";

registerLocale('bg', bg)


const addons = ["-Ne27RIOTHPUlH_py5_r", "-Ne2M8k9FOmB5p21_47U", "-Ne2Nzk0iQapfv2B0dMd"];

export const AnalyticsDashboard = () => {
    const { loggedInUser, allUsers } = useContext(AuthContext);

    const[startDate, setStartDate] = useState(new Date());
    const[endDate, setEndDate] = useState(new Date());
    const[analyticsData, setAnalyticsData] = useState([])
    const[loading, setLoading] = useState (true);
    const[dataForBumpChart, setDataForBumpChart] = useState('');
    const[dataForPieChart, setDataForPieChart] = useState('');
    const[dataForLineChart, setDataForLineChart] = useState('');
    const [tabValue, setTabValue] = useState('1');
    const [followedAddons, setFollowedAddons] = useState([]);

    
    useEffect(() => {

      const fetchData = async () => {

        try {
          const fetchedFollowedAddons = await getFollowedAddons(loggedInUser?.username);
          setFollowedAddons(fetchedFollowedAddons);
    
          if (fetchedFollowedAddons.length === 0) {
            return;
          }
          
          const allAddonsDataPromises = fetchedFollowedAddons.map(addon => {

            return expandAnalyticsData(addon, startDate, endDate);
          });
    
          const allAddonsData = await Promise.all(allAddonsDataPromises);
 
          setAnalyticsData(allAddonsData);
          
            const bumpChartContent = generateDataForBumpChart(allAddonsData);
            const pieChartContent = generateDataForPieChart(allAddonsData);
            const lineChartContent = generateDataForLineChart(allAddonsData);

            setDataForBumpChart(bumpChartContent);
            setDataForPieChart(pieChartContent);
            setDataForLineChart(lineChartContent);
     
    
    
          console.log('analyticsData', allAddonsData);
          console.log('linechartData', lineChartContent);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, [startDate, endDate, tabValue]);
    


      const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

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
      <Typography variant='h3'>Analytics Panel</Typography>

      <TabContext value={tabValue}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

          <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Data Board" value="1" />
              <Tab label="Following" value="2" />
          </TabList>
      </Box>
        <TabPanel value="1">
        <Grid container >
            
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

        </TabPanel>

        <TabPanel value='2'>
        <div>
            {analyticsData.map((addon) => (
              <SingleItemForFollowingList addonId={addon.addonId} addonName={addon.addonName} key={addon.addonId}/>
            ))}
          </div>
        </TabPanel>
        </TabContext>
        </>
    )

}