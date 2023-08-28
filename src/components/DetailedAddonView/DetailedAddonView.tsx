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
import { getAddonById } from '../../services/addon.services';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import CreateReview from '../CreateReview/CreateReview';
import Reviews from '../Reviews/Reviews';
import RatingWithValue from '../Reviews/RatingWithValue';

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

export const addons: Addon = 
    {
        name: 'Classic Editor',
        username: 'Pesho',
        downloadsCount: 250,
        rating: 2,
        tags: ['techhelper', 'theme', 'devops'],
        isFree: 'Free',
        adonImage: "https://logowik.com/content/uploads/images/visual-studio-code7642.jpg",
        content: 'Of course there is no better site than CSS Tricks for the complete visual guide of flexbox. As Material UI uses Flexbox under the hood for their Grid, you should at least know a few key properties. Using the flex-grow property, you can specify a unitless value (like 2,2,4,4) to proportionally scale the widths of the items or have one item take up the remaining space. flex-basis accepts more normal width values (33%, 100px) to use as the default column width before applying flex-grow properties. Material UI uses flex-basis and max-width to set the widths of the columns this way with the below breakpoint properties. In all honesty, Flexbox is just more confusing than CSS Grid properties, which can specify column widths a bit more expressively with the grid-template-columns prop.' ,
        createdOn: '05.04.2023',
        company: 'Haulmont Technology Ltd.',
        imageGallery: ['https://plugins.jetbrains.com/files/22282/screenshot_790f892a-f97e-4a8a-acee-68a285380f27', 'https://plugins.jetbrains.com/files/22282/screenshot_c8b06521-b1a9-4336-9de6-174c37dc15d6', 'https://plugins.jetbrains.com/files/22282/screenshot_c4309a13-2bf1-483c-bce0-29cf6f335ac8']
    }


export default function DetailedAddonView (){

    const [tabValue, setTabValue] = useState('1');
    const [post, setPost] = useState({})
    const [images, setImages] = useState([])
    const [error, setError] = useState('');
    const [downloadSource, setDownload] = useState('');
    const [tags, setTags] = useState([]);
    const [newReview, setNewReview] = useState(false)

    useEffect(()=>{

        (async () => {
            try {
                getAddonById('-NclSwZhUvHz9-gSHWRn')
                    .then((fetchedPost) => {
                        setPost(fetchedPost);
                        setDownload(fetchedPost.downloadLink);
                        setImages(fetchedPost.images);
                        setTags(Object.keys(fetchedPost.tags))

                    })
                    .catch((error) => {
                        setError(error);
                    });
            } catch (error) {
                setError(error);
            }
        })();

    },[])
    
    const handleDownload = () => {
        const link = document.createElement('a');
        link.download = downloadSource;
        link.href = `/${downloadSource}`
        link.click()
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
            {/* <Rating value={+post.rating} readOnly/> */}
            <RatingWithValue addonId='-NclSwZhUvHz9-gSHWRn'> </RatingWithValue>
        </Grid>
            
            <Button>{post.company}</Button>
            </Grid>

            <Grid item md={6}>
                <Box display="flex" justifyContent="flex-end" alignItems="center" height="100%">
                <Button onClick={handleDownload} variant="contained" size="large">
                    <DownloadForOfflineIcon sx={{mr:1}}/>Download
                </Button>
                </Box>
            </Grid>
        </Grid>

            <TabContext value={tabValue}>

            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Overview" value="1" />
                    <Tab label="Versions" value="2" />
                    <Tab label="Reviews" value="3" />
                </TabList>
             </Box>
            
             <TabPanel value="1">
        <Box display="flex" justifyContent="center" alignItems="center">

        {images.length > 0 && <ImageCarousel images={images}></ImageCarousel>}
        
        </Box>

            <Box sx={{mt:4, color:'#333333'}}>
            <hr/>

            <Typography align="left" variant='h3'>
            Overview
            </Typography>

            <Typography align="left" > {post.description} </Typography>
            </Box>
            </TabPanel>

            <TabPanel value='2'>
                Versions
            </TabPanel>

            <TabPanel value='3'>
                <Grid container>
                    <Grid item md={6}>

                        <Typography align='center' variant='h3'> 
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

            </TabContext>
            </Container>
        </>
    )
}
