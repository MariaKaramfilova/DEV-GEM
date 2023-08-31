import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';
import ImageCarousel from '../Carousel/Carousel';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getAddonById, incrementDownloadCount } from '../../services/addon.services';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import CreateReview from '../CreateReview/CreateReview';
import Reviews from '../Reviews/Reviews';
import RatingWithValue from '../Reviews/RatingWithValue';
import Versions from '../Versions/Versions';
import GitHubUpdates from '../Versions/GitHubUpdates';
import Downloads from './Downloads';

type Addon = {
    name: string;
    username: string;
    downloadsCount: number;
    rating: number;
    tags: string[];
    isFree: 'Free' | 'Paid'; // Assuming there are only two possible values
    adonImage: string;
    imageGallery: string[],
    content: string;
    createdOn: string;
    company: string;
  };


export default function DetailedAddonView (){

    const [loading, setLoading] = useState(true);

    const [tabValue, setTabValue] = useState('1');
    const [post, setPost] = useState({})
    const [images, setImages] = useState([])
    const [error, setError] = useState('');
    const [downloadSource, setDownload] = useState('');
    const [tags, setTags] = useState([]);
    const [newReview, setNewReview] = useState(false)
    const [content, setContent] = useState('');
    const [downloadsChange, setDownloadsChange] = useState(true)

    

    useEffect(()=>{

        const currentAddon = '-Nd7Z0yI2K8adK96eJYl';

        (async () => {
    
                try {
                    const fetchedPost = await getAddonById(currentAddon);

                    setPost(fetchedPost);
                    setDownload(fetchedPost.downloadLink);
                    setImages(fetchedPost.images);
                    setTags(Object.keys(fetchedPost.tags));
                    const strippedHtml = fetchedPost.description.replace(/<[^>]+>/g, ' ');
                    setContent(strippedHtml);

                    
                } catch (error) {
                    setError(error);
                } finally{
                    setLoading(false);
                }
        })();

    },[])
    
    const handleDownload = () => {
        try{
            const link = document.createElement('a');
            link.download = downloadSource;
            link.href = `/${downloadSource}`
            link.click()
            incrementDownloadCount(post.addonId)
            setDownloadsChange(!downloadsChange)
            console.log(downloadsChange);
            
        }
        catch(error){
            console.log(error);
            
        }
       
    }
    
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
      };

    return (
        <>
        <Container sx={{mt:2, color: 'black'}}>

        <Grid container>
            <Box className ="image-logo" display="flex" alignItems="center">
            <Grid item md={1}>
                <img src={post.logo} style={{maxWidth:'100pt'}}/>
            </Grid>
            </Box>

            <Grid item md ={5}>
            {
                tags.map((tag) => (
                    <Button key={tag} variant='text'>{tag}</Button>
                ))
            }
            <Typography className='addonName' variant='h4'>
                {post.name}
            </Typography>

            <Grid>

            <RatingWithValue addonId={'-Nd7Z0yI2K8adK96eJYl'}> </RatingWithValue>

        </Grid>
            
            <Button>{post.company}</Button>
            </Grid>

        <Grid item md={6}>

                <Grid container sx={{mt:5}}>

                    <Grid item md={12}>
                        <Box display="flex" justifyContent="flex-end" alignItems="center" height="100%">
                        <Button onClick={handleDownload} variant="contained" size="large">
                            <DownloadForOfflineIcon sx={{mr:1}}/>Download
                        </Button>
                        </Box>
                    </Grid>

                    <Grid item md={12} sx={{mt:2}}>

                    <Box display="flex" justifyContent="flex-end" alignItems="left" height="100%">
                    <Downloads addonId={post.addonId} downloadsChange={downloadsChange}/>
                    </Box>
                    </Grid>  

            </Grid>

        </Grid>

        </Grid>

            <TabContext value={tabValue}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Overview" value="1" />
                    <Tab label="Versions" value="2" />
                    <Tab label="Reviews" value="3" />
                    <Tab label="GitHub Source" value="4" />
                </TabList>
             </Box>
            
             <TabPanel value="1">
        <Box display="flex" justifyContent="center" alignItems="center">

        {!loading && images.length > 0 && <ImageCarousel images={images}></ImageCarousel>}
        
        </Box>

            <Box sx={{mt:4, color:'#333333'}}>
            <hr/>

            <Typography align="left" variant='h4'>
            Overview
            </Typography>

           <Typography align="left" > {content} </Typography>
            
            </Box>
            </TabPanel>

            <TabPanel value='2'>

                <Typography variant='h4'>Versions</Typography>
                <Versions addonId={post.addonId}></Versions>

            </TabPanel>

            <TabPanel value='3'>
                <Grid container>
                    <Grid item md={6}>

                        <Typography align='center' variant='h4'> 
                            Ratings & Reviews
                        </Typography>

                    </Grid>
                  <Grid item md={6}>
                        <CreateReview author={post.company} addonId={post.addonId} userId={post.ownerUid} addonName={post.name} reviewsUpdate={setNewReview} currentReview={newReview}/>
                </Grid>

                <Grid container>
                    <Grid item>
                        <Reviews addonId={post.addonId} currentReview={newReview}></Reviews>
                    </Grid>
                </Grid>
                    
                </Grid>
            </TabPanel>

            <TabPanel value='4'>
                <Grid container>
                    <Grid item md={12}>

                        <GitHubUpdates gitRepo={post.originLink}> </GitHubUpdates>
    
                </Grid>
                    
                </Grid>
            </TabPanel>

            </TabContext>
            </Container>
        </>
    )
}
